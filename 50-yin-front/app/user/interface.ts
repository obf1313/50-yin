export interface IPageRequest {
  pageNum: number
  pageSize: number
}

export interface IUserInfo {
  id: string
  userName: string
  password: string
  createTime: string
  lastLoginTime: string
}

export interface IPageResponse<T> {
  list: Array<T>
  total: number
}

export interface ICheckRecord {
  id: string
  startTime: string
  checkRecordDetailList: Array<{
    id: string
    times: number
    current: number
  }>
}
