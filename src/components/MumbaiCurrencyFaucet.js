import Link from 'next/link';
import Image from 'next/image';
import { ethers } from "ethers";
import Swal from 'sweetalert2'

import CoinFaucetControllerABI from '../abi/CoinFaucetController.json';


import { useEffect,useState } from "react"
import { useSelector } from 'react-redux';

const coinFaucetContractAddress = '0x55aa8D5222112fBcB7aBA3E63e37E9d38e6B535E'

export default function MumbaiCurrencyFaucet(){
  const [coinBalance,setCoinBalance] = useState(null)
  const [transactionLoading,setTransactionLoading] = useState(false)

  const metamask = useSelector((state) => state.metamask)

  useEffect(() => {
    setupCoinBalance()
  },[])

  async function handleRedeemCoin(amount){
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const coinfaucetControllerContract = new ethers.Contract(coinFaucetContractAddress, CoinFaucetControllerABI, provider);
    const coinFaucetContractSigned = coinfaucetControllerContract.connect(signer)

    let amountWei = ethers.utils.parseUnits(amount,'ether')

    try{
      let transaction = await coinFaucetContractSigned.redeemCoin(metamask.account,amountWei)
      setTransactionLoading(true)

      await transaction.wait()

      Swal.fire({
        icon: 'success',
        title: 'Faucet Sent Tokens',
        showConfirmButton: true,
        confirmButtonText: 'Thanks',
        timer: 2000,
      })
      setTransactionLoading(false)
      setupCoinBalance()
    }catch(e){
      console.log(e)

      Swal.fire({
        icon: 'error',
        title: 'Faucet Contract Error',
        text: e.data?.message ?? e.message,
        showConfirmButton: true,
        confirmButtonText: 'Okay',
      })
    }
  }

  async function setupCoinBalance(){
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const coinfaucetControllerContract = new ethers.Contract(coinFaucetContractAddress, CoinFaucetControllerABI, provider);

    let balanceBN = await coinfaucetControllerContract.getFaucetBalance()
    let balance = ethers.utils.formatUnits(balanceBN,'ether')
    setCoinBalance(ethers.utils.commify(parseInt(balance)))
  }

  return (
    <div className="border mockup-window bg-base-300">
      <div className="flex flex-col justify-center py-16 md:flex-row bg-base-200">
        <div className="md:card md:card-side">
          <figure className="text-center">
            <Image src={"https://cryptologos.cc/logos/polygon-matic-logo.png?v=022"} alt="token_image" height={120} width={120}/>
          </figure>
          <div className="card-body">
            <h5 className="text-xl text-center md:card-title">Mumbai MATIC</h5>
            <div className="flex flex-col items-center my-1 md:my-0 md:flex-row md:justify-between">
            </div>
            <div className="justify-center md:justify-end card-actions">
              <label htmlFor={`tokenModal-mumbai`} className="btn btn-warning btn-outline modal-button">Get Matic</label>
            </div>
          </div>
        </div>
      </div>

      <input type="checkbox" id={`tokenModal-mumbai`} className="modal-toggle"/>
      <label htmlFor={`tokenModal-mumbai`} className="cursor-pointer modal">
        <label className="relative modal-box" htmlFor="">
          <h3 className="my-1 text-lg font-semibold text-center">Faucet Coin Fund : {coinBalance != null ? coinBalance : 'Loading...'}</h3>
          <h3 className="text-sm font-light text-center">Mumbai Coin Faucet Address {coinFaucetContractAddress}</h3>
          <div className="py-8">
            { transactionLoading == true ? (
              <>
                <button onClick={()=>{  }} className="w-full my-4 loading btn btn-outline">0.2 MATIC</button>
              </>
            ) : (
              <>
                <button onClick={()=>{ handleRedeemCoin('0.2') }} className="w-full my-4 btn btn-outline">0.2 MATIC</button>
              </>
            ) }
          </div>
        </label>
      </label>

    </div>
  )
}
