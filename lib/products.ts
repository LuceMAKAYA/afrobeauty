export interface Product {
  id: string
  name: string
  subtitle: string
  category: string
  description: string
  price: number // en centimes
  priceDisplay: string
  oldPrice: string
  badge?: string
  includes: { icon: string; label: string }[]
  stripePriceId: string // à remplacer par tes vrais IDs Stripe
}

export const products: Product[] = [
  {
    id: 'knotless',
    name: 'Box Knotless',
    subtitle: 'Braids sans nœuds',
    category: 'Best-seller',
    description:
      'Notre box la plus populaire. Tout ce qu\'il faut pour réaliser des knotless braids parfaites — mèches premium, accessoires et tuto vidéo pas à pas.',
    price: 4900,
    priceDisplay: '49',
    oldPrice: '65',
    badge: '⭐ Best-seller',
    includes: [
      { icon: '🧶', label: 'Mèches knotless premium (3 paquets)' },
      { icon: '🪮', label: 'Peigne à queue professionnel' },
      { icon: '🔴', label: 'Élastiques noirs assortis (x50)' },
      { icon: '💧', label: 'Huile de soin pour les pointes' },
      { icon: '📋', label: 'Guide illustré étape par étape' },
      { icon: '📱', label: 'QR code · Tuto vidéo exclusif' },
    ],
    stripePriceId: 'price_KNOTLESS_ID_ICI',
  },
  {
    id: 'braids',
    name: 'Box Braids',
    subtitle: 'Box braids classiques',
    category: 'Nouveau',
    description:
      'La box braids classique revisitée. Des mèches de qualité supérieure sélectionnées par nos experts pour un résultat net, durable et sans casse.',
    price: 3900,
    priceDisplay: '39',
    oldPrice: '52',
    includes: [
      { icon: '🧶', label: 'Mèches lisses premium (3 paquets)' },
      { icon: '🪮', label: 'Peigne à queue + démêloir' },
      { icon: '🔴', label: 'Élastiques noirs assortis' },
      { icon: '✨', label: 'Spray brillance finition' },
      { icon: '📋', label: 'Guide illustré étape par étape' },
      { icon: '📱', label: 'QR code · Tuto vidéo exclusif' },
    ],
    stripePriceId: 'price_BRAIDS_ID_ICI',
  },
  {
    id: 'twists',
    name: 'Box Passion Twists',
    subtitle: 'Look bohème & romantique',
    category: 'Tendance',
    description:
      'Des passion twists bohèmes et romantiques. Le look tendance TikTok, sans les heures de recherche et les mauvaises surprises.',
    price: 4200,
    priceDisplay: '42',
    oldPrice: '56',
    includes: [
      { icon: '🧶', label: 'Mèches frisées passion (4 paquets)' },
      { icon: '🪮', label: 'Peigne à queue fin' },
      { icon: '💧', label: 'Mousse coiffante légère' },
      { icon: '✨', label: 'Huile brillance finition' },
      { icon: '📋', label: 'Guide illustré étape par étape' },
      { icon: '📱', label: 'QR code · Tuto vidéo exclusif' },
    ],
    stripePriceId: 'price_TWISTS_ID_ICI',
  },
  {
    id: 'budget-queen',
    name: 'Budget Queen',
    subtitle: 'Qualité max, prix mini',
    category: '✦ Étudiante',
    description:
      'Parce que chaque reine mérite d\'être coiffée, quelle que soit sa situation. La même qualité d\'accompagnement au prix le plus accessible.',
    price: 2900,
    priceDisplay: '29',
    oldPrice: '39',
    includes: [
      { icon: '🧶', label: 'Mèches sélectionnées qualité' },
      { icon: '🪮', label: 'Accessoires essentiels' },
      { icon: '📋', label: 'Guide illustré complet' },
      { icon: '📱', label: 'QR code · Tuto vidéo exclusif' },
      { icon: '💌', label: 'Carte de bienvenue' },
      { icon: '💛', label: 'Accès communauté privée' },
    ],
    stripePriceId: 'price_BUDGET_ID_ICI',
  },
]

export function getProduct(id: string) {
  return products.find((p) => p.id === id)
}
