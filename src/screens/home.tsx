import { MagnifyingGlass } from '@phosphor-icons/react'
import dayjs from 'dayjs'
import { useEffect } from 'react'

import { Header } from '@/components/header'
import { TransactionPagination } from '@/components/transaction-pagination.tsx'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils.ts'
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

      <Table className="max-sm:max-w-[380px] max-lg:max-w-[480px] max-xl:max-w-[720px] xl:max-w-[1120px] mx-auto border-separate border-spacing-y-2">
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
              <TableCell
                className={cn(
                  'text-base-400',
                  row.transaction_type === 'income' && 'text-product-green',
                  row.transaction_type === 'outcome' && 'text-product-red',
                )}
                colSpan={2}
              >
                {row.transaction_type === 'outcome' && '- '}
                {row.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </TableCell>
              <TableCell className="text-base-400" colSpan={2}>
                {row.category}
              </TableCell>
              <TableCell
                colSpan={1}
                className="rounded-tr-lg rounded-br-lg w-[120px] text-base-400"
              >
                {dayjs(row.created_at).format('DD/MM/YYYY')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TransactionPagination />
    </div>
  )
}
