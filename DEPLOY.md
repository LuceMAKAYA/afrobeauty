# 🚀 Guide de déploiement — Afro Beauty

## Ce que tu as dans ce dossier

```
afrobeauty/
├── app/
│   ├── page.tsx              ← Page d'accueil complète
│   ├── layout.tsx            ← Layout global + polices
│   ├── globals.css           ← Tous les styles
│   ├── panier/page.tsx       ← Panier + bouton paiement Stripe
│   ├── success/page.tsx      ← Page de confirmation commande
│   └── api/
│       ├── create-checkout/  ← API Stripe Checkout
│       └── webhook/          ← Webhook pour confirmer paiements
├── components/
│   ├── Nav.tsx               ← Navigation fixe
│   └── AbLogo.tsx            ← Logo AB Ligature SVG
├── lib/
│   ├── products.ts           ← Catalogue des box + prix
│   ├── stripe.ts             ← Config Stripe
│   └── cart.ts               ← Gestion panier (Context)
├── .env.local                ← Variables d'environnement (à remplir)
└── package.json
```

---

## ÉTAPE 1 — Créer ton compte Stripe (gratuit)

1. Va sur **https://dashboard.stripe.com/register**
2. Crée ton compte avec ton email
3. Active ton compte (mode test d'abord, puis live quand tu es prête)
4. Dans **Développeurs > Clés API**, copie :
   - `Clé publiable` → `pk_live_...`
   - `Clé secrète` → `sk_live_...`

---

## ÉTAPE 2 — Installer le projet en local

```bash
# Dans ton terminal
cd afrobeauty
npm install

# Copie le fichier .env et remplis tes clés Stripe
# Modifie .env.local avec tes vraies clés
```

---

## ÉTAPE 3 — Déployer sur Vercel

### Option A — Via GitHub (recommandé)

1. Crée un repo GitHub : https://github.com/new
2. Dans ton terminal :
   ```bash
   cd afrobeauty
   git init
   git add .
   git commit -m "🚀 Afro Beauty — lancement"
   git remote add origin https://github.com/TON_USERNAME/afrobeauty.git
   git push -u origin main
   ```
3. Va sur **https://vercel.com** → "New Project"
4. Importe ton repo GitHub
5. Clique **Deploy** — Vercel détecte Next.js automatiquement

### Option B — Via CLI Vercel

```bash
npm install -g vercel
cd afrobeauty
vercel
# Suis les instructions
```

---

## ÉTAPE 4 — Ajouter tes variables Stripe sur Vercel

Sur le dashboard Vercel de ton projet :
**Settings > Environment Variables** → Ajoute :

| Variable | Valeur |
|----------|--------|
| `STRIPE_SECRET_KEY` | `sk_live_xxx` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_xxx` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_xxx` (voir étape 5) |
| `NEXT_PUBLIC_APP_URL` | `https://afrobeauty.vercel.app` |

Puis **Redeploy** pour appliquer.

---

## ÉTAPE 5 — Configurer le Webhook Stripe

Le webhook permet à Stripe de te notifier quand un paiement est confirmé.

1. Sur Stripe Dashboard : **Développeurs > Webhooks > + Ajouter un endpoint**
2. URL : `https://afrobeauty.vercel.app/api/webhook`
3. Événements à écouter :
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
4. Copie le **Signing secret** (`whsec_...`) → colle dans Vercel env vars

---

## ÉTAPE 6 — Tester le paiement

En mode **test Stripe**, utilise ces cartes :

| Carte | Numéro |
|-------|--------|
| ✅ Succès | `4242 4242 4242 4242` |
| ❌ Refus | `4000 0000 0000 0002` |
| 🔐 3D Secure | `4000 0025 0000 3155` |

Date : n'importe quelle date future · CVC : n'importe quel 3 chiffres

---

## ÉTAPE 7 — Passer en production

Sur Stripe Dashboard :
1. Clique sur le toggle **"Mode test"** pour passer en **live**
2. Mets à jour tes clés Vercel avec les clés **live** (pas test)
3. Mets à jour le webhook avec l'URL de production

---

## 💡 Personnalisations rapides

### Modifier les produits / prix
→ Édite `lib/products.ts` — change `price` (en centimes), `name`, `description`

### Ajouter des images produits
→ Mets tes images dans `public/` et référence-les dans `products.ts`

### Ajouter un domaine custom (ex: afrobeauty.fr)
→ Vercel Dashboard > Settings > Domains > Add domain

### Envoyer un email de confirmation
→ Installe **Resend** (`npm install resend`) et appelle l'API dans `app/api/webhook/route.ts`

---

## 🆘 Support

- Vercel : https://vercel.com/docs
- Stripe : https://stripe.com/docs/checkout
- Next.js : https://nextjs.org/docs
