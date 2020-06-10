import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from 'src/user/user.entity';

export enum productStatus {
  reservado = 'reservado',
  livre = 'livre',
  ilimitado = 'ilimitado',
}

export enum categoria {
  bebe = 'bebê',
  papai = 'papai',
  mamae = 'mamãe',
  familia = 'família'
}

class Loja {
  nome: string;
  url: string;
}

@Entity()
export class Produto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  fotoUrl: string;

  @Column({ nullable: false })
  titulo: string;

  @Column({ nullable: false })
  quantidade: number;

  @Column({ nullable: false })
  valorMin: number;

  @Column({ nullable: false })
  valorMax: number;

  @Column({ nullable: true, array: true, type: 'simple-json' })
  lojas: Loja[];

  //PG
  // @Column("json")
  // public lojas!: { nome: string, url: string }[];

  @Column({
    type: 'simple-enum',
    nullable: false,
    enum: productStatus,
    default: productStatus.livre,
  })
  status: productStatus;

  @ManyToOne(
    type => User,
    user => user.produtos,
    { nullable: true },
  )
  user: User;

  @Column({
    type: 'simple-enum',
    nullable: false,
    enum: categoria,
    default: categoria.bebe,
  })
  categoria: categoria;

  @Column({ nullable: true })
  descricao: string;

  // //PG
  // @Column({
  //   type: 'timestamp',
  //   nullable: false,
  //   default: () => 'CURRENT_TIMESTAMP',
  // })
  @CreateDateColumn({ nullable: false })
  cadastradoEm: Date;
  
}
