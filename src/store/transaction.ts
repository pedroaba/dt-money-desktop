import { invoke } from '@tauri-apps/api'
import { create } from 'zustand'

import { ResponseMessage } from '@/@types/ipc'

type Transaction = {
  id: string
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

type TransactionCreation = Omit<Transaction, 'id'>

interface TransactionState {
  transactions: Transaction[]
}

interface TransactionAction {
  makeTransaction: (
    transaction: TransactionCreation,
  ) => Promise<ResponseMessage>
}

export const useTransactionStore = create<TransactionState & TransactionAction>(
  () => ({
    // States
    transactions: [],

    // Actions
    makeTransaction: async (transaction: TransactionCreation) => {
      return await invoke<ResponseMessage>('make_transaction', {
        transaction: {
          ...transaction,
          transaction_type: transaction.type,
        },
      })
    },
  }),
)
