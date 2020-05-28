import { Controller, Get, Post, Body, Headers, HttpException, HttpStatus, Put, Param, ForbiddenException } from '@nestjs/common';
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
                .then(decoded => this.produtoRepository.find())
                .catch(erro => {
                  throw new ForbiddenException('Token inválido');
                })

  }

  @Post()
  async create(@Body() produtoInput): Promise<Produto> {
    return await this.produtoRepository.save(produtoInput);
  }

  @Put(':id')
  async updateStatus(@Headers('authorization') token, @Param() params, @Body() partialProduct: Produto): Promise<Produto> {

    const statusProduto = {
      status: partialProduct.status
    }
    
    return await this.tokenService
                      .verify(token)
                      .then(decoded => {

                        const produto = this.produtoRepository.findOneOrFail(params.id);

                        if (!produto)
                          throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);

                        this.produtoRepository.update(params.id, statusProduto);
                        return this.produtoRepository.findOne(params.id);
                        
                      })
                      .catch(erro => {
                        throw new ForbiddenException('Token inválido');
                      })
  }
  
}
