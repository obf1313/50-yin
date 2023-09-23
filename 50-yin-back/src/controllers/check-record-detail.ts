/**
 * @descriptor 抽查记录详情
 * @author obf1313
 */
import { CheckRecordDetail } from '@/entity/check-record-detail'
import { NotFoundException } from '@/exceptions'
import { Context, IIdRequest } from '@/interfaces'

interface IUpdateCheckRecordDetailRequest extends IIdRequest {
  isRight: boolean
}

export default class CheckRecordDetailController {
  public static async updateCheckRecordDetail(ctx: Context<IUpdateCheckRecordDetailRequest, CheckRecordDetail>) {
    const { id, isRight } = ctx.request.body
    const detail = await CheckRecordDetail.findOneBy({ id })
    if (detail) {
      detail.isRight = isRight
      await CheckRecordDetail.save(detail)
      ctx.status = 200
      ctx.body = detail
    } else {
      throw new NotFoundException()
    }
  }
}
