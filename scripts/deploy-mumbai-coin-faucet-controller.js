const fs = require('fs');
const path = require('path');
const hre = require("hardhat");

async function main() {
  const CoinFaucetController = await hre.ethers.getContractFactory("CoinFaucetController");
  let capAmount = ethers.utils.parseUnits('0.2','ether')
  const CoinFaucetControllerContract = await CoinFaucetController.deploy(capAmount);

  await CoinFaucetControllerContract.deployed();

  console.log("CoinFaucetControllerContract deployed to:", CoinFaucetControllerContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

