import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
require('dotenv').config();

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
    createdUser.token = jwt.sign(
      { email: user.email },
      process.env.ACCESS_TOKEN_SUPERSECRET,
      { expiresIn: 86400*15 },
    );
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

  public async login (userLoginInfo) {

  }

  // public async register(userDto: CreateUserDto) {

  //   const { email } = userDto;

  //   let user = await this.userRepository.findOne({ where: { email } });

  //   if (user) {
  //     throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
  //   }

  //   user = await this.userRepository.create(userDto);

  //   return await this.userRepository.save(user);
  // }
}
