import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

interface CartItem {
  name: string
  detail?: string
  price: number // en centimes
  quantity: number
}

export async function POST(req: NextRequest) {
  try {
    const { items, shipping }: { items: CartItem[]; shipping?: { label: string; amount: number } } =
      await req.json()

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Panier vide' }, { status: 400 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          description: item.detail || 'Afro Beauty',
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }))

    // La livraison (Toulouse) est ajoutée comme une ligne du panier
    if (shipping && shipping.amount > 0) {
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: { name: `Livraison : ${shipping.label}`, description: 'Toulouse' },
          unit_amount: shipping.amount,
        },
        quantity: 1,
      })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/`,
      phone_number_collection: { enabled: true },
      locale: 'fr',
      metadata: {
        source: 'afro-beauty-web',
        livraison: shipping?.label || '',
        items: JSON.stringify(items.map((i) => `${i.name} (${i.detail || ''}) x${i.quantity}`)).slice(0, 490),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    console.error('Stripe error:', err)
    const message = err instanceof Error ? err.message : 'Erreur interne'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
