import { invoke } from '@tauri-apps/api'
import { toast } from 'sonner'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import {
  ResponseListMessage,
  ResponseMessage,
  ResponseSummaryMessage,
} from '@/@types/ipc'

type Transaction = {
  id: string
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
  created_at?: string | null
  transaction_type?: string | null
}

type Summary = {
  income: number
  outcome: number
  total: number
}

type TransactionCreation = Omit<Transaction, 'id'>

interface TransactionState {
  transactions: Transaction[]
  total: number
  currentPage: number
  summary: Summary
}

interface TransactionAction {
  makeTransaction: (
    transaction: TransactionCreation,
  ) => Promise<ResponseMessage>
  loadTransactions: () => Promise<void>
  loadSummary: () => Promise<void>
  toPage: (page: number) => Promise<void>
  deleteTransaction: (transaction: Transaction) => Promise<void>
}

export const useTransactionStore = create<
  TransactionState & TransactionAction
>()(
  immer((set, get) => ({
    // States
    transactions: [],
    total: 0,
    currentPage: 0,
    summary: {
      income: 0,
      outcome: 0,
      total: 0,
    },

    // Actions
    makeTransaction: async (transaction: TransactionCreation) => {
      return await invoke<ResponseMessage>('make_transaction', {
        transaction: {
          ...transaction,
          transaction_type: transaction.type,
        },
      })
    },
    loadTransactions: async (page?: number) => {
      const result = await invoke<ResponseListMessage>('load_transactions', {
        page: page ?? 0,
      })

      if (!result.success) {
        toast.error('Erro ao carregar', {
          description:
            'Houve um erro na hora de carregar a listagem de transações',
        })

        return
      }

      return set((state) => {
        state.transactions = result.results
        state.total = result.total
      })
    },
    toPage: async (page: number) => {
      const result = await invoke<ResponseListMessage>('load_transactions', {
        page,
      })

      if (!result.success) {
        toast.error('Erro ao carregar', {
          description:
            'Houve um erro na hora de carregar a listagem de transações',
        })

        return
      }

      return set((state) => {
        state.transactions = result.results
        state.total = result.total
        state.currentPage = page
      })
    },

    loadSummary: async () => {
      const result = await invoke<ResponseSummaryMessage>('load_summary', {})

      if (!result.success) {
        toast.error('Erro ao carregar', {
          description:
            'Houve um erro na hora de carregar o resumo das transações',
        })

        return
      }

      return set((state) => {
        state.summary = {
          outcome: result.outcome,
          income: result.income,
          total: result.total,
        }
      })
    },

    deleteTransaction: async (transaction: Transaction) => {
      toast.info('Deletando transação', {
        description: `Deletando a transação '${transaction.description}'`,
      })

      const result = await invoke<ResponseMessage>('delete_transaction', {
        transactionId: transaction.id.toString(),
      })

      if (!result.success) {
        toast.error('Erro ao deletar', {
          description: `Houve um erro na hora de deletar a transação '${transaction.description}' - '${transaction.id}'`,
        })
      }

      toast.success('Transação deletada')

      await get().loadTransactions()
      await get().loadSummary()
    },
  })),
)
