import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProdutoModule } from './produto/produto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './produto/produto.entity';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FaqModule } from './faq/faq.module';
import { Faq } from './faq/faq.entitty';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'babytea.db',
      entities: [Produto, User, Faq],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
      exclude: ['/api*']
    }),
    ProdutoModule,
    UserModule,
    FaqModule,
  ],
  controllers: [AppController],
})
export class AppModule {
}
