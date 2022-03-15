import Image from 'next/image'
import { useEffect,useState } from 'react'
import { ethers } from 'ethers'
import faucetABI from '../abi/FaucetController.json'
import ercABI from '../abi/IERC20.json'

const faucetControllerAddress = "0x2eFbAa7BC2a3F2c351084469907D493861988980";

export default function Home() {
  const [provider, setProvider] = useState(null)
  const [faucetContract, setFaucetContract] = useState(null)
  const [faucetSigner, setFaucetSigner] = useState(null)
  

  useEffect(() => {
    setProvider(new ethers.providers.Web3Provider(window.ethereum))
    setFaucetContract(new ethers.Contract(faucetControllerAddress, faucetABI, new ethers.providers.Web3Provider(window.ethereum)))
  }, [])

  useEffect(() => {
    if(provider != null && faucetContract != null){
      let providerWithSigner = provider.getSigner();
      setFaucetSigner(faucetContract.connect(providerWithSigner))
    } 
  }, [provider,faucetContract])

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="w-10/12 grid gap-20 grid-cols-3 justify-items-center grid-rows-1">
          { tokens.map((i) => <TokenCard token={i} faucetContract={faucetContract} faucetSigner={faucetSigner} /> )  }
        </div>
      </div>
    </>
  )
}

function TokenCard({ token , faucetContract, faucetSigner }){
  const [fund, setFund] = useState(-100)

  useEffect(() => {
    setTokenFundFromContract()
  }, [token,faucetContract,faucetSigner])

  async function setTokenFundFromContract(){
    if(faucetContract == null) return;
    let result = (await faucetContract.getTokenFund(token.address)).toString();
    setFund(parseInt(ethers.utils.formatUnits(result,token.decimals)))
  }

  async function redeem(amount){
    if(faucetContract == null) return;
    if(faucetSigner == null) return;
    if(fund === -100) return;
    if(parseInt(amount) > fund) return;
    if(window.ethereum.selectedAddress === null || window.ethereum.selectedAddress === '') return;

    let weiAmount = ethers.utils.parseUnits(amount,token.decimals).toString()

    let result = await faucetSigner.redeemToken(token.address,window.ethereum.selectedAddress,weiAmount)
  }

  return (
    <>
      <div class="card w-96 bg-base-100 shadow-xl">
        <figure class="px-10 pt-10">
          <Image src={token.imgUrl} alt="token_img" width={"304"} height={"304"}/>
        </figure>
        <div class="card-body items-center text-center">
          <div class="card-actions">
            <label for={`${token.name}-modal`} class="btn btn-outline btn-wide modal-button">{token.name} Faucet</label>
          </div>
        </div>
      </div>

      <input type="checkbox" id={`${token.name}-modal`} class="modal-toggle" />

      <div class="modal">
        <div class="modal-box relative">
          <label for={`${token.name}-modal`} onClick={() => { setTokenFundFromContract() }} class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <div className="text-center">
            <p class="pt-8 text-xl">Faucet Fund : {fund}</p>
            <p class="pt-1 pb-6 text-sm text-xl font-light">Token - {token.address}</p>
            <button class="btn btn-primary btn-wide" onClick={() => { redeem("100") }}>100 {token.name}</button>
            <button class="btn btn-secondary btn-wide my-4" onClick={() => { redeem("500") }}>500 {token.name}</button>
            <button class="btn btn-accent btn-wide" onClick={() => { redeem("1000") }}>1'000 {token.name}</button>
            <button class="btn btn-info btn-outline btn-wide my-4" onClick={() => { redeem("1500") }}>1'500 {token.name}</button>
            <button class="btn btn-warning btn-outline btn-wide" onClick={() => { redeem("2000") }}>2'000 {token.name}</button>
            <a href={token.addTokenLink} target="_blank" class="btn btn-error text-white btn-wide my-4">Add To Metamask</a>
          </div>
        </div>
      </div>

    </>
  )
}

const tokens = [
  {
    imgUrl: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=022',
    name: 'dUSDC',
    address: '0x2b8920cBdDCc3e85753423eEceCd179cb9232554',
    decimals: 6,
    addTokenLink: 'https://metamask.dsolutions.mn/add-token?name=Diverse%20USDC&symbol=dUSDC&decimals=6&address=0x2b8920cBdDCc3e85753423eEceCd179cb9232554&imgUrl=https://cryptologos.cc/logos/usd-coin-usdc-logo.png'
  },
  {
    imgUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=022',
    name: 'dTether',
    address: '0x6E99Fa3F37a1BA6429a149384072b5377d843006',
    decimals: 6,
    addTokenLink: 'https://metamask.dsolutions.mn/add-token?name=dTether%20USD&symbol=dUSDT&decimals=6&address=0x6E99Fa3F37a1BA6429a149384072b5377d843006&imgUrl=https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFfZAu_tCWAi3Hy3H3ac-R5t9-hIherdacCXzBR4WS_jDhvH1UOnDhMqHSOBGoWLJzbDE&usqp=CAU'
  },
  {
    imgUrl: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=022',
    name: 'dDAI',
    address: '0xaB57fAf3b573B8ac1ad90255f6cF4E92DbbcCE91',
    decimals: 18,
    addTokenLink: 'https://metamask.dsolutions.mn/add-token?name=Diverse%20DAI&symbol=dDAI&decimals=18&address=0xaB57fAf3b573B8ac1ad90255f6cF4E92DbbcCE91&imgUrl=https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png'
  },
]
