import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-tracer";

const PRIVATE_KEY = process.env.PRIVATE_KEY || '';

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    'godwoken-testnet': {
      url: `https://godwoken-testnet-v1.ckbapp.dev`,
      accounts: [PRIVATE_KEY]
    }
  }
};

export default config;
