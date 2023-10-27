import api from '@/fetch'
import { ICheckRecordResponse } from './interface'

/** 创建抽查记录 */
export const createCheckRecord = async () => {
  return api.post<null, ICheckRecordResponse>('/check-record/create')
}
