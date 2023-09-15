/**
 * @descriptor 权限控制
 * @author obf1313
 */
import { Context } from 'koa'
import * as argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import { JSW_SECRET } from '../constants'
import { User } from './../entity/user'
import { UnauthorizedException } from './../exceptions'

export default class AuthController {
  // 登录
  public static async login(ctx: Context) {
    const user = await User.findOne({
      where: {
        // @ts-ignore
        userName: ctx.request.body.userName,
      },
      select: {
        password: true,
      },
    })
    if (!user) {
      throw new UnauthorizedException('用户名不存在')
      // @ts-ignore
    } else if (await argon2.verify(user.password, ctx.request.body.password)) {
      ctx.status = 200
      ctx.body = {
        token: jwt.sign({ id: user.id }, JSW_SECRET),
      }
    } else {
      throw new UnauthorizedException('密码错误')
    }
  }
  // 注册
  public static async register(ctx: Context) {
    const newUser = new User()
    // @ts-ignore
    newUser.userName = ctx.request.body.userName
    // @ts-ignore
    newUser.password = await argon2.hash(ctx.request.body.password)
    newUser.lastLoginTime = new Date()
    const user = await User.save(newUser)
    ctx.status = 201
    ctx.body = user
  }
}
