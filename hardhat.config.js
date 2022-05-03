require('dotenv').config()

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('hardhat-abi-exporter');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("verify_smart_contract_mumbai", "Verify Smart Contract On Polygon Mumbai", async (taskArgs, hre) => {
  await hre.run("verify:verify", {
    address: process.env.FAUCET_CONTROLLER_ADDRESS,
    contract: "contracts/FaucetController.sol:FaucetController",
  });
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.12",
  networks: {
    "truffle-dashboard": {
      url: "http://localhost:24012/rpc"
    },
    mumbai: {
      url: process.env.ALCHEMY_MUMBAI_API_URL,
      chainId: 80001,
      accounts: { mnemonic: process.env.MNEMONIC}
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.MUMBAI_API_KEY,
    },
  },
  paths: {
    artifacts: "./artifacts"
  },
  abiExporter: {
    path: './src/abi/',
    runOnCompile: true,
    clear: true,
    flat: true,
    spacing: 2,
    pretty: true,
  }
}
