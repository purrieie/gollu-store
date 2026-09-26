import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PRODUCTS, type Taste } from '../data/products'
import { MOOD_TITLES } from '../data/cravings'
import { search } from '../lib/search'
import FilterBar from '../components/FilterBar'
import ProductGrid from '../components/ProductGrid'
import FlavourSelector from '../components/FlavourSelector'
import BundleCTA from '../components/BundleCTA'
import { Mascot } from '../components/Primitives'
import { useFilters } from '../lib/useFilters'
import { CloseIcon } from '../components/Icons'

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const mood = params.get('mood') ?? ''
  const base = useMemo(() => {
    let l = PRODUCTS
    if (q) l = search(q).products
    if (mood) l = l.filter((p) => p.moods.includes(mood))
    return l
  }, [q, mood])
  const taste = params.get('taste') as Taste | null
  const f = useFilters(base, taste ? [taste] : [])
  useEffect(() => { document.title = 'Shop all candy · Gollu' }, [])
  const title = q ? `Results for “${q}”` : mood ? MOOD_TITLES[mood] ?? 'Shop everything' : 'The whole shop'
  const clearParam = () => setParams({})

  return (
    <>
      <section className="border-b-[2.5px] border-ink bg-pink">
        <div className="wrap relative flex items-end justify-between gap-4 py-10 md:py-14">
          <div>
            <p className="font-hand text-xl">{f.list.length} {f.list.length === 1 ? "thing" : "things"}, all of them good</p>
            <h1 className="display mt-1 text-[48px] md:text-[80px]">{title}</h1>
            {(q || mood) && (
              <button onClick={clearParam} className="chip mt-4 bg-cream">{q ? `Search: ${q}` : `Mood: ${MOOD_TITLES[mood] ?? mood}`}<CloseIcon className="h-4 w-4" /></button>
            )}
          </div>
          <Mascot pose="shades" className="hidden w-44 md:block" />
        </div>
      </section>
      <div className="wrap py-6 md:py-8">
        <FilterBar tastes={f.tastes} onToggleTaste={f.toggle} collection={f.collection} onCollection={f.setCollection} sort={f.sort} onSort={f.setSort} count={f.list.length} onClear={f.clear} />
        <div className="mt-8">
          {f.list.length ? <ProductGrid products={f.list} /> : (
            <div className="flex flex-col items-center py-16 text-center">
              <Mascot pose="guilty" className="w-36" />
              <p className="display mt-4 text-3xl">Nothing matches all of that.</p>
              <p className="mt-2 text-ink/70">Remove a filter or two and try again.</p>
              <button onClick={() => { f.clear(); clearParam() }} className="btn btn-pink mt-5">Show everything</button>
            </div>
          )}
        </div>
        <BundleCTA />
      </div>
      <div className="border-t-[2.5px] border-ink bg-cream-deep"><FlavourSelector /></div>
    </>
  )
}
