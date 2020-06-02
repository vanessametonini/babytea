import { Controller, Get, Post, Body, Put, Delete, Param, Headers, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { LoginDto } from './dto/login';
import { Produto } from 'src/produto/produto.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  
  constructor(private userService: UserService) {}

  //@TODO Exigir token do admin
  @Get()
  async list(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Post()
  async create(@Body() userInput): Promise<User> {
    return await this.userService.create(userInput);
  }

  @Post('/login')
  async login(@Body() userInput: LoginDto): Promise<User> {
    return this.userService.login(userInput);    
  }

  @Put(':id')
  async update(@Param() params, @Body() partialUser): Promise<User> {
    return this.userService
      .update(params.id, partialUser)
      .then(user => user)
      .catch(error => error);
  }

  @Get('/mylist')
  async getUserProducts(@Headers('authorization') token): Promise<Produto[]> {
    return this.userService.getProducts(token);
  }

  @Delete(':id')
  async delete(@Param() params) {
    return await this.userService.delete(params.id);
  }
  
}
