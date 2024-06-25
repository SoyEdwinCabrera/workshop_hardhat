import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
//deploy
import "hardhat-deploy"
//verify
import "@nomicfoundation/hardhat-etherscan";

import dotenv from "dotenv";
dotenv.config();

const {ARBISCAN_API_KEY, ARBITRUM_SEPOLIA_RPC_URL, WALLET_PRIVATE_KEY} = process.env;

if (!ARBISCAN_API_KEY || !ARBITRUM_SEPOLIA_RPC_URL || !WALLET_PRIVATE_KEY) {
  throw new Error("Please set ARBISCAN_API_KEY, ARBITRUM_SEPOLIA_RPC_URL, WALLET_PRIVATE_KEY in .env file");
}

const ACCOUNTS: string[] = [WALLET_PRIVATE_KEY];

const SOLC_SETTINGS = {
  optimizer: {
    enabled: true,
    runs: 200,
  },
};

const defaultNetwork: string = "hardhat";
const config: HardhatUserConfig = {
  defaultNetwork: defaultNetwork, 
  networks: {
    hardhat: {
      chainId: 1337,
    },
    localhost: {
      chainId: 1337,
    },
    arbitrumSepolia: {
      accounts: ACCOUNTS,
      chainId: 42161,
      url: ARBITRUM_SEPOLIA_RPC_URL,
    },
  },
  solidity: "0.8.24",
};

export default config;
