import { Entity, Column, BaseEntity, CreateDateColumn, PrimaryColumn, Generated, OneToMany, OneToOne } from 'typeorm'
import { CheckRecord } from './check-record'
import { StudyRecord } from './study-record'

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  @Generated('uuid')
  id: string

  @Column({
    length: 8,
    unique: true,
  })
  userName: string

  @Column({
    length: 120,
    select: false,
  })
  password: string

  @CreateDateColumn()
  createTime: Date

  @Column()
  lastLoginTime: Date

  @OneToMany(() => CheckRecord, checkRecord => checkRecord.user)
  checkRecord: CheckRecord[]

  @OneToOne(() => StudyRecord, studyRecord => studyRecord.user)
  studyRecord: StudyRecord
}
