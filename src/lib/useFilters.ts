import { useMemo, useState } from 'react'
import type { Product, Taste } from '../data/products'
import type { SortKey } from '../components/FilterBar'
import { sortProducts } from './sort'

export function useFilters(base: Product[], initialTastes: Taste[] = []) {
  const [tastes, setTastes] = useState<Taste[]>(initialTastes)
  const [collection, setCollection] = useState('all')
  const [sort, setSort] = useState<SortKey>('featured')
  const list = useMemo(() => {
    let l = base
    if (collection !== 'all') l = l.filter((p) => p.collection === collection)
    if (tastes.length) l = l.filter((p) => tastes.every((t) => p.tastes.includes(t)))
    return sortProducts(l, sort)
  }, [base, tastes, collection, sort])
  const toggle = (t: Taste) => setTastes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))
  const clear = () => { setTastes([]); setCollection('all') }
  return { list, tastes, toggle, collection, setCollection, sort, setSort, clear }
}
