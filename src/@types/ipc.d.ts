export interface ResponseMessage {
  success: boolean
  message: string
  error: string
}

type Transaction = {
  id: string
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

export interface ResponseListMessage {
  success: boolean
  total: number
  results: Transaction[]
}

export interface ResponseSummaryMessage {
  success: boolean
  total: number
  outcome: number
  income: number
  error: number
  message: string
}
