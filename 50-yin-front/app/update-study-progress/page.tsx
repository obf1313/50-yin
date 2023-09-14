/**
 * @descriptor 更新学习进度
 * @author obf1313
 */
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, ICard } from './components'

const UpdateStudyProgress = () => {
  const router = useRouter()
  const [selectIndex, setSelectIndex] = useState<number>(-1)
  // 选择某一个元素
  const onSelect = (item: ICard, index: number) => {
    setSelectIndex(index)
  }
  // 确认学习进度
  const confirmStudyProgress = () => {
    if (selectIndex < 0) {
      // 提示
      console.log('请')
    } else {
      router.push('/check')
    }
  }
  return (
    <div>
      <div className="flex justify-center py-3 text-white bg-orange-600">请点击任意元素进行选择</div>
      <div className="flex flex-wrap [&>*:nth-child(5n)]:border-r-0">
        {new Array(50)
          .fill({
            hiragana: 'あ',
            katakana: 'ア',
            rome: 'a',
          })
          .map((item, index) => (
            <Card key={index} data={item} index={index} isSelect={index <= selectIndex} onSelect={onSelect} />
          ))}
      </div>
      <div
        className="flex w-screen py-4 justify-center bottom-0 left-0 bg-button text-white tracking-widest"
        onClick={confirmStudyProgress}>
        确认学习进度
      </div>
    </div>
  )
}
export default UpdateStudyProgress
