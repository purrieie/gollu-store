type P = { className?: string }
const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
export const SearchIcon = ({ className = 'h-6 w-6' }: P) => (<svg viewBox="0 0 24 24" className={className} {...base} aria-hidden><circle cx="10.5" cy="10.5" r="6.5" /><path d="m20 20-4.6-4.6" /></svg>)
export const UserIcon = ({ className = 'h-6 w-6' }: P) => (<svg viewBox="0 0 24 24" className={className} {...base} aria-hidden><circle cx="12" cy="8.5" r="4" /><path d="M4.5 20.5c1.2-3.8 4-5.5 7.5-5.5s6.3 1.7 7.5 5.5" /></svg>)
export const BagIcon = ({ className = 'h-6 w-6' }: P) => (<svg viewBox="0 0 24 24" className={className} {...base} aria-hidden><path d="M5 8.5h14l-1.2 11.2a1.5 1.5 0 0 1-1.5 1.3H7.7a1.5 1.5 0 0 1-1.5-1.3Z" /><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" /></svg>)
export const MenuIcon = ({ className = 'h-6 w-6' }: P) => (<svg viewBox="0 0 24 24" className={className} {...base} aria-hidden><path d="M4 7c3-.6 13-.6 16 0M4 12.2c4-.5 12-.4 16 .1M4 17.4c3.5-.5 11-.5 14 0" /></svg>)
export const CloseIcon = ({ className = 'h-6 w-6' }: P) => (<svg viewBox="0 0 24 24" className={className} {...base} aria-hidden><path d="M6 6l12 12M18 6 6 18" /></svg>)
export const PlusIcon = ({ className = 'h-5 w-5' }: P) => (<svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={3} aria-hidden><path d="M12 5v14M5 12h14" /></svg>)
export const MinusIcon = ({ className = 'h-5 w-5' }: P) => (<svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={3} aria-hidden><path d="M5 12h14" /></svg>)
export const ChevronIcon = ({ className = 'h-5 w-5' }: P) => (<svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2.8} aria-hidden><path d="m6 9 6 6 6-6" /></svg>)
export const ArrowIcon = ({ className = 'h-5 w-5' }: P) => (<svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2.8} aria-hidden><path d="M5 12h13M13 6l6 6-6 6" /></svg>)
export const TruckIcon = ({ className = 'h-5 w-5' }: P) => (<svg viewBox="0 0 24 24" className={className} {...base} aria-hidden><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17.5" cy="17.5" r="1.8" /></svg>)
export const LeafIcon = ({ className = 'h-5 w-5' }: P) => (<svg viewBox="0 0 24 24" className={className} {...base} aria-hidden><path d="M5 19C5 10 10 5 20 4c0 10-5 15-14 15Z" /><path d="M5 19c3-4 6-7 10-9" /></svg>)
export const TrashIcon = ({ className = 'h-4 w-4' }: P) => (<svg viewBox="0 0 24 24" className={className} {...base} aria-hidden><path d="M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13" /></svg>)
