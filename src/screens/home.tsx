import { MagnifyingGlass } from '@phosphor-icons/react'
import { useState } from 'react'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

export function Home() {
  const [data] = useState(
    Array.from({ length: 4 }).fill({
      product: 'Desenvolvimento de site',
      price: 'R$ 1600,00',
      type: 'Venda',
      date: '13/03/2024',
    }),
  )

  return (
    <div className="bg-base-800 h-screen w-screen space-y-8">
      <div className="space-y-32">
        <Header />
        <div className="max-w-[1120px] mx-auto flex items-center gap-4">
          <Input placeholder="Busque uma transação" />

          <Button variant="search" size="search">
            <MagnifyingGlass className="size-4" weight="bold" />
            <span className="font-roboto-bold">Buscar</span>
          </Button>
        </div>
      </div>

      <Table className="max-w-[1120px] mx-auto border-separate border-spacing-y-2">
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              className="bg-base-700 border-0 hover:bg-base-700"
            >
              <TableCell
                colSpan={5}
                className="rounded-tl-lg rounded-bl-lg text-base-400"
              >
                {row.product}
              </TableCell>
              <TableCell className="text-base-400" colSpan={2}>
                {row.price}
              </TableCell>
              <TableCell className="text-base-400" colSpan={2}>
                {row.type}
              </TableCell>
              <TableCell
                colSpan={1}
                className="rounded-tr-lg rounded-br-lg w-[120px] text-base-400"
              >
                {row.date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive enabled>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink enabled>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink enabled>3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext enabled />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
