import { clsx } from 'clsx'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useTransactionStore } from '@/store/transaction.ts'

export function TransactionPagination() {
  const { totalOfTransactions, currentPage, goToPage } = useTransactionStore(
    (state) => ({
      totalOfTransactions: state.total,
      currentPage: state.currentPage,
      goToPage: state.toPage,
    }),
  )

  const pages = Math.ceil(totalOfTransactions / 10) ?? 1

  const isLastPage = currentPage + 1 >= pages
  const isFirstPage = currentPage === 0

  return (
    <div className="flex items-center justify-between max-md:max-w-[380px] max-lg:max-w-[480px] max-xl:max-w-[720px] xl:max-w-[1120px] mx-auto pb-6">
      <span className="truncate text-slate-300 w-32 text-sm">
        Total {totalOfTransactions} item(s).
      </span>

      <div className="flex items-center gap-3">
        <Button
          disabled={isFirstPage}
          onClick={() => goToPage(0)}
          className={clsx(
            'size-8 p-2 bg-base-700 hover:bg-base-600 disabled:cursor-not-allowed',
            {
              'cursor-not-allowed': isFirstPage,
              'cursor-pointer': !isFirstPage,
            },
          )}
        >
          <ChevronsLeft className="size-10 text-base-400" />
        </Button>
        <Button
          disabled={isFirstPage}
          onClick={() => goToPage(currentPage - 1)}
          className={clsx(
            'size-8 p-2 bg-base-700 hover:bg-base-600 disabled:cursor-not-allowed',
            {
              'cursor-not-allowed': isFirstPage,
              'cursor-pointer': !isFirstPage,
            },
          )}
        >
          <ChevronLeft className="size-10 text-base-400" />
        </Button>
        <Button
          disabled={isLastPage}
          onClick={() => goToPage(currentPage + 1)}
          className={clsx(
            'size-8 p-2 bg-base-700 hover:bg-base-600 disabled:cursor-not-allowed',
            {
              'cursor-not-allowed': isLastPage,
              'cursor-pointer': !isLastPage,
            },
          )}
        >
          <ChevronRight className="size-10 text-base-400" />
        </Button>
        <Button
          disabled={isLastPage}
          onClick={() => goToPage(totalOfTransactions - 1)}
          className={clsx(
            'size-8 p-2 bg-base-700 hover:bg-base-600 disabled:cursor-not-allowed',
            {
              'cursor-not-allowed': isLastPage,
              'cursor-pointer': !isLastPage,
            },
          )}
        >
          <ChevronsRight className="size-10 text-base-400" />
        </Button>
      </div>
    </div>
  )
}
