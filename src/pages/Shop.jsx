import { useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { categories, products } from '../data/products.js'

export default function Shop() {
  const { category } = useParams()
  const [params] = useSearchParams()
  const q = (params.get('q') || '').toLowerCase()
  const [sort, setSort] = useState('default')

  let list = products.filter((p) => (!category || p.category === category) && (!q || p.name.toLowerCase().includes(q)))
  if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price)
  if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price)
  const title = categories.find((c) => c.slug === category)?.name || (q ? `Results for "${q}"` : 'All products')

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">{title} <span className="text-base font-normal text-black/50">({list.length})</span></h1>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-lg border border-black/20 px-3 py-2 text-sm" aria-label="Sort products">
          <option value="default">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option>
        </select>
      </div>
      <div className="mb-5 flex gap-2 overflow-x-auto pb-1 text-sm">
        <Link to="/shop" className={`whitespace-nowrap rounded-full border px-3 py-1 ${!category ? 'bg-brand text-white' : 'bg-white'}`}>All</Link>
        {categories.map((c) => <Link key={c.slug} to={`/shop/${c.slug}`} className={`whitespace-nowrap rounded-full border px-3 py-1 ${category === c.slug ? 'bg-brand text-white' : 'bg-white'}`}>{c.name}</Link>)}
      </div>
      {list.length ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      ) : (
        <p className="py-16 text-center text-black/60">No products found. Try a different search or category.</p>
      )}
    </div>
  )
}
