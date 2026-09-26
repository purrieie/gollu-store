import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BUNDLES } from '../data/bundles'
import { getProduct, pouches } from '../data/products'
import { useStore } from '../context/Store'
import BundleCard from '../components/BundleCard'
import { Mascot } from '../components/Primitives'
import { CloseIcon, PlusIcon } from '../components/Icons'
import { tierFor } from '../lib/pricing'
import { cx, inr } from '../lib/format'

const SLOTS = 5

function BoxBuilder() {
  const [picks, setPicks] = useState<string[]>([])
  const { add, setCartOpen } = useStore()
  const full = picks.length >= SLOTS
  const sum = picks.reduce((s, x) => s + (getProduct(x)?.price ?? 0), 0)
  const tier = tierFor(picks.length)
  const off = tier ? Math.round(sum * tier.rate) : 0
  const addBox = () => {
    const counts = picks.reduce<Record<string, number>>((m, s) => ({ ...m, [s]: (m[s] ?? 0) + 1 }), {})
    Object.entries(counts).forEach(([s, n]) => add('product', s, n, { open: false }))
    setPicks([])
    setCartOpen(true)
  }
  return (
    <section id="build" className="scroll-mt-24 rounded-[32px] border-[2.5px] border-ink bg-mango p-5 shadow-sticker-lg md:p-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="display text-[38px] md:text-[56px]">Build your own box</h2>
          <p className="mt-1 text-lg font-semibold">Pick any 5 pouches (repeats allowed) and save 15%. Stop at 3 and still save 10%.</p>
        </div>
        <Mascot pose="guilty" className="hidden w-28 md:block" />
      </div>
      <div className="mt-6 grid grid-cols-5 gap-2 md:gap-4" aria-live="polite">
        {Array.from({ length: SLOTS }).map((_, i) => {
          const p = picks[i] ? getProduct(picks[i]) : null
          return (
            <div key={i} className={cx('relative grid aspect-[3/4] place-items-center rounded-2xl border-[2.5px] border-ink', p ? '' : 'border-dashed bg-cream/60')} style={p ? { background: p.soft } : undefined}>
              {p ? (
                <>
                  <img src={p.pack} alt={p.name} className="h-[82%] w-auto animate-pop" />
                  <button onClick={() => setPicks(picks.filter((_, k) => k !== i))} className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full border-2 border-ink bg-cream" aria-label={`Remove ${p.name}`}><CloseIcon className="h-3.5 w-3.5" /></button>
                </>
              ) : <span className="display text-2xl text-ink/30 md:text-4xl">{i + 1}</span>}
            </div>
          )
        })}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {pouches.map((p) => (
          <button key={p.slug} disabled={full} onClick={() => setPicks([...picks, p.slug])} className="flex items-center gap-2 rounded-2xl border-2 border-ink bg-white p-2 text-left transition-transform hover:-translate-y-0.5 disabled:opacity-40">
            <span className="grid h-12 w-10 shrink-0 place-items-center rounded-lg" style={{ background: p.soft }}><img src={p.pack} alt="" className="h-11 w-auto" /></span>
            <span className="min-w-0 flex-1"><span className="block truncate text-sm font-extrabold">{p.name}</span><span className="text-xs font-bold text-ink/60">{inr(p.price)}</span></span>
            <PlusIcon className="h-4 w-4 shrink-0" />
          </button>
        ))}
      </div>
      <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border-[2.5px] border-ink bg-cream p-4 sm:flex-row sm:items-center">
        <div>
          <p className="font-extrabold">{picks.length}/{SLOTS} picked{tier ? ` · ${tier.label}` : picks.length ? ` · ${3 - picks.length} more for 10% off` : ''}</p>
          <p className="text-sm font-semibold text-ink/70">{picks.length ? <>{off > 0 && <s className="mr-2">{inr(sum)}</s>}<span className="text-base font-extrabold text-ink">{inr(sum - off)}</span></> : 'Tap a flavour to drop it in the box.'}</p>
        </div>
        <button disabled={!picks.length} onClick={addBox} className="btn btn-ink">Add box to cart</button>
      </div>
    </section>
  )
}

export default function Bundles() {
  const { add } = useStore()
  const tiffin = getProduct('tiffin-mix')!
  useEffect(() => { document.title = 'Bundles & boxes · Gollu' }, [])
  return (
    <>
      <section className="border-b-[2.5px] border-ink bg-cobalt text-cream">
        <div className="wrap flex items-end justify-between gap-6 py-10 md:py-14">
          <div>
            <p className="font-hand text-xl text-mango">more candy, less maths</p>
            <h1 className="display mt-1 text-[48px] md:text-[84px]">Bundles & boxes</h1>
            <p className="mt-3 max-w-lg text-lg font-semibold text-cream/85">Pre-packed boxes for every situation, or build your own. Savings are automatic, no codes needed.</p>
          </div>
          <Mascot pose="shades" className="hidden w-44 md:block" />
        </div>
      </section>
      <div className="wrap py-10 md:py-14">
        <div className="grid gap-6 md:grid-cols-3">{BUNDLES.map((b, i) => <BundleCard key={b.slug} b={b} featured={i === 2} />)}</div>

        <section className="mt-14 grid items-center gap-6 overflow-hidden rounded-[32px] border-[2.5px] border-ink bg-pink p-6 shadow-sticker md:grid-cols-2 md:p-10">
          <img src={tiffin.pack} alt="Tiffin Mix box with 10 mini pouches" loading="lazy" className="pack-shadow w-full -rotate-2" />
          <div>
            <span className="sticker bg-mango px-3 py-1 text-xs">Best for gifting</span>
            <h2 className="display mt-3 text-[40px] md:text-[60px]">Tiffin Mix</h2>
            <p className="mt-2 text-lg font-bold">10 mini pouches. All eight flavours plus two wildcards. One very pink box.</p>
            <p className="mt-2 text-ink/80">Perfect for trying everything, office desks, return gifts, and apologising.</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="display text-[38px]">{inr(tiffin.price)}</span>
              <button onClick={() => add('product', 'tiffin-mix', 1, { open: true })} className="btn btn-ink">Add Tiffin Mix</button>
              <Link to="/products/tiffin-mix" className="font-extrabold underline underline-offset-4">Details</Link>
            </div>
          </div>
        </section>

        <div className="mt-14"><BoxBuilder /></div>
      </div>
    </>
  )
}
