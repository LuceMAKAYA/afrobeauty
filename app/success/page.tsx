'use client'
import { useEffect } from 'react'
import { useCart } from '@/lib/cart'
import Nav from '@/components/Nav'
import AbLogo from '@/components/AbLogo'
import { useRouter } from 'next/navigation'

export default function SuccessPage() {
  const { clear } = useCart()
  const router = useRouter()

  useEffect(() => { clear() }, [])

  return (
    <>
      <Nav />
      <div style={{minHeight:'100vh',background:'radial-gradient(ellipse at center, rgba(109,30,58,.2) 0%, #0D0B09 70%)'}}>
        <div className="success-page">
          <div className="success-card fade-up">
            <div className="success-icon">✨</div>

            <h1 className="success-title">
              Merci pour<br/>ta <em>commande !</em>
            </h1>

            <div className="success-divider" />

            <p className="success-sub">
              Ta box Afro Beauty est en cours de préparation.<br/>
              Tu vas recevoir un email de confirmation avec le suivi de ta livraison.
            </p>

            <div style={{
              background:'rgba(109,30,58,.2)',
              border:'1px solid rgba(109,30,58,.4)',
              padding:'24px 32px',
              marginBottom:32,
              textAlign:'left'
            }}>
              {[
                ['📦','Ta box est préparée sous 24h'],
                ['🚚','Livraison en 2-5 jours ouvrés'],
                ['📱','Tuto vidéo accessible via QR code'],
                ['💌','Email de confirmation envoyé'],
              ].map(([icon,label]) => (
                <div key={label} style={{display:'flex',alignItems:'center',gap:14,padding:'8px 0',fontSize:13,color:'rgba(247,237,218,.7)'}}>
                  <span style={{fontSize:18}}>{icon}</span>
                  {label}
                </div>
              ))}
            </div>

            <div style={{marginBottom:32}}>
              <AbLogo size={60} id="success-ab" />
            </div>

            <button className="btn-gold" onClick={() => router.push('/')}>
              Retour à l'accueil
            </button>

            <p style={{marginTop:24,fontSize:12,color:'var(--grey)',lineHeight:1.8}}>
              Une question ? Contacte-nous sur Instagram<br/>
              <strong style={{color:'var(--gold)'}}>@afrobeauty</strong>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
