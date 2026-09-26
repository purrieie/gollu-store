import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCollection, COLLECTIONS } from '../data/collections'
import { PRODUCTS } from '../data/products'
import FilterBar from '../components/FilterBar'
import ProductGrid from '../components/ProductGrid'
import BundleCTA from '../components/BundleCTA'
import { Mascot } from '../components/Primitives'
import { Sparkle } from '../components/Doodles'
import { useFilters } from '../lib/useFilters'
import NotFound from './NotFound'

export default function Collection() {
  const { slug = '' } = useParams()
  const c = getCollection(slug)
  const base = useMemo(() => PRODUCTS.filter((p) => p.collection === slug), [slug])
  const f = useFilters(base)
  useEffect(() => { if (c) document.title = `${c.name} · Gollu` }, [c])
  if (!c) return <NotFound />
  const other = COLLECTIONS.find((x) => x.slug !== c.slug)!
  const detention = c.slug === 'detention'

  return (
    <>
      <section className="relative overflow-hidden border-b-[2.5px] border-ink" style={{ background: c.color, color: c.textColor }}>
        {detention && <div className="h-5 border-b-[2.5px] border-ink" style={{ background: 'repeating-linear-gradient(-45deg,#FFC928 0 18px,#2B0F3D 18px 36px)' }} aria-hidden />}
        <div className="wrap grid items-center gap-6 py-10 md:grid-cols-[1.15fr_1fr] md:py-14">
          <div className="relative z-10">
            <nav className="text-sm font-bold opacity-80" aria-label="Breadcrumb"><Link to="/shop" className="underline underline-offset-4">Shop</Link> / {c.name}</nav>
            <h1 className="display mt-3 text-[54px] md:text-[72px] lg:text-[88px]">{c.name}</h1>
            <p className="mt-1 font-hand text-2xl">{c.line}</p>
            <p className="mt-4 max-w-lg text-lg font-semibold opacity-90">{c.description}</p>
          </div>
          <div className="relative flex h-[230px] items-end justify-center overflow-hidden md:h-[340px]">
            <Sparkle className="absolute right-6 top-2 h-12 w-12" color={detention ? '#FF3D8B' : '#FFF3DA'} />
            {base.map((p, i) => {
              const mid = (base.length - 1) / 2
              return <Link key={p.slug} to={`/products/${p.slug}`} className="-mx-7 transition-transform hover:-translate-y-3 md:-mx-10" style={{ rotate: `${(i - mid) * 8}deg`, zIndex: 10 - Math.abs(i - mid) }}><img src={p.pack} alt={p.name} className="pack-shadow h-[190px] w-auto md:h-[250px] lg:h-[280px]" /></Link>
            })}
          </div>
        </div>
      </section>
      <div className="wrap py-6 md:py-8">
        <FilterBar tastes={f.tastes} onToggleTaste={f.toggle} sort={f.sort} onSort={f.setSort} count={f.list.length} onClear={f.clear} />
        <div className="mt-8">
          {f.list.length ? <ProductGrid products={f.list} /> : <p className="py-12 text-center font-semibold">No flavours match those filters. <button className="underline" onClick={f.clear}>Clear filters</button></p>}
        </div>
        <BundleCTA color={detention ? '#FFC928' : '#5B2A86'} text={detention ? '#2B0F3D' : '#FFF3DA'} />
        <section className="mt-16 grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="relative">
            <img src={detention ? '/images/hero-main.webp' : '/images/story-kitchen.webp'} alt="" loading="lazy" className="aspect-[4/3] w-full -rotate-1 rounded-[28px] border-[2.5px] border-ink object-cover shadow-sticker" />
            <Mascot pose={detention ? 'pucker' : 'neutral'} className="absolute -bottom-6 -right-2 w-28 md:w-36" />
          </div>
          <div>
            <h2 className="display text-[36px] md:text-[52px]">{c.editorialTitle}</h2>
            {c.editorial.map((t) => <p key={t} className="mt-4 text-lg font-semibold leading-relaxed text-ink/85">{t}</p>)}
            <Link to={`/collections/${other.slug}`} className="btn btn-mango mt-7">Visit {other.name}</Link>
          </div>
        </section>
      </div>
    </>
  )
}
