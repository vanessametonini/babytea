import { Controller, Get, Post, Body, Headers, Put, Param, ForbiddenException, Delete, UseInterceptors, ClassSerializerInterceptor, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto, productStatus, categoria } from './produto.entity';
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
  async findAll(@Headers('authorization') token, @Query() query ): Promise<Produto[]> {

    console.log(query);

    return this.tokenService
                .verify(token)
                .then(decoded => {

                  switch (query.cat) {

                    case categoria.bebe:
                      return this.produtoRepository
                        .find({ 
                          where: { categoria: categoria.bebe }, 
                          relations: ["user"]
                        })
                      break;

                    case categoria.papai:
                      return this.produtoRepository
                        .find({
                          where: { categoria: categoria.papai },
                          relations: ["user"]
                        })
                      break;

                    case categoria.mamae:
                      return this.produtoRepository
                        .find({
                          where: { categoria: categoria.mamae },
                          relations: ["user"]
                        })
                      break;

                    case categoria.familia:
                      return this.produtoRepository
                        .find({
                          where: { categoria: categoria.familia },
                          relations: ["user"]
                        })

                    default:
                      return this.produtoRepository.find({ relations: ["user"] })
                      break;
                  }

                })
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

    const productId = params.id;
    const decodedToken = await Promise.resolve(await this.tokenService.verify(token));
    
    if(!decodedToken)
      throw new ForbiddenException('Token inválido');

    const produto = await Promise.resolve(this.produtoRepository.findOne(productId, { relations: ["user"] }));
    const user = await Promise.resolve(this.userService.findByEmail(decodedToken.email, true));
    
    //[RESERVANDO]
    //se o produto no banco estiver livre
    //e o status do produto que vier for livre
    if(produto.status == productStatus.livre 
      && partialProduct.status == productStatus.livre) {
        
      //entao produto fica reservado
      produto.status = productStatus.reservado
      //reserva para usuario:
      produto.user = user;

      //atualiza no banco
      this.produtoRepository.update(params.id, produto);

    }

    //[LIBERANDO RESERVA]
    //se o produto no banco estiver reservado
    //e o status do produto que vier for reservado
    if (produto.status == productStatus.reservado 
      && partialProduct.status == productStatus.reservado ) {
        
      //se o usuario do produto é o mesmo usuario do token
      if (produto.user.email == user.email) {
        //entao produto fica livre
        produto.status = productStatus.livre
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

    //[ILIMITADOS]
    //se o produto for ilimitado
    if(produto.status == productStatus.ilimitado) {
      //acessa a lista de produtos do usuario
      const produtoEncontrado = user.produtos.find(produtoApi => produtoApi.id == produto.id);

      if (produtoEncontrado) {
        //se produto encontrado, remove
        user.produtos = user.produtos.filter(produtoApi => produtoApi.id != produto.id)
        this.userService.save(user.id, user);
      }

      else {
        //se nao encontrou produto, adiciona na lista
        user.produtos.push(produto)
        this.userService.save(user.id, user);
      }

    }
   
    return this.produtoRepository.findOne(productId, {relations: ["user"]});

  }

  @Delete(':id') 
  async delete(@Param() params) {
    return this.produtoRepository.delete(params.id)
  }
  
}
