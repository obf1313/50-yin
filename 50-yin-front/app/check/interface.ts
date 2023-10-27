export interface ILetter {
  id: number
  /** 平假名 */
  hiragana: string
  /** 片假名 */
  katakana: string
  /** 罗马音 */
  rome: string
}

export interface ICheckRecord {
  id: string
  startTime: string
  checkRecordDetailList: Array<{
    id: string
    times: number
    current: number
    letterDetail: ILetter
  }>
}

export interface IUpdateRequest {
  id: string
  isRight: boolean
  current: number
}
