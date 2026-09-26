import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { computeTotals, type CartItem } from '../lib/pricing'
import { CONFIG } from '../data/config'

interface Toast { id: number; title: string; image?: string }
interface StoreCtx {
  items: CartItem[]
  totals: ReturnType<typeof computeTotals>
  add: (kind: CartItem['kind'], slug: string, qty?: number, opts?: { open?: boolean; title?: string; image?: string }) => void
  setQty: (key: string, qty: number) => void
  remove: (key: string) => void
  clear: () => void
  cartOpen: boolean
  setCartOpen: (v: boolean) => void
  searchOpen: boolean
  setSearchOpen: (v: boolean) => void
  menuOpen: boolean
  setMenuOpen: (v: boolean) => void
  toast: Toast | null
  bump: number
}

const Ctx = createContext<StoreCtx | null>(null)
const KEY = 'gollu-cart-v1'

function load(): CartItem[] {
  try {
    const raw = localStorage.getItem(KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch { return [] }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(load)
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [toast, setToast] = useState<Toast | null>(null)
  const [bump, setBump] = useState(0)
  const timer = useRef<number>()

  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(items)) } catch { /* storage unavailable */ } }, [items])

  const add = useCallback<StoreCtx['add']>((kind, slug, qty = 1, opts) => {
    const key = `${kind}:${slug}`
    setItems((prev) => {
      const found = prev.find((i) => i.key === key)
      if (found) return prev.map((i) => (i.key === key ? { ...i, qty: Math.min(20, i.qty + qty) } : i))
      return [...prev, { key, kind, slug, qty }]
    })
    setBump((b) => b + 1)
    const open = opts?.open ?? CONFIG.quickAddBehaviour === 'drawer'
    if (open) setCartOpen(true)
    else if (opts?.title) {
      window.clearTimeout(timer.current)
      setToast({ id: Date.now(), title: opts.title, image: opts.image })
      timer.current = window.setTimeout(() => setToast(null), 3200)
    }
  }, [])

  const setQty = useCallback((key: string, qty: number) => {
    setItems((prev) => (qty <= 0 ? prev.filter((i) => i.key !== key) : prev.map((i) => (i.key === key ? { ...i, qty: Math.min(20, qty) } : i))))
  }, [])
  const remove = useCallback((key: string) => setItems((prev) => prev.filter((i) => i.key !== key)), [])
  const clear = useCallback(() => setItems([]), [])
  const totals = useMemo(() => computeTotals(items), [items])

  useEffect(() => {
    const lock = cartOpen || searchOpen || menuOpen
    document.body.style.overflow = lock ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setCartOpen(false); setSearchOpen(false); setMenuOpen(false) } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [cartOpen, searchOpen, menuOpen])

  const value: StoreCtx = { items, totals, add, setQty, remove, clear, cartOpen, setCartOpen, searchOpen, setSearchOpen, menuOpen, setMenuOpen, toast, bump }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useStore() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useStore outside provider')
  return c
}
