import { CheckRecordDetail } from '@/entity/check-record-detail'
import { IIdRO } from './request'

export interface IUpdateCheckRecordDetailRO extends IIdRO {
  isRight: number
  current: number
}

export interface IUpdateCheckRecordDetailVO extends CheckRecordDetail {}
