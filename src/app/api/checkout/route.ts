import { NextResponse } from 'next/server'
import Stripe from 'stripe'

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY not set')
  return new Stripe(key)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { items } = body as {
      items: { product_id: string; name: string; price: number; quantity: number }[]
    }

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 })
    }

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shippingCost = subtotal >= 10000 ? 0 : 1290

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(item => ({
      price_data: {
        currency: 'aud',
        product_data: {
          name: item.name,
          metadata: { product_id: item.product_id },
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }))

    if (shippingCost > 0) {
      line_items.push({
        price_data: {
          currency: 'aud',
          product_data: { name: 'Standard Shipping (Australia Post)' },
          unit_amount: shippingCost,
        },
        quantity: 1,
      })
    }

    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://exhale.health'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://exhale.health'}/cart`,
      metadata: {
        items: JSON.stringify(items.map(i => ({ id: i.product_id, qty: i.quantity }))),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
