/**
 * @descriptor 五十音卡片
 * @author obf1313
 */
'use client'
import classNames from 'classnames'

export interface ICard {
  /** 平假名 */
  hiragana: string
  /** 片假名 */
  katakana: string
  /** 罗马音 */
  rome: string
}

interface Props {
  data: ICard
  /** 索引 */
  index: number
  /** 是否被选中 */
  isSelect?: boolean
  /** 选中回调 */
  onSelect?: (item: ICard, index: number) => void
  /** 错误次数 */
  errorTimes?: 0 | 1 | 2
  className?: string
}

const Card = (props: Props) => {
  const { data, className, index, isSelect = false, onSelect, errorTimes } = props
  const { hiragana, katakana, rome } = data

  return (
    <div
      className={classNames(
        'flex justify-center items-center w-1/5 p-2 text-cyan-950 border-b-2 border-r-2 font-bold',
        className,
        {
          'bg-blue-200 border-blue-400': isSelect,
          'bg-pink-100 border-pink-400': !isSelect,
          'bg-green-300 border-green-600': errorTimes === 0,
          'bg-orange-300 border-orange-600': errorTimes === 1,
          'bg-red-300 border-red-600': errorTimes === 2,
        }
      )}
      onClick={() => {
        onSelect?.(data, index)
      }}>
      <div className="text-2xl mr-2">{hiragana}</div>
      <div>
        <div className="text-sm text-right">{katakana}</div>
        <div className="text-sm text-right">{rome}</div>
      </div>
    </div>
  )
}
export default Card
