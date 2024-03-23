import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { useCardContext } from './root'

interface ICardTitle extends ComponentProps<'span'> {
  children: ReactNode
}

export function Title({ children, className, ...rest }: ICardTitle) {
  const cardContext = useCardContext()
  const isInsideRootComponent = cardContext.name

  if (!isInsideRootComponent) {
    throw new Error('CardTitle must be inside a card report')
  }

  return (
    <span
      className={twMerge(
        'font-roboto-regular text-base text-base-400',
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  )
}
