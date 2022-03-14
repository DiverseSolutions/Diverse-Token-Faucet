import React from 'react'
import { useHaveMetamask,useMetamaskConnect } from 'diverse-metamask-hooks'

import polygonIcon from '../assets/polygon_icon.png';
import ethereumIcon from '../assets/ethereum_icon.png';
import Image from 'next/image';


export default function Navigation() {
  const [haveMetamask,checkBrowserHasMetamask] = useHaveMetamask();

  function connect(){
    if(!haveMetamask){
      if (typeof window !== "undefined") {
        checkBrowserHasMetamask()
      }
    }
  }

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="text-xl normal-case btn btn-ghost"><span className="mr-2 text-blue-500">Diverse</span> ERC-20 Faucets</a>
        </div>
        <div className="flex-none">
          <ul className="p-0 font-semibold menu menu-horizontal rounded-box">
            <li tabIndex="0" className="">
              <a>
                Networks
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
              </a>
              <ul className="p-2 w-40 bg-base-200">
                <li className="disabled">
                  <a>
                    <Image src={ethereumIcon} width={20} height={20} alt="ethereum_icon" />
                    Rinkeby
                  </a>
                </li>
                <li className="disabled">
                  <a>
                    <Image src={ethereumIcon} width={20} height={20} alt="ethereum_icon" />
                    Goerli
                  </a>
                </li>
                <li className="disabled">
                  <a>
                    <Image src={ethereumIcon} width={20} height={20} alt="ethereum_icon" />
                    Ropsten
                  </a>
                </li>
                <li className="disabled">
                  <a>
                    <Image src={ethereumIcon} width={20} height={20} alt="ethereum_icon" />
                    Kovan
                  </a>
                </li>
                <li className="">
                  <a>  
                    <Image src={polygonIcon} width={20} height={20} alt="polygon_icon" />
                    Mumbai
                  </a>
                </li>
              </ul>
            </li>
            <li><a onClick={connect()} className="text-blue-500">{haveMetamask ? "Connected" : "Not Connected"  }</a></li>
          </ul>
        </div>
      </div>
    </>
  )
}

