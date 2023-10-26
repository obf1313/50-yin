/**
 * @descriptor 抽查记录详情
 * @author obf1313
 */
import { Context, IUpdateCheckRecordDetailRO, IUpdateCheckRecordDetailVO } from '@/interfaces'
import CheckRecordDetailService from '@/services/check-record-detail'

export default class CheckRecordDetailController {
  /** 更新抽查记录详情 */
  public static async updateCheckRecordDetail(ctx: Context<IUpdateCheckRecordDetailRO, IUpdateCheckRecordDetailVO>) {
    CheckRecordDetailService.updateCheckRecordDetail(ctx)
  }
}
