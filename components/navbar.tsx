import type { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { useUser } from '../context/user'

const Navbar: NextPage = () => {
  const { user, login, logout } = useUser()
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const onLogin = async () => {
    await login()
    setLoading(true)
    setLoadingMessage('logging in...')
  }
  const onLogout = async() => {
    setLoading(true)
    setLoadingMessage('logging out...')
    await logout()
    setLoading(false)
  }
  return (
    <>
      {loading ? <p>{loadingMessage}</p> :
        (
          <nav className='flex py-6 border-b border-gray-200'>
            <div className='flex container mx-auto px-4'>
              <div className='flex items-center'>
                <Link href='/'><a className='mr-2'>Home</a></Link>
                <Link href='/pricing'><a className='mr-2'>Pricing</a></Link>
                {
                  !!user && <Link href='/dashboard'><a className='mr-2'>Dashboard</a></Link>
                }

              </div>
              <div className="ml-auto flex justify-end">
                {!user ? <button
                  onClick={onLogin}
                  className='mr-8 px-4 py-2 bg-green-700 rounded-sm' >LOGIN
                </button> :
                  <button
                    onClick={onLogout}
                    className='mr-8 px-4 py-2 bg-slate-400 rounded-sm'>LOG OUT
                  </button>}
              </div>
            </div>
          </nav>
        )
      }
    </>
  )
}

export default Navbar
