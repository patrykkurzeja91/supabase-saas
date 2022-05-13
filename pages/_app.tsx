import '../styles/globals.css'
import type { AppProps } from 'next/app'
import UserProvider from '../context/user'
import Layout from '../components/layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  )
}

export default MyApp
