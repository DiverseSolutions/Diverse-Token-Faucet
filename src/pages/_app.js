import {useEffect,useState} from 'react';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux'

import '../styles/globals.css'
import Head from 'next/head'
import store from '../store';

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



function CheckMetamask({ Component }){
  const haveMetamask = useSelector((state) => state.haveMetamask)

  return (
    <>
      { haveMetamask ? ( <Component /> ) : ( <NoMetamask /> ) }
    </>
  )
}




function NoMetamask(){
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-3xl font-semibold">No Metamask Detected</h1>
      </div>
    </>
  )
}

export default MyApp
