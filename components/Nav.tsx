'use client'
import { useCart } from '@/lib/cart'
import { useRouter } from 'next/navigation'

export default function Nav() {
  const { count } = useCart()
  const router = useRouter()

  return (
    <nav>
      <div className="nav-logo" onClick={() => router.push('/')}>
        <svg viewBox="0 0 36 36" fill="none" width="34" height="34">
          <defs>
            <linearGradient id="nG" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E8C97A"/>
              <stop offset="100%" stopColor="#8B6914"/>
            </linearGradient>
          </defs>
          <line x1="18" y1="4" x2="18" y2="32" stroke="url(#nG)" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M6 32 L18 4" stroke="url(#nG)" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="9" y1="22" x2="18" y2="22" stroke="url(#nG)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M18 4 Q30 4 30 10 Q30 18 18 18" stroke="url(#nG)" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
          <path d="M18 18 Q32 18 32 25 Q32 32 18 32" stroke="url(#nG)" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
          <circle cx="18" cy="4"  r="2.5" fill="#E8C97A"/>
          <circle cx="18" cy="32" r="2.5" fill="#E8C97A"/>
        </svg>
        <div className="nav-logo-text">
          <span className="brand">Afro Beauty</span>
          <span className="sub">Box · Beauté · Afro</span>
        </div>
      </div>

      <ul className="nav-links">
        <li><a onClick={() => { router.push('/'); setTimeout(() => document.getElementById('boxes')?.scrollIntoView({ behavior:'smooth' }), 100) }}>Nos box</a></li>
        <li><a onClick={() => { router.push('/'); setTimeout(() => document.getElementById('how')?.scrollIntoView({ behavior:'smooth' }), 100) }}>Comment ça marche</a></li>
        <li><a onClick={() => { router.push('/'); setTimeout(() => document.getElementById('reviews')?.scrollIntoView({ behavior:'smooth' }), 100) }}>Avis</a></li>
      </ul>

      <button className="nav-cart" onClick={() => router.push('/panier')}>
        🛒 Panier
        {count > 0 && <span className="cart-badge">{count}</span>}
      </button>
    </nav>
  )
}
