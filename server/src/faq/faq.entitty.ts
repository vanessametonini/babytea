import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Faq {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text'})
  content: string;

}