/**
 * @descriptor 五十音
 * @author obf1313
 */
import { Col } from '@/entity/col'
import { Letter } from '@/entity/letter'
import { Row } from '@/entity/row'
import { NotFoundException } from '@/exceptions'
import { Context } from '@/interfaces'

export default class LetterService {
  // 初始化所有行
  public static async initRow() {
    const rowList = [
      ['あ', 'ア', 'a'],
      ['か', 'カ', 'ka'],
      ['さ', 'サ', 'sa'],
      ['た', 'タ', 'ta'],
      ['な', 'ナ', 'na'],
      ['は', 'ハ', 'ha'],
      ['ま', 'マ', 'ma'],
      ['や', 'ヤ', 'ya'],
      ['ら', 'ラ', 'ra'],
      ['わ', 'ワ', 'wa'],
    ]
    for (let i = 0; i < rowList.length; i++) {
      const row = new Row()
      row.hiragana = rowList[i][0]
      row.katakana = rowList[i][1]
      row.rome = rowList[i][2]
      await Row.save(row)
    }
  }
  // 初始化所有列
  public static async initCol() {
    const colList = [
      ['あ', 'ア', 'a'],
      ['い', 'イ', 'i'],
      ['う', 'ウ', 'u'],
      ['え', 'ェ', 'e'],
      ['お', 'ォ', 'o'],
    ]
    for (let i = 0; i < colList.length; i++) {
      const col = new Col()
      col.hiragana = colList[i][0]
      col.katakana = colList[i][1]
      col.rome = colList[i][2]
      await Col.save(col)
    }
  }
  // 初始化所有五十音
  public static async initLetter() {
    const letterList = [
      ['あ', 'ア', 'a', 'あ', 'あ'],
      ['い', 'イ', 'i', 'あ', 'い'],
      ['う', 'ウ', 'u', 'あ', 'う'],
      ['え', 'ェ', 'e', 'あ', 'え'],
      ['お', 'ォ', 'o', 'あ', 'お'],
      ['か', 'カ', 'ka', 'か', 'あ'],
      ['き', 'キ', 'ki', 'か', 'い'],
      ['く', 'ケ', 'ku', 'か', 'う'],
      ['け', 'ケ', 'ke', 'か', 'え'],
      ['こ', 'コ', 'ko', 'か', 'お'],
      ['さ', 'サ', 'sa', 'さ', 'あ'],
      ['し', 'シ', 'xi', 'さ', 'い'],
      ['す', 'ス', 'su', 'さ', 'う'],
      ['せ', 'セ', 'se', 'さ', 'え'],
      ['そ', 'ソ', 'so', 'さ', 'お'],
      ['た', 'タ', 'ta', 'た', 'あ'],
      ['ち', 'チ', 'chi', 'た', 'い'],
      ['つ', 'ツ', 'tsu', 'た', 'う'],
      ['て', 'テ', 'te', 'た', 'え'],
      ['と', 'ト', 'to', 'た', 'お'],
      ['な', 'ナ', 'na', 'な', 'あ'],
      ['に', 'ニ', 'ni', 'な', 'い'],
      ['ぬ', 'ヌ', 'nu', 'な', 'う'],
      ['ね', 'ネ', 'ne', 'な', 'え'],
      ['の', 'ノ', 'no', 'な', 'お'],
      ['は', 'ハ', 'ha', 'は', 'あ'],
      ['ひ', 'ヒ', 'hi', 'は', 'い'],
      ['ふ', 'フ', 'fu', 'は', 'う'],
      ['へ', 'ヘ', 'he', 'は', 'え'],
      ['ほ', 'ホ', 'ho', 'は', 'お'],
      ['ま', 'マ', 'ma', 'ま', 'あ'],
      ['み', 'ミ', 'mi', 'ま', 'い'],
      ['む', 'ム', 'mu', 'ま', 'う'],
      ['め', 'メ', 'me', 'ま', 'え'],
      ['も', 'モ', 'mo', 'ま', 'お'],
      ['や', 'ヤ', 'ya', 'や', 'あ'],
      ['い', 'イ', 'i', 'や', 'い'],
      ['ゆ', 'ユ', 'yu', 'や', 'う'],
      ['え', 'ェ', 'e', 'や', 'え'],
      ['よ', 'ョ', 'yo', 'や', 'お'],
      ['ら', 'ラ', 'ra', 'ら', 'あ'],
      ['り', 'リ', 'ri', 'ら', 'い'],
      ['る', 'ル', 'ru', 'ら', 'う'],
      ['れ', 'レ', 're', 'ら', 'え'],
      ['ろ', 'ロ', 'ro', 'ら', 'お'],
      ['わ', 'ワ', 'wa', 'わ', 'あ'],
      ['い', 'イ', 'i', 'わ', 'い'],
      ['う', 'ウ', 'u', 'わ', 'う'],
      ['え', 'ェ', 'e', 'わ', 'え'],
      ['を', 'ヲ', 'wo', 'わ', 'お'],
    ]
    for (let i = 0; i < letterList.length; i++) {
      const letter = new Letter()
      letter.hiragana = letterList[i][0]
      letter.katakana = letterList[i][1]
      letter.rome = letterList[i][2]
      const row = await Row.findOne({
        where: {
          hiragana: letterList[i][3],
        },
      })
      const col = await Col.findOne({
        where: {
          hiragana: letterList[i][4],
        },
      })
      letter.col = col!
      letter.row = row!
      await Letter.save(letter)
    }
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
