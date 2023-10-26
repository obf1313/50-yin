/**
 * @descriptor 权限控制
 * @author obf1313
 */
import { Context, ILoginRO, ILoginVO } from '@/interfaces'
import AuthService from '@/services/auth'

export default class AuthController {
  /** 登录\注册 */
  public static async login(ctx: Context<ILoginRO, ILoginVO>) {
    AuthService.login(ctx)
  }
}
