import dayjs from 'dayjs'

import { TransactionPagination } from '@/components/transaction-pagination.tsx'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table.tsx'
import { cn } from '@/lib/utils.ts'

type Transaction = {
  id: string
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
  created_at?: string | null
  transaction_type?: string | null
}

interface TransactionTableProps {
  transactions: Transaction[]
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <>
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
    </>
  )
}
