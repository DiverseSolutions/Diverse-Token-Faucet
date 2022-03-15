import Image from 'next/image'

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="w-10/12 grid gap-20 grid-cols-3 justify-items-center grid-rows-1">
          { tokens.map((i) => tokenCard(i))  }
        </div>
      </div>
    </>
  )
}

function tokenCard(token){
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
          <label for={`${token.name}-modal`} class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <div className="text-center">
            <p class="pb-4 pt-8 text-xl">Faucet Fund : 0</p>
            <button class="btn btn-primary btn-wide">100 {token.name}</button>
            <button class="btn btn-secondary btn-wide my-4">500 {token.name}</button>
            <button class="btn btn-accent btn-wide">1'000 {token.name}</button>
            <button class="btn btn-info btn-outline btn-wide my-4">1'500 {token.name}</button>
            <button class="btn btn-warning btn-outline btn-wide">2'000 {token.name}</button>
          </div>
        </div>
      </div>

    </>
  )
}

const tokens = [
  {
    imgUrl: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=022',
    name: 'dUSDC'
  },
  {
    imgUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=022',
    name: 'dTether'
  },
  {
    imgUrl: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=022',
    name: 'dDAI'
  },
]
