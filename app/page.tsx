'use client'
import Nav from '@/components/Nav'
import AbLogo from '@/components/AbLogo'
import { products } from '@/lib/products'
import { useCart } from '@/lib/cart'
import { useRouter } from 'next/navigation'

const bgClasses = ['box-preview-1','box-preview-2','box-preview-3','box-preview-4']

export default function Home() {
  const { add } = useCart()
  const router = useRouter()
  const featured = products[0]
  const rest = products.slice(1)

  const handleAdd = (product: typeof products[0]) => {
    add(product)
    router.push('/panier')
  }

  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section id="hero">
        <div className="hero-bg" />

        <div className="hero-content">
          <div className="hero-eyebrow fade-up">
            <span>La box beauté afro</span>
          </div>
          <h1 className="hero-title fade-up-1">
            Coiffée,<br/>
            <em>confiante,</em><br/>
            <span className="bord-word">toi.</span>
          </h1>
          <p className="hero-sub fade-up-2">
            Fini de chercher les bonnes mèches, les bons accessoires, les bons produits.
            Afro Beauty te livre tout — prêt à coiffer, avec le tuto inclus.
          </p>
          <div className="hero-actions fade-up-3">
            <button className="btn-primary" onClick={() => document.getElementById('boxes')?.scrollIntoView({ behavior:'smooth' })}>
              Choisir ma box
            </button>
            <button className="btn-ghost" onClick={() => document.getElementById('how')?.scrollIntoView({ behavior:'smooth' })}>
              Comment ça marche
            </button>
          </div>
        </div>

        {/* Box mockup */}
        <div className="hero-visual fade-in">
          <div className="hero-box-mockup">
            <div className="box-card box-card-behind" />
            <div className="box-card box-card-main">
              <div className="box-price-tag">À partir de 29€</div>
              <div className="box-inner">
                <AbLogo size={52} id="hero-ab" />
                <div className="box-name">Afro Beauty</div>
                <div className="box-type">Box Knotless</div>
                <div className="box-divider" />
                <div className="box-contents">Mèches · Accessoires<br/>Guide · QR Tuto</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="hero-stats fade-up-4">
          {[['500+','Clientes satisfaites'],['4.9★','Note moyenne'],['4','Box disponibles'],['48h','Livraison express']].map(([n,l]) => (
            <div className="stat" key={l}>
              <div className="stat-num">{n}</div>
              <div className="stat-label">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW ── */}
      <section id="how">
        <div className="how-header">
          <div>
            <div className="sec-label">Comment ça marche</div>
            <h2 className="sec-title">Simple comme<br/><em>bonjour.</em></h2>
          </div>
          <p className="sec-sub">De l'envie à la coiffure parfaite en 4 étapes. Zéro prise de tête, zéro mauvaise surprise.</p>
        </div>
        <div className="steps">
          {[
            ['💆🏾‍♀️','Choisis ta coiffure','Braids, twists, knotless… Tu sélectionnes la box qui correspond à la coiffure que tu veux réaliser.'],
            ['📦','On prépare ta box','Les bonnes mèches, les bons accessoires, le guide illustré et le QR code du tuto — tout est dedans.'],
            ['🚚','Tu reçois en 48h','Livraison rapide partout en France et en Europe. Ta box arrive soigneusement emballée.'],
            ['✨','Tu te coiffes & tu brilles','Suis le tuto vidéo exclusif, utilise le guide inclus et obtiens la coiffure que tu voulais.'],
          ].map(([icon,title,desc],i) => (
            <div className="step" key={title}>
              <div className="step-num">{i+1}</div>
              <div className="step-icon">{icon}</div>
              <div className="step-title">{title}</div>
              <div className="step-desc">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOXES ── */}
      <section id="boxes">
        <div className="boxes-header">
          <div>
            <div className="sec-label">Nos box</div>
            <h2 className="sec-title">La coiffure que<br/>tu <em>veux.</em></h2>
          </div>
          <p className="sec-sub">Chaque box est pensée pour une coiffure précise. Tout est inclus, rien à ajouter.</p>
        </div>

        {/* Featured */}
        <div className="box-featured">
          <div className="box-featured-visual">
            <AbLogo size={120} id="feat-ab" />
          </div>
          <div className="box-featured-content">
            <div className="featured-badge">{featured.badge}</div>
            <div className="featured-title">Box <em>{featured.name.replace('Box ','')}</em></div>
            <p className="featured-sub">{featured.description}</p>
            <div className="featured-includes">
              {featured.includes.map(inc => (
                <div className="fi-item" key={inc.label}>
                  <div className="fi-dot" />
                  {inc.icon} {inc.label}
                </div>
              ))}
            </div>
            <div className="featured-price-row">
              <div className="featured-price">{featured.priceDisplay}€<small>/box</small></div>
              <button className="btn-featured" onClick={() => handleAdd(featured)}>
                Ajouter au panier →
              </button>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="boxes-grid">
          {rest.map((product, i) => (
            <div className="box-item" key={product.id}>
              {product.badge && <div className="badge">{product.badge}</div>}
              <div className={`box-preview ${bgClasses[i % bgClasses.length]}`}>
                <div style={{position:'relative',zIndex:1}}>
                  <AbLogo size={70} id={`grid-${product.id}`} />
                </div>
                <div className="big-ab">AB</div>
              </div>
              <div className="box-info">
                <div className="box-cat">{product.category}</div>
                <div className="box-title">{product.name}</div>
                <p className="box-desc">{product.description}</p>
                <div className="box-includes">
                  {product.includes.slice(0,3).map(inc => (
                    <span key={inc.label}>{inc.label}</span>
                  ))}
                </div>
                <div className="box-footer">
                  <div className="box-price">{product.priceDisplay}€<span>/box</span></div>
                  <button className="btn-add" onClick={() => handleAdd(product)}>Commander</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews">
        <div className="reviews-header">
          <div>
            <div className="sec-label">Avis clients</div>
            <h2 className="sec-title">Elles parlent<br/>mieux que <em>nous.</em></h2>
          </div>
          <div className="reviews-score">
            <div className="score-num">4.9</div>
            <div className="score-stars">★★★★★</div>
            <div className="score-label">+500 avis vérifiés</div>
          </div>
        </div>
        <div className="reviews-grid">
          {[
            { init:'A', name:'Aminata D.', city:'Paris', box:'Box Knotless', text:'J\'avais peur de ne pas m\'en sortir mais le tuto vidéo est trop bien expliqué. J\'ai réussi mes knotless du premier coup, je suis trop fière !' },
            { init:'F', name:'Fatou K.', city:'Lyon', box:'Box Braids', text:'La qualité des mèches est vraiment top, rien à voir avec ce qu\'on trouve d\'habitude. Et tout est dans la box, j\'ai rien eu à acheter en plus.' },
            { init:'N', name:'Nadia M.', city:'Bordeaux', box:'Budget Queen', text:'En tant qu\'étudiante j\'avais pas un gros budget mais le résultat est vraiment beau. Le guide est super clair et le packaging est trop joli !' },
          ].map(r => (
            <div className="review-card" key={r.name}>
              <div className="review-box-tag">{r.box}</div>
              <div className="review-stars">★★★★★</div>
              <div className="review-text">"{r.text}"</div>
              <div className="review-author">
                <div className="review-avatar">{r.init}</div>
                <div>
                  <div className="review-name">{r.name}</div>
                  <div className="review-meta">{r.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="cta-banner">
        <div className="cta-text">
          <h2>Prête à être <em>coiffée<br/>et confiante ?</em></h2>
          <p>Rejoins les 500+ femmes qui ont dit stop à la galère beauté afro.</p>
        </div>
        <div className="cta-actions">
          <button className="btn-gold" onClick={() => document.getElementById('boxes')?.scrollIntoView({ behavior:'smooth' })}>
            Choisir ma box →
          </button>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <div className="nav-logo">
              <AbLogo size={28} id="footer-ab" />
              <div className="nav-logo-text">
                <span className="brand" style={{fontSize:15}}>Afro Beauty</span>
                <span className="sub">Box · Beauté · Afro</span>
              </div>
            </div>
            <p>La box beauté afro qui te livre tout — mèches, accessoires, guide et tuto — pour chaque coiffure que tu veux.</p>
          </div>
          <div className="footer-col">
            <h4>Box</h4>
            <ul>{products.map(p => <li key={p.id}><a href="#">{p.name}</a></li>)}</ul>
          </div>
          <div className="footer-col">
            <h4>Aide</h4>
            <ul>{['Comment ça marche','Livraison','Retours','FAQ','Contact'].map(l => <li key={l}><a href="#">{l}</a></li>)}</ul>
          </div>
          <div className="footer-col">
            <h4>Marque</h4>
            <ul>{['Notre histoire','Instagram','TikTok','Ambassadrices','Presse'].map(l => <li key={l}><a href="#">{l}</a></li>)}</ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2025 <span>Afro Beauty</span> · Tous droits réservés</div>
          <div className="footer-socials">
            <a href="#">Instagram</a>
            <a href="#">TikTok</a>
            <a href="#">Pinterest</a>
          </div>
        </div>
      </footer>
    </>
  )
}
