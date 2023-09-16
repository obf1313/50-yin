/**
 * @descriptor 用户
 * @author obf1313
 */
import { Context } from 'koa'
import { User } from './../entity/user'
import { NotFoundException } from './../exceptions'

export default class UserController {
  public static async getUserDetail(ctx: Context) {
    const userId = ctx.params.id
    // TODO: 不太懂此处的 userId 为什么不对
    // 当前 user？ ctx.state.user
    // if (userId !== ctx.state.user.iat) {
    //   throw new ForbiddenException()
    // }
    const user = await User.findOneBy({
      id: ctx.params.id,
    })
    // TODO: 需要找一些日期格式化 middleware
    if (user) {
      ctx.status = 200
      ctx.body = user
    } else {
      throw new NotFoundException()
    }
  }
}
