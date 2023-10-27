import api from '@/fetch'
import { ICard } from '@/components'

/** 获取单词列表 */
export const getLetterList = async () => {
  return api.post<null, Array<ICard>>('/letter/list')
}

/** 更新抽查记录 */
export const updateCheckRecord = async (params: { letterId: number }) => {
  return api.post<{ letterId: number }, null>('/study-record/update', params)
}
