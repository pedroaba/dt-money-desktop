import dayjs from 'dayjs'
import { Ellipsis, Trash } from 'lucide-react'

import { TransactionPagination } from '@/components/transaction-pagination.tsx'
import { Button } from '@/components/ui/button.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table.tsx'
import { cn } from '@/lib/utils.ts'
import { useTransactionStore } from '@/store/transaction.ts'

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
  const { deleteTransaction } = useTransactionStore((state) => ({
    deleteTransaction: state.deleteTransaction,
  }))

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
              <TableCell className="w-[30px]">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="bg-transparent">
                      <Ellipsis className="size-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-base-900 border-base-700 text-base-400">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-base-700" />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onSelect={() => deleteTransaction(row)}
                        className="hover:bg-base-800"
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Deletar</span>
                      </DropdownMenuItem>
                      {/* <DropdownMenuItem className="hover:bg-base-800"> */}
                      {/*  <CreditCard className="mr-2 h-4 w-4" /> */}
                      {/*  <span>Atualizar</span> */}
                      {/* </DropdownMenuItem> */}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TransactionPagination />
    </>
  )
}
