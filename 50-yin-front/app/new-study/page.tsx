/**
 * @descriptor 询问是否有新的学习进程
 * @author obf1313
 */
'use client'
import { useRouter } from 'next/navigation'
import _ from 'lodash'
import { PageRoot } from '@/components'
import api from '@/fetch'

interface ILetter {
  // TODO: 待补充
  id: string
  hiragana: string
  katakana: string
  rome: string
}

interface ICheckRecordDetail {
  id: string
  times: number
  letterDetail: ILetter
}

interface ICheckRecordResponse {
  id: string
  startTime: string
  checkRecordDetailList: Array<ICheckRecordDetail>
}

const NewStudy = () => {
  const router = useRouter()
  // 更新学习记录
  const toUpdate = () => {
    router.push('/update-study-progress')
  }
  // 开始抽查
  const start = () => {
    api.post<null, ICheckRecordResponse>('/check-record/create').then((data: ICheckRecordResponse) => {
      const newList: Array<ICheckRecordDetail & { current: number }> = []
      data.checkRecordDetailList.forEach((item: ICheckRecordDetail) => {
        for (let i = 0; i < item.times; i++) {
          newList.push({
            ...item,
            current: i + 1,
          })
        }
      })
      data.checkRecordDetailList = _.shuffle(newList)
      // 先存在 sessionStorage 中
      const checkRecord = JSON.stringify(data)
      sessionStorage.setItem('checkRecord', checkRecord)
      router.push('/check')
    })
  }
  return (
    <PageRoot className="min-h-screen w-screen flex flex-col items-center" headerProps>
      <h1 className="mt-40 text-center font-bold text-2xl">是否有新的学习进程</h1>
      <div className="flex justify-center mt-20">
        <button onClick={toUpdate} className="w-40 py-2 text-button border-2 border-button rounded-sm">
          是
        </button>
        <button onClick={start} className="w-40 py-2 ml-4 bg-button text-white rounded-sm">
          否
        </button>
      </div>
    </PageRoot>
  )
}
export default NewStudy
