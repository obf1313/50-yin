/**
 * @descriptor 用户主页
 * @author obf1313
 */
'use client'
import { useRouter } from 'next/navigation'

const User = () => {
  const router = useRouter()
  const start = () => {
    router.push('new-study')
  }
  return (
    <main className="min-h-screen w-screen flex flex-col">
      <div className="h-20 p-5 bg-slate-950">
        <div>
          <span className="text-white">御坂美琴</span>
          <span className="ml-1 text-xs text-gray-200"> id: 0001</span>
        </div>
        <div className="mt-1 text-xs text-gray-400">上次登录时间 2023-05-09 09:00:00</div>
      </div>
      <div>
        {new Array(10).fill(0).map((item: number, index: number) => (
          <div key={index} className="flex justify-between py-2 px-3 bg-blue-100 border-t-2 border-blue-200">
            <div>2023-09-01 09:20:20</div>
            <div>20%</div>
          </div>
        ))}
      </div>
      <div
        onClick={start}
        className="flex w-screen py-4 justify-center fixed bottom-0 left-0 bg-blue-600 text-white tracking-widest">
        开始抽查
      </div>
    </main>
  )
}
export default User
