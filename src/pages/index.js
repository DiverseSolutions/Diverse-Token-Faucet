import { useSelector } from 'react-redux';
import Tokens from '../components/Tokens.js';

import NotConnected from '../components/NotConnected';

export default function Home() {
  const metamask = useSelector((state) => state.metamask)
  const networks = useSelector((state) => state.networks);

  if(metamask.account == null){
    return (
      <>
        <NotConnected />
      </>
    )
  }

  if(networks.state === 'loading'){
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-3xl font-semibold">Fetching Networks Data ...</h1>
      </div>
    )
  }

  if(networks.state === 'failed'){
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-semibold">Fetching Network Failed :(</h1>
        <h1 className="mt-2 text-lg">Reload Browser To Try Again</h1>
      </div>
    )
  }

  return (
    <>
      <div className="w-full px-10">
        <Tokens />
      </div>
    </>
  )
}

