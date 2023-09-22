/**
 * @descriptor 五十音列表
 * @author obf1313
 */
import { ParameterizedContext } from 'koa'
import { Letter } from '@/entity/letter'
import { NotFoundException } from '@/exceptions'

export default class LetterController {
  public static async getLetterList(ctx: ParameterizedContext) {
    const list = await Letter.find()
    if (list) {
      ctx.status = 200
      ctx.body = {
        list,
      }
    } else {
      throw new NotFoundException()
    }
  }
}
