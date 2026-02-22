import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

interface CartItem {
  productId: string
  name: string
  price: number      // en centimes
  quantity: number
  stripePriceId: string
}

export async function POST(req: NextRequest) {
  try {
    const { items }: { items: CartItem[] } = await req.json()

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Panier vide' }, { status: 400 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    // On crée les line_items Stripe dynamiquement
    // Si tu as des Prix Stripe créés sur le dashboard → utilise stripePriceId
    // Sinon on utilise price_data pour créer le prix à la volée
    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          description: 'Afro Beauty — La box qui te coiffe',
          images: [`${appUrl}/og-image.png`], // ajoute une image produit ici
        },
        unit_amount: item.price, // déjà en centimes
      },
      quantity: item.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/panier`,
      shipping_address_collection: {
        allowed_countries: ['FR', 'BE', 'CH', 'LU', 'MC', 'GP', 'MQ', 'GF', 'RE', 'YT'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'eur' },
            display_name: 'Livraison standard (3-5 jours)',
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 490, currency: 'eur' },
            display_name: 'Livraison express 48h',
          },
        },
      ],
      locale: 'fr',
      metadata: {
        source: 'afro-beauty-web',
        items: JSON.stringify(items.map(i => `${i.name} x${i.quantity}`)),
      },
      custom_text: {
        submit: { message: 'En passant commande, tu acceptes nos CGV. Ta box est expédiée sous 24-48h.' },
      },
    })

    return NextResponse.json({ sessionId: session.id })

  } catch (err: unknown) {
    console.error('Stripe error:', err)
    const message = err instanceof Error ? err.message : 'Erreur interne'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
