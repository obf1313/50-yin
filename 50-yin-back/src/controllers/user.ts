/**
 * @descriptor 用户
 * @author obf1313
 */
import { Context } from '@/interfaces'
import { IUserVO } from '@/interfaces/user'
import UserService from '@/services/user'

export default class UserController {
  /** 获取用户详情 */
  public static async getUserDetail(ctx: Context<null, IUserVO>) {
    UserService.getUserDetail(ctx)
  }
}
