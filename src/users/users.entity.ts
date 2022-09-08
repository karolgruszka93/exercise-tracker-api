import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column('longtext')
  picture: string;

  @Column({ default: null })
  facebookToken: string | null;

  @Column({ default: null })
  googleToken: string | null;
}
