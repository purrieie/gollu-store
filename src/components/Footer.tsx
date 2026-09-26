import { Link } from 'react-router-dom'
import { Mascot } from './Primitives'

const COLS: [string, [string, string][]][] = [
  ['Shop', [['/shop', 'All candy'], ['/collections/tuck-shop', 'The Tuck Shop'], ['/collections/detention', 'Detention'], ['/bundles', 'Bundles & boxes'], ['/products/tiffin-mix', 'Tiffin Mix']]],
  ['Gollu', [['/our-story', 'Our story'], ['/our-story#faq', 'FAQs'], ['/shop?mood=sharing', 'Corporate gifting'], ['/our-story#stockists', 'Stockists']]],
  ['Help', [['/our-story#faq', 'Shipping'], ['/our-story#faq', 'Returns'], ['/our-story#contact', 'Contact us'], ['/our-story#faq', 'Track order']]],
]

export default function Footer() {
  return (
    <footer className="relative bg-ink text-cream">
      <Mascot pose="peek" className="absolute -top-[72px] right-6 w-36 md:right-24 md:w-44" />
      <div className="wrap grid gap-10 pb-10 pt-14 md:grid-cols-[1.3fr_2fr]">
        <div>
          <img src="/images/logo-gollu.webp" alt="gollu" className="w-56 -rotate-3 md:w-72" loading="lazy" />
          <p className="mt-5 max-w-sm text-lg font-semibold text-cream/80">Candy with a big mouth. Chewy, tangy, properly desi, and 100% veg.</p>
          <p className="mt-4 font-deva text-2xl font-extrabold text-mango">खट्टा · मीठा · चटपटा</p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {COLS.map(([h, links]) => (
            <div key={h}>
              <p className="font-hand text-xl text-pink">{h}</p>
              <ul className="mt-3 grid gap-2">
                {links.map(([to, l]) => <li key={l}><Link to={to} className="font-semibold text-cream/85 hover:text-mango">{l}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t-2 border-cream/15">
        <div className="wrap flex flex-col gap-2 py-5 text-sm text-cream/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Gollu Foods. Made loudly in Mumbai.</p>
          <p>Instagram · YouTube · WhatsApp us</p>
        </div>
      </div>
    </footer>
  )
}
