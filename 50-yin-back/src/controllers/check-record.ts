/**
 * @descriptor 抽查记录
 * @author obf1313
 */
import { CheckRecord } from '@/entity/check-record'
import { ForbiddenException, NotFoundException } from '@/exceptions'
import DateUtils from '@/utils/date'
import { Context, IIdRequest, IPageRequest } from '@/interfaces'
import { User } from '@/entity/user'
import { StudyRecord } from '@/entity/study-record'
import { CheckRecordDetail } from '@/entity/check-record-detail'
import { Letter } from '@/entity/letter'

interface ICheckRecordListResponse {
  list: Array<CheckRecord | { startTime: string }>
  total: number
}

interface ICheckRecordResponse {
  id: string
  startTime: string
  checkRecordDetailList: Array<{
    id: string
    letterDetail: Letter
  }>
}

interface ICheckRecordResultRequest extends IIdRequest {
  /** 是否获取详情列表数据 */
  isGetList: boolean
}

export default class CheckRecordController {
  /** 获取抽查记录列表 */
  public static async getCheckRecordList(ctx: Context<IPageRequest, ICheckRecordListResponse>) {
    const { pageNum, pageSize } = ctx.request.body
    // 查询分页数据
    const [list, total] = await CheckRecord.createQueryBuilder('check_record')
      .where('userId = :userId', { userId: ctx.state.user.id })
      .skip((pageNum - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount()
    if (list) {
      const returnList = list.map(item => ({
        ...item,
        startTime: DateUtils.formatTime(item.startTime),
      }))
      ctx.status = 200
      ctx.body = {
        list: returnList,
        total,
      }
    } else {
      throw new NotFoundException()
    }
  }
  /** 创建抽查记录 */
  public static async createCheckRecord(ctx: Context<undefined, ICheckRecordResponse>) {
    const { id } = ctx.state.user
    const user = await User.findOneBy({ id })
    if (user) {
      const newCheckRecord = new CheckRecord()
      newCheckRecord.user = user
      newCheckRecord.endTime = newCheckRecord.startTime
      const checkRecord = await CheckRecord.save(newCheckRecord)
      const studyRecord = await StudyRecord.findOne({
        where: {
          user: {
            id: user.id,
          },
        },
        relations: ['letter'],
      })
      if (studyRecord) {
        const letterId = Number(studyRecord.letter.id)
        // TODO: 需要优化为根据以往的正确率出现不同频次的该音节
        const checkRecordDetailList = []
        for (let i = 1; i < letterId + 1; i++) {
          const checkRecordDetail = new CheckRecordDetail()
          checkRecordDetail.checkRecord = checkRecord
          // 查找对应的 letter 详情
          const letter = await Letter.findOneBy({ id: i.toString() })
          if (letter) {
            checkRecordDetail.letterId = letter?.id
            // TODO: 可优化为 saveAll 吧，这感觉有点慢
            const newDetail = await CheckRecordDetail.save(checkRecordDetail)
            checkRecordDetailList.push({
              id: newDetail.id,
              letterDetail: letter,
            })
          }
        }
        ctx.status = 201
        ctx.body = {
          id: checkRecord.id,
          startTime: DateUtils.formatTime(checkRecord.startTime),
          checkRecordDetailList,
        }
      } else {
        throw new NotFoundException('无学习进度，请先创建学习进度')
      }
    } else {
      throw new ForbiddenException()
    }
  }
  /** 更新抽查记录时间、正确率 */
  public static async updateCheckRecord(ctx: Context<IIdRequest, boolean>) {
    const { id } = ctx.request.body
    const checkRecord = await CheckRecord.findOneBy({ id })
    if (checkRecord) {
      checkRecord.accuracy = 0
      // 计算正确率
      if (
        checkRecord.checkRecordDetail &&
        Array.isArray(checkRecord.checkRecordDetail) &&
        checkRecord.checkRecordDetail.length > 0
      ) {
        const rightNum = checkRecord.checkRecordDetail.filter(item => item.isRight).length
        checkRecord.accuracy = (rightNum / checkRecord.checkRecordDetail.length) * 100
      }
      checkRecord.endTime = new Date()
      CheckRecord.save(checkRecord)
      ctx.status = 200
      ctx.body = true
    } else {
      throw new NotFoundException()
    }
  }
  /** 获取抽查记录 */
  public static async getCheckRecord(ctx: Context<IIdRequest, CheckRecord>) {
    const { id } = ctx.request.body
    const checkRecord = await CheckRecord.findOneBy({
      id,
    })
    if (checkRecord) {
      ctx.status = 200
      ctx.body = checkRecord
    }
  }
  /** 获取抽查结果 */
  public static async getCheckRecordResult(ctx: Context<ICheckRecordResultRequest, CheckRecord>) {
    const { id, isGetList } = ctx.request.body
    const checkRecord = await CheckRecord.findOneBy({
      id,
    })
    if (checkRecord) {
      ctx.status = 200
      if (isGetList) {
        ctx.body = checkRecord
      } else {
        const { checkRecordDetail, ...rest } = checkRecord
        // @ts-ignore
        ctx.body = rest
      }
    }
  }
}
