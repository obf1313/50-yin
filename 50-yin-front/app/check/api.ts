import api from '@/fetch'
import { IUpdateRequest } from './interface'

/** 更新抽查详情 */
export const updateCheckRecordDetail = async (params: IUpdateRequest) => {
  return api.post<IUpdateRequest, null>('/check-record-detail/update', params)
}

/** 更新抽查记录 */
export const updateCheckRecord = async (params: { id?: string }) => {
  return api.post<{ id?: string }, null>('/check-record/update', params)
}
