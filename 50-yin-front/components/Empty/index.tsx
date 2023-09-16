/**
 * @descriptor 空展示
 * @author obf1313
 */
import { PropsWithChildren } from 'react'

interface IEmptyProps {
  isEmpty?: boolean
}

const Empty = (props: PropsWithChildren<IEmptyProps>) => {
  const { isEmpty, children } = props
  return isEmpty ? <div className="flex justify-center items-center w-screen h-32">空</div> : children
}
export default Empty
