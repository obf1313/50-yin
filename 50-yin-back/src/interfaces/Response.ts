export interface IIdVO {
  id: string
}

export interface IPageVO<T> {
  list: Array<T>
  total: number
}
