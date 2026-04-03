import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// Cliente admin para bypass de RLS
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const body = await req.text()
  const sig  = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    console.error('Webhook signature error:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const uid = (event.data.object as any)?.metadata?.supabase_uid

  switch (event.type) {

    // Suscripción activa (después del trial o pago exitoso)
    case 'customer.subscription.updated':
    case 'customer.subscription.created': {
      const sub = event.data.object as Stripe.Subscription
      const plan = sub.metadata?.plan ?? 'pro'
      const status = sub.status // 'trialing' | 'active' | 'past_due' | 'canceled'

      if (uid) {
        await supabaseAdmin.from('profiles').update({
          plan: status === 'active' || status === 'trialing' ? plan : 'free',
          stripe_subscription_id: sub.id,
          stripe_status: status,
          subscribed_at: status === 'active' ? new Date().toISOString() : null,
        }).eq('id', uid)
      }
      break
    }

    // Suscripción cancelada o pago fallido → downgrade a free
    case 'customer.subscription.deleted': {
      if (uid) {
        await supabaseAdmin.from('profiles').update({
          plan: 'free',
          stripe_status: 'canceled',
          subscribed_at: null,
        }).eq('id', uid)
      }
      break
    }

    // Pago fallido → notificar (puedes enviar email aquí)
    case 'invoice.payment_failed': {
      console.log('Pago fallido para uid:', uid)
      // TODO: enviar email de aviso
      break
    }
  }

  return NextResponse.json({ received: true })
}
