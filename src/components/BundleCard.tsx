import type { Bundle } from '../data/bundles'
import { getProduct } from '../data/products'
import { useStore } from '../context/Store'
import { bundleValue } from '../lib/pricing'
import { cx, inr } from '../lib/format'

export default function BundleCard({ b, featured = false }: { b: Bundle; featured?: boolean }) {
  const { add } = useStore()
  const value = bundleValue(b.slug)
  const save = value - b.price
  const dark = b.onColor === 'cream'
  const shown = b.items.slice(0, 5)
  return (
    <article id={b.slug} className={cx('relative flex scroll-mt-28 flex-col overflow-hidden rounded-[28px] border-[2.5px] border-ink p-5 shadow-sticker md:p-6', featured && 'md:shadow-sticker-lg')} style={{ background: b.color, color: dark ? '#FFF3DA' : '#2B0F3D' }}>
      <span className="sticker absolute right-4 top-4 z-[2] rotate-6 bg-mango px-3 py-1 text-xs text-ink">{b.sticker}</span>
      <div className="relative flex h-44 items-end justify-center md:h-52">
        {shown.map((s, i) => {
          const mid = (shown.length - 1) / 2
          return <img key={s} src={getProduct(s)?.pack} alt="" loading="lazy" className="pack-shadow -mx-6 h-36 w-auto md:-mx-7 md:h-44" style={{ rotate: `${(i - mid) * 8}deg`, zIndex: 10 - Math.abs(i - mid), marginBottom: `${Math.abs(i - mid) * 6}px` }} />
        })}
        {b.items.length > shown.length && <span className="sticker absolute bottom-2 right-2 z-20 bg-cream px-2.5 py-1 text-xs text-ink">+{b.items.length - shown.length} more</span>}
      </div>
      <h3 className="display mt-4 text-[32px] md:text-[38px]">{b.name}</h3>
      <p className="mt-1 font-bold">{b.line}</p>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {b.items.map((s) => <li key={s} className="rounded-full border-2 border-current px-2.5 py-0.5 text-xs font-bold">{getProduct(s)?.name}</li>)}
      </ul>
      <div className="mt-auto flex items-end justify-between gap-3 pt-6">
        <div>
          <p className="text-sm font-semibold opacity-80">Worth <s>{inr(value)}</s></p>
          <p className="display text-[34px]">{inr(b.price)}</p>
          <p className="text-sm font-extrabold">You save {inr(save)}</p>
        </div>
        <button data-add-to-cart onClick={() => add('bundle', b.slug, 1, { open: true })} className={cx('btn', dark ? 'btn-cream' : 'btn-ink')}>Add bundle</button>
      </div>
    </article>
  )
}
