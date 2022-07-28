import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();

  console.log(`Deployer: ${owner?.address}`);

  const BridgeFactory = await ethers.getContractFactory("MNFTBridge");
  const bridge = await BridgeFactory.deploy();

  await bridge.deployed();

  console.log("MNFT Bridge deployed:", bridge.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
