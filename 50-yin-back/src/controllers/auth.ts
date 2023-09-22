/**
 * @descriptor 权限控制
 * @author obf1313
 */
import { ParameterizedContext } from 'koa'
import * as argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import { JSW_SECRET } from '@/constants'
import { User } from '@/entity/user'
import { BusinessException } from '@/exceptions'
import SecretUtils from '@/utils/secret'
import { IState } from '@/interfaces'

interface ILoginRequest {
  request: {
    body: {
      userName: string
      password: string
    }
  }
}

interface ILoginResponse {
  id: string
  token: string
}

export default class AuthController {
  // 登录\注册
  // TODO: body 定义怎么写
  public static async login(ctx: ParameterizedContext<IState, ILoginRequest, ILoginResponse>) {
    const user = await User.findOne({
      where: {
        userName: ctx.request.body.userName,
      },
      select: {
        id: true,
        password: true,
      },
    })
    try {
      const password = SecretUtils.deSecret(ctx.request.body.password)
      // 用户不存在，直接注册
      if (!user) {
        const newUser = new User()
        newUser.userName = ctx.request.body.userName
        newUser.password = await argon2.hash(password)
        newUser.lastLoginTime = new Date()
        const user = await User.save(newUser)
        ctx.status = 201
        ctx.body = {
          token: jwt.sign({ id: user.id }, JSW_SECRET),
          id: user.id,
        }
      } else if (await argon2.verify(user.password, password)) {
        ctx.status = 200
        ctx.body = {
          id: user.id,
          token: jwt.sign({ id: user.id }, JSW_SECRET),
        }
      } else {
        throw new BusinessException('密码错误')
      }
    } catch (e) {
      console.log('e', e)
    }
  }
}
