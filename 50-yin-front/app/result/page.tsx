/**
 * @descriptor 结果
 * @author obf1313
 */
'use client'
import { useRouter } from 'next/navigation'
import { PageRoot } from '@/components'

const Result = () => {
  const router = useRouter()
  const review = () => {
    router.push('/review')
  }
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
      <div className="mt-6 text-xl text-cyan-950">20min 15s</div>
      <div className="fixed bottom-0 w-screen py-4 bg-button text-white text-center" onClick={review}>
        回顾
      </div>
    </PageRoot>
  )
}
export default Result
