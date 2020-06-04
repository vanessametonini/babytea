import { Injectable, HttpException, HttpStatus, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/token.service';
import { LoginDto } from './dto/login';
import { Produto } from 'src/produto/produto.entity';
require('dotenv').config();

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly tokenService: TokenService
  ) {}

  public async findAll(token): Promise<User[]> {

    return this.tokenService
      .verify(token)
      .then(decoded => {

        return this.findByEmail(decoded.email)
          .then(
            user => {
              if (user.email === process.env.ADMIN) {
                return this.userRepository.find();
              }
            }
          )
          .catch(erro => erro)

      })
      .catch(erro => {
        throw new ForbiddenException('Token inválido');
      })

  }

  public async findByEmail(userEmail: string, products: boolean = false): Promise<User> {

    if(products)
      return await this.userRepository.findOne({ email: userEmail }, { relations: ["produtos"] })
    
    return await this.userRepository.findOne({ email: userEmail })

  }

  public async findById(userId: string): Promise<User> {
    return await this.userRepository.findOneOrFail(userId);
  }

  public async create(user): Promise<User> {
    user.produtos = [];
    const createdUser = await this.userRepository.save(user);
    createdUser.token = this.tokenService.generate({ email: user.email });

    return createdUser;
  }

  public async login(userLoginInfo: LoginDto): Promise<User> {

    const user = await this.userRepository.findOne({ email: userLoginInfo.email }, {relations: ["produtos"]})

    if (!user)
      throw new HttpException('Email não encontrado', HttpStatus.BAD_REQUEST);

    return bcrypt
      .compare(userLoginInfo.password, user.password)
      .then(match => {

        if (!match)
          throw new HttpException('Senha incorreta', HttpStatus.BAD_REQUEST);

        user.token = this.tokenService.generate({ email: user.email })

        return user;

      })

  }

  public async update(userId: string, newValue: Partial<User>): Promise<User> {
    
    const user = await this.userRepository.findOneOrFail(userId);

    if (!user) 
      throw new HttpException('Usuário não encontrado', HttpStatus.BAD_REQUEST);

    if(newValue.password) 
      newValue.password = await bcrypt.hash(newValue.password, 10);
    
    await this.userRepository.update(userId, newValue);
    return await this.userRepository.findOne(userId);

  }

  public async save(userId: string, userData: User) {

    const user = await this.userRepository.findOne(userId, { relations: ["produtos"] });

    if (!user)
      throw new HttpException('Usuário não encontrado', HttpStatus.BAD_REQUEST);
  
    await this.userRepository.save(userData);
    return await this.userRepository.findOne(userId, { relations: ["produtos"] });
  }

  public async getProducts(token): Promise<Produto[]> {

    const decodedToken = await Promise.resolve(await this.tokenService.verify(token));

    if (!decodedToken)
      throw new ForbiddenException('Token inválido');

    const user = await Promise.resolve(this.userRepository.findOne({ email: decodedToken.email}, { relations: ["produtos"]}));

    return user.produtos;

  }

  public async delete(token, id: number) {

    return this.tokenService
      .verify(token)
      .then(decoded => {

        return this.findByEmail(decoded.email)
          .then(
            user => {
              if (user.email === process.env.ADMIN) {
                return this.userRepository.delete(id)
              }
            }
          )
          .catch(erro => erro)

      })
      .catch(erro => {
        throw new ForbiddenException('Token inválido');
      })
    
  }

  public async isTokenValid(token) {
    return this.tokenService.verify(token)
    .then(decoded => true)
    .catch(() => {
      throw new UnauthorizedException('Token inválido')
    })
  }

}
