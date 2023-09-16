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
  // 登录\注册
  public static async login(ctx: Context) {
    const user = await User.findOne({
      where: {
        userName: ctx.request.body.userName,
      },
      select: {
        password: true,
      },
    })
    // 用户不存在，直接注册
    if (!user) {
      const newUser = new User()
      newUser.userName = ctx.request.body.userName
      // TODO: 现在密码是明文传输
      newUser.password = await argon2.hash(ctx.request.body.password)
      newUser.lastLoginTime = new Date()
      const user = await User.save(newUser)
      const { password, ...rest } = user
      ctx.status = 201
      ctx.body = {
        token: jwt.sign({ id: user.id }, JSW_SECRET),
        ...rest,
      }
    } else if (await argon2.verify(user.password, ctx.request.body.password)) {
      ctx.status = 200
      ctx.body = {
        token: jwt.sign({ id: user.id }, JSW_SECRET),
      }
    } else {
      throw new UnauthorizedException('密码错误')
    }
  }
}
