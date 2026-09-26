import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Accordion, Mascot } from '../components/Primitives'
import { GENERAL_FAQS } from '../data/products'
import { Sparkle, Squiggle } from '../components/Doodles'
import Newsletter from '../components/Newsletter'

const ATTEMPTS: [string, string, string][] = [
  ['#1', 'Raw mango, sugar, gelatin', 'Tasted fine. Half our friends could not eat it. Gelatin: out.'],
  ['#12', 'Pectin instead', 'Set like concrete. We used it as a doorstop for a week.'],
  ['#31', 'Real chilli salt', 'Too much chilli. Tara cried. Kunal said it was "a learning".'],
  ['#47', 'Raw Deal', 'Tangy, chewy, a little spicy. We ate the whole tray standing up.'],
]

export default function OurStory() {
  useEffect(() => { document.title = 'Our story · Gollu' }, [])
  return (
    <>
      <section className="relative border-b-[2.5px] border-ink bg-mango">
        <div className="wrap grid items-center gap-8 py-10 md:grid-cols-[1fr_1.1fr] md:py-16">
          <div>
            <p className="font-hand text-2xl">the whole saga</p>
            <h1 className="display mt-2 text-[54px] md:text-[92px]">We never grew out of the tuck shop.</h1>
            <p className="mt-5 max-w-lg text-lg font-semibold">Gollu started in a tiny Bandra kitchen with two friends, one steel tiffin, and a very strong opinion about raw mango.</p>
          </div>
          <div className="relative">
            <img src="/images/story-kitchen.webp" alt="A kitchen table covered in test batches of gummies, a steel tiffin and a sketchbook" className="aspect-[3/2] w-full rotate-1 rounded-[28px] border-[2.5px] border-ink shadow-sticker-lg" />
            <Mascot pose="wave" className="absolute -bottom-10 -left-4 w-32 md:w-40" />
          </div>
        </div>
      </section>

      <div className="wrap max-w-[860px] py-14 md:py-20">
        <h2 className="display text-[38px] md:text-[56px]">What was wrong with candy?</h2>
        <Squiggle className="h-3 w-48 text-pink" />
        <div className="mt-6 space-y-5 text-lg leading-relaxed">
          <p>Honestly? Quite a lot. The imported stuff tasted like colours. Not fruits, colours. “Red.” “Blue.” The desi stuff tasted like our childhood but came in syrups nobody could pronounce. And almost every gummy in India was set with gelatin, which meant our vegetarian friends (so, most of them) spent every movie night eating popcorn and watching us.</p>
          <p>We are Tara and Kunal. We met in school, bonded over a shared imli golis habit, and kept that habit well into our thirties. One night in 2023, over a bag of disappointing sour gummies, Tara said, “we could make better ones.” Kunal said, “how hard can it be?” It was very hard.</p>
        </div>
      </div>

      <section className="border-y-[2.5px] border-ink bg-pink py-14 md:py-20">
        <div className="wrap">
          <h2 className="display text-[38px] md:text-[56px]">47 attempts later</h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-4">
            {ATTEMPTS.map(([n, t, d], i) => (
              <li key={n} className="relative rounded-[24px] border-[2.5px] border-ink bg-cream p-5 shadow-sticker" style={{ rotate: `${[-1.5, 1, -1, 1.5][i]}deg` }}>
                <span className="display text-[44px] text-pink [-webkit-text-stroke:2px_#2B0F3D]">{n}</span>
                <h3 className="mt-1 text-lg font-extrabold">{t}</h3>
                <p className="mt-1 text-ink/80">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="wrap grid max-w-[1100px] gap-10 py-14 md:grid-cols-2 md:py-20">
        <div>
          <h2 className="display text-[36px] md:text-[48px]">What makes it different</h2>
          <ul className="mt-5 grid gap-4 text-lg">
            {['Desi flavours, done properly. Kaccha aam with actual chilli salt. Imli with actual jaggery.', 'Pectin, never gelatin. Every Gollu product is 100% veg.', 'Real fruit pulp and plant colours, because candy can be honest about being candy.', 'Tiny batches, tasted by humans, in Maharashtra.'].map((t) => (
              <li key={t} className="flex gap-3 font-semibold"><Sparkle className="mt-0.5 h-6 w-6 shrink-0" />{t}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="display text-[36px] md:text-[48px]">Why so loud?</h2>
          <p className="mt-5 text-lg leading-relaxed">Because candy is supposed to be fun. Somewhere along the way, snacks got very serious: beige packs, protein counts, words like “mindful”. We love a salad as much as the next person. But candy is the thing you buy with your own money at 3:47pm because you deserve it.</p>
          <p className="mt-4 text-lg leading-relaxed">So Gollu is loud on purpose. Big colours, a slightly unhinged mascot, names that make you smile at the checkout. The flavours are serious. Everything else, not so much.</p>
          <Link to="/shop" className="btn btn-pink mt-7">Taste the result</Link>
        </div>
      </div>

      <section id="faq" className="scroll-mt-24 border-t-[2.5px] border-ink bg-white py-14 md:py-20">
        <div className="wrap grid max-w-[1100px] gap-8 md:grid-cols-[320px_1fr]">
          <div>
            <h2 className="display text-[38px] md:text-[48px]">The usual questions</h2>
            <p id="contact" className="mt-4 scroll-mt-24 font-semibold text-ink/75">Still stuck? Write to hello@gollu.in or WhatsApp +91 90000 12345. A real person replies, usually while eating candy.</p>
            <p id="stockists" className="mt-3 scroll-mt-24 font-semibold text-ink/75">Want Gollu in your store or office pantry? Email trade@gollu.in.</p>
          </div>
          <Accordion items={GENERAL_FAQS} defaultOpen={0} />
        </div>
      </section>
      <Newsletter />
    </>
  )
}
