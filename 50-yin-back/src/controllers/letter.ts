/**
 * @descriptor 五十音列表
 * @author obf1313
 */
import { Letter } from '@/entity/letter'
import { NotFoundException } from '@/exceptions'
import { Context } from '@/interfaces'
import LetterService from '@/services/LetterServices'

export default class LetterController {
  /** 初始化 50 音数据 */
  public static async init(ctx: Context<undefined, boolean>) {
    await LetterService.initRow()
    await LetterService.initCol()
    await LetterService.initLetter()
    ctx.status = 201
    ctx.body = true
  }

  /** 获取五十音列表 */
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
