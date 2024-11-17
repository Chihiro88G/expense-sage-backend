import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserCategory } from '../user_category/entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
    name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
    auth0_id: string;

  @Column({
    type: 'integer',
    nullable: true,
  })
    phone: number | null;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
    created_at: Date;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
    modified_at: Date;

  @OneToMany(() => UserCategory, userCategory => userCategory.user)
    userCategories: UserCategory[];
}