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

  /** 用户名 */
  @Column({
    length: 8,
    unique: true,
  })
  userName: string

  /** 密码 */
  @Column({
    length: 120,
    select: false,
  })
  password: string

  /** 创建时间 */
  @CreateDateColumn()
  createTime: Date

  /** 上次登录时间 */
  @Column()
  lastLoginTime: Date

  /** 抽查记录 */
  @OneToMany(() => CheckRecord, checkRecord => checkRecord.user)
  checkRecord: CheckRecord[]

  /** 学习记录 */
  @OneToOne(() => StudyRecord, studyRecord => studyRecord.user)
  studyRecord: StudyRecord
}
