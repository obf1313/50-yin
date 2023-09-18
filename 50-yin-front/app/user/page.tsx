/**
 * @descriptor 用户主页
 * @author obf1313
 */
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Empty, PageRoot } from '@/components'
import api from '@/fetch'

const User = () => {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<any>({})
  const [recordList, setRecordList] = useState<Array<any>>([])
  // 获取用户信息
  const getUserInfo = () => {
    api.get(`/user`).then(setUserInfo)
  }
  // 获取抽查记录
  const getRecordList = () => {
    api.post('/check-record/list', { userId: '1' }).then((data: any) => setRecordList(data.list))
  }
  const start = () => {
    router.push('new-study')
  }
  useEffect(() => {
    getUserInfo()
    getRecordList()
  }, [])
  return (
    <PageRoot className="min-h-screen w-screen flex flex-col">
      <div className="h-20 p-5 bg-slate-950">
        <div>
          <span className="text-white">{userInfo?.userName}</span>
          <span className="ml-1 text-xs text-gray-200"> id: {userInfo?.id}</span>
        </div>
        <div className="mt-1 text-xs text-gray-400">上次登录时间：{userInfo.lastLoginTime}</div>
      </div>
      <Empty isEmpty={recordList.length === 0}>
        {recordList.map((item: any, index: number) => (
          <div key={index} className="flex justify-between py-2 px-3 bg-blue-100 border-t-1 border-blue-200">
            <div>{item.startTime}</div>
            <div>{item.accuracy}%</div>
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
