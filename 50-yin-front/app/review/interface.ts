export interface IRecordDetail {
  id: string
  isRight: boolean
  letterId: string
}

export interface IRecord {
  checkRecordDetail: Array<IRecordDetail>
}
