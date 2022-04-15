import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react'

import Navigation from './Navigation.js';
import NoMetamask from './NoMetamask.js';

import { checkMetamask } from '../slices/metamaskSlice.js';

export default function CheckMetamask({ Component }){
  const metamask = useSelector((state) => state.metamask)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkMetamask())
  },[])

  return (
    <>
      { metamask.haveMetamask == false ? (
        <NoMetamask />
      ) : (
        <div className="h-screen">
          <Navigation />
          <Component />
        </div>
      ) }
    </>
  )
}
