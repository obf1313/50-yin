/**
 * @descriptor 用户
 * @author obf1313
 */
import { Context } from 'koa'
// TODO: 为什么别名引入不行
import { User } from './../entity/user'
import { NotFoundException } from './../exceptions'
import { formatTime } from './../utils/date'

export default class UserController {
  public static async getUserDetail(ctx: Context) {
    const user = await User.findOneBy({
      id: ctx.state.user.id,
    })
    if (user) {
      ctx.status = 200
      ctx.body = {
        ...user,
        lastLoginTime: formatTime(user.lastLoginTime),
      }
    } else {
      throw new NotFoundException()
    }
  }
}
