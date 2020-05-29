import { Controller, Get, Post, Body, Headers, Put, Param, ForbiddenException, Delete, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto, productStatus } from './produto.entity';
import { TokenService } from 'src/token.service';
import { UserService } from 'src/user/user.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('produto')
export class ProdutoController {

  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) {}

  @Get()
  async findAll(@Headers('authorization') token ): Promise<Produto[]> {

    return this.tokenService
                .verify(token)
                .then(decoded => this.produtoRepository.find({ relations: ["user"] }))
                .catch(erro => {
                  throw new ForbiddenException('Token inválido');
                })

  }

  @Post()
  async create(@Body() produtoInput): Promise<Produto> {
    return await this.produtoRepository.save(produtoInput);
  }

  @Put(':id')
  async updateStatus(
    @Headers('authorization') token, 
    @Param() params, 
    @Body() partialProduct: Produto
  ) {

    const decodedToken = await Promise.resolve(await this.tokenService.verify(token));
    
    if(!decodedToken)
      throw new ForbiddenException('Token inválido');

    const produto = await Promise.resolve(this.produtoRepository.findOne(params.id, { relations: ["user"] }));
    const user = await Promise.resolve(this.userService.findByEmail(decodedToken.email));

    //[RESERVANDO]
    //se o produto no banco estiver livre
    //e o status que vier for reservado
    if(produto.status == productStatus.livre 
      && partialProduct.status == productStatus.reservado) {
        
      //entao produto fica reservado
      produto.status = partialProduct.status;
      //reserva para usuario:
      produto.user = user;

      //atualiza no banco
      this.produtoRepository.update(params.id, produto);

    }

    //[LIBERANDO RESERVA]
    //se o produto no banco estiver reservado
    //e o status que vier for livre
    if (produto.status == productStatus.reservado 
      && partialProduct.status == productStatus.livre ) {
      //se o usuario do produto é o mesmo usuario do token

      if (produto.user.email == user.email) {
        //entao produto fica livre
        produto.status = partialProduct.status;
        //retira o usuario do produto
        produto.user = null;
  
        //atualiza no banco
        this.produtoRepository.update(params.id, produto);
      }
      //senao
      else {
        //erro de proibido apenas o usuario que reservou pode tirar a reserva!
        throw new ForbiddenException(`Apenas ${produto.user.nomeCompleto} pode tirar a reserva deste produto`);
      }
        
    }
    
    return this.produtoRepository.findOne(params.id, {relations: ["user"]});

  }

  @Delete(':id') 
  async delete(@Param() params) {
    return this.produtoRepository.delete(params.id)
  }
  
}
