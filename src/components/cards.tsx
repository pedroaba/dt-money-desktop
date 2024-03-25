import {
  ArrowCircleDown,
  ArrowCircleUp,
  CurrencyDollar,
} from '@phosphor-icons/react'

import {
  CardBody,
  CardContent,
  CardHeader,
  CardIcon,
  CardRoot,
  CardTitle,
} from './card'

export function Cards() {
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
          <CardContent>R$ 17.400,00</CardContent>
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
          <CardContent>- R$ 17.400,00</CardContent>
        </CardBody>
      </CardRoot>
      <CardRoot>
        <CardBody className="bg-product-green-dark">
          <CardHeader>
            <CardTitle>Total</CardTitle>
            <CardIcon>
              <CurrencyDollar className="size-8 text-white" />
            </CardIcon>
          </CardHeader>
          <CardContent>R$ 0,00</CardContent>
        </CardBody>
      </CardRoot>
    </div>
  )
}
