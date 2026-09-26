import { Link } from 'react-router-dom'
import JarWall from '../components/JarWall'
import CravingTiles from '../components/CravingTiles'
import ProductCard from '../components/ProductCard'
import FlavourSelector from '../components/FlavourSelector'
import BundleCard from '../components/BundleCard'
import { ReviewNote } from '../components/ReviewSection'
import Newsletter from '../components/Newsletter'
import { Mascot } from '../components/Primitives'
import { Sparkle, Squiggle, Stars, Burst } from '../components/Doodles'
import { bestsellers, getProduct } from '../data/products'
import { BUNDLES } from '../data/bundles'
import { REVIEWS } from '../data/reviews'
import { CONFIG } from '../data/config'
import { ArrowIcon } from '../components/Icons'

function Hero() {
  return (
    <section className="relative overflow-hidden border-b-[2.5px] border-ink bg-pink">
      <img src="/images/hero-main.webp" alt="Raw Deal, Kala Kaand and Strawberry Drama pouches with flying gummies" className="absolute inset-y-0 right-0 hidden h-full w-[74%] object-cover object-left [mask-image:linear-gradient(to_right,transparent,#000_22%)] md:block lg:w-[70%]" fetchPriority="high" />
      <div className="wrap relative md:grid md:min-h-[min(680px,calc(100vh-110px))] md:items-center">
        <div className="relative z-10 pb-6 pt-6 md:max-w-[520px] md:py-16 lg:max-w-[560px]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="sticker -rotate-3 bg-mango px-3.5 py-1.5 text-sm">100% veg · 0% gelatin</span>
            <span className="sticker rotate-2 bg-cream px-3 py-0.5 font-deva text-lg">चटपटा</span>
          </div>
          <h1 className="display mt-4 text-[58px] text-ink sm:text-[80px] md:mt-5 lg:text-[108px]">
            <span className="block -rotate-2">Candy</span>
            <span className="ml-8 block rotate-1 text-cream [-webkit-text-stroke:3px_#2B0F3D] [paint-order:stroke_fill] md:ml-16">with a</span>
            <span className="block -rotate-1">big mouth.</span>
          </h1>
          <p className="mt-4 max-w-[30rem] text-[17px] font-semibold leading-snug md:mt-5 md:text-xl">
            Chewy, tangy, properly desi gummies. Kaccha aam, imli, kala khatta, cola masala. The flavours you grew up on, grown up a bit. (Only a bit.)
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5 md:mt-7 md:gap-3">
            <Link to="/shop" className="btn btn-ink whitespace-nowrap px-4 py-3.5 text-[14px] md:px-7 md:py-4 md:text-base">Shop the good stuff</Link>
            <a href="#flavours" className="btn btn-cream whitespace-nowrap px-4 py-3.5 text-[14px] md:px-7 md:py-4 md:text-base">Pick your flavour</a>
          </div>
          <p className="mt-5 flex items-center gap-2 text-sm font-bold md:mt-6"><Stars rating={4.8} className="h-4" /> 4.8 from 9,600+ snackers</p>
        </div>
      </div>
      <img src="/images/hero-main.webp" alt="" aria-hidden className="aspect-[5/4] w-full object-cover object-[80%_50%] md:hidden" />
    </section>
  )
}

function Bestsellers() {
  return (
    <section className="border-y-[2.5px] border-ink bg-cream-deep py-12 md:py-16" aria-labelledby="best-h">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="best-h" className="display text-[38px] md:text-[56px]">Flying off the shelf</h2>
            <Squiggle className="mt-1 h-3 w-48 text-pink" />
          </div>
          <Link to="/shop" className="inline-flex items-center gap-1.5 font-extrabold underline decoration-2 underline-offset-4">Shop all 9 <ArrowIcon className="h-4 w-4" /></Link>
        </div>
        <div className="rail mt-8 gap-0 md:grid md:grid-cols-4 md:gap-y-12 md:overflow-visible">
          {bestsellers.slice(0, 8).map((p, i) => (
            <div key={p.slug} className="w-[62%] sm:w-[40%] md:w-auto"><ProductCard p={p} shelf priority={i < 4} /></div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DetentionBlock() {
  const trio = ['fizz-ed', 'kala-kaand', 'paanic'].map((s) => getProduct(s)!)
  return (
    <section className="relative overflow-hidden bg-jamun text-cream" aria-labelledby="det-h">
      <div className="h-5 border-y-[2.5px] border-ink" style={{ background: 'repeating-linear-gradient(-45deg,#FFC928 0 18px,#2B0F3D 18px 36px)' }} aria-hidden />
      <div className="wrap grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
        <div>
          <span className="inline-block -rotate-3 border-[2.5px] border-ink bg-mango px-3 py-1 text-sm font-extrabold uppercase tracking-widest text-ink">Detention</span>
          <h2 id="det-h" className="display mt-5 text-[46px] md:text-[72px]">Flavours that got sent out of class.</h2>
          <p className="mt-4 max-w-md text-lg font-semibold text-cream/85">Extreme sour kala khatta. Cola bottles with chaat masala. Paan, but in chocolate. Smaller batches, louder flavours, no apologies.</p>
          <div className="mt-7 max-w-md rounded-2xl border-[2.5px] border-cream/80 p-4">
            <div className="flex items-center justify-between text-sm font-extrabold"><span>Kala Kaand sour-o-meter</span><span className="font-hand text-lg text-mango">we measured. it broke.</span></div>
            <div className="relative mt-3 h-5 rounded-full border-2 border-cream" style={{ background: 'linear-gradient(90deg,#9BD84A,#FFC928,#FF3D8B,#E8243C)' }}>
              <span className="absolute -right-3 -top-3 grid h-10 w-10 rotate-12 place-items-center rounded-full border-[2.5px] border-ink bg-cream text-lg">💥</span>
            </div>
            <div className="mt-1.5 flex justify-between text-xs font-bold text-cream/70"><span>tangy</span><span>sour</span><span>very sour</span><span>call someone</span></div>
          </div>
          <Link to="/collections/detention" className="btn btn-mango mt-8">Serve detention</Link>
        </div>
        <div className="relative flex h-[290px] items-end justify-center md:h-[480px]">
          <Burst className="absolute left-6 top-4 h-14 w-14" color="#FFC928" />
          <Sparkle className="absolute right-8 top-10 h-12 w-12" color="#FF3D8B" />
          {trio.map((p, i) => (
            <Link key={p.slug} to={`/products/${p.slug}`} className="relative -mx-6 block transition-transform md:-mx-8 hover:-translate-y-3" style={{ zIndex: i === 1 ? 3 : 1, rotate: `${(i - 1) * 10}deg` }}>
              <img src={p.pack} alt={p.name} loading="lazy" className={`pack-shadow w-auto ${i === 1 ? 'h-[250px] md:h-[440px]' : 'h-[180px] md:h-[330px]'}`} />
            </Link>
          ))}
          <Mascot pose="pucker" className="absolute -bottom-2 right-0 w-28 md:w-36" />
        </div>
      </div>
    </section>
  )
}

function BundlesBlock() {
  return (
    <section className="py-12 md:py-16" aria-labelledby="bun-h">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 id="bun-h" className="display text-[38px] md:text-[56px]">Boxes for every situation</h2>
          <Link to="/bundles" className="inline-flex items-center gap-1.5 font-extrabold underline decoration-2 underline-offset-4">Or build your own box <ArrowIcon className="h-4 w-4" /></Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {BUNDLES.map((b, i) => <BundleCard key={b.slug} b={b} featured={i === 2} />)}
        </div>
      </div>
    </section>
  )
}

function StoryTeaser() {
  return (
    <section className="border-y-[2.5px] border-ink bg-mango" aria-labelledby="story-h">
      <div className="wrap grid items-center gap-8 py-12 md:grid-cols-[1.1fr_1fr] md:gap-14 md:py-16">
        <div className="relative">
          <img src="/images/story-kitchen.webp" alt="Test batches of gummies on steel trays next to a notebook of mascot sketches" loading="lazy" className="aspect-[3/2] w-full -rotate-1 rounded-[28px] border-[2.5px] border-ink object-cover shadow-sticker-lg" />
          <span className="sticker absolute -bottom-4 right-6 rotate-3 bg-cream px-4 py-2 font-hand text-lg !font-normal">attempt #47. it was perfect.</span>
        </div>
        <div>
          <h2 id="story-h" className="display text-[40px] md:text-[60px]">Made by two people who never grew out of the tuck shop.</h2>
          <p className="mt-5 text-lg font-semibold leading-relaxed">Imported candy tasted like “red” and “blue”. Desi candy tasted like home but came in mystery syrup. And most gummies had gelatin, so half our friends could not eat them.</p>
          <p className="mt-3 text-lg font-semibold leading-relaxed">So we spent a year in a Bandra kitchen boiling raw mango, burning jaggery and ruining steel trays until candy tasted the way we remembered it. Just better.</p>
          <Link to="/our-story" className="btn btn-ink mt-7">Read the whole saga</Link>
        </div>
      </div>
    </section>
  )
}

function SocialProof() {
  return (
    <section className="py-12 md:py-20" aria-labelledby="wild-h">
      <div className="wrap">
        <div className="grid items-center gap-8 md:grid-cols-[1.2fr_1fr] md:gap-12">
          <figure className="relative">
            <img src="/images/life-auto.webp" alt="Two friends in an auto rickshaw at night, one pulling a sour face after a Raw Deal gummy" loading="lazy" className="aspect-[3/2] w-full rotate-1 rounded-[28px] border-[2.5px] border-ink object-cover shadow-sticker-lg" />
            <figcaption className="sticker absolute -top-4 left-5 -rotate-3 bg-cream px-4 py-1.5 text-sm">Seen in the wild: auto, Bandra, 11:40pm</figcaption>
          </figure>
          <div>
            <h2 id="wild-h" className="display text-[38px] md:text-[56px]">People eating these in places they shouldn’t</h2>
            <ul className="mt-5 grid gap-2.5 text-lg font-semibold">
              {['In a board meeting (camera off, obviously)', 'At a wedding, during the pheras', 'In the library, extremely quietly', 'On the 8:12 fast local to Churchgate'].map((t) => (
                <li key={t} className="flex items-start gap-3"><Sparkle className="mt-0.5 h-6 w-6 shrink-0" />{t}</li>
              ))}
            </ul>
            <div className="mt-7 flex items-center gap-4 rounded-2xl border-[2.5px] border-ink bg-white p-4 shadow-sticker">
              <span className="display text-[52px] leading-none">4.8</span>
              <div><Stars rating={4.8} className="h-5" /><p className="mt-1 text-sm font-bold text-ink/70">from 9,600+ reviews across all flavours</p></div>
            </div>
          </div>
        </div>
        <h3 className="display mt-16 text-[32px] md:text-[44px]">Notes passed in class</h3>
        <div className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {REVIEWS.slice(0, 6).map((r, i) => <ReviewNote key={r.name} r={r} i={i} />)}
        </div>
      </div>
    </section>
  )
}

function WhatsInside() {
  const rows: [string, string][] = [
    ['Real fruit pulp', 'Raw mango, tamarind, guava, jamun. You can taste which is which.'],
    ['Pectin, never gelatin', 'Set with fruit fibre. Every single product is 100% veg.'],
    ['Colours from plants', 'Spirulina, turmeric, beetroot and black carrot do the painting.'],
    ['Made in small batches', 'In Maharashtra, by people who taste every batch (tough job).'],
  ]
  return (
    <section className="border-t-[2.5px] border-ink bg-white py-12 md:py-16" aria-labelledby="inside-h">
      <div className="wrap grid items-center gap-8 md:grid-cols-2 md:gap-12">
        <img src="/images/flavour-spread.webp" alt="Raw mango, tamarind, guava, strawberry, lychee, jamun, cola and paan next to their matching gummies" loading="lazy" className="aspect-[3/2] w-full rounded-[28px] border-[2.5px] border-ink object-cover" />
        <div className="rounded-[20px] border-[3px] border-ink bg-cream p-6 md:p-8">
          <p className="font-hand text-xl">back of the pack, front of the page</p>
          <h2 id="inside-h" className="display mt-1 text-[36px] md:text-[48px]">Short ingredient list. Long flavour list.</h2>
          <dl className="mt-6 divide-y-2 divide-ink border-y-[3px] border-ink">
            {rows.map(([k, v]) => (
              <div key={k} className="grid gap-1 py-3 sm:grid-cols-[180px_1fr] sm:gap-4">
                <dt className="font-extrabold">{k}</dt><dd className="text-ink/80">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm font-semibold text-ink/70">Still candy, though. We are not going to pretend otherwise.</p>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const flavourFirst = CONFIG.homeDiscovery === 'flavour-first'
  return (
    <>
      <Hero />
      <JarWall />
      <CravingTiles />
      {flavourFirst ? <FlavourSelector /> : <Bestsellers />}
      {flavourFirst ? <Bestsellers /> : <FlavourSelector />}
      <DetentionBlock />
      <BundlesBlock />
      <StoryTeaser />
      <SocialProof />
      <WhatsInside />
      <Newsletter />
    </>
  )
}
