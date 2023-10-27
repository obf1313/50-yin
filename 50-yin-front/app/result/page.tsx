/**
 * @descriptor 结果
 * @author obf1313
 */
'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { PageRoot } from '@/components'
import { useEffect, useState } from 'react'
import { ICheckRecord } from './interface'
import { getCheckRecordResult } from './api'

const Result = () => {
  const router = useRouter()
  const id = useSearchParams().get('id')
  const [recordData, setRecordData] = useState<ICheckRecord>()
  const review = () => {
    router.push(`/review?id=${id}`)
  }
  // 查询结果
  const getResultDetail = () => {
    if (id) {
      // TODO: 修改传参后测试
      getCheckRecordResult({ id: id || '' }).then((data: ICheckRecord) => setRecordData(data))
    }
  }
  useEffect(() => {
    getResultDetail()
  }, [id])
  return (
    <PageRoot
      className="flex flex-col justify-center items-center h-screen bg-pink-200"
      headerProps={{
        title: '首页',
        onBack: () => {
          router.replace('/user')
        },
      }}>
      <div className="text-6xl text-cyan-950">完成</div>
      <div className="mt-6 text-xl text-cyan-950">{recordData?.accuracy}%</div>
      <div className="fixed bottom-0 w-screen py-4 bg-button text-white text-center" onClick={review}>
        回顾
      </div>
    </PageRoot>
  )
}
export default Result
