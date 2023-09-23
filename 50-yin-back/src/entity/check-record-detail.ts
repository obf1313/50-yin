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

  @Column()
  isRight: boolean

  @ManyToOne(() => CheckRecord, checkRecord => checkRecord.checkRecordDetail)
  checkRecord: CheckRecord

  @Column({
    length: 36,
    foreignKeyConstraintName: 'letterId',
  })
  letterId: string
}
