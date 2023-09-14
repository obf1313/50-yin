/**
 * @descriptor 回顾本次测验
 * @author obf1313
 */
'use client'
import { useRouter } from 'next/navigation'
import { Card, PageRoot } from '@/components'

const Review = () => {
  const router = useRouter()
  return (
    <PageRoot
      headerProps={{
        title: '测验结果',
        onBack: () => {
          router.replace('/user')
        },
      }}>
      <div className="flex flex-wrap [&>*:nth-child(5n)]:border-r-0 pb-16">
        {new Array(50)
          .fill({
            hiragana: 'あ',
            katakana: 'ア',
            rome: 'a',
          })
          .map((item, index) => (
            <Card key={index} data={item} index={index} errorTimes={2} />
          ))}
      </div>
    </PageRoot>
  )
}
export default Review
