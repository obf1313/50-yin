/**
 * @descriptor 用户
 * @author obf1313
 */
import { User } from '@/entity/user'
import { NotFoundException } from '@/exceptions'
import DateUtils from '@/utils/date'
import { Context } from '@/interfaces'
import { IUserVO } from '@/interfaces/user'

export default class UserService {
  /** 获取用户详情 */
  public static async getUserDetail(ctx: Context<null, IUserVO>) {
    const { id } = ctx.state.user
    const user = await User.findOneBy({
      id,
    })
    if (user) {
      ctx.status = 200
      ctx.body = {
        ...user,
        lastLoginTime: DateUtils.formatTime(user.lastLoginTime),
      }
    } else {
      throw new NotFoundException()
    }
  }
}
