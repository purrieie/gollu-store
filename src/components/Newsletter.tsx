import { useState } from 'react'
import { Mascot } from './Primitives'
import { Sparkle } from './Doodles'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  return (
    <section className="relative overflow-hidden border-y-[2.5px] border-ink bg-pink">
      <div className="wrap grid items-center gap-6 py-12 md:grid-cols-[auto_1fr_auto] md:py-14">
        <Mascot pose="wave" className="mx-auto w-40 md:w-48" />
        <div>
          <h2 className="display text-[40px] md:text-[56px]">Join the Gollu Gang.</h2>
          <p className="mt-2 max-w-lg text-lg font-semibold">First dibs on Detention drops, secret flavours, and 10% off your first order. About two emails a month. No spam, just snacks.</p>
        </div>
        {done ? (
          <p className="flex items-center gap-2 rounded-2xl border-[2.5px] border-ink bg-cream px-5 py-4 font-extrabold shadow-sticker"><Sparkle className="h-6 w-6" /> You are in. Code GOLLU10 is on its way.</p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); if (valid) setDone(true) }} className="flex w-full flex-col gap-3 sm:flex-row md:w-[420px]">
            <label className="sr-only" htmlFor="nl-email">Email address</label>
            <input id="nl-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="min-w-0 flex-1 rounded-full border-[2.5px] border-ink bg-cream px-5 py-3.5 font-semibold outline-none placeholder:text-ink/40 focus:bg-white" />
            <button className="btn btn-ink">Get 10% off</button>
          </form>
        )}
      </div>
    </section>
  )
}
