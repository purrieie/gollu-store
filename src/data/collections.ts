import type { CollectionSlug } from './products'
export interface Collection {
  slug: CollectionSlug
  name: string
  line: string
  description: string
  color: string
  textColor: string
  editorialTitle: string
  editorial: string[]
}
export const COLLECTIONS: Collection[] = [
  {
    slug: 'tuck-shop', name: 'The Tuck Shop', line: 'The everyday five.',
    description: 'The flavours you grew up buying through the school gate with a crumpled ten-rupee note. Raw mango, imli, pink guava, sour strawberry and lychee rose, made chewy and properly desi.',
    color: '#FFC928', textColor: '#2B0F3D',
    editorialTitle: 'Wait, what is a tuck shop?',
    editorial: [
      'The tiny counter by the school canteen that sold everything your parents said not to buy. Imli golis in a jar, raw mango with salt in a paper cone, sour strips at a rupee each.',
      'We built this range around those flavours, then fixed the bits that were not great: real fruit pulp instead of mystery syrup, pectin instead of gelatin, and pouches that close.',
    ],
  },
  {
    slug: 'detention', name: 'Detention', line: 'Flavours that got sent out of class.',
    description: 'The weird ones. Extreme sour kala khatta, cola bottles with chaat masala, and paan wrapped in chocolate. Smaller batches, louder flavours, zero apologies.',
    color: '#5B2A86', textColor: '#FFF3DA',
    editorialTitle: 'Detention rules',
    editorial: [
      'Detention flavours are the experiments that passed our taste tests but failed the "is this normal?" test. We make them in smaller batches, and when a batch sells out it can take a few weeks to come back.',
      'If one of these becomes your whole personality, tell us. The most-requested flavours get to graduate to the Tuck Shop.',
    ],
  },
]
export const getCollection = (slug: string) => COLLECTIONS.find((c) => c.slug === slug)
