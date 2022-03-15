import {useEffect,useState} from 'react';

import '../styles/globals.css'
import Head from 'next/head'

import polygonIcon from '../assets/polygon_icon.png';
import ethereumIcon from '../assets/ethereum_icon.png';

import Navigation from '../components/Navigation.js'
import Footer from '../components/Footer.js'

import { useHaveMetamask,useMetamaskConnect } from 'diverse-metamask-hooks'


function MyApp({ Component, pageProps }) {
  const [haveMetamask,checkBrowserHasMetamask] = useHaveMetamask();
  const [networks, setNetworks] = useState(NETWORKS)
  const [network, setNetwork] = useState(NETWORKS[0])



  useEffect(() => {
    updateNetwork()
  }, [haveMetamask])

  function updateNetwork(){
      if(haveMetamask){
        if (typeof window !== "undefined") {
          let foundNetwork = networks.find((i) => i.chainId == window.ethereum.networkVersion)
          networks.map((i) => { i.selected = false })

          if(foundNetwork != undefined){
            foundNetwork.selected = true
            setNetwork(foundNetwork)
          }else{
            let notSupportedNetwork = networks.find((i) => i.chainId == -1)
            notSupportedNetwork.selected = true
            setNetwork(notSupportedNetwork)
          }

        }
      }
  }

  return (
    <>
      <Head>
        <title>Diverse ERC20 Faucets</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Navigation networks={networks} />
      { network != undefined && network.chainId != -1 ? (
        <Component {...pageProps} />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1>No Metamask Or Please Connect To Polygon Mumbai and Refresh The Browser :(</h1>
          <button onClick={() => { updateNetwork() }} className="mt-4 btn btn-primary btn-wide">Retry</button>
        </div>
      )}
      <Footer />
    </>
  )
}

let NETWORKS = [
  {
    name: 'Not Supported',
    img: polygonIcon,
    chainId: -1,
    disabled: false,
    selected: false,
    hideImg: true,
  },
  {
    name: 'Ropsten',
    img: ethereumIcon,
    disabled: true,
    selected: false,
    chainId: 3,
    hideImg: false,
  },
  {
    name: 'Rinkeby',
    img: ethereumIcon,
    disabled: true,
    selected: false,
    chainId: 4,
    hideImg: false,
  },
  {
    name: 'Goerli',
    img: ethereumIcon,
    disabled: true,
    chainId: 5,
    hideImg: false,
  },
  {
    name: 'Kovan',
    img: ethereumIcon,
    disabled: true,
    selected: false,
    chainId: 42,
    hideImg: false,
  },
  {
    name: 'Mumbai',
    img: polygonIcon,
    chainId: 80001,
    disabled: false,
    selected: false,
    hideImg: false,
  },
]

export default MyApp
