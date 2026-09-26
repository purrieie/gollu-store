import { ANNOUNCEMENTS } from '../data/config'
import { Sparkle } from './Doodles'

export default function AnnouncementBar() {
  const line = [...ANNOUNCEMENTS, ...ANNOUNCEMENTS]
  return (
    <div className="group relative overflow-hidden bg-ink text-mango" role="region" aria-label="Offers">
      <div className="flex w-max animate-marquee items-center py-2 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {line.map((t, i) => (
          <span key={i} className="flex items-center gap-4 px-4 text-[13px] font-extrabold uppercase tracking-wide" aria-hidden={i >= ANNOUNCEMENTS.length}>
            {t}<Sparkle className="h-4 w-4" color="#FF3D8B" />
          </span>
        ))}
      </div>
    </div>
  )
}
