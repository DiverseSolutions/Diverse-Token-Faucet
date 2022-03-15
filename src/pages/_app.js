import {useEffect,useMemo} from 'react';

import '../styles/globals.css'
import Head from 'next/head'

import polygonIcon from '../assets/polygon_icon.png';
import ethereumIcon from '../assets/ethereum_icon.png';

import Navigation from '../components/Navigation.js'
import Footer from '../components/Footer.js'

import { useHaveMetamask,useMetamaskConnect } from 'diverse-metamask-hooks'


function MyApp({ Component, pageProps }) {
  const [haveMetamask,checkBrowserHasMetamask] = useHaveMetamask();
  const network = useMemo(() => haveMetamask == true ? networks.find((i) => i.chainId == window.ethereum.networkVersion) : networks.find((i) => i.chainId == -1), [haveMetamask]);


  useEffect(() => {
    if(haveMetamask){
      if (typeof window !== "undefined") {
        let foundNetwork = networks.find((i) => i.chainId == window.ethereum.networkVersion)

        if(foundNetwork != undefined){
          foundNetwork.selected = true
        }else{
          let notSupportedNetwork = networks.find((i) => i.chainId == -1)
          notSupportedNetwork.selected = true
        }
      }
    }
  }, [haveMetamask])

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
        <div className="flex items-center justify-center h-screen">
          No Metamask Or Please Connect To Polygon Mumbai and Refresh The Browser :(
        </div>
      )}
      <Footer />
    </>
  )
}

let networks = [
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
  {
    name: 'Not Supported',
    img: polygonIcon,
    chainId: -1,
    disabled: false,
    selected: false,
    hideImg: true,
  },
]

export default MyApp
