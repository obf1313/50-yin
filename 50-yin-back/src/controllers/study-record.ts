/**
 * @descriptor 学习进度
 * @author obf1313
 */
import { StudyRecord } from '@/entity/study-record'
import { User } from '@/entity/user'
import { NotFoundException } from '@/exceptions'
import { Context } from '@/interfaces'

interface IUpdateStudyRecordRequest {
  letterId: string
}

export default class StudyRecordController {
  /** 更新学习进度 */
  public static async updateStudyRecord(ctx: Context<IUpdateStudyRecordRequest, StudyRecord>) {
    const { letterId } = ctx.request.body
    const { id } = ctx.state.user
    const user = await User.findOneBy({ id })
    if (user) {
      const record = await StudyRecord.findOne({
        where: {
          // TODO: 不太会写这个逻辑
          // @ts-ignore
          userId: id,
        },
      })
      if (record) {
        // TODO: 不太会写这个逻辑
        // @ts-ignore
        record.letter = letterId
        await StudyRecord.save(record)
        ctx.status = 200
        ctx.body = record
      } else {
        throw new NotFoundException()
      }
    }
  }
}
