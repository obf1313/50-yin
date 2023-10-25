/**
 * @descriptor 权限控制
 * @author obf1313
 */
import { Context } from '@/interfaces'
import AuthService from '@/services/auth'

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
    AuthService.login(ctx)
  }
}
