import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { rs, categories } from '../data/products.js'

export function ProductImage({ p, className = '' }) {
  const icon = categories.find((c) => c.slug === p.category)?.icon || '🛍️'
  return p.image ? (
    <img src={p.image} alt={p.name} loading="lazy" className={`object-cover ${className}`} />
  ) : (
    <div className={`flex items-center justify-center bg-brand-light text-6xl ${className}`} role="img" aria-label={p.name}>{icon}</div>
  )
}

export default function ProductCard({ p }) {
  const { add } = useCart()
  const off = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-black/10 bg-white">
      <Link to={`/product/${p.id}`} className="relative block">
        <ProductImage p={p} className="aspect-square w-full" />
        {off > 0 && <span className="absolute left-2 top-2 rounded bg-sale px-2 py-0.5 text-xs font-bold text-white">-{off}%</span>}
        {p.badge && !off && <span className="absolute left-2 top-2 rounded bg-saffron px-2 py-0.5 text-xs font-bold">{p.badge}</span>}
      </Link>
      <div className="flex flex-1 flex-col p-3">
        <Link to={`/product/${p.id}`} className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold hover:text-brand">{p.name}</Link>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-bold text-brand">{rs(p.price)}</span>
          {p.oldPrice && <span className="text-xs text-black/50 line-through">{rs(p.oldPrice)}</span>}
        </div>
        <button onClick={() => add(p)} className="btn-primary mt-3 w-full py-2 text-sm">Add to cart</button>
      </div>
    </div>
  )
}
