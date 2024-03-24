import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import * as React from 'react'

import { ButtonProps, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
)
Pagination.displayName = 'Pagination'

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-2', className)}
    {...props}
  />
))
PaginationContent.displayName = 'PaginationContent'

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
))
PaginationItem.displayName = 'PaginationItem'

type PaginationLinkProps = {
  isActive?: boolean
  enabled?: boolean
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'a'>

const PaginationLink = ({
  className,
  isActive,
  size = 'icon',
  enabled = false,
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    data-enabled={enabled}
    className={cn(
      buttonVariants({
        variant: isActive ? 'outline' : 'ghost',
        size,
      }),
      'data-[enabled=false]:cursor-not-allowed cursor-pointer data-[control=true]:bg-transparent data-[control=true]:p-0 font-roboto-bold text-base-200 hover:text-base-200 bg-base-600 hover:bg-base-600 hover:brightness-75 aria-[current=page]:text-base-300 aria-[current=page]:hover:text-base-300 h-10 w-10 aria-[current=page]:bg-product-green-dark aria-[current=page]:hover:bg-product-green-dark aria-[current=page]:border-product-green-dark',
      className,
    )}
    {...props}
  />
)
PaginationLink.displayName = 'PaginationLink'

const PaginationPrevious = ({
  className,
  enabled = false,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    data-enabled={enabled}
    data-control={true}
    className={cn('gap-1 group', className)}
    enabled={enabled}
    {...props}
  >
    <ChevronLeft className="size-4 group-data-[enabled=true]:text-product-green group-data-[enabled=false]:opacity-50 group-data-[enabled=false]:cursor-not-allowed" />
    {/* <span>Previous</span> */}
  </PaginationLink>
)
PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = ({
  className,
  enabled = false,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    data-enabled={enabled}
    data-control={true}
    className={cn('gap-1 group', className)}
    enabled={enabled}
    {...props}
  >
    {/* <span>Next</span> */}
    <ChevronRight className="size-4 group-data-[enabled=true]:text-product-green group-data-[enabled=false]:opacity-50" />
  </PaginationLink>
)
PaginationNext.displayName = 'PaginationNext'

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    {/* <span className="sr-only">More pages</span> */}
  </span>
)
PaginationEllipsis.displayName = 'PaginationEllipsis'

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
