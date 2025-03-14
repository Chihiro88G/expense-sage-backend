import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Budget {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({
    type: 'integer',
    nullable: false,
  })
    year_month: number;

  @Column({
    type: 'integer',
    nullable: false,
  })
    user_id: number;

  @Column({
    type: 'integer',
    nullable: false,
  })
    category_id: number;

  @Column({
    type: 'numeric',
    nullable: false,
  })
    amount: number;

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

}