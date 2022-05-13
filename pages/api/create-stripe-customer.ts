import Stripe from 'stripe'
import { getServiceSupabase } from '../../utils/supabase'
import type { NextApiRequest, NextApiResponse } from 'next'

 type Data = {
  message: string
}
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  if (req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
    return res.status(401).send({ message: 'Unauthorized api call' })
  }

  // eslint-disable-next-line
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2020-08-27',
  })

  const customer: Stripe.Customer = await stripe.customers.create({
    email: req.body.record.email
  })
  const supabase = getServiceSupabase()
  await supabase
    .from('profile')
    .update({
      stripe_customer: customer.id
    })
    .eq("id", req.body.record.id)

  res.send({ message: `stripe customer created ${customer.id}` })
}

export default handler
