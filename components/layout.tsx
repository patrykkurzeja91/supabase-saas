import Navbar from './navbar'
import type { NextPage } from 'next'

// import Footer from './footer'

const Layout: NextPage = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}

export default Layout
