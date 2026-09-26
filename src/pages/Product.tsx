import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProduct, PRODUCTS, GENERAL_FAQS } from '../data/products'
import { getCollection } from '../data/collections'
import { reviewsFor, REVIEWS } from '../data/reviews'
import { useStore } from '../context/Store'
import { Accordion, Mascot, QtyStepper, TasteMeter } from '../components/Primitives'
import { Sparkle, Stars, Squiggle } from '../components/Doodles'
import { LeafIcon, PlusIcon, TruckIcon } from '../components/Icons'
import ProductCard from '../components/ProductCard'
import { ReviewNote } from '../components/ReviewSection'
import StickyAddToCart from '../components/StickyAddToCart'
import { CONFIG } from '../data/config'
import { cx, inr } from '../lib/format'
import NotFound from './NotFound'

function Gallery({ slides, bg, name }: { slides: { src: string; contain: boolean; alt: string }[]; bg: string; name: string }) {
  const [idx, setIdx] = useState(0)
  const track = useRef<HTMLDivElement>(null)
  const go = (i: number) => { const el = track.current; if (el) el.scrollTo({ left: el.clientWidth * i, behavior: 'smooth' }) }
  return (
    <div className="min-w-0 md:sticky md:top-28">
      <div className="relative overflow-hidden rounded-[28px] border-[2.5px] border-ink" style={{ background: bg }}>
        <div ref={track} onScroll={(e) => setIdx(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))} className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label={`${name} images`}>
          {slides.map((s, i) => (
            <div key={s.src + i} className="relative aspect-square w-full shrink-0 snap-center">
              {s.contain
                ? <img src={s.src} alt={s.alt} className="pack-shadow absolute left-1/2 top-1/2 h-[84%] w-auto -translate-x-1/2 -translate-y-1/2 -rotate-3" />
                : <img src={s.src} alt={s.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />}
            </div>
          ))}
        </div>
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 md:hidden">
          {slides.map((_, i) => <span key={i} className={cx('h-2.5 rounded-full border-2 border-ink transition-all', i === idx ? 'w-6 bg-ink' : 'w-2.5 bg-cream')} />)}
        </div>
      </div>
      <div className="mt-3 hidden gap-3 md:flex">
        {slides.map((s, i) => (
          <button key={s.src + i} onClick={() => go(i)} aria-label={`Show image ${i + 1}`} className={cx('relative h-20 w-20 overflow-hidden rounded-2xl border-[2.5px]', i === idx ? 'border-ink shadow-sticker-sm' : 'border-ink/20')} style={{ background: bg }}>
            <img src={s.src} alt="" className={s.contain ? 'mx-auto h-full w-auto p-1.5' : 'h-full w-full object-cover'} />
          </button>
        ))}
      </div>
    </div>
  )
}

function ratingSplit(r: number) {
  const five = Math.min(95, Math.round((r - 3.9) * 90))
  const four = Math.round((100 - five) * 0.72)
  const three = Math.round((100 - five - four) * 0.7)
  const two = Math.round((100 - five - four - three) * 0.7)
  return [five, four, three, two, Math.max(0, 100 - five - four - three - two)]
}

export default function Product() {
  const { slug = '' } = useParams()
  const p = getProduct(slug)
  const { add, totals } = useStore()
  const [qty, setQty] = useState(1)
  const [sticky, setSticky] = useState(false)
  const atc = useRef<HTMLDivElement>(null)

  useEffect(() => { setQty(1); if (p) document.title = `${p.name}, ${p.flavour} · Gollu` }, [p])
  useEffect(() => {
    const el = atc.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setSticky(!e.isIntersecting && e.boundingClientRect.top < 0), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [p])

  if (!p) return <NotFound />
  const col = p.collection !== 'mix' ? getCollection(p.collection) : null
  const pairs = p.pairsWith.map((s) => getProduct(s)!).filter(Boolean)
  const related = PRODUCTS.filter((x) => x.slug !== p.slug && (x.collection === p.collection || p.collection === 'mix')).slice(0, 4)
  const fill = related.length < 4 ? PRODUCTS.filter((x) => x.slug !== p.slug && !related.includes(x)).slice(0, 4 - related.length) : []
  const own = reviewsFor(p.slug)
  const reviews = [...own, ...REVIEWS.filter((r) => r.product !== p.slug)].slice(0, 6)
  const split = ratingSplit(p.rating)
  const doAdd = () => add('product', p.slug, qty, { open: true })
  const pouch = p.collection !== 'mix'
  const slides = [
    { src: p.pack, contain: true, alt: `${p.name} ${p.size}` },
    { src: p.inside, contain: false, alt: `What is inside ${p.name}: ${p.insideNotes}` },
    { src: p.extra, contain: false, alt: '' },
  ]

  return (
    <>
      <div className="wrap pb-16 pt-5 md:pt-8">
        <nav className="text-sm font-bold text-ink/70" aria-label="Breadcrumb">
          <Link to="/shop" className="hover:underline">Shop</Link>
          {col && <> / <Link to={`/collections/${col.slug}`} className="hover:underline">{col.name}</Link></>}
          {' / '}<span className="text-ink">{p.name}</span>
        </nav>

        <div className="mt-4 grid gap-8 md:grid-cols-[1.05fr_1fr] md:gap-12 lg:gap-16">
          <Gallery slides={slides} bg={p.soft} name={p.name} />

          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              {p.collection === 'detention' && <span className="-rotate-2 border-[2.5px] border-ink bg-mango px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-widest">Detention</span>}
              {p.isNew && <span className="sticker bg-pink px-3 py-0.5 text-xs">New</span>}
              <span className="sticker bg-white px-3 py-0.5 text-xs">100% veg</span>
            </div>
            <h1 className="display mt-3 text-[52px] md:text-[76px]">{p.name}</h1>
            <p className="font-hand text-2xl" style={{ color: p.onColor === 'ink' ? '#2B0F3D' : p.color }}>{p.flavour}</p>
            <a href="#reviews" className="mt-2 inline-flex items-center gap-2 text-sm font-bold"><Stars rating={p.rating} className="h-4" />{p.rating} · <span className="underline underline-offset-4">{p.reviews.toLocaleString('en-IN')} reviews</span></a>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="display text-[40px]">{inr(p.price)}</span>
              <span className="font-bold text-ink/70">{p.descriptor} · {p.size}</span>
            </div>
            <p className="mt-4 text-xl font-extrabold">“{p.personality}”</p>
            <p className="mt-3 text-[17px] leading-relaxed text-ink/85">{p.description}</p>

            {pouch && (
              <div className="mt-5 flex items-center gap-3 rounded-2xl border-2 border-dashed border-ink bg-white px-4 py-3 text-sm font-bold">
                <Sparkle className="h-6 w-6 shrink-0" color="#FF3D8B" />
                <span>{CONFIG.tiers.map((t) => t.label).reverse().join(' · ')}. Mix any flavours.{totals.pouchUnits > 0 && ` You have ${totals.pouchUnits} in your cart.`}</span>
              </div>
            )}

            <div ref={atc} className="mt-6 flex gap-3">
              <QtyStepper value={qty} onChange={(n) => setQty(Math.max(1, Math.min(20, n)))} />
              <button onClick={doAdd} className="btn btn-pink flex-1 py-4 text-base">Add to cart · {inr(p.price * qty)}</button>
            </div>

            <ul className="mt-5 grid grid-cols-3 gap-2 text-center text-xs font-bold">
              <li className="flex flex-col items-center gap-1 rounded-2xl bg-white p-3"><LeafIcon />100% veg, no gelatin</li>
              <li className="flex flex-col items-center gap-1 rounded-2xl bg-white p-3"><TruckIcon />Ships today before 2pm</li>
              <li className="flex flex-col items-center gap-1 rounded-2xl bg-white p-3"><span className="text-lg leading-5">₹</span>Free shipping over {inr(CONFIG.freeShippingThreshold)}</li>
            </ul>

            <div className="mt-8">
              <p className="font-hand text-xl">pairs well with</p>
              <ul className="mt-2 grid gap-2">
                {pairs.map((x) => (
                  <li key={x.slug} className="flex min-w-0 items-center gap-3 rounded-2xl border-2 border-ink/15 bg-white p-2 pr-3">
                    <Link to={`/products/${x.slug}`} className="grid h-16 w-16 shrink-0 place-items-center rounded-xl" style={{ background: x.soft }}><img src={x.pack} alt="" className="h-14 w-auto" /></Link>
                    <span className="min-w-0 flex-1"><Link to={`/products/${x.slug}`} className="block font-extrabold hover:underline">{x.name}</Link><span className="block truncate text-sm text-ink/70">{x.personality}</span></span>
                    <span className="font-extrabold">{inr(x.price)}</span>
                    <button onClick={() => add('product', x.slug, 1, { title: x.name, image: x.pack })} className="grid h-10 w-10 place-items-center rounded-full border-2 border-ink bg-mango shadow-sticker-sm" aria-label={`Add ${x.name}`}><PlusIcon className="h-4 w-4" /></button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <section className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-[28px] border-[2.5px] border-ink p-6 md:p-8" style={{ background: p.color, color: p.onColor === 'ink' ? '#2B0F3D' : '#FFF3DA' }}>
            <h2 className="display text-[34px] md:text-[44px]">Why you’ll like it</h2>
            <ul className="mt-5 grid gap-3 text-lg font-bold">
              {p.whyLike.map((w) => <li key={w} className="flex gap-3"><Sparkle className="mt-0.5 h-6 w-6 shrink-0" />{w}</li>)}
            </ul>
            <h3 className="display mt-8 text-[26px]">Taste profile</h3>
            <div className="mt-3"><TasteMeter notes={p.notes} dark={p.onColor === 'cream'} /></div>
          </div>
          <div className="grid gap-6">
            <div className="flex gap-5 rounded-[28px] border-[2.5px] border-ink bg-white p-5">
              <img src={p.inside} alt="" loading="lazy" className="h-36 w-28 shrink-0 rounded-2xl border-2 border-ink object-cover" />
              <div>
                <h2 className="display text-[30px]">What’s inside</h2>
                <p className="mt-2 font-semibold text-ink/80">{p.insideNotes}</p>
                <p className="mt-2 text-sm text-ink/70">Set with pectin. Coloured with plants. No gelatin, ever.</p>
              </div>
            </div>
            <div className="rounded-[28px] border-[2.5px] border-ink bg-white p-5">
              <h2 className="display text-[30px]">How to eat</h2>
              <ul className="mt-3 grid gap-2 font-semibold">
                {p.howToEat.map((h) => <li key={h} className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-ink" style={{ background: p.color }} />{h}</li>)}
              </ul>
            </div>
            <Accordion items={[
              { q: 'Ingredients', a: p.ingredients },
              { q: 'Allergens', a: p.allergens },
              { q: 'Storage', a: 'Cool, dry place, away from direct sun. Reseal after opening. Or do not, and finish it.' },
            ]} />
          </div>
        </section>

        <section id="reviews" className="mt-16 scroll-mt-24">
          <div className="grid gap-8 md:grid-cols-[300px_1fr]">
            <div>
              <h2 className="display text-[38px] md:text-[48px]">Reviews</h2>
              <Squiggle className="h-3 w-40 text-pink" />
              <div className="mt-5 flex items-center gap-3"><span className="display text-[56px] leading-none">{p.rating}</span><div><Stars rating={p.rating} className="h-5" /><p className="text-sm font-bold text-ink/70">{p.reviews.toLocaleString('en-IN')} reviews</p></div></div>
              <ul className="mt-4 grid gap-1.5">
                {split.map((v, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm font-bold"><span className="w-7">{5 - i}★</span><span className="h-3 flex-1 overflow-hidden rounded-full border-2 border-ink bg-white"><span className="block h-full bg-ink" style={{ width: `${v}%` }} /></span><span className="w-9 text-right">{v}%</span></li>
                ))}
              </ul>
              <Mascot pose="neutral" className="mt-6 hidden w-32 md:block" />
            </div>
            <div className="columns-1 gap-5 sm:columns-2">
              {reviews.map((r, i) => <ReviewNote key={r.name + r.product} r={r} i={i} />)}
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-8 md:grid-cols-[300px_1fr]">
          <h2 className="display text-[38px] md:text-[48px]">Questions, answered</h2>
          <Accordion items={[...p.faqs, ...GENERAL_FAQS]} defaultOpen={0} />
        </section>

        <section className="mt-16">
          <h2 className="display text-[38px] md:text-[48px]">{col ? `More from ${col.name}` : 'You might also want'}</h2>
          <div className="rail mt-6 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible">
            {[...related, ...fill].map((x) => <div key={x.slug} className="w-[62%] sm:w-[40%] md:w-auto"><ProductCard p={x} /></div>)}
          </div>
        </section>
      </div>
      <StickyAddToCart p={p} visible={sticky} onAdd={doAdd} qty={qty} />
    </>
  )
}
