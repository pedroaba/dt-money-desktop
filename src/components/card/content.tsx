import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { useCardContext } from './root'

interface ICardContent extends ComponentProps<'span'> {}

export function Content({ children, className, ...rest }: ICardContent) {
  const cardContext = useCardContext()
  const isInsideRootComponent = cardContext.name

  if (!isInsideRootComponent) {
    throw new Error('CardContent must be inside a card report')
  }

  return (
    <span
      className={twMerge(
        'font-roboto-bold text-base-300 text-3xl truncate max-w-full',
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  )
}
