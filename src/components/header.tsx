import LogoSvg from '@/assets/logo.svg'
import { Button } from '@/components/ui/button'

import { Cards } from './cards'

export function Header() {
  return (
    <nav className="h-52 bg-base-900 space-y-10">
      <div className="max-w-[1120px] pt-10 mx-auto flex items-center justify-between">
        <img src={LogoSvg} alt="" />

        <Button className="bg-product-green rounded-sm hover:bg-product-green-light transition-colors duration-300">
          Nova Transação
        </Button>
      </div>

      <Cards />
    </nav>
  )
}
