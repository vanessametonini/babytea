import { Controller, Post, Get, Headers, ForbiddenException, Body, Delete, Param } from '@nestjs/common';
import { Faq } from './faq.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenService } from 'src/token.service';
import { UserService } from 'src/user/user.service';
require('dotenv').config();

@Controller('api/faq')
export class FaqController {

  constructor(
  @InjectRepository(Faq)
    private readonly faqRepository: Repository<Faq>,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) { }

  @Get()
  async findAll(@Headers('authorization') token) {

    return this.tokenService
      .verify(token)
      .then(decoded => this.faqRepository.find())
      .catch(erro => {
        throw new ForbiddenException('Token inválido');
      })

  }

  @Post()
  async create(@Headers('authorization') token,
  @Body() faqInput) {

    return this.tokenService
      .verify(token)
      .then(decoded => {

        return this.userService.findByEmail(decoded.email)
          .then(
            user => {
              if (user.email === process.env.ADMIN){
                return this.faqRepository.save(faqInput)  
              }

              throw "Somente admins podem fazer isto!";
              
            }
        )
        .catch(erro => erro)


      })
      .catch(erro => {
        throw new ForbiddenException('Token inválido');
      })

  }

  @Delete(':id')
  async delete(@Headers('authorization') token, @Param() params) {

    return this.tokenService
      .verify(token)
      .then(decoded => {

        return this.userService.findByEmail(decoded.email)
          .then(
            user => {
              if (user.email === process.env.ADMIN) {
                return this.faqRepository.delete(params.id)
              }
              throw "Somente admins podem fazer isto!";
            }
          ).catch(erro => erro)

      })
      .catch(erro => {
        throw new ForbiddenException('Token inválido');
      })

  }

}
