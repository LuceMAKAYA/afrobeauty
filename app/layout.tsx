import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/lib/cart'

export const metadata: Metadata = {
  title: 'Afro Beauty — La box qui te coiffe',
  description: 'Box beauté afro prête à coiffer. Mèches, accessoires, guide et tuto vidéo inclus. Livraison 48h en France.',
  keywords: 'box beauté afro, mèches, braids, knotless, twists, coiffure afro',
  openGraph: {
    title: 'Afro Beauty — La box qui te coiffe',
    description: 'Fini de chercher. Tout est dans la box.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Montserrat:wght@200;300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap" rel="stylesheet" />
      </head>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
