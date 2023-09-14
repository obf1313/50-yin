/**
 * @descriptor 权限控制
 * @author obf1313
 */
import { Context } from 'koa'
import * as argon2 from 'argon2'
import { User } from './../entity/user'

export default class AuthController {
  // 登录
  public static async login(ctx: Context) {
    ctx.body = 'Login Controller'
  }
  // 注册
  public static async register(ctx: Context) {
    const newUser = new User()
    newUser.userName = 'obf1313'
    newUser.password = await argon2.hash('1313')
    newUser.createTime = new Date()
    newUser.lastLoginTime = new Date()
    const user = await User.save(newUser)
    ctx.status = 201
    ctx.body = user
  }
}
