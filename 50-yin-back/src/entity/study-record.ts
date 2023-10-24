/**
 * @descriptor 用户学习阶段记录表
 * @author obf1313
 */
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from '@/entity/user'
import { Letter } from '@/entity/letter'

@Entity()
export class StudyRecord extends BaseEntity {
  @PrimaryColumn()
  @Generated('uuid')
  id: string

  /** 学习记录更新时间 */
  @UpdateDateColumn()
  studyUpdateTime: Date

  /** 用户 */
  @OneToOne(() => User, user => user.studyRecord)
  @JoinColumn()
  user: User

  /** 单词 */
  @ManyToOne(() => Letter, letter => letter.studyRecord)
  letter: Letter
}
