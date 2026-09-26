type P = { className?: string; color?: string }
export const Squiggle = ({ className = 'w-40 h-4', color = 'currentColor' }: P) => (
  <svg viewBox="0 0 200 16" className={className} preserveAspectRatio="none" aria-hidden>
    <path d="M2 10c14-9 22 7 36 0s22-9 36 0 22 7 36 0 22-9 36 0 22 7 36 0 12-5 16-3" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
  </svg>
)
export const Sparkle = ({ className = 'w-8 h-8', color = '#FFC928' }: P) => (
  <svg viewBox="0 0 40 40" className={className} aria-hidden>
    <path d="M20 3c1.5 9 4 12.5 15 14.5-11 2-13.5 5.5-15 16-1.5-10.5-4-14-15-16 11-2 13.5-5.5 15-14.5Z" fill={color} stroke="#2B0F3D" strokeWidth="2.5" strokeLinejoin="round" />
  </svg>
)
export const Burst = ({ className = 'w-10 h-10', color = '#2B0F3D' }: P) => (
  <svg viewBox="0 0 40 40" className={className} aria-hidden>
    <g stroke={color} strokeWidth="3.2" strokeLinecap="round"><path d="M20 4v7M20 29v7M4 20h7M29 20h7M8.5 8.5l5 5M26.5 26.5l5 5M31.5 8.5l-5 5M13.5 26.5l-5 5" /></g>
  </svg>
)
export const HandArrow = ({ className = 'w-24 h-16', color = 'currentColor' }: P) => (
  <svg viewBox="0 0 120 70" className={className} aria-hidden>
    <path d="M6 12c30-8 70 0 88 38" fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    <path d="M78 46l17 7 3-19" fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
export const Wave = ({ className = '', color = '#FFF3DA', flip = false }: P & { flip?: boolean }) => (
  <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className={`block w-full h-6 md:h-10 ${flip ? 'rotate-180' : ''} ${className}`} aria-hidden>
    <path d="M0 24c80-20 160-20 240 0s160 20 240 0 160-20 240 0 160 20 240 0 160-20 240 0 160 20 240 0v24H0Z" fill={color} />
  </svg>
)
export const Stars = ({ rating, className = 'h-4', color = '#2B0F3D' }: { rating: number; className?: string; color?: string }) => {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100))
  const star = 'M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L10 14.8l-5.2 2.8 1-5.8L1.5 7.7l5.9-.8Z'
  const row = (fill: string) => (
    <svg viewBox="0 0 100 20" className={className} aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => <path key={i} d={star} transform={`translate(${i * 20} 0)`} fill={fill} stroke={color} strokeWidth="1.6" strokeLinejoin="round" />)}
    </svg>
  )
  return (
    <span className="relative inline-block align-middle" role="img" aria-label={`Rated ${rating} out of 5`}>
      {row('transparent')}
      <span className="absolute inset-0 overflow-hidden" style={{ width: `${pct}%` }}>{row(color)}</span>
    </span>
  )
}
