import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowCircleDown, ArrowCircleUp } from '@phosphor-icons/react'
import { RotateCw } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { useTransactionStore } from '@/store/transaction.ts'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTrigger,
} from './ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'

const formSchema = z.object({
  description: z.string({
    required_error: 'É necessário preencher a descrição da transação',
  }),
  price: z.coerce.number({
    required_error: 'É necessário preencher o preço da transação',
  }),
  category: z.string({
    required_error: 'É necessário preencher a categoria da transação',
  }),
  type: z.enum(['income', 'outcome'], {
    required_error: 'Escolha uma das opções acima',
  }),
})

type FormSchema = z.infer<typeof formSchema>

export function TransactionForm() {
  const [isDialogOpen, setDialogOpen] = useState(false)
  const { makeTransaction, goToPage, loadSummary } = useTransactionStore(
    (state) => ({
      makeTransaction: state.makeTransaction,
      goToPage: state.toPage,
      loadSummary: state.loadSummary,
    }),
  )
  const form = useForm<FormSchema>({ resolver: zodResolver(formSchema) })

  async function handleRegisterTransaction(transaction: FormSchema) {
    const result = await makeTransaction(transaction)

    if (result.success) {
      form.reset({
        type: undefined,
        category: '',
        price: undefined,
        description: '',
      })
      toast.success('Cadastrado com sucesso', {
        description: result.message,
      })

      await loadSummary()
      await goToPage(0)
      return setDialogOpen(false)
    }

    toast.error('Erro ao cadastrar', {
      description: result.message,
    })
    console.log(result.error)
  }

  return (
    <Dialog
      defaultOpen={false}
      open={isDialogOpen}
      onOpenChange={(open) => {
        form.reset({
          type: undefined,
          category: '',
          price: undefined,
          description: '',
        })

        setDialogOpen(open)
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-product-green rounded-sm hover:bg-product-green-light transition-colors duration-300">
          Nova Transação
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent className="bg-base-800 border-0 ring-0 p-12">
          <DialogHeader>
            <span className="font-roboto-bold text-base-300 text-2xl">
              Nova Transação
            </span>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegisterTransaction)}>
              <div className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          data-error={fieldState.error?.message}
                          placeholder="Descrição"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          data-error={fieldState.error?.message}
                          placeholder="Preço"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          data-error={fieldState.error?.message}
                          placeholder="Categoria"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center w-full mt-6 gap-4">
                        <div
                          onClick={() => field.onChange('income')}
                          data-selected={field.value === 'income'}
                          className="group w-full flex items-center justify-center gap-2 cursor-pointer h-14 bg-base-700 rounded-md hover:bg-base-600 transition-all data-[selected=true]:bg-product-green-dark"
                        >
                          <ArrowCircleUp className="size-6 text-product-green group-data-[selected=true]:text-white" />
                          <span className="font-roboto-regular text-base-400 group-data-[selected=true]:text-white">
                            Entrada
                          </span>
                        </div>
                        <div
                          onClick={() => field.onChange('outcome')}
                          data-selected={field.value === 'outcome'}
                          className="group w-full flex items-center justify-center gap-2 cursor-pointer h-14 bg-base-700 rounded-md hover:bg-base-600 transition-all data-[selected=true]:bg-product-red-dark"
                        >
                          <ArrowCircleDown className="size-6 text-product-red group-data-[selected=true]:text-white" />
                          <span className="font-roboto-regular text-base-400 group-data-[selected=true]:text-white">
                            Saída
                          </span>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                size="lg"
                type="submit"
                disabled={form.formState.isSubmitting}
                className="mt-10 bg-product-green w-full rounded-sm hover:bg-product-green-light transition-colors duration-300"
              >
                {form.formState.isSubmitting ? (
                  <RotateCw className="size-6 text-slate-300 animate-spin" />
                ) : (
                  'Cadastrar'
                )}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
