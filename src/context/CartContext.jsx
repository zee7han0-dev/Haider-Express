import { createContext, useContext, useEffect, useState } from 'react'

const CartCtx = createContext(null)
export const useCart = () => useContext(CartCtx)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('he-cart')) || [] } catch { return [] }
  })
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try { localStorage.setItem('he-cart', JSON.stringify(items)) } catch {}
  }, [items])

  const add = (p, qty = 1) => {
    setItems((cur) => {
      const found = cur.find((i) => i.id === p.id)
      if (found) return cur.map((i) => (i.id === p.id ? { ...i, qty: i.qty + qty } : i))
      return [...cur, { id: p.id, name: p.name, price: p.price, qty }]
    })
    setOpen(true)
  }
  const setQty = (id, qty) =>
    setItems((cur) => (qty < 1 ? cur.filter((i) => i.id !== id) : cur.map((i) => (i.id === id ? { ...i, qty } : i))))
  const clear = () => setItems([])
  const count = items.reduce((s, i) => s + i.qty, 0)
  const total = items.reduce((s, i) => s + i.qty * i.price, 0)

  return <CartCtx.Provider value={{ items, add, setQty, clear, count, total, open, setOpen }}>{children}</CartCtx.Provider>
}
