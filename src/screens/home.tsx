import { MagnifyingGlass } from '@phosphor-icons/react'
import { useEffect } from 'react'

import { Header } from '@/components/header'
import { TransactionPagination } from '@/components/transaction-pagination.tsx'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
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
    <div className="bg-base-800 h-screen w-screen space-y-8">
      <div className="space-y-32">
        <Header />
        <div className="max-w-[1120px] mx-auto flex items-center gap-4">
          <Input placeholder="Busque uma transação" />

          <Button variant="search" size="search">
            <MagnifyingGlass className="size-4" weight="bold" />
            <span className="font-roboto-bold">Buscar</span>
          </Button>
        </div>
      </div>

      <Table className="max-w-[1120px] mx-auto border-separate border-spacing-y-2">
        <TableBody>
          {transactions.map((row, index) => (
            <TableRow
              key={index}
              className="bg-base-700 border-0 hover:bg-base-700"
            >
              <TableCell
                colSpan={5}
                className="rounded-tl-lg rounded-bl-lg text-base-400"
              >
                {row.description}
              </TableCell>
              <TableCell className="text-base-400" colSpan={2}>
                {row.price}
              </TableCell>
              <TableCell className="text-base-400" colSpan={2}>
                {row.transaction_type}
              </TableCell>
              <TableCell
                colSpan={1}
                className="rounded-tr-lg rounded-br-lg w-[120px] text-base-400"
              >
                {row.created_at}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TransactionPagination />
    </div>
  )
}
