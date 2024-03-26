import { PartyPopper } from 'lucide-react'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card.tsx'
import { ScrollArea } from '@/components/ui/scroll-area.tsx'

const updates = [
  {
    title: 'Integração com I.A.',
    status: 'em breve',
    summary:
      'A integração com a I.A. irá ajudar você com decisões financeiras, previsões futuras, etc...',
  },
  {
    title: 'Sincronização na Nuvem',
    status: 'em breve',
    summary:
      'Você irá poder subir seus dados para nuvem! Tendo assim um backup e podendo acessar de qualquer aparelho desktop.',
  },
  {
    title: 'Dashboards',
    status: 'em breve',
    summary:
      'Com as dashboards será possível acompanhar todo o desenvolvimento de sua vida financeira.',
  },
  {
    title: 'Area de investimentos',
    status: 'planejamento',
    summary:
      'Nesta area você irá poder controlar seus investimentos de forma rápida e fácil!!',
  },
]

export function UpdatesInfo() {
  return (
    <HoverCard openDelay={100}>
      <HoverCardTrigger className="size-10 bg-base-900 flex cursor-pointer items-center justify-center rounded-full fixed bottom-6 right-6 shadow-md drop-shadow-md shadow-accent-foreground hover:brightness-150 hover:shadow-base-600">
        <PartyPopper className="size-4 text-white" />
      </HoverCardTrigger>
      <HoverCardContent
        align="end"
        alignOffset={4}
        className="p-6 h-96 bg-base-900 shadow-md shadow-accent-foreground border-0 ring-0 w-96"
      >
        <div className="flex items-center justify-start gap-4 mb-4">
          <span className="text-slate-100 text-lg">
            Próximas atualizações !!
          </span>
        </div>
        <ScrollArea className="w-full h-[300px]">
          {updates.map((update) => {
            return (
              <div
                key={update.summary}
                className="flex flex-col items-start mb-1.5 border-b-[1px] border-b-slate-600 last:border-0 p-4 last:mb-0 justify-start gap-2 hover:bg-base-800 hover:cursor-default hover:rounded-md hover:border-b-base-900"
              >
                <div className="flex items-baseline w-full">
                  <span className="text-slate-200 max-w-[180px] truncate mr-auto font-bold font-roboto-bold text-base">
                    {update.title}
                  </span>
                  <span className="text-slate-300 font-semibold font-roboto-regular text-xs">
                    {update.status}
                  </span>
                </div>
                <span className="text-slate-500 font-semibold font-roboto-regular text-xs">
                  {update.summary}
                </span>
              </div>
            )
          })}
        </ScrollArea>
      </HoverCardContent>
    </HoverCard>
  )
}
