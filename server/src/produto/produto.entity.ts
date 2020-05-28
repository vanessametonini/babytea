import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

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

  @Column({ nullable: false, enum: productStatus })
  status: productStatus;
  
  @Column({ nullable: false, enum: categoria })
  categoria: categoria;

  @Column({ nullable: true })
  descricao: string;

  @CreateDateColumn({ nullable: false })
  cadastradoEm: Date;
  
}
