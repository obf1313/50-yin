/**
 * @descriptor 学习进度
 * @author obf1313
 */
import { Context, IUpdateStudyRO } from '@/interfaces'
import StudyRecordService from '@/services/study-record'

export default class StudyRecordController {
  /** 更新学习进度 */
  public static async updateStudyRecord(ctx: Context<IUpdateStudyRO, boolean>) {
    StudyRecordService.updateStudyRecord(ctx)
  }
}
