import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userName: string

  @Column({ select: false })
  password: string

  @Column()
  createTime: Date

  @Column()
  lastLoginTime: Date
}
