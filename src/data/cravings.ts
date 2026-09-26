export interface Craving { id: string; title: string; line: string; color: string; text: string; slugs: string[]; mascot: string; href: string }
export const CRAVINGS: Craving[] = [
  { id: 'sour', title: 'Make my face do the thing', line: 'Sour, sourer, Kala Kaand', color: '#9BD84A', text: '#2B0F3D', slugs: ['raw-deal', 'strawberry-drama', 'kala-kaand'], mascot: 'pucker', href: '/shop?mood=sour' },
  { id: 'sweet', title: 'I need a little sweet', line: 'Soft, juicy, no drama', color: '#C9A7FF', text: '#2B0F3D', slugs: ['lychee-lately', 'imli-please', 'guava-gossip'], mascot: 'neutral', href: '/shop?mood=sweet' },
  { id: 'emergency', title: '3:47pm emergency', line: 'Desk-drawer approved', color: '#FFC928', text: '#2B0F3D', slugs: ['raw-deal', 'imli-please', 'tiffin-mix'], mascot: 'peek', href: '/shop?mood=emergency' },
  { id: 'movie', title: 'Movie night', line: 'Crinkle-quiet? Not really.', color: '#2F4BFF', text: '#FFF3DA', slugs: ['fizz-ed', 'strawberry-drama', 'paanic'], mascot: 'shades', href: '/shop?mood=movie' },
  { id: 'sharing', title: 'Sharing (or not)', line: 'Boxes for your people', color: '#FF3D8B', text: '#FFF3DA', slugs: ['tiffin-mix', 'guava-gossip', 'fizz-ed'], mascot: 'guilty', href: '/shop?mood=sharing' },
  { id: 'weird', title: 'Something weird', line: 'Straight to Detention', color: '#5B2A86', text: '#FFF3DA', slugs: ['kala-kaand', 'fizz-ed', 'paanic'], mascot: 'wave', href: '/collections/detention' },
]
export const MOOD_TITLES: Record<string, string> = { ...Object.fromEntries(CRAVINGS.map((c) => [c.id, c.title])), justbecause: 'Just because' }
