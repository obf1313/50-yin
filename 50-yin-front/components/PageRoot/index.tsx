/**
 * @descriptor 页面根节点
 * @author obf1313
 */
'use client'
import { PropsWithChildren } from 'react'
import classNames from 'classnames'
import { Header, IHeaderProps } from '@/components'

interface IPageRootProps {
  className?: string
  headerProps?: IHeaderProps | true
}

const PageRoot = (props: PropsWithChildren<IPageRootProps>) => {
  const { className, headerProps } = props
  const headerTransferProps = typeof headerProps === 'boolean' ? {} : headerProps
  return (
    <main
      className={classNames(className, {
        'pt-12': headerProps,
      })}>
      {headerProps && <Header {...headerTransferProps} />}
      {props.children}
    </main>
  )
}
export default PageRoot
