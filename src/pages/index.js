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
    setFaucetContract(new ethers.Contract(faucetControllerAddress, faucetABI, new ethers.providers.Web3Provider(window.ethereum),{
      gasLimit: 1000000
    }))
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
          { tokens.map((i,k) => (
            <div key={k}>
              <TokenCard token={i} faucetContract={faucetContract} faucetSigner={faucetSigner} />
            </div>
            ))  }
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

    let result = await faucetSigner.redeemToken(token.address,window.ethereum.selectedAddress,weiAmount);
  }

  return (
    <>
      <div className="shadow-xl card w-96 bg-base-100">
        <figure className="px-10 pt-10">
          <Image src={token.imgUrl} alt="token_img" width={"250"} height={"250"}/>
        </figure>
        <div className="items-center text-center card-body">
          <div className="card-actions">
            <label htmlFor={`${token.name}-modal`} className="btn btn-outline btn-wide modal-button">{token.name} Faucet</label>
          </div>
        </div>
      </div>

      <input type="checkbox" id={`${token.name}-modal`} className="modal-toggle" />

      <div className="modal">
        <div className="relative modal-box">
          <label htmlFor={`${token.name}-modal`} onClick={() => { setTokenFundFromContract() }} className="absolute btn btn-sm btn-circle right-2 top-2">✕</label>
          <div className="text-center">
            <p className="pt-8 text-xl">Faucet Fund : {fund}</p>
            <p className="pt-1 pb-6 text-sm text-xl font-light">Token - {token.address}</p>
            <button className="btn btn-primary btn-wide" onClick={() => { redeem("100") }}>100 {token.name}</button>
            <button className="my-4 btn btn-secondary btn-wide" onClick={() => { redeem("500") }}>500 {token.name}</button>
            <button className="btn btn-accent btn-wide" onClick={() => { redeem("1000") }}>1 000 {token.name}</button>
            <button className="my-4 btn btn-info btn-outline btn-wide" onClick={() => { redeem("1500") }}>1 500 {token.name}</button>
            <button className="btn btn-warning btn-outline btn-wide" onClick={() => { redeem("2000") }}>2 000 {token.name}</button>
            <a href={token.addTokenLink} rel="noreferrer" target="_blank" className="my-4 text-white btn btn-error btn-wide">Add To Metamask</a>
          </div>
        </div>
      </div>

    </>
  )
}

const tokens = [
  {
    imgUrl: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=022",
    name: "dUSDC",
    address: "0x2b8920cBdDCc3e85753423eEceCd179cb9232554",
    decimals: 6,
    addTokenLink: "https://metamask.dsolutions.mn/add-token?name=Diverse%20USDC&symbol=dUSDC&decimals=6&address=0x2b8920cBdDCc3e85753423eEceCd179cb9232554&imgUrl=https://cryptologos.cc/logos/usd-coin-usdc-logo.png"
  },
  {
    imgUrl: "https://cryptologos.cc/logos/tether-usdt-logo.png?v=022",
    name: "dTether",
    address: "0xECd313e29b85cAf347fb832F80427602030cD3Fc",
    decimals: 6,
    addTokenLink: "https://metamask.dsolutions.mn/add-token?name=dTether%20USD&symbol=dUSDT&decimals=6&address=0xECd313e29b85cAf347fb832F80427602030cD3Fc&imgUrl=https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFfZAu_tCWAi3Hy3H3ac-R5t9-hIherdacCXzBR4WS_jDhvH1UOnDhMqHSOBGoWLJzbDE&usqp=CAU"
  },
  {
    imgUrl: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=022",
    name: "dDAI",
    address: "0xaB57fAf3b573B8ac1ad90255f6cF4E92DbbcCE91",
    decimals: 18,
    addTokenLink: "https://metamask.dsolutions.mn/add-token?name=Diverse%20DAI&symbol=dDAI&decimals=18&address=0xaB57fAf3b573B8ac1ad90255f6cF4E92DbbcCE91&imgUrl=https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png"
  },

  {
    imgUrl: "https://faucet.dsolutions.mn/diversetoken.png",
    name: "DummyToken-A",
    address: "0x8A250B3517AD8d59354D50af0D9be5c4Cd90F070",
    decimals: 18,
    addTokenLink: "https://metamask.dsolutions.mn/add-token?name=DummyToken-A&symbol=TKN-A&decimals=18&address=0x8A250B3517AD8d59354D50af0D9be5c4Cd90F070&imgUrl=https://faucet.dsolutions.mn/diversetoken.png"
  },
  {
    imgUrl: "https://faucet.dsolutions.mn/diversetoken.png",
    name: "DummyToken-B",
    address: "0x551181Be541f56ce6C6c13448F54Adb8eA2AB531",
    decimals: 18,
    addTokenLink: "https://metamask.dsolutions.mn/add-token?name=DummyToken-B&symbol=TKN-B&decimals=18&address=0x551181Be541f56ce6C6c13448F54Adb8eA2AB531&imgUrl=https://faucet.dsolutions.mn/diversetoken.png"
  },
]
