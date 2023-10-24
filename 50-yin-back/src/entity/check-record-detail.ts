/**
 * @descriptor 每次抽查记录详情表
 * @author obf1313
 */
import { BaseEntity, Column, Entity, Generated, ManyToOne, PrimaryColumn } from 'typeorm'
import { CheckRecord } from '@/entity/check-record'

@Entity()
export class CheckRecordDetail extends BaseEntity {
  @PrimaryColumn()
  @Generated('uuid')
  id: string

  /** 本次正确率 */
  @Column({
    nullable: true,
  })
  currentAccuracy: number

  /** 总正确率 */
  @Column({
    default: 0,
  })
  totalAccuracy: number

  /** 关联的抽查记录 */
  @ManyToOne(() => CheckRecord, checkRecord => checkRecord.checkRecordDetail)
  checkRecord: CheckRecord

  /** 关联的单词 */
  @Column({
    length: 36,
    foreignKeyConstraintName: 'letterId',
  })
  letterId: string
}
