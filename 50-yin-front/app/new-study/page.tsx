/**
 * @descriptor 询问是否有新的学习进程
 * @author obf1313
 */
'use client'
import { useRouter } from 'next/navigation'

const NewStudy = () => {
  const router = useRouter()
  // 更新学习记录
  const toUpdate = () => {
    router.push('/update-study-progress')
  }
  // 开始抽查
  const start = () => {
    router.push('/check')
  }
  return (
    <main className="min-h-screen w-screen flex flex-col align-middle">
      <h1 className="mt-40 text-center font-bold text-2xl">是否有新的学习进程</h1>
      <div className="flex justify-center mt-20">
        <button onClick={toUpdate} className="w-40 py-1 bg-blue-600 text-white rounded-sm">
          是
        </button>
        <button onClick={start} className="w-40 py-1 ml-4 text-blue-600 border-2 border-blue-600">
          否
        </button>
      </div>
    </main>
  )
}
export default NewStudy
