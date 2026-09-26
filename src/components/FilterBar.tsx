import { TASTE_LABELS, type Taste } from '../data/products'
import { cx } from '../lib/format'

export type SortKey = 'featured' | 'bestselling' | 'price-asc' | 'price-desc' | 'rating'
export const SORTS: [SortKey, string][] = [['featured', 'Featured'], ['bestselling', 'Bestselling'], ['rating', 'Top rated'], ['price-asc', 'Price: low to high'], ['price-desc', 'Price: high to low']]

interface Props {
  tastes: Taste[]
  onToggleTaste: (t: Taste) => void
  collection?: string
  onCollection?: (c: string) => void
  sort: SortKey
  onSort: (s: SortKey) => void
  count: number
  onClear: () => void
}

export default function FilterBar({ tastes, onToggleTaste, collection, onCollection, sort, onSort, count, onClear }: Props) {
  const active = tastes.length > 0 || (collection && collection !== 'all')
  return (
    <div className="sticky top-16 z-30 -mx-4 border-y-2 border-ink/15 bg-cream/95 px-4 py-3 backdrop-blur md:top-[76px] md:mx-0 md:rounded-2xl md:border-2 md:px-4">
      <div className="flex items-center gap-3">
        <div className="rail flex-1 items-center !pb-0">
          {onCollection && (['all', 'tuck-shop', 'detention', 'mix'] as const).map((c) => (
            <button key={c} onClick={() => onCollection(c)} aria-pressed={collection === c} className={cx('chip', collection === c ? 'bg-ink text-cream' : 'bg-white hover:bg-mango/60')}>
              {{ all: 'All', 'tuck-shop': 'Tuck Shop', detention: 'Detention', mix: 'Boxes' }[c]}
            </button>
          ))}
          {onCollection && <span className="h-6 w-0.5 bg-ink/20" aria-hidden />}
          {(Object.keys(TASTE_LABELS) as Taste[]).map((t) => (
            <button key={t} onClick={() => onToggleTaste(t)} aria-pressed={tastes.includes(t)} className={cx('chip', tastes.includes(t) ? 'bg-pink' : 'bg-white hover:bg-mango/60')}>
              {TASTE_LABELS[t]}
            </button>
          ))}
          {active && <button onClick={onClear} className="whitespace-nowrap px-2 text-sm font-extrabold underline underline-offset-4">Clear</button>}
        </div>
        <label className="hidden shrink-0 items-center gap-2 text-sm font-bold md:flex">
          Sort
          <select value={sort} onChange={(e) => onSort(e.target.value as SortKey)} className="rounded-full border-2 border-ink bg-white px-3 py-2 font-bold">
            {SORTS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </select>
        </label>
      </div>
      <div className="mt-2 flex items-center justify-between md:hidden">
        <span className="text-sm font-bold text-ink/70">{count} {count === 1 ? 'product' : 'products'}</span>
        <select aria-label="Sort" value={sort} onChange={(e) => onSort(e.target.value as SortKey)} className="rounded-full border-2 border-ink bg-white px-3 py-1.5 text-sm font-bold">
          {SORTS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
        </select>
      </div>
    </div>
  )
}
