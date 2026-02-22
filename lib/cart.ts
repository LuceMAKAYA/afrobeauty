'use client'
import { createContext, useContext, useState, ReactNode } from 'react'
import { Product } from './products'

export interface CartItem {
  product: Product
  quantity: number
}

interface CartCtx {
  items: CartItem[]
  add: (product: Product) => void
  remove: (id: string) => void
  update: (id: string, qty: number) => void
  clear: () => void
  total: number
  count: number
}

const CartContext = createContext<CartCtx | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const add = (product: Product) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.product.id === product.id)
      if (exists) return prev.map((i) => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
      return [...prev, { product, quantity: 1 }]
    })
  }

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.product.id !== id))

  const update = (id: string, qty: number) => {
    if (qty <= 0) return remove(id)
    setItems((prev) => prev.map((i) => i.product.id === id ? { ...i, quantity: qty } : i))
  }

  const clear = () => setItems([])

  const total = items.reduce((s, i) => s + i.product.price * i.quantity, 0)
  const count = items.reduce((s, i) => s + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, add, remove, update, clear, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be inside CartProvider')
  return ctx
}
