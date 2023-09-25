/**
 * @descriptor 50音抽查卡片
 * @author obf1313
 */
'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Empty, PageRoot } from '@/components'
import api from '@/fetch'

type DisappearType = 'hiragana' | 'katakana' | 'rome'

interface ILetter {
  id: string
  hiragana: string
  katakana: string
  rome: string
}

interface ICheckRecord {
  id: string
  startTime: string
  checkRecordDetailList: Array<{
    id: string
    letterDetail: ILetter
  }>
}

const Check = () => {
  const router = useRouter()
  const [checkRecord, setCheckRecord] = useState<ICheckRecord>()
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const wordList = checkRecord?.checkRecordDetailList || []

  // 获取抽查详情
  const getCheckRecord = () => {
    const checkRecord = JSON.parse(sessionStorage.getItem('checkRecord') || '{}')
    setCheckRecord(checkRecord)
  }
  // 计算显示一个
  const viewType: DisappearType = useMemo(() => {
    const randomNum = Math.floor(Math.random() * 2)
    switch (randomNum) {
      default:
      case 0:
        return 'hiragana'
      case 1:
        return 'katakana'
      case 2:
        return 'rome'
    }
  }, [currentIndex])
  // 下一个
  const next = async (type: 'ok' | 'error') => {
    // 掉接口
    if (currentIndex + 1 < wordList.length) {
      await api.post('/check-record-detail/update', {
        id: wordList[currentIndex].id,
        isRight: type === 'ok',
      })
      setCurrentIndex(currentIndex + 1)
    } else {
      sessionStorage.removeItem('checkRecord')
      await api.post('/check-record/update', { id: checkRecord?.id })
      router.push(`/result?id=${checkRecord?.id}`)
    }
  }
  // 提前结束
  const end = async () => {
    // 掉接口
    await api.post('/check-record/update', { id: checkRecord?.id })
    router.push(`/result?id=${checkRecord?.id}`)
  }
  useEffect(() => {
    getCheckRecord()
  }, [])
  return (
    <PageRoot
      className="flex flex-col w-screen h-screen"
      headerProps={{
        title: '提前结束',
        onBack: end,
      }}>
      <Empty isEmpty={wordList.length === 0}>
        <div className="flex justify-center items-center w-screen p-2 text-cyan-950 font-bold bg-red-100 flex-1">
          <div className="flex h-36">
            <div className="flex justify-center items-center text-9xl mr-4 h-36 w-36 border-2 border-dotted border-gray-500 flex-shrink-0 flex-grow-0">
              {viewType === 'hiragana' ? wordList[currentIndex]?.letterDetail.hiragana : '?'}
            </div>
            <div className="flex flex-col justify-between h-full">
              <div className="flex justify-center items-center h-16 w-16 text-5xl text-right border-2 border-dotted border-gray-500">
                {viewType === 'katakana' ? wordList[currentIndex]?.letterDetail.katakana : '?'}
              </div>
              <div className="flex justify-center items-center h-16 w-16 text-5xl text-right border-2 border-dotted border-gray-500">
                {viewType === 'rome' ? wordList[currentIndex]?.letterDetail.rome : '?'}
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <button className="w-1/2 py-2 text-button border-2 border-button" onClick={() => next('error')}>
            没记住
          </button>
          <button className="w-1/2 py-2 bg-button text-white" onClick={() => next('ok')}>
            记住了
          </button>
        </div>
      </Empty>
    </PageRoot>
  )
}
export default Check
