import { PRODUCTS, type Product } from '../data/products'
import { BUNDLES, type Bundle } from '../data/bundles'

const norm = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9 ]/g, ' ')

const productHay = (p: Product) => norm([p.name, p.flavour, p.format, p.descriptor, p.personality, p.collection, ...p.tastes, ...p.moods, ...p.keywords].join(' '))
const bundleHay = (b: Bundle) => norm([b.name, b.line, b.description, ...b.keywords, 'bundle box gift'].join(' '))

function score(hay: string, name: string, terms: string[]) {
  let s = 0
  for (const t of terms) {
    if (!hay.includes(t)) return 0
    s += norm(name).includes(t) ? 3 : 1
  }
  return s
}

export function search(q: string) {
  const terms = norm(q).split(/\s+/).filter((t) => t.length > 1).map((t) => t.replace(/s$/, ''))
  if (!terms.length) return { products: [] as Product[], bundles: [] as Bundle[] }
  const products = PRODUCTS.map((p) => ({ p, s: score(productHay(p), p.name, terms) })).filter((x) => x.s).sort((a, b) => b.s - a.s).map((x) => x.p)
  const bundles = BUNDLES.map((b) => ({ b, s: score(bundleHay(b), b.name, terms) })).filter((x) => x.s).sort((a, b) => b.s - a.s).map((x) => x.b)
  return { products, bundles }
}
export const SEARCH_SUGGESTIONS = ['mango', 'sour', 'gift', 'movie', 'chocolate', 'imli']
