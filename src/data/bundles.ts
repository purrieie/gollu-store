export interface Bundle {
  slug: string
  name: string
  line: string
  description: string
  items: string[]
  price: number
  color: string
  onColor: 'ink' | 'cream'
  keywords: string[]
  sticker: string
}
export const BUNDLES: Bundle[] = [
  {
    slug: 'sour-squad', name: 'Sour Squad', line: 'For people who like their face to do the thing.',
    description: 'Our three sourest, from tangy to "why did I do this". Raw Deal, Strawberry Drama and Kala Kaand.',
    items: ['raw-deal', 'strawberry-drama', 'kala-kaand'], price: 449, color: '#9BD84A', onColor: 'ink',
    keywords: ['sour', 'challenge', 'extreme', 'tangy'], sticker: 'face scrunch guaranteed',
  },
  {
    slug: 'class-bunk-box', name: 'Class Bunk Box', line: 'Movie night, sorted. Attendance, not so much.',
    description: 'Four flavours for sharing on the couch: fizzy, chewy, spicy, and a chocolate one for the end credits.',
    items: ['fizz-ed', 'guava-gossip', 'imli-please', 'paanic'], price: 599, color: '#2F4BFF', onColor: 'cream',
    keywords: ['movie', 'movie night', 'netflix', 'party', 'sharing', 'friends', 'chocolate'], sticker: 'best for 2–4 people',
  },
  {
    slug: 'whole-canteen', name: 'The Whole Canteen', line: 'All eight pouches. Plus a sticker sheet.',
    description: 'Every flavour we make, in full-size pouches, with a Gollu sticker sheet for your laptop, fridge or enemy.',
    items: ['raw-deal', 'imli-please', 'guava-gossip', 'strawberry-drama', 'lychee-lately', 'kala-kaand', 'fizz-ed', 'paanic'],
    price: 1149, color: '#FF3D8B', onColor: 'cream', keywords: ['all', 'everything', 'gift', 'birthday', 'try everything', 'variety'], sticker: 'biggest saving',
  },
]
export const getBundle = (slug: string) => BUNDLES.find((b) => b.slug === slug)
