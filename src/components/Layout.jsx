import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { STORE, categories, rs } from '../data/products.js'

function CartDrawer() {
  const { items, setQty, clear, total, open, setOpen } = useCart()
  const [f, setF] = useState({ name: '', phone: '', address: '' })
  const [err, setErr] = useState('')
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const order = () => {
    if (!f.name.trim() || f.phone.replace(/\D/g, '').length < 10 || !f.address.trim()) {
      setErr('Please enter your name, a valid phone number and full address.')
      return
    }
    const lines = items.map((i) => `• ${i.name} x${i.qty} = ${rs(i.price * i.qty)}`).join('\n')
    const msg = `New order - ${STORE.name}\n\n${lines}\n\nTotal: ${rs(total)} (Cash on delivery)\n\nName: ${f.name}\nPhone: ${f.phone}\nAddress: ${f.address}`
    window.open(`https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')
    clear(); setOpen(false); setErr('')
  }

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-label="Shopping cart">
      <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
      <aside className="relative flex h-full w-full max-w-md flex-col bg-white shadow-xl">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-bold">Your cart</h2>
          <button onClick={() => setOpen(false)} className="text-2xl leading-none" aria-label="Close cart">×</button>
        </div>
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
            <p className="text-black/60">Your cart is empty.</p>
            <Link to="/shop" onClick={() => setOpen(false)} className="btn-primary">Continue shopping</Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y overflow-y-auto px-4">
              {items.map((i) => (
                <li key={i.id} className="py-3">
                  <p className="text-sm font-semibold">{i.name}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center rounded-lg border">
                      <button className="px-3 py-1" onClick={() => setQty(i.id, i.qty - 1)} aria-label="Decrease">−</button>
                      <span className="w-8 text-center text-sm">{i.qty}</span>
                      <button className="px-3 py-1" onClick={() => setQty(i.id, i.qty + 1)} aria-label="Increase">+</button>
                    </div>
                    <span className="font-bold text-brand">{rs(i.price * i.qty)}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-2 border-t bg-paper p-4">
              {['name', 'phone', 'address'].map((k) => (
                <input key={k} value={f[k]} onChange={set(k)} placeholder={{ name: 'Full name', phone: 'Phone / WhatsApp number', address: 'Full delivery address, city' }[k]}
                  inputMode={k === 'phone' ? 'tel' : 'text'} className="w-full rounded-lg border border-black/20 px-3 py-2 text-sm" />
              ))}
              {err && <p className="text-sm text-sale">{err}</p>}
              <div className="flex justify-between pt-1 font-bold"><span>Total</span><span>{rs(total)}</span></div>
              <p className="text-xs text-black/60">Cash on delivery. Shipping is confirmed on WhatsApp.</p>
              <button onClick={order} className="btn-accent w-full">Place order on WhatsApp</button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

export default function Layout({ children }) {
  const { count, setOpen } = useCart()
  const [q, setQ] = useState('')
  const nav = useNavigate()
  const search = (e) => { e.preventDefault(); nav(`/shop?q=${encodeURIComponent(q)}`) }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-brand py-2 text-center text-sm text-white">
        Cash on delivery all over Pakistan · WhatsApp support {STORE.phoneDisplay}
      </div>
      <header className="sticky top-0 z-40 border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Link to="/" className="text-xl font-extrabold text-brand">Haider<span className="text-saffron">Express</span></Link>
          <form onSubmit={search} className="mx-2 hidden flex-1 md:block">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search blenders, air fryers, hair dryers…"
              className="w-full rounded-lg border border-black/20 px-4 py-2 text-sm" aria-label="Search products" />
          </form>
          <nav className="ml-auto hidden gap-5 text-sm font-semibold md:flex">
            <NavLink to="/shop" className="hover:text-brand">All products</NavLink>
          </nav>
          <button onClick={() => setOpen(true)} className="relative ml-auto rounded-lg border px-3 py-2 text-sm font-semibold md:ml-0" aria-label="Open cart">
            Cart
            {count > 0 && <span className="absolute -right-2 -top-2 rounded-full bg-sale px-1.5 text-xs font-bold text-white">{count}</span>}
          </button>
        </div>
        <div className="border-t px-4 py-2 md:hidden">
          <form onSubmit={search}><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products" className="w-full rounded-lg border border-black/20 px-3 py-2 text-sm" aria-label="Search products" /></form>
        </div>
        <div className="hidden border-t md:block">
          <div className="mx-auto flex max-w-6xl gap-6 overflow-x-auto px-4 py-2 text-sm">
            {categories.map((c) => <NavLink key={c.slug} to={`/shop/${c.slug}`} className="whitespace-nowrap hover:text-brand">{c.name}</NavLink>)}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">{children}</main>

      <footer className="mt-10 bg-ink text-white/80">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-sm md:grid-cols-3">
          <div><p className="text-lg font-bold text-white">Haider Express</p><p className="mt-2">Home, kitchen and beauty essentials delivered to your door.</p></div>
          <div><p className="font-semibold text-white">Shop</p><ul className="mt-2 space-y-1">{categories.map((c) => <li key={c.slug}><Link to={`/shop/${c.slug}`}>{c.name}</Link></li>)}</ul></div>
          <div><p className="font-semibold text-white">Need help?</p><p className="mt-2">WhatsApp: {STORE.phoneDisplay}<br />Open daily, 10am to 9pm</p></div>
        </div>
        <p className="border-t border-white/10 py-4 text-center text-xs">© {new Date().getFullYear()} haiderexpress.com</p>
      </footer>

      <a href={`https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent('Hi Haider Express!')}`} target="_blank" rel="noreferrer"
        className="fixed bottom-4 right-4 z-30 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-lg">WhatsApp us</a>
      <CartDrawer />
    </div>
  )
}
