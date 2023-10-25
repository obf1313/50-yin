/**
 * @descriptor 抽查记录
 * @author obf1313
 */
import { CheckRecord } from '@/entity/check-record'
import { Context, IIdRequest, IPageRequest } from '@/interfaces'
import { Letter } from '@/entity/letter'
import CheckRecordService from '@/services/check-record'

interface ICheckRecordListResponse {
  list: Array<CheckRecord | { startTime: string }>
  total: number
}

interface ICheckRecordDetail {
  id: string
  times: number
  letterDetail: Letter
}

interface ICheckRecordResponse {
  id: string
  startTime: string
  checkRecordDetailList: Array<ICheckRecordDetail>
}

interface ICheckRecordResultRequest extends IIdRequest {
  /** 是否获取详情列表数据 */
  isGetList: 0 | 1
}

export default class CheckRecordController {
  /** 获取抽查记录列表 */
  public static async getCheckRecordList(ctx: Context<IPageRequest, ICheckRecordListResponse>) {
    CheckRecordService.getCheckRecordList(ctx)
  }
  /** 创建抽查记录 */
  public static async createCheckRecord(ctx: Context<undefined, ICheckRecordResponse>) {
    CheckRecordService.createCheckRecord(ctx)
  }
  /** 更新抽查记录时间 */
  public static async updateCheckRecord(ctx: Context<IIdRequest, boolean>) {
    CheckRecordService.updateCheckRecord(ctx)
  }
  /** 获取抽查记录 */
  public static async getCheckRecord(ctx: Context<IIdRequest, CheckRecord>) {
    CheckRecordService.getCheckRecord(ctx)
  }
  /** 获取抽查结果 */
  public static async getCheckRecordResult(ctx: Context<ICheckRecordResultRequest, CheckRecord>) {
    CheckRecordService.getCheckRecordResult(ctx)
  }
}
