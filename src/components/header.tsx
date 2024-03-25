import LogoSvg from '@/assets/logo.svg'
import { TransactionFormDrawer } from '@/components/transaction-form-drawer.tsx'

import { Cards } from './cards'
import { TransactionForm } from './transaction-form'

export function Header() {
  return (
    <nav className="h-52 bg-base-900 space-y-10">
      <div className="max-sm:max-w-[380px] max-lg:max-w-[480px] max-xl:max-w-[720px] xl:max-w-[1120px] pt-10 mx-auto flex items-center justify-between">
        <img src={LogoSvg} alt="" />

        <div className="max-sm:hidden">
          <TransactionForm />
        </div>
        <div className="sm:hidden">
          <TransactionFormDrawer />
        </div>
      </div>

      <Cards />
    </nav>
  )
}
