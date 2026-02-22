'use client'
import { useState } from 'react'
import { useCart } from '@/lib/cart'
import Nav from '@/components/Nav'
import AbLogo from '@/components/AbLogo'
import { useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CartPage() {
  const { items, remove, update, total, count, clear } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCheckout = async () => {
    if (items.length === 0) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({
            productId: i.product.id,
            name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
            stripePriceId: i.product.stripePriceId,
          }))
        }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Erreur lors du paiement')

      const stripe = await stripePromise
      if (!stripe) throw new Error('Stripe non chargé')

      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId: data.sessionId })
      if (stripeError) throw new Error(stripeError.message)

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      setLoading(false)
    }
  }

  if (count === 0) {
    return (
      <>
        <Nav />
        <div className="cart-page">
          <div className="cart-empty">
            <div style={{fontSize:72,marginBottom:24}}>🛒</div>
            <h2>Ton panier est <em style={{fontStyle:'italic',color:'var(--gold)'}}>vide</em></h2>
            <p>Aucun produit pour l'instant. Choisis ta box et lance-toi !</p>
            <button className="btn-primary" onClick={() => router.push('/#boxes')}>
              Voir les box →
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Nav />
      <div className="cart-page">
        <h1 className="cart-title fade-up">
          Mon <em>panier</em>
        </h1>

        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items">
            {items.map(({ product, quantity }) => (
              <div className="cart-item" key={product.id}>
                <div className="cart-item-visual">
                  <AbLogo size={44} id={`cart-${product.id}`} />
                </div>
                <div className="cart-item-info">
                  <div className="cart-item-cat">{product.category}</div>
                  <div className="cart-item-name">{product.name}</div>
                  <div className="cart-item-sub">{product.subtitle}</div>
                </div>
                <div className="cart-qty">
                  <button className="qty-btn" onClick={() => update(product.id, quantity - 1)}>−</button>
                  <span className="qty-num">{quantity}</span>
                  <button className="qty-btn" onClick={() => update(product.id, quantity + 1)}>+</button>
                </div>
                <div className="cart-item-price">
                  {((product.price * quantity) / 100).toFixed(2)}€
                </div>
                <button className="cart-remove" onClick={() => remove(product.id)} title="Supprimer">✕</button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="cart-summary">
            <div className="summary-title">Récapitulatif</div>
            {items.map(({ product, quantity }) => (
              <div className="summary-row" key={product.id}>
                <span>{product.name} × {quantity}</span>
                <span>{((product.price * quantity) / 100).toFixed(2)}€</span>
              </div>
            ))}
            <div className="summary-row">
              <span>Livraison</span>
              <span style={{color:'var(--gold)'}}>Offerte</span>
            </div>
            <div className="summary-row total">
              <span className="summary-total-label">Total</span>
              <span className="summary-total-price">{(total / 100).toFixed(2)}€</span>
            </div>

            {error && (
              <div style={{background:'rgba(109,30,58,.2)',border:'1px solid var(--bord-l)',padding:'12px 16px',marginBottom:16,fontSize:12,color:'var(--bord-l)',lineHeight:1.6}}>
                ⚠️ {error}
              </div>
            )}

            <button
              className="btn-primary"
              style={{width:'100%',textAlign:'center',marginTop:24,display:'flex',alignItems:'center',justifyContent:'center',gap:10}}
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? (
                <span className="checkout-loading">
                  <span className="spinner" />
                  Redirection...
                </span>
              ) : (
                '🔒 Payer maintenant'
              )}
            </button>

            <p className="summary-note">
              Paiement 100% sécurisé par Stripe<br/>
              Visa · Mastercard · Apple Pay · Google Pay
            </p>

            <div style={{display:'flex',justifyContent:'center',gap:8,marginTop:16,fontSize:20}}>
              💳 🍎 📱
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
