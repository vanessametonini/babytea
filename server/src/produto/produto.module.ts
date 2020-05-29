import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './produto.entity';
import { TokenService } from 'src/token.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Produto, User])],
  controllers: [ProdutoController],
  providers: [TokenService, UserService]
})
export class ProdutoModule {}
