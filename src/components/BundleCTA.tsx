import { Link } from 'react-router-dom'
import { getProduct } from '../data/products'

export default function BundleCTA({ color = '#2F4BFF', text = '#FFF3DA' }: { color?: string; text?: string }) {
  return (
    <div className="relative mt-14 overflow-hidden rounded-[28px] border-[2.5px] border-ink p-6 shadow-sticker md:flex md:items-center md:gap-8 md:p-8" style={{ background: color, color: text }}>
      <div className="flex -space-x-8 md:order-2 md:ml-auto">
        {['raw-deal', 'kala-kaand', 'lychee-lately', 'fizz-ed', 'imli-please'].map((s, i) => (
          <img key={s} src={getProduct(s)?.pack} alt="" loading="lazy" className="pack-shadow h-24 w-auto md:h-32" style={{ rotate: `${(i - 2) * 7}deg` }} />
        ))}
      </div>
      <div className="mt-4 md:mt-0">
        <h3 className="display text-[30px] md:text-[40px]">Mix any 5, save 15%.</h3>
        <p className="mt-1 font-semibold opacity-90">Any 3 pouches get 10% off. Any 5 get 15%. Applied in the cart, no code, no fuss.</p>
        <Link to="/bundles#build" className="btn btn-cream mt-5">Build your box</Link>
      </div>
    </div>
  )
}
