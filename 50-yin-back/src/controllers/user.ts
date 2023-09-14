/**
 * @descriptor 用户
 * @author obf1313
 */
import { Context } from 'koa'
import { User } from './../entity/user'

export default class UserController {
  public static async showUserDetail(ctx: Context) {
    const user = await User.findOneBy({
      id: ctx.params.id,
    })
    if (user) {
      ctx.status = 200
      ctx.body = user
    } else {
      ctx.status = 404
    }
  }
}
