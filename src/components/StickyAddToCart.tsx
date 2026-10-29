import type { Product } from '../data/products'
import { cx, inr } from '../lib/format'

export default function StickyAddToCart({ p, visible, onAdd, qty }: { p: Product; visible: boolean; onAdd: () => void; qty: number }) {
  return (
    <div className={cx('fixed inset-x-0 bottom-0 z-40 border-t-[2.5px] border-ink bg-cream px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300', visible ? 'translate-y-0' : 'translate-y-full')} aria-hidden={!visible}>
      <div className="mx-auto flex max-w-[1320px] items-center gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border-2 border-ink" style={{ background: p.soft }}><img src={p.pack} alt="" className="h-10 w-auto" /></span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-extrabold leading-tight">{p.name}</p>
          <p className="truncate text-xs font-semibold text-ink/70">{p.flavour} · {inr(p.price)}</p>
        </div>
        <button data-add-to-cart onClick={onAdd} tabIndex={visible ? 0 : -1} className="btn btn-pink shrink-0 px-5">Add{qty > 1 ? ` ${qty}` : ''} · {inr(p.price * qty)}</button>
      </div>
    </div>
  )
}
