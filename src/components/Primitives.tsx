import { useState, type ReactNode } from 'react'
import { ChevronIcon, MinusIcon, PlusIcon } from './Icons'
import { cx } from '../lib/format'

export function QtyStepper({ value, onChange, size = 'md', label = 'Quantity' }: { value: number; onChange: (n: number) => void; size?: 'sm' | 'md'; label?: string }) {
  const s = size === 'sm' ? 'h-8 w-8' : 'h-12 w-11'
  return (
    <div className="inline-flex items-center rounded-full border-[2.5px] border-ink bg-cream" role="group" aria-label={label}>
      <button type="button" className={cx(s, 'grid place-items-center rounded-full hover:bg-mango/60')} onClick={() => onChange(value - 1)} aria-label="Decrease quantity"><MinusIcon className={size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'} /></button>
      <span className={cx('min-w-[2ch] text-center font-extrabold tabular-nums', size === 'sm' ? 'text-sm' : 'text-lg')} aria-live="polite">{value}</span>
      <button type="button" className={cx(s, 'grid place-items-center rounded-full hover:bg-mango/60')} onClick={() => onChange(value + 1)} aria-label="Increase quantity"><PlusIcon className={size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'} /></button>
    </div>
  )
}

export function Accordion({ items, defaultOpen = -1 }: { items: { q: string; a: ReactNode }[]; defaultOpen?: number }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="divide-y-2 divide-ink/15 border-y-2 border-ink/15">
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div key={it.q}>
            <button type="button" className="flex w-full items-center justify-between gap-4 py-4 text-left text-[17px] font-bold" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
              {it.q}
              <span className={cx('grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-ink transition-transform', isOpen && 'rotate-180 bg-mango')}><ChevronIcon className="h-4 w-4" /></span>
            </button>
            <div className={cx('grid transition-[grid-template-rows] duration-200', isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
              <div className="overflow-hidden"><div className="pb-5 pr-10 leading-relaxed text-ink/80">{it.a}</div></div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function TasteMeter({ notes, dark = false }: { notes: { sweet: number; sour: number; spice: number; chew: number }; dark?: boolean }) {
  const rows: [string, number][] = [['Sweet', notes.sweet], ['Sour', notes.sour], ['Spice', notes.spice], ['Chew', notes.chew]]
  return (
    <dl className="grid gap-2.5">
      {rows.map(([k, v]) => (
        <div key={k} className="flex items-center gap-3">
          <dt className="w-14 text-sm font-bold">{k}</dt>
          <dd className="flex gap-1.5" aria-label={`${k} ${v} out of 5`}>
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className={cx('h-4 w-6 rounded-full border-2', dark ? 'border-cream' : 'border-ink', i <= v ? (dark ? 'bg-cream' : 'bg-ink') : 'bg-transparent')} />
            ))}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export function Mascot({ pose, className = '' }: { pose: string; className?: string }) {
  return <img src={`/images/mascot-${pose}.webp`} alt="" aria-hidden className={cx('pointer-events-none select-none', className)} loading="lazy" />
}
