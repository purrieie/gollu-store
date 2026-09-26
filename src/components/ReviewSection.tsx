import { Link } from 'react-router-dom'
import type { Review } from '../data/reviews'
import { getProduct } from '../data/products'
import { getBundle } from '../data/bundles'
import { Stars } from './Doodles'

const NOTE = ['#FFEFB8', '#FFD3E5', '#EFE5FF', '#E6F7CF', '#FFFFFF', '#D6DCFF']
const TILT = [-2, 1.5, -1, 2, -1.5, 1]

export function ReviewNote({ r, i }: { r: Review; i: number }) {
  const p = getProduct(r.product)
  const b = getBundle(r.product)
  return (
    <figure className="relative mb-5 break-inside-avoid rounded-[6px_18px_8px_16px] border-[2.5px] border-ink p-5 shadow-sticker" style={{ background: NOTE[i % NOTE.length], rotate: `${TILT[i % TILT.length]}deg` }}>
      <span className="tape -top-3 left-1/2 -translate-x-1/2" aria-hidden />
      <Stars rating={r.rating} className="h-4" />
      <blockquote className="mt-3 text-[17px] font-semibold leading-snug">“{r.text}”</blockquote>
      <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="font-extrabold">{r.name} <span className="font-semibold text-ink/60">· {r.city}</span></span>
        {(p || b) && (
          <Link to={p ? `/products/${p.slug}` : '/bundles'} className="rounded-full border-2 border-ink bg-white px-2.5 py-0.5 text-xs font-extrabold hover:bg-mango">
            {p?.name ?? b?.name}
          </Link>
        )}
      </figcaption>
    </figure>
  )
}

export default function ReviewSection({ reviews, title = 'Notes passed in class', sub }: { reviews: Review[]; title?: string; sub?: string }) {
  return (
    <div>
      <h2 className="display text-[38px] md:text-[56px]">{title}</h2>
      {sub && <p className="mt-2 text-lg font-semibold text-ink/70">{sub}</p>}
      <div className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {reviews.map((r, i) => <ReviewNote key={r.name + r.product} r={r} i={i} />)}
      </div>
    </div>
  )
}
