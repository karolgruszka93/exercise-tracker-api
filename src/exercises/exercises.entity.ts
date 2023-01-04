import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Exercises {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;
}
