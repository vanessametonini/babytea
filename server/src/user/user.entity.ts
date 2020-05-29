import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm";
import { Produto } from "src/produto/produto.entity";
import { IsEmail, IsNotEmpty} from "class-validator";

import { UseInterceptors, ClassSerializerInterceptor } from "@nestjs/common";
import { IsEmailAlreadyExist } from "./validators/is-email-unique";
import * as bcrypt from 'bcrypt';
import { IsWhatsappAlreadyExist } from "./validators/is-whatsapp-unique";
import { Exclude, Expose, Transform } from "class-transformer";



@Exclude({toPlainOnly: true})
@UseInterceptors(ClassSerializerInterceptor)
@Entity({
  name: 'usuarios',
})
export class User {

  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose({name: 'nome', toPlainOnly: true})
  @IsNotEmpty()
  @Column({ nullable: false })
  nomeCompleto: string;

  @IsWhatsappAlreadyExist({ message: 'WhatsApp já cadastrado!' })
  @Column({ nullable: true, unique: true })
  whatsapp: string;

  @Expose()
  @IsEmail()
  @IsEmailAlreadyExist({ message: 'Email já cadastrado!' })
  @Column({ nullable: false, unique: true })
  email: string;

  @IsNotEmpty()
  @Column({ nullable: false })
  password: string;

  @IsNotEmpty()
  @Column({ nullable: false })
  termos: boolean;

  @CreateDateColumn({ nullable: false })
  cadastradoEm: Date;

  @Expose()
  @OneToMany(type => Produto, produto => produto.user, {eager: true})
  produtos: Produto[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

}
