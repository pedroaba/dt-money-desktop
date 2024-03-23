import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { useCardContext } from './root'

interface IHeader extends ComponentProps<'div'> {
  children: ReactNode
}

export function Header({ children, className, ...rest }: IHeader) {
  const cardContext = useCardContext()
  const isInsideRootComponent = cardContext.name

  if (!isInsideRootComponent) {
    throw new Error('CardHeader must be inside a card report')
  }

  return (
    <div
      className={twMerge('flex w-full items-center justify-between', className)}
      {...rest}
    >
      {children}
    </div>
  )
}
