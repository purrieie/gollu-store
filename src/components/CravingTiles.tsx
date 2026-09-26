import { Link } from 'react-router-dom'
import { CRAVINGS } from '../data/cravings'
import { getProduct } from '../data/products'
import { Mascot } from './Primitives'

const SHAPES = ['rounded-[36px_18px_40px_22px]', 'rounded-[20px_44px_24px_40px]', 'rounded-[44px_24px_20px_38px]', 'rounded-[24px_36px_44px_18px]', 'rounded-[40px_20px_36px_28px]', 'rounded-[22px_40px_26px_44px]']
const TILT = ['md:-rotate-1', 'md:rotate-1', 'md:-rotate-[0.5deg]', 'md:rotate-[1.5deg]', 'md:-rotate-[1.5deg]', 'md:rotate-[0.5deg]']

export default function CravingTiles() {
  return (
    <section className="py-12 md:py-16" aria-labelledby="crave-h">
      <div className="wrap">
        <h2 id="crave-h" className="display text-[38px] md:text-[56px]">What are we craving?</h2>
        <p className="mt-2 text-lg font-semibold text-ink/70">Shop by mood. Your flavour is in one of these.</p>
        <div className="rail mt-7 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
          {CRAVINGS.map((c, i) => (
            <Link key={c.id} to={c.href} className={`group relative flex h-[210px] w-[250px] flex-col overflow-hidden border-[2.5px] border-ink p-5 shadow-sticker transition-transform hover:-translate-y-1 md:h-[240px] md:w-auto ${SHAPES[i]} ${TILT[i]}`} style={{ background: c.color, color: c.text }}>
              <h3 className="display relative z-[1] max-w-[75%] text-[26px] md:text-[32px]">{c.title}</h3>
              <p className="relative z-[1] mt-1 font-hand text-lg">{c.line}</p>
              <div className="absolute -bottom-6 left-4 flex -space-x-8 transition-transform duration-300 group-hover:-translate-y-3">
                {c.slugs.map((s, k) => <img key={s} src={getProduct(s)?.pack} alt="" loading="lazy" className="pack-shadow h-28 w-auto md:h-32" style={{ rotate: `${(k - 1) * 9}deg` }} />)}
              </div>
              <Mascot pose={c.mascot} className="absolute -right-3 top-1/2 w-24 -translate-y-1/4 transition-transform duration-300 group-hover:rotate-6 md:w-28" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
