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

  @CreateDateColumn()
  startTime: Date

  @Column()
  endTime: Date

  @Column()
  accuracy: number

  @ManyToOne(() => User, user => user.checkRecord)
  user: User[]

  @OneToMany(() => CheckRecordDetail, checkRecordDetail => checkRecordDetail.checkRecord)
  checkRecordDetail: CheckRecordDetail[]
}
