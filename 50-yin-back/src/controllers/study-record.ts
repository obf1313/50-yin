/**
 * @descriptor 学习进度
 * @author obf1313
 */
import { Context } from 'koa'
import { StudyRecord } from './../entity/study-record'
import { NotFoundException } from './../exceptions'

export default class StudyRecordController {
  public static async updateStudyRecord(ctx: Context) {
    const { userId, letterId } = ctx.request.body
    const record = await StudyRecord.findOne({
      where: {
        user: userId,
      },
    })
    if (record) {
      record.letter = letterId
      await StudyRecord.save(record)
      ctx.status = 200
      ctx.body = record
    } else {
      throw new NotFoundException()
    }
  }
}
