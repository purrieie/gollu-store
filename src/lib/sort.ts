import type { Product } from '../data/products'
import type { SortKey } from '../components/FilterBar'
export function sortProducts(list: Product[], sort: SortKey) {
  const l = [...list]
  if (sort === 'bestselling') l.sort((a, b) => b.reviews - a.reviews)
  if (sort === 'rating') l.sort((a, b) => b.rating - a.rating)
  if (sort === 'price-asc') l.sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') l.sort((a, b) => b.price - a.price)
  if (sort === 'featured') l.sort((a, b) => a.rank - b.rank)
  return l
}
