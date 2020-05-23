import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, BeforeInsert, BeforeUpdate } from "typeorm";
import { Produto } from "src/produto/produto.entity";
import { IsEmail, IsNotEmpty} from "class-validator";

import { UseInterceptors, ClassSerializerInterceptor } from "@nestjs/common";
import { IsEmailAlreadyExist } from "./validators/is-email-unique";
import * as bcrypt from 'bcrypt';
import { IsWhatsappAlreadyExist } from "./validators/is-whatsapp-unique";

@UseInterceptors(ClassSerializerInterceptor)
@Entity({
  name: 'usuarios',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @Column({ nullable: false })
  nomeCompleto: string;

  @IsWhatsappAlreadyExist({ message: 'WhatsApp já cadastrado!' })
  @Column({ nullable: true, unique: true })
  whatsapp: string;

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

  @ManyToOne(
    type => Produto,
    (produto: Produto) => produto.id,
    { eager: true },
  )
  produtos: Produto;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  // toResponseObject(showToken: boolean = true): UserRO {
  //   const { id, nomeCompleto, email } = this;
  //   const responseObject: UserRO = {
  //     id,
  //     nomeCompleto,
  //     email,
  //   };

  //   return responseObject;
  // }
}
