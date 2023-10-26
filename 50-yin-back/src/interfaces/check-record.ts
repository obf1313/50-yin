import { CheckRecord } from '@/entity/check-record'
import { Letter } from '@/entity/letter'
import { IIdRO } from '.'

export interface ICheckRecordDetail {
  id: string
  times: number
  letterDetail: Letter
}

export interface ICheckRecordWithDetailVO {
  id: string
  startTime: string
  checkRecordDetailList: Array<ICheckRecordDetail>
}

export interface ICheckRecordVO extends CheckRecord {}

export interface ICheckRecordResultRO extends IIdRO {
  /** 是否获取详情列表数据 */
  isGetList: 0 | 1
}
