async function main() {
  const [ deployer ] = await ethers.getSigners();

  const FaucetController = await ethers.getContractFactory("FaucetController");
  const faucetContractInstance = await FaucetController.deploy();

  console.log("Faucet Controller Smart Contract deployed to:", faucetContractInstance.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

