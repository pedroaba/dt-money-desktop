import { createContext, ReactNode, useContext, useMemo } from 'react'
import { v4 } from 'uuid'

type TCardContext = {
  name: string
}

interface ICardRoot {
  children: ReactNode
}

const CardContext = createContext({} as TCardContext)

export function Root({ children }: ICardRoot) {
  const cardName = useMemo(() => `Card-${v4()}`, [])

  return (
    <CardContext.Provider value={{ name: cardName }}>
      {children}
    </CardContext.Provider>
  )
}

export const useCardContext = () => useContext(CardContext)
