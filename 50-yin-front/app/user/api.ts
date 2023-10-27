import api from '@/fetch'
import { ICheckRecord, IPageRequest, IPageResponse, IUserInfo } from './interface'

/** 获取用户信息 */
export const getUserInfo = async () => {
  return api.get<null, IUserInfo>('/user')
}

/** 获取抽查记录 */
export const getRecordList = async (params: IPageRequest) => {
  return api.post<IPageRequest, IPageResponse<ICheckRecord>>('/check-record/list', params)
}
