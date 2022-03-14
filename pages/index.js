import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="">
      <div className="h-screen flex justify-center items-center text-center flex-col">
          <h1 className="text-6xl font-bold"><a href="https://dsolutions.mn/" target="_blank" className="text-blue-500 no-underline">Diverse</a> ERC-20 Faucets</h1>
          <p className="py-6 font-light text-center text-md">Available Faucet Networks</p>
      </div>

      <div className="flex justify-center my-5 border-t-2 border-grey-900">
        <div className="pt-5">
          <p> Powered by <a href="https://dsolutions.mn/" target="_blank" className="ml-1 text-blue-500">Diverse Solutions</a> </p>
        </div>
      </div>

    </div>
  )
}
