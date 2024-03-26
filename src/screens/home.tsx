import { MagnifyingGlass } from '@phosphor-icons/react'
import { useEffect } from 'react'

import { Header } from '@/components/header'
import { TransactionList } from '@/components/transaction-list.tsx'
import { TransactionTable } from '@/components/transaction-table.tsx'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTransactionStore } from '@/store/transaction.ts'

export function Home() {
  const { loadTransactions, transactions } = useTransactionStore((state) => ({
    loadTransactions: state.loadTransactions,
    transactions: state.transactions,
  }))

  useEffect(() => {
    loadTransactions().then(() => {})
  }, [])

  return (
    <div className="bg-base-800 h-screen w-screen space-y-8 overflow-x-hidden">
      <div className="space-y-32">
        <Header />
        <div className="max-sm:max-w-[380px] max-lg:max-w-[480px] max-xl:max-w-[720px] xl:max-w-[1120px] mx-auto flex items-center gap-4">
          <Input placeholder="Busque uma transação" />

          <Button
            variant="search"
            size="search"
            className="max-md:size-12 max-md:w-16"
          >
            <MagnifyingGlass className="size-4 max-md:size-5" weight="bold" />
            <span className="font-roboto-bold max-md:sr-only">Buscar</span>
          </Button>
        </div>
      </div>

      <div className="max-lg:hidden">
        <TransactionTable transactions={transactions} />
      </div>

      <div className="lg:hidden">
        <TransactionList transactions={transactions} />
      </div>
    </div>
  )
}
