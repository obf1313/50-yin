/**
 * @descriptor 用户
 * @author obf1313
 */
import { ParameterizedContext } from 'koa'
import { User } from '@/entity/user'
import { NotFoundException } from '@/exceptions'
import DateUtils from '@/utils/date'

export default class UserController {
  public static async getUserDetail(ctx: ParameterizedContext) {
    const user = await User.findOneBy({
      id: ctx.state.user.id,
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
