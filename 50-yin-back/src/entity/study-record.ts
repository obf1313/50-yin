/**
 * @descriptor 用户学习阶段记录表
 * @author obf1313
 */
import { BaseEntity, Column, Entity, Generated, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm'
import { User } from './user'
import { Letter } from './letter'

@Entity()
export class StudyRecord extends BaseEntity {
  @PrimaryColumn()
  @Generated('uuid')
  id: string

  @Column()
  studyUpdateTime: Date

  @OneToOne(() => User, user => user.studyRecord)
  @JoinColumn()
  user: User

  @ManyToOne(() => Letter, letter => letter.studyRecord)
  letter: Letter[]
}
