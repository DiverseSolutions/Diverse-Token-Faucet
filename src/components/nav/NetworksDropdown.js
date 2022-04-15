import Image from 'next/image'

import { useEffect,useState } from 'react'
import { useSelector,useDispatch } from "react-redux";

import { fetchNetworks } from '../../slices/networksSlice.js';

export default function NetworksDropdown(){
  const dispatch = useDispatch()

  const [network,setNetwork] = useState(null)
  const networks = useSelector((state) => state.networks);
  const metamask = useSelector((state) => state.metamask);

  useEffect(() => {
    if(networks.state == 'succeeded'){
      let foundNetwork = networks.data.find((network) => network.chainId == metamask.chainId)
      setNetwork(foundNetwork)
    }
  },[networks.state])

  useEffect(() => {
    if(metamask.account != null){
      dispatch(fetchNetworks())
    }
  },[metamask.account])

  if(metamask.account == null){
    return (
      <></>
    )
  }

  if(networks.state == 'failed'){
    return (
      <li tabIndex="0" className="mr-2">
          <a className="text-white btn btn-info">
            Network Failed
          </a>
      </li>
    )
  }

  return (
    <>
      <li tabIndex="0" className="mr-2">
        {networks.state == "loading" ? (
          <a className="text-white btn btn-info loading">
            Loading
          </a>
        ) : (
          <a className="text-white btn btn-info" >
            { network == null ? (
              <>
                No Network
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </>
            ) : (
              <>
                <Image src={network.logos[0]} alt="network_logo" width={25} height={25} />
                <p>{network.name[1] != null ? network.name[1] : network.name[0]}</p>
              </>
            ) }
          </a>
        )}

        <ul className="absolute z-20 p-2 bg-base-100">
          { networks.state == 'succeeded' && network != null && networks.data.map((item,key) => (
            <li key={key} className={`flex flex-col mb-2 btn ${networkStyle(item)}`}>
              <Image src={item.logos[0]} alt="network_logo" width={25} height={25} />
              <p className="bg-transparent">{item.name[1] != null ? item.name[1] : item.name[0]}</p>
            </li>
          ))}
        </ul>

      </li>

    </>
  )

  function networkStyle(item) {
    let style = ' '

    if(item.chainId == network.chainId){
      style += ' text-white btn-success '
    }else{
      style += ' btn-active btn-ghost '
    }

    return style;
  }
}
