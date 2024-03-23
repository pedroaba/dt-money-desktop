import { MagnifyingGlass } from '@phosphor-icons/react'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Home() {
  return (
    <div className="bg-base-800 h-screen w-screen space-y-32">
      <Header />
      <div className="max-w-[1120px] mx-auto flex items-center gap-4">
        <Input placeholder="Busque uma transação" />

        <Button variant="search" size="search">
          <MagnifyingGlass className="size-4" weight="bold" />
          <span className="font-roboto-bold">Buscar</span>
        </Button>
      </div>
    </div>
  )
}
