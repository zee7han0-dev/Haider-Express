import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ProductCard, { ProductImage } from '../components/ProductCard.jsx'
import { useCart } from '../context/CartContext.jsx'
import { products, rs, STORE } from '../data/products.js'

export default function ProductPage() {
  const { id } = useParams()
  const p = products.find((x) => x.id === Number(id))
  const { add } = useCart()
  const [qty, setQty] = useState(1)

  if (!p) return <div className="py-20 text-center"><p>Product not found.</p><Link to="/shop" className="btn-primary mt-4">Back to shop</Link></div>
  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4)

  return (
    <div>
      <p className="mb-4 text-sm text-black/60"><Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / {p.name}</p>
      <div className="grid gap-8 md:grid-cols-2">
        <ProductImage p={p} className="aspect-square w-full rounded-2xl" />
        <div>
          <h1 className="text-2xl font-bold">{p.name}</h1>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-brand">{rs(p.price)}</span>
            {p.oldPrice && <span className="text-black/50 line-through">{rs(p.oldPrice)}</span>}
          </div>
          <p className="mt-4 text-black/70">{p.desc}</p>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded-lg border bg-white">
              <button className="px-4 py-3" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease">−</button>
              <span className="w-8 text-center">{qty}</span>
              <button className="px-4 py-3" onClick={() => setQty(qty + 1)} aria-label="Increase">+</button>
            </div>
            <button onClick={() => add(p, qty)} className="btn-primary flex-1">Add to cart</button>
          </div>
          <a href={`https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(`Hi! I want to ask about: ${p.name}`)}`} target="_blank" rel="noreferrer" className="btn mt-3 w-full border border-brand text-brand">Ask on WhatsApp</a>
          <ul className="mt-6 space-y-1 text-sm text-black/70"><li>✔ Cash on delivery</li><li>✔ Checked before dispatch</li><li>✔ Delivery across Pakistan</li></ul>
        </div>
      </div>
      {related.length > 0 && (
        <section className="mt-12"><h2 className="mb-4 text-xl font-bold">You may also like</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{related.map((r) => <ProductCard key={r.id} p={r} />)}</div></section>
      )}
    </div>
  )
}
