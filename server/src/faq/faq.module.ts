import { Module } from '@nestjs/common';
import { FaqController } from './faq.controller';
import { Faq } from './faq.entitty';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenService } from 'src/token.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Faq, User])],
  controllers: [FaqController],
  providers: [TokenService, UserService]
})
export class FaqModule {}
