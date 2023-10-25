/**
 * @descriptor 抽查记录详情
 * @author obf1313
 */
import { CheckRecordDetail } from '@/entity/check-record-detail'
import { Context, IIdRequest } from '@/interfaces'
import CheckRecordDetailService from '@/services/check-record-detail'

interface IUpdateCheckRecordDetailRequest extends IIdRequest {
  isRight: number
  current: number
}

export default class CheckRecordDetailController {
  /** 更新抽查记录详情 */
  public static async updateCheckRecordDetail(ctx: Context<IUpdateCheckRecordDetailRequest, CheckRecordDetail>) {
    CheckRecordDetailService.updateCheckRecordDetail(ctx)
  }
}
