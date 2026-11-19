import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { resolveItem, shipCostFor, SHIP_LABELS, type ShipChoice } from '@/lib/catalog'

// Crée un paiement SumUp (page de paiement hébergée par SumUp).
// Variables à mettre sur Vercel : SUMUP_API_KEY, SUMUP_MERCHANT_CODE, NEXT_PUBLIC_APP_URL
export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.SUMUP_API_KEY
    const merchantCode = process.env.SUMUP_MERCHANT_CODE
    if (!apiKey || !merchantCode) {
      return NextResponse.json({ error: 'SumUp non configuré' }, { status: 500 })
    }

    const { lines, ship }: { lines: { key: string; qty: number }[]; ship: ShipChoice } = await req.json()
    if (!Array.isArray(lines) || !lines.length || !(ship in SHIP_LABELS)) {
      return NextResponse.json({ error: 'Commande invalide' }, { status: 400 })
    }

    // Les prix sont recalculés ici, côté serveur : le navigateur ne peut pas les modifier.
    let subtotal = 0
    const summary: string[] = []
    for (const line of lines) {
      const item = resolveItem(String(line.key))
      const qty = Math.floor(Number(line.qty))
      if (!item || !(qty >= 1 && qty <= 20)) {
        return NextResponse.json({ error: 'Article invalide' }, { status: 400 })
      }
      subtotal += item.price * qty
      summary.push(`${qty}x ${item.name}`)
    }
    const total = Math.round((subtotal + shipCostFor(ship, subtotal)) * 100) / 100

    const ref = 'AB-' + randomUUID().slice(0, 8).toUpperCase()
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin

    const res = await fetch('https://api.sumup.com/v0.1/checkouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        checkout_reference: ref,
        amount: total,
        currency: 'EUR',
        merchant_code: merchantCode,
        description: `Afro Beauty ${ref} · ${summary.join(', ')} · ${SHIP_LABELS[ship]}`.slice(0, 250),
        redirect_url: `${appUrl}/success?ref=${ref}`,
        hosted_checkout: { enabled: true },
      }),
    })
    const data = await res.json()
    if (!res.ok || !data.hosted_checkout_url) {
      console.error('SumUp error:', data)
      return NextResponse.json({ error: 'Paiement indisponible' }, { status: 502 })
    }

    return NextResponse.json({ url: data.hosted_checkout_url, ref, total })
  } catch (err) {
    console.error('SumUp error:', err)
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 })
  }
}
