// Store-wide knobs. Everything a CRO test would touch lives here.
export const CONFIG = {
  freeShippingThreshold: 499,
  shippingFee: 49,
  // Pouch multi-buy tiers (applies to single pouches only, not bundles or Tiffin Mix)
  tiers: [
    { minUnits: 5, rate: 0.15, label: 'Buy 5, save 15%' },
    { minUnits: 3, rate: 0.1, label: 'Buy 3, save 10%' },
  ],
  // 'toast' keeps people browsing; 'drawer' opens the cart on every quick add
  quickAddBehaviour: 'toast' as 'toast' | 'drawer',
  // 'flavour-first' puts the flavour picker above bestsellers on the homepage
  homeDiscovery: 'product-first' as 'product-first' | 'flavour-first',
}

export const ANNOUNCEMENTS = [
  'Free shipping over ₹499 · roughly 3 pouches, we did the maths',
  'Buy 3, save 10%. Buy 5, save 15%. More maths.',
  'New in Detention: Kala Kaand. You have been warned.',
  '100% veg · zero gelatin · real fruit, real chilli salt',
]
