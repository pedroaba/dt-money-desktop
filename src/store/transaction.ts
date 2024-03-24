import { invoke } from '@tauri-apps/api'
import { toast } from 'sonner'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { ResponseListMessage, ResponseMessage } from '@/@types/ipc'

type Transaction = {
  id: string
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
  created_at?: string | null
  transaction_type?: string | null
}

type TransactionCreation = Omit<Transaction, 'id'>

interface TransactionState {
  transactions: Transaction[]
  total: number
  currentPage: number
}

interface TransactionAction {
  makeTransaction: (
    transaction: TransactionCreation,
  ) => Promise<ResponseMessage>
  loadTransactions: () => Promise<void>
  toPage: (page: number) => Promise<void>
}

export const useTransactionStore = create<
  TransactionState & TransactionAction
>()(
  immer((set) => ({
    // States
    transactions: [],
    total: 0,
    currentPage: 0,

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
  })),
)
