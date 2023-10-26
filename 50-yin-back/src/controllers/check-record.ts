/**
 * @descriptor 抽查记录
 * @author obf1313
 */
import { CheckRecord } from '@/entity/check-record'
import {
  Context,
  ICheckRecordWithDetailVO,
  ICheckRecordResultRO,
  IIdRO,
  IPageRO,
  IPageVO,
  ICheckRecordVO,
} from '@/interfaces'
import CheckRecordService from '@/services/check-record'

export default class CheckRecordController {
  /** 获取抽查记录列表 */
  public static async getCheckRecordList(ctx: Context<IPageRO, IPageVO<CheckRecord | { startTime: string }>>) {
    CheckRecordService.getCheckRecordList(ctx)
  }
  /** 创建抽查记录 */
  public static async createCheckRecord(ctx: Context<null, ICheckRecordWithDetailVO>) {
    CheckRecordService.createCheckRecord(ctx)
  }
  /** 更新抽查记录时间 */
  public static async updateCheckRecord(ctx: Context<IIdRO, boolean>) {
    CheckRecordService.updateCheckRecord(ctx)
  }
  /** 获取抽查记录 */
  public static async getCheckRecord(ctx: Context<IIdRO, ICheckRecordVO>) {
    CheckRecordService.getCheckRecord(ctx)
  }
  /** 获取抽查结果 */
  public static async getCheckRecordResult(ctx: Context<ICheckRecordResultRO, ICheckRecordVO>) {
    CheckRecordService.getCheckRecordResult(ctx)
  }
}
