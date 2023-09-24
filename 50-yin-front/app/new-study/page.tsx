/**
 * @descriptor 询问是否有新的学习进程
 * @author obf1313
 */
'use client'
import { useRouter } from 'next/navigation'
import { PageRoot } from '@/components'
import api from '@/fetch'

const NewStudy = () => {
  const router = useRouter()
  // 更新学习记录
  const toUpdate = () => {
    router.push('/update-study-progress')
  }
  // 开始抽查
  const start = () => {
    api.post('/check-record/create').then((data: any) => {
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
