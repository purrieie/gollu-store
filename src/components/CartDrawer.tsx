import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/Store'
import { bestsellers, getProduct } from '../data/products'
import { getBundle } from '../data/bundles'
import { CONFIG } from '../data/config'
import { bundleValue, unitPrice } from '../lib/pricing'
import { CloseIcon, PlusIcon, TrashIcon } from './Icons'
import { Mascot, QtyStepper } from './Primitives'
import { cx, inr } from '../lib/format'

export default function CartDrawer() {
  const { cartOpen, setCartOpen, items, totals, setQty, remove, add } = useStore()
  const nav = useNavigate()
  const close = () => setCartOpen(false)
  const inCart = new Set(items.filter((i) => i.kind === 'product').map((i) => i.slug))
  const upsell = bestsellers.filter((p) => !inCart.has(p.slug)).slice(0, 3)
  const pct = Math.min(100, (totals.afterDiscount / CONFIG.freeShippingThreshold) * 100)

  return (
    <div className={cx('fixed inset-0 z-50 transition-[visibility] duration-300', cartOpen ? 'visible' : 'invisible pointer-events-none')} aria-hidden={!cartOpen}>
      <div className={cx('absolute inset-0 bg-ink/50 transition-opacity', cartOpen ? 'opacity-100' : 'opacity-0')} onClick={close} />
      <aside role="dialog" aria-modal="true" aria-label="Cart" className={cx('absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col border-l-[2.5px] border-ink bg-cream transition-transform duration-300', cartOpen ? 'translate-x-0' : 'translate-x-full')}>
        <div className="flex items-center justify-between border-b-[2.5px] border-ink bg-mango px-5 py-4">
          <h2 className="display text-[28px]">Your stash <span className="font-sans text-lg font-extrabold">({totals.count})</span></h2>
          <button onClick={close} className="grid h-10 w-10 place-items-center rounded-full border-2 border-ink bg-cream" aria-label="Close cart"><CloseIcon className="h-5 w-5" /></button>
        </div>

        {items.length > 0 && (
          <div className="border-b-2 border-ink/15 px-5 py-4">
            <p className="text-sm font-bold">
              {totals.freeShip ? <>Free shipping unlocked. Gollu is doing a little dance.</> : <><span className="text-pink">{inr(totals.toFreeShip)}</span> away from free shipping</>}
            </p>
            <div className="relative mt-3 h-4 rounded-full border-2 border-ink bg-white">
              <div className="h-full rounded-full bg-pink transition-[width] duration-500" style={{ width: `${pct}%` }} />
              <img src="/images/logo-icon.webp" alt="" className="absolute top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transition-[left] duration-500" style={{ left: `${Math.max(4, pct)}%` }} />
            </div>
            {totals.next && totals.pouchUnits > 0 && (
              <p className="mt-3 rounded-xl bg-white px-3 py-2 text-sm font-semibold">
                Add {totals.next.minUnits - totals.pouchUnits} more pouch{totals.next.minUnits - totals.pouchUnits > 1 ? 'es' : ''} to save {Math.round(totals.next.rate * 100)}% on pouches.
              </p>
            )}
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-center">
              <Mascot pose="guilty" className="w-40" />
              <p className="display mt-4 text-3xl">Suspiciously empty.</p>
              <p className="mt-2 text-ink/70">Your cart has the same energy as a tiffin at 11am. Let us fix that.</p>
              <Link to="/shop" onClick={close} className="btn btn-pink mt-6">Shop the good stuff</Link>
            </div>
          ) : (
            <ul className="divide-y-2 divide-ink/10">
              {items.map((it) => {
                const p = it.kind === 'product' ? getProduct(it.slug) : null
                const b = it.kind === 'bundle' ? getBundle(it.slug) : null
                const img = p?.pack ?? getProduct(b?.items[0] ?? '')?.pack
                const bg = p?.soft ?? b?.color
                return (
                  <li key={it.key} className="flex gap-4 py-4">
                    <Link to={p ? `/products/${p.slug}` : '/bundles'} onClick={close} className="grid h-24 w-20 shrink-0 place-items-center rounded-2xl border-2 border-ink" style={{ background: bg }}>
                      {b ? <span className="flex -space-x-6">{b.items.slice(0, 2).map((s) => <img key={s} src={getProduct(s)?.pack} alt="" className="h-16 w-auto" />)}</span> : <img src={img} alt="" className="h-20 w-auto" />}
                    </Link>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-extrabold leading-tight">{p?.name ?? b?.name}</p>
                          <p className="text-sm text-ink/70">{p ? `${p.flavour} · ${p.size}` : `${b?.items.length} pouches · worth ${inr(bundleValue(it.slug))}`}</p>
                        </div>
                        <button onClick={() => remove(it.key)} className="grid h-8 w-8 shrink-0 place-items-center rounded-full hover:bg-pink/30" aria-label={`Remove ${p?.name ?? b?.name}`}><TrashIcon /></button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <QtyStepper size="sm" value={it.qty} onChange={(n) => setQty(it.key, n)} />
                        <span className="font-extrabold">{inr(unitPrice(it) * it.qty)}</span>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}

          {upsell.length > 0 && (
            <div className="py-5">
              <p className="font-hand text-xl">you might also want…</p>
              <ul className="mt-3 grid gap-2">
                {upsell.map((p) => (
                  <li key={p.slug} className="flex min-w-0 items-center gap-3 rounded-2xl border-2 border-ink/15 bg-white p-2 pr-2">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl" style={{ background: p.soft }}><img src={p.pack} alt="" className="h-12 w-auto" /></span>
                    <span className="min-w-0 flex-1"><span className="block text-sm font-extrabold">{p.name}</span><span className="block truncate text-xs text-ink/70">{p.personality}</span></span>
                    <span className="text-sm font-extrabold">{inr(p.price)}</span>
                    <button onClick={() => add('product', p.slug, 1, { open: true })} className="grid h-9 w-9 place-items-center rounded-full border-2 border-ink bg-mango shadow-sticker-sm" aria-label={`Add ${p.name}`}><PlusIcon className="h-4 w-4" /></button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t-[2.5px] border-ink bg-white px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
            <dl className="grid gap-1 text-sm">
              <div className="flex justify-between"><dt>Subtotal</dt><dd className="font-bold">{inr(totals.subtotal)}</dd></div>
              {totals.discount > 0 && <div className="flex justify-between text-[#1f8a4c]"><dt>{totals.tier?.label}</dt><dd className="font-bold">−{inr(totals.discount)}</dd></div>}
              <div className="flex justify-between"><dt>Shipping</dt><dd className="font-bold">{totals.shipping ? inr(totals.shipping) : 'Free'}</dd></div>
            </dl>
            <button className="btn btn-pink mt-4 w-full py-4 text-base" onClick={() => { close(); nav('/checkout') }}>Checkout · {inr(totals.total)}</button>
            <p className="mt-2 text-center text-xs font-semibold text-ink/60">UPI, cards and cash on delivery. Ships same day before 2pm.</p>
          </div>
        )}
      </aside>
    </div>
  )
}
