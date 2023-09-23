/**
 * @descriptor 五十音列表
 * @author obf1313
 */
import { Letter } from '@/entity/letter'
import { NotFoundException } from '@/exceptions'
import { Context } from '@/interfaces'

export default class LetterController {
  public static async getLetterList(ctx: Context<undefined, Array<Letter>>) {
    const list = await Letter.find()
    if (list) {
      ctx.status = 200
      ctx.body = list
    } else {
      throw new NotFoundException()
    }
  }
}
