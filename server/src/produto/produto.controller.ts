import { Controller, Get, Post, Body, Headers, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './produto.entity';
import * as jwt from 'jsonwebtoken';
require('dotenv').config();

@Controller('produto')
export class ProdutoController {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
  ) {}

  @Get()
  async findAll(
    @Headers('authorization') token ): Promise<Produto[]> {
    
    return jwt.verify(token, process.env.ACCESS_TOKEN_SUPERSECRET, async (err, user) => {
      console.log(user);
      if (err) {
        throw new HttpException('deu ruim no token', 401)
      }
      
      return await this.produtoRepository.find();
    });
    
  }

  @Post()
  async create(@Body() produtoInput): Promise<Produto> {
    return await this.produtoRepository.save(produtoInput);
  }
}
