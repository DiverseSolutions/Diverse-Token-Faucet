import React from 'react'
import { useHaveMetamask,useMetamaskConnect } from 'diverse-metamask-hooks'

import Image from 'next/image';



export default function Navigation({ networks }) {
  const [haveMetamask,checkBrowserHasMetamask] = useHaveMetamask();
  const [accounts,connect] = useMetamaskConnect();

  function checkMetamaskAndConnect(){
    if(!haveMetamask){
      if (typeof window !== "undefined") {
        checkBrowserHasMetamask()
      }
    }

    if(accounts.length == 0){
      if (typeof window !== "undefined") {
        connect()
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
            <li tabIndex="0" className="z-10 mr-5">
              <a>
                Networks
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
              </a>
              <ul className="w-40 p-2 -right-3 bg-base-200">
                { networks.map((i,k) => NetworkItem(i,k)) }
              </ul>
            </li>
            <li><a onClick={() => { checkMetamaskAndConnect() }} className={`text-blue-500 btn btn-outline ${accounts.length > 0 ? 'btn-disabled' : ''}`}>{haveMetamask & accounts.length > 0 ? `${accounts[0].substring(0,12)}...` : "Connect"  }</a></li>
          </ul>
        </div>
      </div>
    </>
  )
}

function NetworkItem(item,key){
  if (typeof window !== "undefined") {
    return (
      <li key={key} className={`${item.disabled ? 'disabled' : ''}`}>
        <a className={`${item.selected && "active"}`}>
          { !item.hideImg && ( <Image src={item.img} width={20} height={20} alt="network_icon" /> ) }
          { item.name } 
        </a>
      </li>
    )
  }else{
    return ('')
  }
}


