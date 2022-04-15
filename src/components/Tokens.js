import { useSelector,useDispatch } from 'react-redux';
import { useEffect,useState } from 'react';

import { fetchTokens } from '../slices/tokensSlice';

import Token from './Token.js';

export default function Tokens(){
  const [networkTokens,setNetworkTokens] = useState(null)

  const tokens = useSelector((state) => state.tokens);
  const metamask = useSelector((state) => state.metamask);
  const networks = useSelector((state) => state.networks);
  const dispatch = useDispatch()

  useEffect(() => {
    if(networks.state == 'succeeded'){
      dispatch(fetchTokens())
    }
  },[networks.state])

  useEffect(() => {
    if(tokens.state == 'succeeded'){
      let foundToken = tokens.data.find((i) => i.chainId == metamask.chainId)

      if(foundToken === undefined){
        setNetworkTokens(null)
        return;
      }
      
      setNetworkTokens(foundToken)
    }
  },[tokens.state])

  if(tokens.state === 'loading'){
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-3xl font-semibold">Fetching Network Tokens Data ...</h1>
      </div>
    )
  }

  if(networkTokens === null){
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-semibold">No Diverse Tokens Found On This Network</h1>
        <h1 className="mt-2 text-lg">Change Network To Supported Networks :)</h1>
      </div>
    )
  }

  if(tokens.state == 'succeeded' && networkTokens != null){
    return (
      <div className="py-10 grid grid-cols-3 gap-10">
        { networkTokens.tokens.map((i,k) => (
          <Token data={i} key={k} index={k} />
        )) }
      </div>
    )
  }

  return (
      <div className="py-10 grid grid-cols-3 gap-10">
      </div>
  )

}


