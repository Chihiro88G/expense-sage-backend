import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from '../user/entity';
import { Category } from '../category/entity';

@Entity('user_category')
export class UserCategory {
  @PrimaryGeneratedColumn()
    id: number;

  @ManyToOne(() => Users, user => user.id)
  @JoinColumn({ name: 'user_id' })
    user: Users;

  @ManyToOne(() => Category, category => category.id)
  @JoinColumn({ name: 'category_id' })
    category: Category;
}