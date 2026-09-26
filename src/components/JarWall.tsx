import { Link } from 'react-router-dom'
import { pouches } from '../data/products'

export default function JarWall() {
  return (
    <section className="relative border-b-[2.5px] border-ink bg-cream py-10 md:py-14" aria-labelledby="jars-h">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 id="jars-h" className="display text-[38px] md:text-[56px]">The jar wall</h2>
          <p className="font-hand text-xl md:text-2xl">tap a jar, meet a flavour ↓</p>
        </div>
        <div className="rail mt-6 md:grid md:grid-cols-8 md:gap-4 md:overflow-visible">
          {pouches.map((p, i) => (
            <Link key={p.slug} to={`/products/${p.slug}`} className="group flex w-[128px] flex-col items-center md:w-auto" aria-label={`${p.name}: ${p.flavour}`}>
              <span className="z-[1] h-5 w-[64%] rounded-t-xl border-[2.5px] border-ink transition-transform duration-200 group-hover:-translate-y-2 group-hover:-rotate-6" style={{ background: p.color }} />
              <span className="h-2.5 w-[74%] border-x-[2.5px] border-ink bg-white/70" />
              <span className="relative block aspect-[4/5] w-full overflow-hidden rounded-[30px] border-[2.5px] border-ink bg-white shadow-sticker transition-transform duration-200 group-hover:-translate-y-1" style={{ rotate: `${[-2, 1.5, -1, 2, -1.5, 1, -2, 1.5][i]}deg` }}>
                <img src={p.inside} alt="" loading="lazy" className="absolute inset-0 h-full w-full scale-110 object-cover" />
                <span className="absolute inset-y-3 left-3 w-3 rounded-full bg-white/50" />
                <span className="absolute inset-x-2 bottom-3 rounded-lg border-2 border-ink px-1.5 py-1 text-center font-display text-[13px] leading-none" style={{ background: p.color, color: p.onColor === 'ink' ? '#2B0F3D' : '#FFF3DA' }}>{p.name}</span>
              </span>
              <span className="mt-2 text-center text-xs font-bold text-ink/70">{p.flavour}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
