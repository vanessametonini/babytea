import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, OneToMany } from "typeorm";
import { Produto } from "src/produto/produto.entity";
import { IsEmail, IsNotEmpty} from "class-validator";

import { IsEmailAlreadyExist } from "./validators/is-email-unique";
import * as bcrypt from 'bcrypt';
import { IsWhatsappAlreadyExist } from "./validators/is-whatsapp-unique";
import { Exclude, Expose } from "class-transformer";

@Exclude({ toPlainOnly: true })
@Entity({
  name: 'usuarios',
})
export class User {
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose({ name: 'nome' })
  @IsNotEmpty()
  @Column({ nullable: false })
  nomeCompleto: string;

  @Expose({ toClassOnly: true })
  @IsWhatsappAlreadyExist({ message: 'WhatsApp já cadastrado!' })
  @Column({ nullable: false, unique: true })
  whatsapp: string;

  @Expose()
  @IsEmail()
  @IsEmailAlreadyExist({ message: 'Email já cadastrado!' })
  @Column({ nullable: false, unique: true })
  email: string;

  @Expose({ toClassOnly: true })
  @IsNotEmpty()
  @Column({ nullable: false })
  password: string;

  @Expose({ toClassOnly: true })
  @IsNotEmpty()
  @Column({ nullable: false })
  termos: boolean;

  //PG
  // @Column({
  //   type: 'timestamp',
  //   nullable: false,
  //   default: () => 'CURRENT_TIMESTAMP',
  // })
  @CreateDateColumn({ nullable: false })
  cadastradoEm: Date;

  @Expose()
  @OneToMany(
    type => Produto,
    produto => produto.user,
  )
  produtos: Produto[];

  @Expose()
  token?: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
  
}
