/**
 * @descriptor 每次抽查记录表
 * @author obf1313
 */
import { BaseEntity, Column, CreateDateColumn, Entity, Generated, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { User } from '@/entity/user'
import { CheckRecordDetail } from '@/entity/check-record-detail'

@Entity()
export class CheckRecord extends BaseEntity {
  @PrimaryColumn()
  @Generated('uuid')
  id: string

  /** 开始时间 */
  @CreateDateColumn()
  startTime: Date

  /** 结束时间 */
  @Column({
    nullable: true,
  })
  endTime: Date

  /** 用户 */
  @ManyToOne(() => User, user => user.checkRecord)
  user: User

  /** 记录详情 */
  @OneToMany(() => CheckRecordDetail, checkRecordDetail => checkRecordDetail.checkRecord)
  checkRecordDetail: CheckRecordDetail[]
}
