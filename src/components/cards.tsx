import {
  ArrowCircleDown,
  ArrowCircleUp,
  CurrencyDollar,
} from '@phosphor-icons/react'
import { useEffect } from 'react'

import { cn } from '@/lib/utils.ts'
import { useTransactionStore } from '@/store/transaction.ts'

import {
  CardBody,
  CardContent,
  CardHeader,
  CardIcon,
  CardRoot,
  CardTitle,
} from './card'

export function Cards() {
  const { loadSummary, summary } = useTransactionStore((state) => ({
    loadSummary: state.loadSummary,
    summary: state.summary,
  }))

  useEffect(() => {
    loadSummary().then(() => {})
  }, [])

  return (
    <div className="xl:gap-8 xl:max-w-[1120px] mx-auto xl:grid xl:grid-cols-3 max-xl:flex max-xl:gap-4 overflow-hidden overflow-x-auto max-sm:max-w-[380px] max-lg:max-w-[480px] max-xl:max-w-[720px]">
      <CardRoot>
        <CardBody>
          <CardHeader>
            <CardTitle>Entradas</CardTitle>
            <CardIcon>
              <ArrowCircleUp className="size-8 text-product-green" />
            </CardIcon>
          </CardHeader>
          <CardContent>
            {summary.income.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </CardContent>
        </CardBody>
      </CardRoot>
      <CardRoot>
        <CardBody>
          <CardHeader>
            <CardTitle>Saídas</CardTitle>
            <CardIcon>
              <ArrowCircleDown className="size-8 text-product-red" />
            </CardIcon>
          </CardHeader>
          <CardContent>
            {summary.outcome.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </CardContent>
        </CardBody>
      </CardRoot>
      <CardRoot>
        <CardBody
          className={cn(
            summary.total >= 0 && 'bg-product-green-dark',
            summary.total < 0 && 'bg-product-red-dark',
          )}
        >
          <CardHeader>
            <CardTitle>Total</CardTitle>
            <CardIcon>
              <CurrencyDollar className="size-8 text-white" />
            </CardIcon>
          </CardHeader>
          <CardContent>
            {summary.total.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </CardContent>
        </CardBody>
      </CardRoot>
    </div>
  )
}
