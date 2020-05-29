import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm";
import { Produto } from "src/produto/produto.entity";
import { IsEmail, IsNotEmpty} from "class-validator";

import { IsEmailAlreadyExist } from "./validators/is-email-unique";
import * as bcrypt from 'bcrypt';
import { IsWhatsappAlreadyExist } from "./validators/is-whatsapp-unique";
import { Exclude, Expose } from "class-transformer";

@Exclude({toPlainOnly: true})
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
  @OneToMany(type => Produto, produto => produto.user)
  produtos: Produto[];

  @Expose()
  token?: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
  
}
