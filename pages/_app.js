import '../styles/globals.css'
import Head from 'next/head'

import Navigation from '../components/Navigation.js'
import Footer from '../components/Footer.js'


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Diverse ERC20 Faucets</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Navigation />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
