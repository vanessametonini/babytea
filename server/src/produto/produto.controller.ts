import { Controller, Get, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './produto.entity';

@Controller('produto')
export class ProdutoController {

  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
  ) {}

  @Get()
  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find();
  }

  @Post()
  async create(@Body() produtoInput): Promise<Produto> {
    return await this.produtoRepository.save(produtoInput);
  }
  
}
