import type { NextApiRequest, NextApiResponse } from 'next'
import TextLoader from '../components/loaders/text-loader'
import { useUser } from '../context/user'
import { supabase } from '../utils/supabase'
import axios from 'axios'
import Router from 'next/router'
import Link from 'next/link'

const Dashboard = () => {
  const { user, isLoading } = useUser()

  const loadStripePortal = async () => {
    const { data } = await axios.get('/api/portal')
    Router.push(data.url)
  }

  return (
    <div className='w-full max-w-3xl mx-auto py-16 px-8'>
      <h1 className='text-3xl mb-6'>Dashboard </h1>
      {!isLoading ?
        <>
          {
            user?.is_subscribed ?
              <div>
                <p>
                `Subscribed: ${user.current_plan.amount / 100} PLN / ${user.current_plan.interval}`
                </p>
                <button onClick={loadStripePortal} className='mt-4 px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 transition-colors rounded-md'> Manage subscription</button>
              </div>
              :
              <div>
                <p className='mb-4'>Not subscribed</p>
                <Link  href="/pricing"><a className="px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 transition-colors rounded-md"> See available subscriptions</a></Link>
              </div>
          }
        </>
        : <TextLoader/>
      }
    </div>
  )
}

export const getServerSideProps = async ({ req }:{
  req: NextApiRequest,
  res: NextApiResponse
}) => {
  const {user} = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    return {
      redirect: {
        permament: false,
        destination: "/login"
      },
      props: {}
    }
  }
  return {
    props: {}
  }
}

export default Dashboard
