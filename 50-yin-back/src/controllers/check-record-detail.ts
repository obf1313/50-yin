/**
 * @descriptor 抽查记录详情
 * @author obf1313
 */
import { Context } from 'koa'
import { CheckRecordDetail } from '@/entity/check-record-detail'
import { NotFoundException } from '@/exceptions'

export default class CheckRecordDetailController {
  public static async updateCheckRecordDetail(ctx: Context) {
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
