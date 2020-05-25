import { Controller, Get, Post, Body, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './produto.entity';
import { TokenService } from 'src/token.service';

@Controller('produto')
export class ProdutoController {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
    private readonly tokenService: TokenService,
  ) {}

  @Get()
  async findAll(@Headers('authorization') token ): Promise<Produto[]> {

      return this.tokenService
                  .verify(token)
                  .then( decoded => {
                    console.log(decoded);
                    return this.produtoRepository.find();
                  })
                  .catch( erro => {
                    console.error(erro);
                    throw new HttpException('Token inválido', HttpStatus.BAD_REQUEST);
                  })

  }

  @Post()
  async create(@Body() produtoInput): Promise<Produto> {
    return await this.produtoRepository.save(produtoInput);
  }
  
}
