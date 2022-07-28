import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("MNFTBridge", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const BridgeFactory = await ethers.getContractFactory("MNFTBridge");
    const bridge = await BridgeFactory.deploy();

    return { bridge, owner, otherAccount };
  }

  describe("MNFTBridge", function () {
    it("allows storing NFT address", async function () {
      const { bridge } = await loadFixture(deployFixture);

      const EMPTY_24_BYTES = '0x' + ('00').repeat(24);
      const EXAMPLE_ISSUER_ID = '0x6e65dbdc9fb14400a98eda9f8fa543a5f46c99cb';
      const EXAMPLE_CLASS_ID = 18;
      const EXAMPLE_ISSUER_ID_AND_CLASS_ID = EXAMPLE_ISSUER_ID + '00000012';
      const MOCK_NFT_ADDRESS = '0xD173313A51f8fc37BcF67569b463abd89d81844f';
      
      await bridge.registerNFTClassContract(EXAMPLE_ISSUER_ID_AND_CLASS_ID, MOCK_NFT_ADDRESS);
      
      expect(await bridge.hash(EXAMPLE_ISSUER_ID, EXAMPLE_CLASS_ID)).to.be.eq(EXAMPLE_ISSUER_ID_AND_CLASS_ID);
      expect(await bridge.issuerAndClassIdToNFTMapping(EXAMPLE_ISSUER_ID_AND_CLASS_ID)).to.be.eq(MOCK_NFT_ADDRESS);
    });

    it("works with real NFT contract", async function () {
      const EXAMPLE_ISSUER_ID = '0x6e65dbdc9fb14400a98eda9f8fa543a5f46c99cb';
      const EXAMPLE_CLASS_ID = 18;
      const EXAMPLE_ISSUER_ID_AND_CLASS_ID = EXAMPLE_ISSUER_ID + '00000012';

      const BridgeFactory = await ethers.getContractFactory("MNFTBridge");
      const bridge = await BridgeFactory.deploy();

      const NFTClassContractFactory = await ethers.getContractFactory("MNFTClassContract");
      const nft = await NFTClassContractFactory.deploy(EXAMPLE_ISSUER_ID, EXAMPLE_CLASS_ID);
            
      await bridge.registerNFTClassContract(EXAMPLE_ISSUER_ID_AND_CLASS_ID, nft.address);
      
      expect(await bridge.issuerAndClassIdToNFTMapping(EXAMPLE_ISSUER_ID_AND_CLASS_ID)).to.be.eq(nft.address);
    });
  });
});
