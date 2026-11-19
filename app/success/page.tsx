'use client'
import { useEffect, useState } from 'react'
import { CONFIG, eur } from '@/lib/catalog'

type PaidOrder = { ref: string; total: number; text: string }

export default function SuccessPage() {
  const [order, setOrder] = useState<PaidOrder | null>(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light')
    try {
      const raw = localStorage.getItem('abPaidOrder')
      if (raw) setOrder(JSON.parse(raw))
      localStorage.removeItem('abCart')
    } catch {}
  }, [])

  const waText = order
    ? `✅ Payé par carte (SumUp) · réf. ${order.ref} · ${eur(order.total)}\n\n${order.text}`
    : 'Bonjour Afro Beauty, je viens de payer ma commande par carte.'
  const waUrl = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(waText)}`

  return (
    <div className="success-page" style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <div className="success-card fade-up">
        <div className="success-icon">✨</div>
        <h1 className="success-title">
          Merci pour
          <br />
          ta <em>commande !</em>
        </h1>
        <div className="success-divider" />
        <p className="success-sub">
          Dernière étape : envoie-nous ta commande sur WhatsApp pour qu&apos;on prépare ta box et
          qu&apos;on te donne l&apos;heure de livraison.
          {order && (
            <>
              <br />
              Référence : <strong>{order.ref}</strong>
            </>
          )}
        </p>
        <a
          className="d-checkout d-wa"
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginBottom: 16 }}
          onClick={() => {
            try {
              localStorage.removeItem('abPaidOrder')
            } catch {}
          }}
        >
          Envoyer ma commande sur WhatsApp
        </a>
        <a href="/" style={{ fontSize: 12, color: 'var(--text-2)' }}>
          Retour à l&apos;accueil
        </a>
      </div>
    </div>
  )
}
