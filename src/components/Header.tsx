import { Link, NavLink } from 'react-router-dom'
import { useStore } from '../context/Store'
import { BagIcon, MenuIcon, SearchIcon, UserIcon } from './Icons'
import { cx } from '../lib/format'

const NAV = [
  { to: '/shop', label: 'Shop' },
  { to: '/shop#flavours', label: 'Flavours' },
  { to: '/bundles', label: 'Bundles' },
  { to: '/our-story', label: 'Our Story' },
]

export default function Header() {
  const { totals, setCartOpen, setSearchOpen, setMenuOpen, bump } = useStore()
  return (
    <header className="sticky top-0 z-40 border-b-[2.5px] border-ink bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/85">
      <div className="wrap flex h-16 items-center gap-2 md:h-[76px]">
        <button className="-ml-2 grid h-11 w-11 place-items-center md:hidden" onClick={() => setMenuOpen(true)} aria-label="Open menu"><MenuIcon /></button>
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0" aria-label="Gollu home">
          <img src="/images/logo-gollu.webp" alt="gollu" className="h-10 w-auto -rotate-3 transition-transform hover:rotate-2 md:h-12" width={95} height={48} />
        </Link>
        <nav className="ml-8 hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((n) => (
            <NavLink key={n.label} to={n.to} className={({ isActive }) => cx('rounded-full px-4 py-2 text-[15px] font-extrabold transition-colors hover:bg-mango', isActive && n.label !== 'Flavours' && 'bg-ink text-cream hover:bg-ink')}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-0.5">
          <button className="grid h-11 w-11 place-items-center rounded-full hover:bg-mango" onClick={() => setSearchOpen(true)} aria-label="Search"><SearchIcon /></button>
          <a href="#account" className="hidden h-11 w-11 place-items-center rounded-full hover:bg-mango md:grid" aria-label="Account" onClick={(e) => e.preventDefault()}><UserIcon /></a>
          <button className="relative grid h-11 w-11 place-items-center rounded-full hover:bg-mango" onClick={() => setCartOpen(true)} aria-label={`Cart, ${totals.count} items`}>
            <BagIcon />
            {totals.count > 0 && (
              <span key={bump} className="absolute -right-0.5 -top-0.5 grid h-[22px] min-w-[22px] animate-wiggle place-items-center rounded-full border-2 border-ink bg-pink px-1 text-[11px] font-extrabold text-ink">{totals.count}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
