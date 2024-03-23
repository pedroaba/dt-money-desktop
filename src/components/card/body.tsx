import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { useCardContext } from './root'

interface ICardBody extends ComponentProps<'div'> {
  children: ReactNode
}

export function Body({ children, className, ...rest }: ICardBody) {
  const cardContext = useCardContext()
  const isInsideRootComponent = cardContext.name

  if (!isInsideRootComponent) {
    throw new Error('CardBody must be inside a card report')
  }

  return (
    <div
      className={twMerge(
        'h-36 bg-base-600 rounded-md min-w-80 py-6 px-8 flex flex-col justify-between',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
