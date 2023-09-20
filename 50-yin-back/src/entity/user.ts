/**
 * @descriptor 五十音 - 用户
 * @author obf1313
 */
import { Entity, Column, BaseEntity, CreateDateColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CheckRecord } from '@/entity/check-record'
import { StudyRecord } from '@/entity/study-record'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
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
