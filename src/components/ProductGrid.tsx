import type { Product } from '../data/products'
import ProductCard from './ProductCard'

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-6 md:gap-y-12 lg:grid-cols-4">
      {products.map((p, i) => <ProductCard key={p.slug} p={p} priority={i < 4} />)}
    </div>
  )
}
