import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import cookie from 'cookie'
import { supabase } from '../../../utils/supabase'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    return res.status(401).send({ message: 'Unauthorized api call' })
  }

  const token = req.headers.cookie && cookie.parse(req.headers.cookie)['sb-access-token']

  if (token) {
    supabase.auth.session = () => ({
      access_token: token,
      token_type: 'Bearer',
      user
    })
  }

  const {
    data: { stripe_customer }
  } = await supabase
    .from('profile')
    .select('stripe_customer')
    .eq('id', user.id)
    .single()

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2020-08-27',
  })
  const {priceId} = req.query

  const lineItems = [{
    price: priceId as string,
    quantity: 1
  }]

  const session = await stripe.checkout.sessions.create({
    customer: stripe_customer,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: lineItems,
    success_url: 'http://localhost:3000/payment/success',
    cancel_url: 'http://localhost:3000/payment/canceled',
  })

  res.send({id: session.id})
}

export default handler
