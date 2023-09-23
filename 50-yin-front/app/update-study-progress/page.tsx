/**
 * @descriptor 更新学习进度
 * @author obf1313
 */
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, ICard, PageRoot } from '@/components'
import api from '@/fetch'

const UpdateStudyProgress = () => {
  const router = useRouter()
  const [letterList, setLetterList] = useState<Array<ICard>>([])
  const [selectId, setSelectId] = useState<number>(0)
  // 选择某一个元素
  const onSelect = (item: ICard) => {
    setSelectId(item.id)
  }
  // 获取五十音图
  const getLetterList = () => {
    api.post('/letter/list').then((data: any) => setLetterList(data))
  }
  // 确认学习进度
  const confirmStudyProgress = () => {
    if (selectId < 0) {
    } else {
      api.post('/study-record/update', { letterId: selectId }).then(data => {
        // 成功则返回确认是否有新的学习进度
        router.push('new-study')
      })
    }
  }
  useEffect(() => {
    getLetterList()
  }, [])
  return (
    <PageRoot headerProps>
      <div className="flex justify-center py-3 text-white bg-orange-600">请点击任意元素进行选择</div>
      <div className="flex flex-wrap [&>*:nth-child(5n)]:border-r-0">
        {letterList.map((item: ICard, index: number) => (
          <Card key={index} data={item} isSelect={item.id <= selectId} onSelect={onSelect} />
        ))}
      </div>
      <button
        className="flex w-screen py-4 justify-center bottom-0 left-0 bg-button text-white tracking-widest"
        onClick={confirmStudyProgress}>
        确认学习进度
      </button>
    </PageRoot>
  )
}
export default UpdateStudyProgress
