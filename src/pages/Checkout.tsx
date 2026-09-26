import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/Store'
import { getProduct } from '../data/products'
import { getBundle } from '../data/bundles'
import { unitPrice } from '../lib/pricing'
import { Mascot } from '../components/Primitives'
import { cx, inr } from '../lib/format'

// Front-end checkout. Swap `placeOrder` for your payment/order backend (Shopify Storefront, Razorpay, etc.).
type Pay = 'upi' | 'card' | 'cod'
const FIELDS: { k: string; label: string; type?: string; half?: boolean; auto?: string; pattern?: string }[] = [
  { k: 'phone', label: 'Mobile number', type: 'tel', half: true, auto: 'tel', pattern: '[0-9+ ]{10,14}' },
  { k: 'email', label: 'Email', type: 'email', half: true, auto: 'email' },
  { k: 'name', label: 'Full name', auto: 'name' },
  { k: 'address', label: 'Flat, building, street', auto: 'street-address' },
  { k: 'city', label: 'City', half: true, auto: 'address-level2' },
  { k: 'pincode', label: 'Pincode', half: true, auto: 'postal-code', pattern: '[0-9]{6}' },
]

export default function Checkout() {
  const { items, totals, clear } = useStore()
  const [pay, setPay] = useState<Pay>('upi')
  const [form, setForm] = useState<Record<string, string>>({})
  const [order, setOrder] = useState<string | null>(null)
  useEffect(() => { document.title = 'Checkout · Gollu' }, [])

  if (order) return (
    <div className="wrap flex flex-col items-center py-16 text-center">
      <Mascot pose="wave" className="w-48" />
      <h1 className="display mt-4 text-[48px] md:text-[68px]">Order {order} is in.</h1>
      <p className="mt-3 max-w-md text-lg font-semibold text-ink/75">We will WhatsApp you tracking details soon. Your candy is being packed by someone who will definitely not eat any.</p>
      <Link to="/" className="btn btn-pink mt-7">Back to the shop</Link>
    </div>
  )

  if (!items.length) return (
    <div className="wrap flex flex-col items-center py-16 text-center">
      <Mascot pose="guilty" className="w-40" />
      <h1 className="display mt-4 text-[44px]">Nothing to check out yet.</h1>
      <Link to="/shop" className="btn btn-pink mt-6">Shop the good stuff</Link>
    </div>
  )

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setOrder('#GL' + Math.floor(10000 + Math.random() * 89999))
    clear()
    window.scrollTo(0, 0)
  }

  return (
    <div className="wrap grid gap-8 py-8 md:grid-cols-[1.3fr_1fr] md:gap-12 md:py-12">
      <form onSubmit={placeOrder} className="order-2 md:order-1">
        <h1 className="display text-[44px] md:text-[60px]">Checkout</h1>
        <fieldset className="mt-6">
          <legend className="text-lg font-extrabold">Where should we send it?</legend>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {FIELDS.map((f) => (
              <label key={f.k} className={cx('grid gap-1 text-sm font-bold', f.half ? 'col-span-2 sm:col-span-1' : 'col-span-2')}>
                {f.label}
                <input required type={f.type ?? 'text'} autoComplete={f.auto} pattern={f.pattern} value={form[f.k] ?? ''} onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                  className="rounded-2xl border-[2.5px] border-ink bg-white px-4 py-3 text-base font-semibold outline-none focus:shadow-sticker-sm" />
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="mt-8">
          <legend className="text-lg font-extrabold">How would you like to pay?</legend>
          <div className="mt-3 grid gap-2">
            {([['upi', 'UPI', 'GPay, PhonePe, Paytm, any UPI app'], ['card', 'Card', 'Debit or credit, all major cards'], ['cod', 'Cash on delivery', 'Pay when the candy arrives']] as [Pay, string, string][]).map(([k, l, d]) => (
              <label key={k} className={cx('flex cursor-pointer items-center gap-3 rounded-2xl border-[2.5px] p-4', pay === k ? 'border-ink bg-mango/40' : 'border-ink/20 bg-white')}>
                <input type="radio" name="pay" checked={pay === k} onChange={() => setPay(k)} className="h-5 w-5 accent-[#2B0F3D]" />
                <span><span className="block font-extrabold">{l}</span><span className="text-sm text-ink/70">{d}</span></span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className="mt-6 grid gap-1 text-sm font-bold">Gift note (optional)
          <textarea rows={2} className="rounded-2xl border-[2.5px] border-ink bg-white px-4 py-3 text-base font-semibold outline-none" placeholder="We will handwrite it. Badly, but with love." />
        </label>
        <button className="btn btn-pink mt-8 w-full py-4 text-lg">Place order · {inr(totals.total)}</button>
        <p className="mt-3 text-center text-xs font-semibold text-ink/60">By placing your order you agree to our terms. Ships same day before 2pm.</p>
      </form>

      <aside className="order-1 h-fit rounded-[28px] border-[2.5px] border-ink bg-white p-5 shadow-sticker md:sticky md:top-28 md:order-2">
        <h2 className="display text-[28px]">Your stash</h2>
        <ul className="mt-4 divide-y-2 divide-ink/10">
          {items.map((it) => {
            const p = it.kind === 'product' ? getProduct(it.slug) : null
            const b = it.kind === 'bundle' ? getBundle(it.slug) : null
            return (
              <li key={it.key} className="flex items-center gap-3 py-3">
                <span className="relative grid h-14 w-14 place-items-center rounded-xl" style={{ background: p?.soft ?? b?.color }}>
                  <img src={p?.pack ?? getProduct(b?.items[0] ?? '')?.pack} alt="" className="h-12 w-auto" />
                  <span className="absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full border-2 border-ink bg-pink text-xs font-extrabold">{it.qty}</span>
                </span>
                <span className="flex-1 font-bold">{p?.name ?? b?.name}</span>
                <span className="font-extrabold">{inr(unitPrice(it) * it.qty)}</span>
              </li>
            )
          })}
        </ul>
        <dl className="mt-3 grid gap-1.5 border-t-2 border-ink pt-3 text-sm">
          <div className="flex justify-between"><dt>Subtotal</dt><dd className="font-bold">{inr(totals.subtotal)}</dd></div>
          {totals.discount > 0 && <div className="flex justify-between text-[#1f8a4c]"><dt>{totals.tier?.label}</dt><dd className="font-bold">−{inr(totals.discount)}</dd></div>}
          <div className="flex justify-between"><dt>Shipping</dt><dd className="font-bold">{totals.shipping ? inr(totals.shipping) : 'Free'}</dd></div>
          <div className="mt-1 flex justify-between text-lg"><dt className="font-extrabold">Total</dt><dd className="font-extrabold">{inr(totals.total)}</dd></div>
        </dl>
        {!totals.freeShip && <p className="mt-3 rounded-xl bg-mango/50 px-3 py-2 text-sm font-bold">Add {inr(totals.toFreeShip)} more for free shipping. <Link to="/shop" className="underline">Keep shopping</Link></p>}
      </aside>
    </div>
  )
}
