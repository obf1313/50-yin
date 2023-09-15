/**
 * @descriptor 用户
 * @author obf1313
 */
import { Context } from 'koa'
import { User } from './../entity/user'
import { ForbiddenException, NotFoundException } from './../exceptions'

export default class UserController {
  public static async showUserDetail(ctx: Context) {
    // @ts-ignore
    const userId = +ctx.request.body?.id
    // 当前 user？ ctx.state.user
    if (userId !== +ctx.state.user.id) {
      throw new ForbiddenException()
    }
    const user = await User.findOneBy({
      id: ctx.params.id,
    })
    if (user) {
      ctx.status = 200
      ctx.body = user
    } else {
      throw new NotFoundException()
    }
  }
}
