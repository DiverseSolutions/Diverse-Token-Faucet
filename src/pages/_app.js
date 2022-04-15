import Head from 'next/head'

import { Provider } from 'react-redux';

import '../styles/globals.css'
import store from '../store';

import CheckMetamask from '../components/CheckMetamask.js';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Diverse ERC20 Faucets</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Provider store={store}>
        <CheckMetamask Component={Component} />
      </Provider>
    </>
  )
}

export default MyApp
