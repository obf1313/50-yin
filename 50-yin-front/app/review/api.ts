import { ICard } from '@/components'
import api from '@/fetch'
import { IRecord } from './interface'

/** 获取单词列表 */
export const getLetterList = async () => {
  return api.post<null, Array<ICard>>('/letter/list')
}

/** 获取抽查记录结果 */
export const getCheckRecordResult = async (params: { id: string; isGetList: number }) => {
  return api.get<{ id: string; isGetList: number }, IRecord>(`/check-record/result`, { params })
}
