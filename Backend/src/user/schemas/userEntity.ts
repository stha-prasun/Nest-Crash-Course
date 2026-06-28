import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Role } from '../user.types';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  fname!: string;

  @Column()
  lname!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({default: Role.Student})
  role!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
