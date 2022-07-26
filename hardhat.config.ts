import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-deploy";
import "@openzeppelin/hardhat-upgrades";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.15",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  networks: {
    mainnet: {
      url: "https://eth-mainnet.g.alchemy.com/v2/zmq_AgdbzMv1Skmd0X9RQBxaVZ8-zlEp",
      accounts: process.env.ACCOUNT ? [process.env.ACCOUNT] : undefined,
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/f1a65c98a181483ba561f8a15acf6be5",
      accounts: process.env.ACCOUNT ? [process.env.ACCOUNT] : undefined,
    },
    matic: {
      url: "https://polygon-mainnet.g.alchemy.com/v2/ckgNaps_vXbvXxFYNvszn4Ip_02k7SEs",
      accounts: process.env.ACCOUNT ? [process.env.ACCOUNT] : undefined,
    },
    mumbai: {
      url: "https://polygon-mumbai.infura.io/v3/f1a65c98a181483ba561f8a15acf6be5",
      accounts: process.env.ACCOUNT ? [process.env.ACCOUNT] : undefined,
    },
    optimism: {
      url: "https://opt-mainnet.g.alchemy.com/v2/tv6ueznDIB8SUzlf0BC9t-ivZq3nCXCm",
      accounts: process.env.ACCOUNT ? [process.env.ACCOUNT] : undefined,
    },
    okov: {
      url: "https://opt-kovan.g.alchemy.com/v2/bsZLJc8FmxK57cg0DwHZHheRr52fDEpn",
      accounts: process.env.ACCOUNT ? [process.env.ACCOUNT] : undefined,
    },
  },
  etherscan: {
    apiKey: {
      mainnet: "R9ZD9F2KVNQ4ZQSG5Q4QV424YJKICZXMVJ",
      rinkeby: "R9ZD9F2KVNQ4ZQSG5Q4QV424YJKICZXMVJ",
      polygon: "P96ZQMC8ITFESB2BKJFIWNY5875IHNITHS",
      polygonMumbai: "P96ZQMC8ITFESB2BKJFIWNY5875IHNITHS",
      optimisticEthereum: "MNUQ5YNPERZQJY799A2MATQCJJUI5NCKAP",
      optimisticKovan: "MNUQ5YNPERZQJY799A2MATQCJJUI5NCKAP",
    },
  },
};

export default config;
