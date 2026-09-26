import { Link } from 'react-router-dom'
import { useStore } from '../context/Store'
import { pouches } from '../data/products'
import { CloseIcon } from './Icons'
import { Mascot } from './Primitives'
import { cx } from '../lib/format'

export default function MobileMenu() {
  const { menuOpen, setMenuOpen } = useStore()
  const close = () => setMenuOpen(false)
  return (
    <div className={cx('fixed inset-0 z-50 transition-[visibility] duration-300 md:hidden', menuOpen ? 'visible' : 'invisible pointer-events-none')} aria-hidden={!menuOpen}>
      <div className={cx('absolute inset-0 bg-ink/50 transition-opacity', menuOpen ? 'opacity-100' : 'opacity-0')} onClick={close} />
      <nav className={cx('absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col overflow-y-auto border-r-[2.5px] border-ink bg-pink transition-transform duration-300', menuOpen ? 'translate-x-0' : '-translate-x-full')} aria-label="Mobile">
        <div className="flex items-center justify-between p-4">
          <img src="/images/logo-gollu-mono.webp" alt="gollu" className="h-9 w-auto" />
          <button onClick={close} className="grid h-11 w-11 place-items-center rounded-full bg-cream border-2 border-ink" aria-label="Close menu"><CloseIcon /></button>
        </div>
        <ul className="px-5 pt-2">
          {[['/shop', 'Shop everything'], ['/collections/tuck-shop', 'The Tuck Shop'], ['/collections/detention', 'Detention'], ['/bundles', 'Bundles & boxes'], ['/our-story', 'Our story']].map(([to, l]) => (
            <li key={to}><Link to={to} onClick={close} className="display block py-2.5 text-[34px] text-ink">{l}</Link></li>
          ))}
        </ul>
        <p className="mt-6 px-5 font-hand text-xl">pick a flavour, any flavour</p>
        <div className="flex flex-wrap gap-2 px-5 pt-3 pb-8">
          {pouches.map((p) => (
            <Link key={p.slug} to={`/products/${p.slug}`} onClick={close} className="chip bg-cream">
              <span className="h-3.5 w-3.5 rounded-full border-2 border-ink" style={{ background: p.color }} />{p.name}
            </Link>
          ))}
        </div>
        <Mascot pose="peek" className="mt-auto w-44 self-center" />
      </nav>
    </div>
  )
}
