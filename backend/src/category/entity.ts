import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    type: 'varchar',  
    length: 50,
    nullable: false,
  })
  name!: string

  @Column({
    type: 'integer',
    nullable: false,
  })
  category_type!: number

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  created_at!: Date

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  modified_at!: Date
}