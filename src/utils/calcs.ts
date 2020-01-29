import { GetOrderQuery } from '../API'

export const orderTotalUSD = (ord: GetOrderQuery['getOrder']): number => {
  if (!ord || !ord.products || !ord.products.items || ord.products.items.length === 0) {
    return 0
  }
  const totalCents = ord.products.items.reduce((acc, oitem) => {
    if (oitem) {
      return acc + oitem.pitemPricecentsSel * oitem.pitemQuantity
    }
    return acc
  }, 0)
  return totalCents / 100
}
