import { ReactNode } from 'react'

import { useCardContext } from './root'

interface ICardIcon {
  children: ReactNode
}

export function Icon({ children }: ICardIcon) {
  const cardContext = useCardContext()
  const isInsideRootComponent = cardContext.name

  if (!isInsideRootComponent) {
    throw new Error('CardIcon must be inside a card report')
  }

  return children
}
