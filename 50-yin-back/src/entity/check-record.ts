import { BaseEntity, Column, Entity, Generated, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { User } from './user'
import { CheckRecordDetail } from './check-record-detail'

@Entity()
export class CheckRecord extends BaseEntity {
  @PrimaryColumn()
  @Generated('uuid')
  id: string

  @Column()
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
