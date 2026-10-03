import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { categories, products } from '../data/products.js'

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="grid items-center gap-6 overflow-hidden rounded-2xl bg-brand p-8 text-white md:grid-cols-2 md:p-12">
        <div>
          <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">Kitchen and home appliances, delivered to your door</h1>
          <p className="mt-4 max-w-md text-white/85">Order in minutes on WhatsApp. Pay cash when it arrives.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/shop" className="btn-accent">Shop all products</Link>
            <Link to="/shop/kitchen-appliances" className="btn border border-white/50 hover:bg-white/10">Kitchen appliances</Link>
          </div>
        </div>
        <div className="hidden text-center text-[9rem] leading-none md:block" aria-hidden="true">🍳</div>
      </section>

      <section className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
        {[['Cash on delivery', 'Pay when you receive your order'], ['Checked before dispatch', 'Every item tested and packed with care'], ['WhatsApp support', 'Real people reply to your questions']].map(([t, d]) => (
          <div key={t} className="rounded-xl border border-black/10 bg-white p-4"><p className="font-bold">{t}</p><p className="text-black/60">{d}</p></div>
        ))}
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Shop by category</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <Link key={c.slug} to={`/shop/${c.slug}`} className="flex flex-col items-center gap-2 rounded-xl border border-black/10 bg-white p-4 text-center text-sm font-semibold hover:border-brand">
              <span className="text-3xl">{c.icon}</span>{c.name}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-bold">New arrivals</h2><Link to="/shop" className="text-sm font-semibold text-brand">View all</Link></div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{products.slice(0, 8).map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </section>
    </div>
  )
}
