import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ExerciseGroups {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ unique: true })
  description: string;
}
