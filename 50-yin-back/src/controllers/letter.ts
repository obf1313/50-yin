/**
 * @descriptor 五十音列表
 * @author obf1313
 */
import { Context } from 'vm'
import { Letter } from '@/entity/letter'
import { NotFoundException } from '@/exceptions'

export default class LetterController {
  public static async getLetterList(ctx: Context) {
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
