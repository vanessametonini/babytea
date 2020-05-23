import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  //@TODO Exigir token do admin
  @Get()
  async list(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Post()
  async create(@Body() userInput: User): Promise<User> {
    return await this.userService.create(userInput);
  }

  @Put(':id')
  async update(@Param() params, @Body() partialUser): Promise<User> {

    return this.userService
      .update(params.id, partialUser)
      .then(user => user)
      .catch(error => error);
  }

  @Delete(':id')
  async delete(@Param() params) {
    return await this.userService.delete(params.id);
  }
}
