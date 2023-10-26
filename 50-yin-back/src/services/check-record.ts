/**
 * @descriptor 抽查记录
 * @author obf1313
 */
import { CheckRecord } from '@/entity/check-record'
import { ForbiddenException, NotFoundException } from '@/exceptions'
import DateUtils from '@/utils/date'
import {
  Context,
  ICheckRecordDetail,
  ICheckRecordWithDetailVO,
  ICheckRecordResultRO,
  IIdRO,
  IPageRO,
  IPageVO,
  ICheckRecordVO,
} from '@/interfaces'
import { User } from '@/entity/user'
import { StudyRecord } from '@/entity/study-record'
import { CheckRecordDetail } from '@/entity/check-record-detail'
import { Letter } from '@/entity/letter'

export default class CheckRecordService {
  /** 获取抽查记录列表 */
  public static async getCheckRecordList(ctx: Context<IPageRO, IPageVO<CheckRecord | { startTime: string }>>) {
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
  public static async createCheckRecord(ctx: Context<null, ICheckRecordWithDetailVO>) {
    const { id } = ctx.state.user
    const user = await User.findOneBy({ id })
    if (user) {
      const newCheckRecord = new CheckRecord()
      newCheckRecord.user = user
      newCheckRecord.endTime = newCheckRecord.startTime
      // 查询最新一次该用户的 checkRecord
      const lastCheckRecord = await CheckRecord.findOne({
        where: {
          user: {
            id: user.id,
          },
        },
      })
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
        // 查询最新一次记录对应的所有 detail
        let recordDetailList: Array<CheckRecordDetail> = []
        if (lastCheckRecord) {
          recordDetailList = await CheckRecordDetail.find({
            where: {
              checkRecord: {
                id: lastCheckRecord.id,
              },
            },
          })
        }
        // 规则
        // 0-20: 4 次
        // 20-50: 3 次
        // 50-80: 2 次
        // 80-100: 1 次
        const getTimes = (letterId: string) => {
          const accuracy = recordDetailList.find(item => item.letterId === letterId)?.totalAccuracy || 0
          if (accuracy < 20) {
            return 4
          }
          if (accuracy < 50) {
            return 3
          }
          if (accuracy < 80) {
            return 2
          }
          return 1
        }
        const checkRecordDetailList: Array<ICheckRecordDetail> = []
        const detailList: Array<CheckRecordDetail> = []
        for (let i = 1; i < letterId + 1; i++) {
          const checkRecordDetail = new CheckRecordDetail()
          checkRecordDetail.checkRecord = checkRecord
          // 查找对应的 letter 详情
          const letter = await Letter.findOneBy({ id: i.toString() })
          if (letter) {
            checkRecordDetail.letterId = letter?.id
            detailList.push(checkRecordDetail)
            checkRecordDetailList.push({
              id: checkRecordDetail.id,
              times: getTimes(letter.id),
              letterDetail: letter,
            })
          }
        }
        // TODO: 测试
        // save 也可以批量插入
        await CheckRecordDetail.save(detailList)
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
  /** 更新抽查记录时间 */
  public static async updateCheckRecord(ctx: Context<IIdRO, boolean>) {
    const { id } = ctx.request.body
    const checkRecord = await CheckRecord.findOne({
      where: {
        id,
      },
      relations: ['checkRecordDetail'],
    })
    if (checkRecord) {
      checkRecord.endTime = new Date()
      CheckRecord.save(checkRecord)
      ctx.status = 200
      ctx.body = true
    } else {
      throw new NotFoundException()
    }
  }
  /** 获取抽查记录 */
  public static async getCheckRecord(ctx: Context<IIdRO, ICheckRecordVO>) {
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
  public static async getCheckRecordResult(ctx: Context<ICheckRecordResultRO, ICheckRecordVO>) {
    const { id, isGetList } = ctx.query
    const checkRecord = await CheckRecord.findOne({
      where: {
        id,
      },
      relations: isGetList ? ['checkRecordDetail'] : [],
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
