export type Taste = 'sour' | 'sweet' | 'spicy' | 'fizzy' | 'chocolatey' | 'tangy' | 'floral'
export type Format = 'Gummies' | 'Soft chews' | 'Sour belts' | 'Gummy bottles' | 'Coated bites' | 'Mixed box'
export type CollectionSlug = 'tuck-shop' | 'detention'

export interface Product {
  slug: string
  name: string
  flavour: string
  format: Format
  descriptor: string
  personality: string
  collection: CollectionSlug | 'mix'
  price: number
  size: string
  color: string
  soft: string
  onColor: 'ink' | 'cream'
  pack: string
  inside: string
  extra: string
  rating: number
  reviews: number
  rank: number
  isNew?: boolean
  tastes: Taste[]
  moods: string[]
  keywords: string[]
  description: string
  whyLike: string[]
  insideNotes: string
  ingredients: string
  allergens: string
  notes: { sweet: number; sour: number; spice: number; chew: number }
  howToEat: string[]
  faqs: { q: string; a: string }[]
  pairsWith: string[]
  hoverLine: string
}

const img = (n: string) => `/images/${n}.webp`

export const PRODUCTS: Product[] = [
  {
    slug: 'raw-deal', name: 'Raw Deal', flavour: 'Kaccha Aam + Chilli Salt', format: 'Gummies',
    descriptor: 'Sour gummies', personality: 'Tangy enough to make you blink twice.',
    collection: 'tuck-shop', price: 149, size: '50g pouch', color: '#9BD84A', soft: '#E6F7CF', onColor: 'ink',
    pack: img('pack-raw-deal'), inside: img('inside-raw-deal'), extra: img('life-auto'),
    rating: 4.8, reviews: 1284, rank: 1, tastes: ['sour', 'tangy', 'spicy'],
    moods: ['sour', 'emergency'], keywords: ['mango', 'raw mango', 'kaccha aam', 'aam', 'chilli', 'nostalgia', 'school'],
    description: 'Green mango pulp, a proper hit of chilli salt, and a sour sugar coat that fights back. It is the school-gate raw mango with namak-mirch, minus the sticky hands and the uncle who never had change.',
    whyLike: ['Tastes like actual kaccha aam, not "green flavour"', 'Chilli salt you can see (and feel, a bit)', 'Soft, bouncy chew that does not glue your teeth shut'],
    insideNotes: 'Real raw mango pulp, pectin (not gelatin), rock salt, red chilli.',
    ingredients: 'Sugar, glucose syrup, raw mango pulp (15%), pectin, citric acid, malic acid, rock salt, red chilli powder, natural mango flavour, colour from spirulina and turmeric.',
    allergens: 'Made in a facility that also handles milk and nuts.',
    notes: { sweet: 2, sour: 4, spice: 3, chew: 3 },
    howToEat: ['One at a time, like a civilised person', 'Two at a time, like a regular person', 'Straight from the pouch in an auto, like a legend'],
    faqs: [{ q: 'How spicy is the chilli salt?', a: 'A warm tingle, not a fire drill. If you can handle a namak-mirch guava from a cart, you are fine.' }],
    pairsWith: ['kala-kaand', 'imli-please'], hoverLine: 'yes, that is real chilli salt',
  },
  {
    slug: 'imli-please', name: 'Imli Please', flavour: 'Tamarind + Jaggery', format: 'Soft chews',
    descriptor: 'Soft chews', personality: 'Your school gate, now resealable.',
    collection: 'tuck-shop', price: 149, size: '50g pouch', color: '#E07A2E', soft: '#FBE0C8', onColor: 'ink',
    pack: img('pack-imli-please'), inside: img('inside-imli-please'), extra: img('story-kitchen'),
    rating: 4.7, reviews: 912, rank: 3, tastes: ['tangy', 'sweet'],
    moods: ['sweet', 'emergency', 'movie'], keywords: ['imli', 'tamarind', 'jaggery', 'gud', 'nostalgia', 'chewy'],
    description: 'Tart tamarind cooked down with jaggery until it turns into the chewiest, stickiest, most "one more" thing we make. Sweet first, sour second, gone third.',
    whyLike: ['Jaggery, not just sugar, so it tastes deep and toffee-ish', 'Real tamarind tang, the imli-goli kind', 'Soft chew that melts, perfect for slow snacking'],
    insideNotes: 'Tamarind pulp, jaggery, a pinch of black salt.',
    ingredients: 'Jaggery, glucose syrup, tamarind pulp (18%), sugar, pectin, black salt, cumin, citric acid.',
    allergens: 'Made in a facility that also handles milk and nuts.',
    notes: { sweet: 4, sour: 3, spice: 1, chew: 5 },
    howToEat: ['After lunch, as a "digestive" (wink)', 'During a long call you cannot leave', 'Unwrap slowly for maximum drama'],
    faqs: [{ q: 'Is it very sticky?', a: 'It is a chew, so it is soft, but it will not pull fillings out. We checked. On ourselves.' }],
    pairsWith: ['raw-deal', 'guava-gossip'], hoverLine: 'tastes like 3:10pm, last period',
  },
  {
    slug: 'guava-gossip', name: 'Guava Gossip', flavour: 'Pink Guava + Chilli Dust', format: 'Gummies',
    descriptor: 'Gummies', personality: 'Juicy, spicy, and knows everything.',
    collection: 'tuck-shop', price: 149, size: '50g pouch', color: '#FF7A6B', soft: '#FFE0DB', onColor: 'ink',
    pack: img('pack-guava-gossip'), inside: img('inside-guava-gossip'), extra: img('flavour-spread'),
    rating: 4.6, reviews: 648, rank: 5, tastes: ['sweet', 'spicy'],
    moods: ['sweet', 'sharing', 'movie'], keywords: ['guava', 'amrood', 'pink guava', 'chilli', 'fruity'],
    description: 'Pink guava, the one from the thela, sliced and dusted with red chilli. We turned it into a juicy gummy with a chilli dust that shows up late and makes a scene.',
    whyLike: ['Big, floral, very pink guava flavour', 'Chilli dust on the outside for a slow warm finish', 'The best "just one more" in the range, per our warehouse team'],
    insideNotes: 'Pink guava pulp, pectin, Kashmiri chilli.',
    ingredients: 'Sugar, glucose syrup, pink guava pulp (15%), pectin, citric acid, Kashmiri chilli powder, rock salt, natural guava flavour, colour from beetroot.',
    allergens: 'Made in a facility that also handles milk and nuts.',
    notes: { sweet: 3, sour: 2, spice: 3, chew: 3 },
    howToEat: ['Share with the friend who has the best tea', 'Chilled, for extra juiciness', 'With a really good rumour'],
    faqs: [{ q: 'Which is spicier, Guava Gossip or Raw Deal?', a: 'Guava Gossip is a slow warm finish. Raw Deal is tangier up front. Both are polite about it.' }],
    pairsWith: ['strawberry-drama', 'fizz-ed'], hoverLine: 'you did not hear it from us',
  },
  {
    slug: 'strawberry-drama', name: 'Strawberry Drama', flavour: 'Sour Strawberry', format: 'Sour belts',
    descriptor: 'Sour belts', personality: 'Sweet, sour, always the main character.',
    collection: 'tuck-shop', price: 169, size: '50g pouch', color: '#E8243C', soft: '#FFD6DB', onColor: 'cream',
    pack: img('pack-strawberry-drama'), inside: img('inside-strawberry-drama'), extra: img('hero-main'),
    rating: 4.8, reviews: 1036, rank: 2, tastes: ['sour', 'sweet'],
    moods: ['sour', 'movie', 'sharing'], keywords: ['strawberry', 'belts', 'sour belts', 'berry', 'movie'],
    description: 'Long, flat, sugar-sanded strawberry belts that are sweet for exactly one second before the sour shows up and takes a bow. Tear, fold, stack, braid. Nobody is watching.',
    whyLike: ['Real strawberry, not pink-medicine strawberry', 'Sour sanding that crackles', 'Belts you can share by the inch (or not)'],
    insideNotes: 'Strawberry pulp, sour sugar sanding, pectin.',
    ingredients: 'Sugar, glucose syrup, rice starch, strawberry pulp (12%), pectin, citric acid, malic acid, natural strawberry flavour, colour from beetroot and black carrot.',
    allergens: 'Made in a facility that also handles milk and nuts.',
    notes: { sweet: 3, sour: 4, spice: 0, chew: 4 },
    howToEat: ['Tear lengthwise, then do it again', 'Braid three together for a power move', 'During the part of the movie where they finally kiss'],
    faqs: [{ q: 'Are the belts very long?', a: 'About a ruler long. School ruler, not the big one.' }],
    pairsWith: ['raw-deal', 'lychee-lately'], hoverLine: 'main character energy, sold by the inch',
  },
  {
    slug: 'lychee-lately', name: 'Lychee Lately', flavour: 'Lychee + Rose', format: 'Gummies',
    descriptor: 'Gummies', personality: 'Soft, floral, a little extra.',
    collection: 'tuck-shop', price: 169, size: '50g pouch', color: '#C9A7FF', soft: '#EFE5FF', onColor: 'ink',
    pack: img('pack-lychee-lately'), inside: img('inside-lychee-lately'), extra: img('flavour-spread'),
    rating: 4.6, reviews: 571, rank: 6, tastes: ['sweet', 'floral'],
    moods: ['sweet', 'justbecause'], keywords: ['lychee', 'litchi', 'rose', 'gulab', 'floral', 'gift'],
    description: 'Juicy lychee with a quiet hint of rose, like the good falooda place but in your bag. It is the gentle one in the family. Still extra, just softly.',
    whyLike: ['Our least sour, most "aww" flavour', 'Real lychee juice and a whisper of rose', 'Pretty enough to gift, good enough to keep'],
    insideNotes: 'Lychee juice, rose water, pectin.',
    ingredients: 'Sugar, glucose syrup, lychee juice concentrate (12%), pectin, citric acid, rose water, natural lychee flavour, colour from black carrot.',
    allergens: 'Made in a facility that also handles milk and nuts.',
    notes: { sweet: 4, sour: 1, spice: 0, chew: 3 },
    howToEat: ['With your feet up', 'After something too spicy', 'As a "sorry" gift (works shockingly well)'],
    faqs: [{ q: 'Does it taste like perfume?', a: 'No. The rose is a background singer. Lychee is lead vocals.' }],
    pairsWith: ['strawberry-drama', 'paanic'], hoverLine: 'a little extra, as usual',
  },
  {
    slug: 'kala-kaand', name: 'Kala Kaand', flavour: 'Kala Khatta', format: 'Gummies',
    descriptor: 'Extreme sour gummies', personality: 'Our sourest. Bring a friend. Or a witness.',
    collection: 'detention', price: 179, size: '50g pouch', color: '#5B2A86', soft: '#E4D6F2', onColor: 'cream',
    pack: img('pack-kala-kaand'), inside: img('inside-kala-kaand'), extra: img('hero-main'),
    rating: 4.9, reviews: 1507, rank: 0, isNew: true, tastes: ['sour', 'tangy'],
    moods: ['sour', 'weird'], keywords: ['kala khatta', 'jamun', 'black salt', 'extreme sour', 'sourest', 'gola', 'challenge'],
    description: 'The kala khatta gola, turned into a gummy and then sent to detention for being too much. Jamun, black salt and a double sour coat. First ten seconds: regret. Next ten: another one.',
    whyLike: ['The sourest thing we legally sell', 'Real jamun and kala namak underneath the pucker', 'Makes a very good video. Just saying.'],
    insideNotes: 'Jamun pulp, black salt, double sour coating.',
    ingredients: 'Sugar, glucose syrup, jamun pulp (14%), pectin, citric acid, malic acid, fumaric acid, black salt, natural kala khatta flavour, colour from black carrot.',
    allergens: 'Made in a facility that also handles milk and nuts. Very sour; not recommended for small children.',
    notes: { sweet: 1, sour: 5, spice: 1, chew: 3 },
    howToEat: ['Two at once, if you are brave', 'Film your friend trying it (ask first)', 'Chase with Lychee Lately if things go badly'],
    faqs: [{ q: 'How sour is it really?', a: 'Sourer than you are imagining. It mellows into sweet jamun after about 10 seconds.' }, { q: 'Is it OK for kids?', a: 'It is food-safe for everyone, but the sour coat is intense. Maybe start them on Raw Deal.' }],
    pairsWith: ['raw-deal', 'lychee-lately'], hoverLine: 'we measured the sour. the meter broke.',
  },
  {
    slug: 'fizz-ed', name: 'Fizz Ed', flavour: 'Cola + Chaat Masala', format: 'Gummy bottles',
    descriptor: 'Fizzy gummy bottles', personality: 'Fizzy, salty, zero attendance.',
    collection: 'detention', price: 179, size: '50g pouch', color: '#2F4BFF', soft: '#D6DCFF', onColor: 'cream',
    pack: img('pack-fizz-ed'), inside: img('inside-fizz-ed'), extra: img('flavour-spread'),
    rating: 4.7, reviews: 803, rank: 4, tastes: ['fizzy', 'tangy', 'spicy'],
    moods: ['movie', 'weird', 'sharing'], keywords: ['cola', 'masala', 'chaat', 'fizzy', 'soda', 'movie', 'bottles'],
    description: 'Cola bottles with a fizz coating and a sprinkle of chaat masala, like the masala soda from the cart outside the multiplex. It crackles, then it gets salty, then you open another one.',
    whyLike: ['Fizz coating that actually tingles', 'Chaat masala, because obviously', 'The bottle shape. We are not above that.'],
    insideNotes: 'Cola flavour, chaat masala, fizz coating.',
    ingredients: 'Sugar, glucose syrup, pectin, citric acid, sodium bicarbonate, chaat masala (black salt, cumin, dry mango, black pepper), natural cola flavour, caramel colour.',
    allergens: 'Made in a facility that also handles milk and nuts. Contains no caffeine.',
    notes: { sweet: 3, sour: 3, spice: 2, chew: 3 },
    howToEat: ['During the interval, obviously', 'Let it fizz on your tongue for 3 seconds', 'Pair with an actual masala soda for chaos'],
    faqs: [{ q: 'Is there caffeine?', a: 'No caffeine. All the attitude, none of the jitters.' }],
    pairsWith: ['guava-gossip', 'paanic'], hoverLine: 'zero attendance, full marks',
  },
  {
    slug: 'paanic', name: 'Paanic!', flavour: 'Meetha Paan + Gulkand', format: 'Coated bites',
    descriptor: 'Choco-coated chewy bites', personality: 'Paan shop energy. No spitting required.',
    collection: 'detention', price: 199, size: '50g pouch', color: '#2E9E5B', soft: '#D4F0DF', onColor: 'cream',
    pack: img('pack-paanic'), inside: img('inside-paanic'), extra: img('story-kitchen'),
    rating: 4.8, reviews: 694, rank: 7, tastes: ['chocolatey', 'sweet', 'floral'],
    moods: ['weird', 'justbecause', 'movie'], keywords: ['paan', 'meetha paan', 'gulkand', 'chocolate', 'choco', 'rose', 'after dinner', 'gift'],
    description: 'A chewy gulkand-and-paan centre wrapped in a snappy chocolate shell. It is the after-dinner meetha paan, minus the red teeth and the negotiation with the paanwala.',
    whyLike: ['Our only chocolate one, and it knows it', 'Proper meetha paan flavour, gulkand and all', 'The best after-dinner move since actual paan'],
    insideNotes: 'Gulkand, betel leaf, chocolate shell.',
    ingredients: 'Compound chocolate (sugar, cocoa solids, vegetable fat, milk solids), sugar, glucose syrup, gulkand (8%), pectin, betel leaf extract, fennel, cardamom, natural paan flavour.',
    allergens: 'Contains milk. Made in a facility that also handles nuts.',
    notes: { sweet: 4, sour: 0, spice: 1, chew: 4 },
    howToEat: ['After biryani, like a tradition', 'Keep in the fridge in summer', 'Offer one to your nani and watch her face'],
    faqs: [{ q: 'Is it vegetarian?', a: 'Yes, 100% veg. It does contain milk (in the chocolate), so it is not vegan.' }, { q: 'Does it melt?', a: 'Chocolate plus Indian summer equals romance. We ship in insulated packs from April to June.' }],
    pairsWith: ['lychee-lately', 'fizz-ed'], hoverLine: 'no spitting required',
  },
  {
    slug: 'tiffin-mix', name: 'Tiffin Mix', flavour: 'One of everything', format: 'Mixed box',
    descriptor: '10 mini pouches', personality: 'One of everything. Sharing optional.',
    collection: 'mix', price: 399, size: '10 × 20g minis', color: '#FF3D8B', soft: '#FFD3E5', onColor: 'cream',
    pack: img('pack-tiffin-mix'), inside: img('flavour-spread'), extra: img('story-kitchen'),
    rating: 4.9, reviews: 2210, rank: 8, tastes: ['sour', 'sweet', 'spicy', 'fizzy', 'chocolatey', 'tangy', 'floral'],
    moods: ['sharing', 'emergency', 'justbecause'], keywords: ['mix', 'assorted', 'variety', 'gift', 'box', 'try', 'sampler', 'party', 'tiffin', 'chocolate'],
    description: 'Ten mini pouches in one very pink box: all eight flavours plus two wildcards. For the indecisive, the curious, the office desk, and the friend whose birthday you forgot until this morning.',
    whyLike: ['Try all eight before you commit', 'Minis are perfect for bags and desk drawers', 'Looks like a gift. Is a gift. Could be your gift.'],
    insideNotes: 'All 8 flavours + 2 surprise repeats.',
    ingredients: 'See individual flavours. Contains the Paanic! mini, which contains milk.',
    allergens: 'Contains milk (Paanic!). Made in a facility that also handles nuts.',
    notes: { sweet: 3, sour: 3, spice: 2, chew: 4 },
    howToEat: ['One mini per weekday, two for the weekend', 'Hand them out at a meeting to become everyone\'s favourite', 'Hide the Kala Kaand ones for a prank'],
    faqs: [{ q: 'Which flavours are the wildcards?', a: 'Two repeats of whatever the team thinks you will love. Usually Raw Deal. Sometimes Kala Kaand, if we are feeling cheeky.' }, { q: 'Can I gift it with a note?', a: 'Yes. Add your note at checkout and we will handwrite it (badly, but with love).' }],
    pairsWith: ['kala-kaand', 'raw-deal'], hoverLine: 'sharing optional, obviously',
  },
]

export const pouches = PRODUCTS.filter((p) => p.collection !== 'mix')
export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug)
export const bestsellers = [...PRODUCTS].sort((a, b) => a.rank - b.rank)

export const TASTE_LABELS: Record<Taste, string> = {
  sour: 'Sour', sweet: 'Sweet', spicy: 'Spicy', fizzy: 'Fizzy', chocolatey: 'Chocolatey', tangy: 'Tangy', floral: 'Floral',
}

export const GENERAL_FAQS = [
  { q: 'Is everything vegetarian?', a: 'Yes. Every Gollu product is 100% veg. We set with pectin from fruit, never gelatin. Paanic! contains milk, so it is veg but not vegan.' },
  { q: 'How long do they last?', a: 'Nine months from the date on the pouch. Realistically, about four days.' },
  { q: 'When will my order ship?', a: 'Orders before 2pm ship the same day from Mumbai. Most metros get them in 2–4 days.' },
  { q: 'Do you offer cash on delivery?', a: 'Yes, COD is available across India on orders up to ₹2,000.' },
]
