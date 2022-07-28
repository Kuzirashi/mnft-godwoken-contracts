import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-tracer";

// 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
const PRIVATE_KEY = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

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
