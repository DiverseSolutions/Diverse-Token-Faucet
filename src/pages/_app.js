import Head from 'next/head'

import {useEffect,useState} from 'react';
import { Provider,useSelector,useDispatch } from 'react-redux';

import '../styles/globals.css'
import store from '../store';

import { fetchNetworks } from '../slices/networksSlice.js';

import Navigation from '../components/Navigation.js';

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
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchNetworks())
  },[])

  return (
    <>
      { haveMetamask == false ? (
        <NoMetamask />
      ) : (
        <div className="flex items-center justify-center h-screen">
          <Navigation />
          <Component />
        </div>
      ) }
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
