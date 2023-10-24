/**
 * @descriptor 抽查记录详情
 * @author obf1313
 */
import { CheckRecordDetail } from '@/entity/check-record-detail'
import { NotFoundException } from '@/exceptions'
import { Context, IIdRequest } from '@/interfaces'

interface IUpdateCheckRecordDetailRequest extends IIdRequest {
  isRight: number
  current: number
}

export default class CheckRecordDetailController {
  public static async updateCheckRecordDetail(ctx: Context<IUpdateCheckRecordDetailRequest, CheckRecordDetail>) {
    const { id, isRight, current } = ctx.request.body
    const detail = await CheckRecordDetail.findOneBy({ id })
    if (detail) {
      detail.currentAccuracy = Math.floor((isRight ? 100 : 0 + detail.totalAccuracy) / current)
      // TODO: 测试
      const detailList = await CheckRecordDetail.find({
        where: {
          letterId: detail.letterId,
        },
      })
      if (detailList.length > 0) {
        // (总正确率 + 本次正确率) / 2
        const totalAccuracy = (detail.currentAccuracy + detail.totalAccuracy) / 2
        detail.totalAccuracy = totalAccuracy
      } else {
        detail.totalAccuracy = 0
      }
      await CheckRecordDetail.save(detail)
      ctx.status = 200
      ctx.body = detail
    } else {
      throw new NotFoundException()
    }
  }
}
