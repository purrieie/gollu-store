import { Link } from 'react-router-dom'
import type { Product } from '../data/products'
import { useStore } from '../context/Store'
import { Stars } from './Doodles'
import { PlusIcon } from './Icons'
import { cx, inr } from '../lib/format'

export default function ProductCard({ p, shelf = false, priority = false }: { p: Product; shelf?: boolean; priority?: boolean }) {
  const { add } = useStore()
  const badge = p.isNew ? { t: 'New!', c: 'bg-mango' } : p.rank <= 2 ? { t: 'Bestseller', c: 'bg-pink' } : p.collection === 'mix' ? { t: 'Great gift', c: 'bg-mango' } : null
  return (
    <article className={cx('group relative flex flex-col', shelf && 'px-2 md:px-3')}>
      <Link to={`/products/${p.slug}`} className="relative block aspect-[4/5] overflow-hidden rounded-[22px] border-[2.5px] border-ink" style={{ background: p.soft }} aria-label={`${p.name}, ${p.flavour}`}>
        <div className="absolute inset-0 opacity-60" style={{ background: `radial-gradient(circle at 50% 60%, ${p.color}55, transparent 62%)` }} />
        <img src={p.pack} alt="" loading={priority ? 'eager' : 'lazy'} className={cx('pack-shadow absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-[1.04]', p.collection === 'mix' ? 'h-auto w-[88%]' : 'h-[80%] w-auto')} />
        <img src={p.inside} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 [@media(hover:none)]:hidden" />
        <span className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-2 rounded-xl border-2 border-ink bg-cream px-3 py-2 text-center font-hand text-[17px] leading-tight opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 [@media(hover:none)]:hidden">{p.hoverLine}</span>
        {badge && <span className={cx('sticker absolute left-3 top-3 -rotate-6 px-3 py-1 text-xs', badge.c)}>{badge.t}</span>}
        {p.collection === 'detention' && <span className="absolute right-3 top-3 rotate-6 border-2 border-ink bg-mango px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider">Detention</span>}
      </Link>
      {shelf && <div className="relative z-[1] -mx-2 -mt-3 h-4 border-y-[2.5px] border-ink bg-mango md:-mx-3" aria-hidden />}
      <div className="flex flex-1 flex-col pt-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="display text-[20px] md:text-[24px]"><Link to={`/products/${p.slug}`} className="hover:underline decoration-pink decoration-4 underline-offset-4">{p.name}</Link></h3>
          <span className="pt-0.5 text-[15px] font-extrabold md:text-base">{inr(p.price)}</span>
        </div>
        <p className="mt-0.5 text-[13px] font-semibold text-ink/75 md:text-sm">{p.flavour}</p>
        <p className="text-[13px] text-ink/60 md:text-sm">{p.descriptor} · {p.size}</p>
        <div className="mt-1.5 flex items-center gap-1.5 text-xs font-bold"><Stars rating={p.rating} className="h-3.5" />{p.rating} <span className="font-semibold text-ink/55">({p.reviews.toLocaleString('en-IN')})</span></div>
        <button onClick={() => add('product', p.slug, 1, { title: p.name, image: p.pack })} className="btn btn-ink btn-sm mt-3 w-full" aria-label={`Quick add ${p.name}`}>
          <PlusIcon className="h-4 w-4" /> Quick add
        </button>
      </div>
    </article>
  )
}
