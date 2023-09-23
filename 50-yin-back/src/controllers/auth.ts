/**
 * @descriptor 权限控制
 * @author obf1313
 */
import * as argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import { JSW_SECRET } from '@/constants'
import { User } from '@/entity/user'
import { BusinessException } from '@/exceptions'
import SecretUtils from '@/utils/secret'
import { Context } from '@/interfaces'

interface ILoginRequest {
  userName: string
  password: string
}

interface ILoginResponse {
  id: string
  token: string
}

export default class AuthController {
  /** 登录\注册 */
  public static async login(ctx: Context<ILoginRequest, ILoginResponse>) {
    const { userName, password } = ctx.request.body
    const user = await User.findOne({
      where: {
        userName,
      },
      select: {
        id: true,
        password: true,
      },
    })
    try {
      const deSecretPassword = SecretUtils.deSecret(password)
      // 用户不存在，直接注册
      if (!user) {
        const newUser = new User()
        newUser.userName = userName
        newUser.password = await argon2.hash(deSecretPassword)
        newUser.lastLoginTime = new Date()
        const user = await User.save(newUser)
        ctx.status = 201
        ctx.body = {
          token: jwt.sign({ id: user.id }, JSW_SECRET),
          id: user.id,
        }
      } else if (await argon2.verify(user.password, deSecretPassword)) {
        ctx.status = 200
        ctx.body = {
          id: user.id,
          token: jwt.sign({ id: user.id }, JSW_SECRET),
        }
      } else {
        throw new BusinessException('密码错误')
      }
    } catch (e) {
      throw new BusinessException('未知错误')
    }
  }
}
