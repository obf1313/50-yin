/**
 * @descriptor 头部
 * @author obf1313
 */
'use client'
import { useRouter } from 'next/navigation'

export interface IHeaderProps {
  title?: string
  onBack?: () => void
}

const Header = (props: IHeaderProps) => {
  const { title, onBack } = props
  const router = useRouter()
  const back = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }
  return (
    <div className="fixed top-0 left-0 w-screen h-12 px-4 flex items-center bg-white text-button shadow-sm">
      <div onClick={back}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path
            fillRule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
        </svg>
      </div>
      <div>{title}</div>
    </div>
  )
}
export default Header
