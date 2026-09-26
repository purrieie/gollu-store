import { CONFIG } from '../data/config'
import { getProduct } from '../data/products'
import { getBundle } from '../data/bundles'

export interface CartItem { key: string; kind: 'product' | 'bundle'; slug: string; qty: number }

export const bundleValue = (slug: string) => {
  const b = getBundle(slug)
  return b ? b.items.reduce((s, i) => s + (getProduct(i)?.price ?? 0), 0) : 0
}

export function unitPrice(item: CartItem) {
  return item.kind === 'product' ? getProduct(item.slug)?.price ?? 0 : getBundle(item.slug)?.price ?? 0
}

export function tierFor(units: number) {
  return CONFIG.tiers.find((t) => units >= t.minUnits) ?? null
}

export function nextTier(units: number) {
  const sorted = [...CONFIG.tiers].sort((a, b) => a.minUnits - b.minUnits)
  return sorted.find((t) => units < t.minUnits) ?? null
}

export function computeTotals(items: CartItem[]) {
  let pouchSubtotal = 0
  let otherSubtotal = 0
  let pouchUnits = 0
  let count = 0
  for (const it of items) {
    const line = unitPrice(it) * it.qty
    count += it.qty
    const p = it.kind === 'product' ? getProduct(it.slug) : null
    if (p && p.collection !== 'mix') { pouchSubtotal += line; pouchUnits += it.qty } else otherSubtotal += line
  }
  const tier = tierFor(pouchUnits)
  const discount = tier ? Math.round(pouchSubtotal * tier.rate) : 0
  const subtotal = pouchSubtotal + otherSubtotal
  const afterDiscount = subtotal - discount
  const freeShip = afterDiscount >= CONFIG.freeShippingThreshold
  const shipping = items.length === 0 || freeShip ? 0 : CONFIG.shippingFee
  const toFreeShip = Math.max(0, CONFIG.freeShippingThreshold - afterDiscount)
  return { subtotal, discount, tier, next: nextTier(pouchUnits), pouchUnits, afterDiscount, shipping, total: afterDiscount + shipping, freeShip, toFreeShip, count }
}
