import { Controller, Get, Post, Body, Put, Delete, Param, Headers, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { LoginDto } from './dto/login';
import { Produto } from 'src/produto/produto.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  
  constructor(private userService: UserService) {}

  @Get()
  async list(@Headers('authorization') token): Promise<User[]> {
    return await this.userService.findAll(token);
  }

  @Post()
  async create(@Body() userInput: User): Promise<User> {
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
  async delete(@Headers('authorization') token, @Param() params) {
    return await this.userService.delete(token, params.id);
  }

  @Get('/token')
  async tokenValidation(@Headers('authorization') token) {
    return this.userService.isTokenValid(token)
  }
  
}
