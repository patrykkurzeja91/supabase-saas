
import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { buffer } from 'micro'
import { getServiceSupabase } from '../../utils/supabase'
export const config = { api: { bodyParser: false } }
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2020-08-27',
  })
  const signature = req.headers['stripe-signature']
  const signingSecret = process.env.STRIPE_SIGNING_SECRET
  const reqBuffer = await buffer(req)
  let event
  try {
    if (signature && signingSecret) {
      event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret)
    }
  } catch (error: any) {
    console.log(error);
    res.status(400).send({ message: `Webhook Error: ${error.message}` })
  }

  const supabase = getServiceSupabase()
  if (event) {
    switch (event.type) {
    case 'customer.subscription.updated':
      await supabase
        .from('profile')
        .update({
          is_subscribed: true,
          interval: event.data.object.items.data[0].plan.interval,
          current_plan: event.data.object.items.data[0].plan
        })
        .eq('stripe_customer', event.data.object.customer)
      break
    case 'customer.subscription.deleted':
      await supabase
        .from('profile')
        .update({
          is_subscribed: false,
          interval: null,
          current_plan: null
        })
        .eq('stripe_customer', event.data.object.customer)
      break
    }
  }

  console.log({event})

  res.send({received: true})
}

export default handler
