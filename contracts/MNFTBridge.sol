// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

// Import this file to use console.log
// Uncomment this line to print a log in your terminal
// console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);
import "hardhat/console.sol";

contract MNFTBridge is Ownable {
    // IssuerId + ClassId => NFT contract mapping
    mapping (bytes24 => address) public issuerAndClassIdToNFTMapping;

    event ClassContractRegistered(bytes24 _issuerAndClassIdHash, address _nftAddress);

    constructor() {}

    function registerNFTClassContract(bytes24 _issuerAndClassIdHash, address _nftAddress) public onlyOwner {
        issuerAndClassIdToNFTMapping[_issuerAndClassIdHash] = _nftAddress;
        emit ClassContractRegistered(_issuerAndClassIdHash, _nftAddress);
    }

    function hash(
        bytes20 _issuerId,
        uint32 _classId
    ) public pure returns (bytes24) {
        return bytes24(abi.encodePacked(_issuerId, _classId));
    }

    function getRegisteredClassContract(
        bytes20 _issuerId,
        uint32 _classId
    ) public view returns (address) {
        return issuerAndClassIdToNFTMapping[this.hash(_issuerId, _classId)];
    }
}
