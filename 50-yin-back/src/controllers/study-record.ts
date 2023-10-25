/**
 * @descriptor 学习进度
 * @author obf1313
 */
import { Context } from '@/interfaces'
import StudyRecordService from '@/services/study-record'

interface IUpdateStudyRecordRequest {
  letterId: string
}

export default class StudyRecordController {
  /** 更新学习进度 */
  public static async updateStudyRecord(ctx: Context<IUpdateStudyRecordRequest, boolean>) {
    StudyRecordService.updateStudyRecord(ctx)
  }
}
