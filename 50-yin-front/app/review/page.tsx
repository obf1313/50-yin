/**
 * @descriptor 回顾本次测验
 * @author obf1313
 */
'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, ICard, PageRoot } from '@/components'
import api from '@/fetch'

interface IRecordDetail {
  id: string
  isRight: boolean
  letterId: string
}

const Review = () => {
  const router = useRouter()
  const id = useSearchParams().get('id')
  const [letterList, setLetterList] = useState<Array<ICard>>([])
  const [resultMap, setResultMap] = useState<Map<string, boolean>>(new Map())
  // 获取五十音图
  const getLetterList = () => {
    api.post('/letter/list').then((data: any) => setLetterList(data))
  }
  // 查询结果
  const getResultDetail = () => {
    api.get(`/check-record/result?id=${id}&isGetList=1`).then((data: any) => {
      const map = new Map<string, boolean>()
      data.checkRecordDetail?.forEach((item: IRecordDetail) => {
        map.set(item.letterId, item.isRight)
      })
      setResultMap(map)
    })
  }
  useEffect(() => {
    if (id) {
      getResultDetail()
    }
  }, [id])
  useEffect(() => {
    getLetterList()
  }, [])
  return (
    <PageRoot
      headerProps={{
        title: '测验结果',
        onBack: () => {
          router.replace('/user')
        },
      }}>
      <div className="flex flex-wrap [&>*:nth-child(5n)]:border-r-0 pb-16">
        {letterList.map((item: ICard, index: number) => (
          // TODO: 此处显示暂未考虑没学的情况
          <Card key={index} data={item} errorTimes={resultMap.get(item.id.toString()) ? 0 : 1} />
        ))}
      </div>
    </PageRoot>
  )
}
export default Review
