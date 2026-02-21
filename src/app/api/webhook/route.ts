import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY not set')
  return new Stripe(key, { apiVersion: '2024-12-18.acacia' as Stripe.LatestApiVersion })
}

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 })
  }

  const stripe = getStripe()
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = getSupabaseAdmin()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const metadata = session.metadata

      if (metadata?.items && metadata?.user_id) {
        const items = JSON.parse(metadata.items) as { id: string; qty: number; price: number }[]
        const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
        const shippingCost = subtotal >= 10000 ? 0 : 1290

        // Create order
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert({
            user_id: metadata.user_id,
            status: 'pharmacist_review',
            subtotal,
            shipping_cost: shippingCost,
            total: subtotal + shippingCost,
            stripe_payment_intent_id: session.payment_intent as string,
          })
          .select()
          .single()

        if (orderError) {
          console.error('Order creation failed:', orderError)
          break
        }

        // Create order items
        const orderItems = items.map(item => ({
          order_id: order.id,
          product_id: item.id,
          quantity: item.qty,
          unit_price: item.price,
        }))

        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItems)

        if (itemsError) {
          console.error('Order items creation failed:', itemsError)
        }

        console.log('Order created:', order.id)
      }
      break
    }
    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
