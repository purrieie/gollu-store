import { useStore } from '../context/Store'

export default function Toast() {
  const { toast, setCartOpen, totals } = useStore()
  if (!toast) return null
  return (
    <div key={toast.id} role="status" className="fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+84px)] z-[45] mx-auto flex max-w-md animate-pop items-center gap-3 rounded-2xl border-[2.5px] border-ink bg-white p-3 shadow-sticker md:bottom-6 md:left-auto md:right-6 md:mx-0">
      {toast.image && <img src={toast.image} alt="" className="h-12 w-auto" />}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-extrabold">{toast.title} added</p>
        <p className="text-xs text-ink/70">{totals.freeShip ? 'Free shipping unlocked' : `₹${totals.toFreeShip} away from free shipping`}</p>
      </div>
      <button onClick={() => setCartOpen(true)} className="btn btn-ink btn-sm">View cart</button>
    </div>
  )
}
