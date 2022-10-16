import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column('text')
  picture: string;

  @Column({ default: null })
  facebookProfileId: string | null;

  @Column({ default: null })
  googleToken: string | null;
}
