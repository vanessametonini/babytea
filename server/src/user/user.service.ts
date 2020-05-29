import { Injectable, HttpException, HttpStatus, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/token.service';
import { LoginDto } from './dto/login';
import { UserOutputDto } from './dto/user';
import { Produto } from 'src/produto/produto.entity';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly tokenService: TokenService
  ) {}

  //@TODO Exigir token do admin
  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async findByEmail(userEmail: string): Promise<User> {
    return await this.userRepository.findOne({ email: userEmail });
  }

  public async findById(id: string): Promise<User> {
    return await this.userRepository.findOneOrFail(id);
  }

  public async create(user): Promise<UserOutputDto> {
    user.produtos = [];
    const createdUser = await this.userRepository.save(user);

    return {
      id: createdUser.id,
      nome: createdUser.nomeCompleto,
      email: createdUser.email,
      produtos: createdUser.produtos,
      token: this.tokenService.generate({ email: user.email })
    };
  }

  public async update(id, newValue): Promise<User> {
    const user = await this.userRepository.findOneOrFail(id);
    if (!user) 
      throw new HttpException('Usuário não encontrado', HttpStatus.BAD_REQUEST);

    if(newValue.password) {
      newValue.password = await bcrypt.hash(newValue.password, 10);
    }

    await this.userRepository.update(id, newValue);
    return await this.userRepository.findOne(id);
  }

  public async updateProducts(id, produto): Promise<User> {

    const user = await this.userRepository.findOneOrFail(id);

    if (!user)
      throw new HttpException('Usuário não encontrado', HttpStatus.BAD_REQUEST);

    const produtoEncontrado = user.produtos.find(produtoApi => produtoApi.id == produto.id);
    
    if (produtoEncontrado){
      //se encontrou remove
      await this.userRepository
            .update(id, 
              { 
                produtos: user.produtos.filter( produtoApi => produtoApi.id != produto.id) 
              }
            );

      return await this.userRepository.findOne(id);
    }
    else {
      //se nao encontrou um igual adiciona na lista
      user.produtos.push(produto)
      await this.userRepository.update(id, user);
      return await this.userRepository.findOne(id);
    }

  }

  public async getProducts(id, token): Promise<Produto[]> {
    
    const decodedToken = await Promise.resolve(await this.tokenService.verify(token));

    if (!decodedToken)
      throw new ForbiddenException('Token inválido');

    const user = await Promise.resolve(this.userRepository.findOne({ email: decodedToken.email}));

    if(user.id == id ){
      return user.produtos
    }

  }

  public async delete(id: number) {
    return await this.userRepository.delete(id);
  }

  public async login (userLoginInfo: LoginDto): Promise<UserOutputDto> {

    const user = await this.userRepository.findOne({email: userLoginInfo.email})

    if (!user)
      throw new HttpException('Email não encontrado', HttpStatus.BAD_REQUEST);
              
    return bcrypt
            .compare(userLoginInfo.password, user.password)
            .then(match => {

              if(!match) 
                throw new HttpException('Senha incorreta', HttpStatus.BAD_REQUEST);
            
              return {
                id: user.id,
                nome: user.nomeCompleto,
                email: user.email,
                produtos: user.produtos,
                token: this.tokenService.generate({ email: user.email })
              };

          })
        
  }

}
