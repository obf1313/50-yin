import api from '@/fetch'
import { ICheckRecord } from './interface'

/** 查询结果 */
export const getCheckRecordResult = async (params: { id: string }) => {
  return api.get<{ id: string }, ICheckRecord>(`/check-record/result`, { params })
}
