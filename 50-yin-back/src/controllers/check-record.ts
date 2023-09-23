/**
 * @descriptor 抽查记录
 * @author obf1313
 */
import { CheckRecord } from '@/entity/check-record'
import { ForbiddenException, NotFoundException } from '@/exceptions'
import DateUtils from '@/utils/date'
import { Context, IIdRequest, IIdResponse, IPageRequest } from '@/interfaces'
import { User } from '@/entity/user'

interface ICheckRecordList {
  list: Array<CheckRecord | { startTime: string }>
  total: number
}

export default class CheckRecordController {
  public static async getCheckRecordList(ctx: Context<IPageRequest, ICheckRecordList>) {
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
  public static async createCheckRecordList(ctx: Context<undefined, IIdResponse>) {
    const { id } = ctx.state.user
    if (id) {
      const newCheckRecord = new CheckRecord()
      // TODO: 不知道这里应该是怎么写
      // @ts-ignore
      newCheckRecord.user = id
      newCheckRecord.endTime = newCheckRecord.startTime
      const checkRecord = await CheckRecord.save(newCheckRecord)
      // TODO: 需要根据学习进度建立对应的 detail 数据
      ctx.status = 201
      ctx.body = {
        id: checkRecord.id,
      }
    } else {
      throw new ForbiddenException()
    }
  }
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
  public static async getCheckRecordResult(ctx: Context<IIdRequest, CheckRecord>) {
    const { id } = ctx.request.body
    const checkRecord = await CheckRecord.findOneBy({
      id,
    })
    // TODO: 需要查询本次测验所有的详情
    if (checkRecord) {
      ctx.status = 200
      ctx.body = checkRecord
    }
  }
}
