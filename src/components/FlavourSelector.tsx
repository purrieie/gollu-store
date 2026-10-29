import { useState } from 'react'
import { Link } from 'react-router-dom'
import { pouches } from '../data/products'
import { useStore } from '../context/Store'
import { TasteMeter } from './Primitives'
import { Sparkle } from './Doodles'
import { cx, inr } from '../lib/format'

export default function FlavourSelector() {
  const [slug, setSlug] = useState('raw-deal')
  const { add } = useStore()
  const p = pouches.find((x) => x.slug === slug)!
  const dark = p.onColor === 'cream'
  return (
    <section id="flavours" className="scroll-mt-24 py-12 md:py-16" aria-labelledby="pick-h">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 id="pick-h" className="display text-[38px] md:text-[56px]">Pick your poison</h2>
          <p className="font-hand text-xl">eight flavours, zero boring ones</p>
        </div>
        <div className="mt-7 grid gap-5 md:grid-cols-[300px_1fr]">
          <div role="tablist" aria-label="Flavours" className="rail min-w-0 md:m-0 md:grid md:gap-2 md:overflow-visible md:p-0">
            {pouches.map((x) => (
              <button key={x.slug} role="tab" aria-selected={x.slug === slug} onClick={() => setSlug(x.slug)}
                className={cx('flex items-center gap-3 rounded-full border-[2.5px] border-ink px-3 py-2 text-left transition-all md:rounded-2xl md:px-4 md:py-3', x.slug === slug ? 'bg-ink text-cream shadow-sticker md:translate-x-2' : 'bg-white hover:bg-mango/50')}>
                <span className="h-6 w-6 shrink-0 rounded-full border-2 border-ink" style={{ background: x.color }} />
                <span className="whitespace-nowrap"><span className="block font-extrabold leading-tight">{x.name}</span><span className={cx('hidden text-xs md:block', x.slug === slug ? 'text-cream/70' : 'text-ink/60')}>{x.flavour}</span></span>
              </button>
            ))}
          </div>
          <div role="tabpanel" key={p.slug} className="relative grid animate-pop overflow-hidden rounded-[32px] border-[2.5px] border-ink p-6 shadow-sticker-lg md:grid-cols-[1fr_1.1fr] md:p-10" style={{ background: p.color, color: dark ? '#FFF3DA' : '#2B0F3D' }}>
            <Sparkle className="absolute right-6 top-6 h-10 w-10" />
            <div className="relative order-2 md:order-1">
              <p className="font-hand text-xl opacity-90">{p.flavour}</p>
              <h3 className="display mt-1 text-[48px] md:text-[76px]">{p.name}</h3>
              <p className="mt-3 max-w-md text-xl font-bold">“{p.personality}”</p>
              <div className="mt-6"><TasteMeter notes={p.notes} dark={dark} /></div>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button data-add-to-cart onClick={() => add('product', p.slug, 1, { title: p.name, image: p.pack })} className={cx('btn', dark ? 'btn-cream' : 'btn-ink')}>Add to cart · {inr(p.price)}</button>
                <Link to={`/products/${p.slug}`} className="font-extrabold underline decoration-2 underline-offset-4">Meet {p.name}</Link>
              </div>
            </div>
            <div className="relative order-1 grid place-items-center md:order-2">
              <div className="absolute h-[80%] w-[80%] rounded-full border-[2.5px] border-dashed opacity-40" style={{ borderColor: dark ? '#FFF3DA' : '#2B0F3D' }} />
              <img src={p.pack} alt={`${p.name} pouch`} className="pack-shadow relative h-[260px] w-auto rotate-6 md:h-[400px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
