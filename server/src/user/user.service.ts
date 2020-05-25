import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/token.service';
import { LoginDto } from './dto/login';

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

  public async create(user): Promise<User> {
    const createdUser = await this.userRepository.save(user);
    createdUser.token = this.tokenService.generate({email: user.email});
    return createdUser;
  }

  public async update(id, newValue): Promise<User> {
    const user = await this.userRepository.findOneOrFail(id);
    if (!user.id) {
      console.error("user doesn't exist");
    }

    if(newValue.password) {
      newValue.password = await bcrypt.hash(newValue.password, 10);
    }

    await this.userRepository.update(id, newValue);
    return await this.userRepository.findOne(id);
  }

  public async delete(id: number) {
    return await this.userRepository.delete(id);
  }

  public async login (userLoginInfo: LoginDto) {

    const user = await this.userRepository.findOne({email: userLoginInfo.email})

    if (!user)
      throw new HttpException('Email não encontrado', HttpStatus.BAD_REQUEST);
              
    return bcrypt
            .compare(userLoginInfo.password, user.password)
            .then(match => {

              if(!match) 
                throw new HttpException('Senha incorreta', HttpStatus.BAD_REQUEST);
            
              const token = this.tokenService.generate({ email: user.email });

              return {
                nomeCompleto: user.nomeCompleto,
                email: user.email,
                produtos: user.produtos,
                token
              };

          })
        
  }

}
