/**
 * @descriptor 用户主页
 * @author obf1313
 */
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Empty, PageRoot } from '@/components'
import { ICheckRecord, IPageResponse, IUserInfo } from './interface'
import { getRecordList, getUserInfo } from './api'

const User = () => {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<IUserInfo>()
  const [recordList, setRecordList] = useState<Array<ICheckRecord>>([])
  const start = () => {
    router.push('new-study')
  }
  // 跳转到结果页
  const toResult = (id: string) => {
    router.push(`/review?id=${id}`)
  }
  useEffect(() => {
    getUserInfo().then(setUserInfo)
    getRecordList({ pageNum: 1, pageSize: 10 }).then((data: IPageResponse<ICheckRecord>) => setRecordList(data.list))
  }, [])
  return (
    <PageRoot className="min-h-screen w-screen flex flex-col">
      <div className="h-20 p-5 bg-slate-950">
        <div>
          <span className="text-white">{userInfo?.userName}</span>
          <span className="ml-1 text-xs text-gray-200"> id: {userInfo?.id}</span>
        </div>
        <div className="mt-1 text-xs text-gray-400">上次登录时间：{userInfo?.lastLoginTime}</div>
      </div>
      <Empty isEmpty={recordList.length === 0}>
        {recordList.map((item: ICheckRecord, index: number) => (
          <div
            key={index}
            className="flex justify-between py-2 px-3 bg-blue-100 border-t-1 border-blue-200"
            onClick={() => toResult(item.id)}>
            <div>{item.startTime}</div>
          </div>
        ))}
      </Empty>
      <button
        onClick={start}
        className="flex w-screen py-4 justify-center fixed bottom-0 left-0 bg-button text-white tracking-widest">
        开始抽查
      </button>
    </PageRoot>
  )
}
export default User
