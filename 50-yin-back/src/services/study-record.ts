/**
 * @descriptor 学习进度
 * @author obf1313
 */
import { Letter } from '@/entity/letter'
import { StudyRecord } from '@/entity/study-record'
import { User } from '@/entity/user'
import { NotFoundException } from '@/exceptions'
import { Context, IUpdateStudyRO } from '@/interfaces'

export default class StudyRecordService {
  /** 更新学习进度 */
  public static async updateStudyRecord(ctx: Context<IUpdateStudyRO, boolean>) {
    const { letterId } = ctx.request.body
    const { id } = ctx.state.user
    const user = await User.findOneBy({ id })
    if (user) {
      const record = await StudyRecord.findOne({
        where: {
          user: {
            id: user.id,
          },
        },
      })
      const letter = await Letter.findOneBy({
        id: letterId,
      })
      if (letter) {
        // 如果没有记录则生成一条新的学习记录
        if (!record) {
          const newRecord = new StudyRecord()
          newRecord.user = user
          newRecord.letter = letter
          await StudyRecord.save(newRecord)
          ctx.status = 200
          ctx.body = true
          return
        }
        if (record) {
          record.letter = letter
          await StudyRecord.save(record)
          ctx.status = 200
          ctx.body = true
        } else {
          throw new NotFoundException()
        }
      } else {
        throw new NotFoundException()
      }
    }
  }
}
