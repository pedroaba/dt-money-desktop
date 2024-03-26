import dayjs from 'dayjs'
import { Calendar, Tag } from 'lucide-react'

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

interface TransactionListProps {
  transactions: Transaction[]
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="max-sm:max-w-[380px] max-lg:max-w-[480px] max-xl:max-w-[720px] flex flex-col gap-3 h-full pb-6 mx-auto">
      {transactions.map((transaction) => {
        return (
          <div
            key={transaction.id}
            className="bg-base-700 border-0 rounded-lg gap-3 p-5 flex flex-col items-start justify-start"
          >
            <span className="text-base-400 truncate text-lg">
              {transaction.description}
            </span>
            <span
              className={cn(
                'text-base-400 font-roboto-bold text-2xl',
                transaction.transaction_type === 'income' &&
                  'text-product-green',
                transaction.transaction_type === 'outcome' &&
                  'text-product-red',
              )}
            >
              {transaction.transaction_type === 'outcome' && '- '}
              {transaction.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Tag className="size-4 text-base-500" />
                <span className="text-base text-base-500">
                  {transaction.category}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-base-500" />
                <span className="text-base text-base-500">
                  {dayjs(transaction.created_at).format('DD/MM/YYYY')}
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
