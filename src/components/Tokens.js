import { useSelector,useDispatch } from 'react-redux';
import { useEffect,useState } from 'react';
import { ethers } from "ethers";

import { fetchMumbaiTokens,fetchBscTestNetTokens } from '../slices/tokensSlice';

import Token from './Token.js';
import MumbaiCurrencyFaucet from './MumbaiCurrencyFaucet';
import FaucetControllerABI from '../abi/FaucetController.json';

export default function Tokens(){
  const MumbaiFaucetControllerAddress = '0x2eFbAa7BC2a3F2c351084469907D493861988980'
  const BscTestNetFaucetControllerAddress = '0x128e6614252b70225A65088052A686feF7A4FDD0'
  const [networkTokens,setNetworkTokens] = useState(null)
  const [faucetContact,setFaucetContact] = useState(null)
  const [faucetSignerContract,setFaucetSignerContract] = useState(null)

  const tokens = useSelector((state) => state.tokens);
  const metamask = useSelector((state) => state.metamask);
  const networks = useSelector((state) => state.networks);
  const dispatch = useDispatch()

  useEffect(() => {
    if(networks.state == 'succeeded'){
      switch (metamask.chainId) {
        case 8001:
          dispatch(fetchMumbaiTokens())
          break;
        case 97:
          dispatch(fetchBscTestNetTokens())
          break;
      }
    }
  },[networks.state])

  useEffect(() => {
    if(tokens.state == 'succeeded'){
      setUpFaucetControllerContract()
      setUpFoundNetworkTokens()
    }
  },[tokens.state])

  if(tokens.state === 'loading'){
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-sm font-semibold md:text-3xl">Fetching Network Tokens Data ...</h1>
      </div>
    )
  }

  if(tokens.state === 'failed'){
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-sm font-semibold md:text-3xl">Fetching Tokens Failed :(</h1>
        <h1 className="mt-2 text-xs md:text-lg">Reload Browser To Try Again</h1>
      </div>
    )
  }

  if(networkTokens === null){
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-sm font-semibold md:text-3xl">No Diverse Tokens Found On This Network</h1>
        <h1 className="mt-2 text-xs md:text-lg">Change Network To Supported Networks :)</h1>
      </div>
    )
  }

  if(tokens.state == 'succeeded' && networkTokens != null){
    return (
      <div className="py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* <MumbaiCurrencyFaucet /> */}
        { networkTokens.tokens.map((i,k) => (
          <Token faucetContact={faucetSignerContract} data={i} key={k} index={k} />
        )) }
      </div>
    )
  }

  return (
      <div className="py-10 grid grid-cols-3 gap-10">
      </div>
  )

  async function setUpFaucetControllerContract(){
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    let FaucetControllerAddress = ''

    switch (metamask.chainId) {
      case 8001:
        FaucetControllerAddress = MumbaiFaucetControllerAddress
        break;
      case 97:
        FaucetControllerAddress = BscTestNetFaucetControllerAddress
        break;
    }

    const _faucetControllerContract = new ethers.Contract(FaucetControllerAddress, FaucetControllerABI, provider);
    setFaucetContact(_faucetControllerContract)
    setFaucetSignerContract(_faucetControllerContract.connect(provider.getSigner()))
  }

  function setUpFoundNetworkTokens(){
      let foundToken = tokens.data.find((i) => i.chainId == metamask.chainId)
      if(foundToken === undefined){
        setNetworkTokens(null)
        return;
      }

      setNetworkTokens(foundToken)
  }

}


