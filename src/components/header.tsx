import LogoSvg from '@/assets/logo.svg'

import { Cards } from './cards'
import { TransactionForm } from './transaction-form'

export function Header() {
  return (
    <nav className="h-52 bg-base-900 space-y-10">
      <div className="max-w-[1120px] pt-10 mx-auto flex items-center justify-between">
        <img src={LogoSvg} alt="" />

        <TransactionForm />
      </div>

      <Cards />
    </nav>
  )
}
