export interface ILetter {
  id: number
  /** 平假名 */
  hiragana: string
  /** 片假名 */
  katakana: string
  /** 罗马音 */
  rome: string
}

export interface ICheckRecordDetail {
  id: string
  times: number
  letterDetail: ILetter
}

export interface ICheckRecordResponse {
  id: string
  startTime: string
  checkRecordDetailList: Array<ICheckRecordDetail>
}
