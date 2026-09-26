import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/Store'
import { search, SEARCH_SUGGESTIONS } from '../lib/search'
import { getProduct } from '../data/products'
import { CloseIcon, SearchIcon } from './Icons'
import { Mascot } from './Primitives'
import { cx, inr } from '../lib/format'

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore()
  const [q, setQ] = useState('')
  const input = useRef<HTMLInputElement>(null)
  const nav = useNavigate()
  const res = useMemo(() => search(q), [q])
  useEffect(() => { if (searchOpen) { setTimeout(() => input.current?.focus(), 50) } else setQ('') }, [searchOpen])
  const close = () => setSearchOpen(false)
  const has = res.products.length + res.bundles.length > 0

  return (
    <div className={cx('fixed inset-0 z-50 transition-[visibility] duration-300', searchOpen ? 'visible' : 'invisible pointer-events-none')} aria-hidden={!searchOpen}>
      <div className={cx('absolute inset-0 bg-ink/50 transition-opacity', searchOpen ? 'opacity-100' : 'opacity-0')} onClick={close} />
      <div role="dialog" aria-modal="true" aria-label="Search" className={cx('absolute inset-x-0 top-0 max-h-[90vh] overflow-y-auto border-b-[2.5px] border-ink bg-cream transition-transform duration-300', searchOpen ? 'translate-y-0' : '-translate-y-full')}>
        <div className="wrap py-5 md:py-8">
          <form onSubmit={(e) => { e.preventDefault(); if (q.trim()) { nav(`/shop?q=${encodeURIComponent(q.trim())}`); close() } }} className="flex items-center gap-3">
            <label className="flex flex-1 items-center gap-3 rounded-full border-[2.5px] border-ink bg-white px-5 py-3 shadow-sticker">
              <SearchIcon className="h-6 w-6 shrink-0" />
              <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Try “mango”, “sour” or “gift”" className="w-full bg-transparent text-lg font-semibold outline-none placeholder:text-ink/40" aria-label="Search products" />
            </label>
            <button type="button" onClick={close} className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-ink bg-mango" aria-label="Close search"><CloseIcon /></button>
          </form>
          {!q && (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="font-hand text-lg">people search for</span>
              {SEARCH_SUGGESTIONS.map((s) => <button key={s} onClick={() => setQ(s)} className="chip bg-white hover:bg-mango">{s}</button>)}
            </div>
          )}
          {q && !has && (
            <div className="mt-8 flex items-center gap-4">
              <Mascot pose="guilty" className="w-24" />
              <p className="font-semibold">Nothing called “{q}” yet. Try a flavour like mango or imli, or a mood like sour or movie.</p>
            </div>
          )}
          {has && (
            <div className="mt-6 grid gap-6 md:grid-cols-[2fr_1fr]">
              <ul className="grid gap-2 sm:grid-cols-2">
                {res.products.map((p) => (
                  <li key={p.slug}>
                    <Link to={`/products/${p.slug}`} onClick={close} className="flex items-center gap-3 rounded-2xl border-2 border-ink/10 bg-white p-2 pr-4 hover:border-ink">
                      <span className="grid h-16 w-16 shrink-0 place-items-center rounded-xl" style={{ background: p.soft }}><img src={p.pack} alt="" className="h-14 w-auto" /></span>
                      <span className="min-w-0 flex-1"><span className="block font-extrabold">{p.name}</span><span className="block truncate text-sm text-ink/70">{p.flavour}</span></span>
                      <span className="font-extrabold">{inr(p.price)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              {res.bundles.length > 0 && (
                <div>
                  <p className="mb-2 font-hand text-lg">boxes that match</p>
                  <ul className="grid gap-2">
                    {res.bundles.map((b) => (
                      <li key={b.slug}>
                        <Link to={`/bundles#${b.slug}`} onClick={close} className="flex items-center gap-3 rounded-2xl border-2 border-ink p-3 font-extrabold" style={{ background: b.color, color: b.onColor === 'ink' ? '#2B0F3D' : '#FFF3DA' }}>
                          <span className="flex -space-x-5">{b.items.slice(0, 3).map((s) => <img key={s} src={getProduct(s)?.pack} alt="" className="h-12 w-auto" />)}</span>
                          {b.name}<span className="ml-auto">{inr(b.price)}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
