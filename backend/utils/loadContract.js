// backend/utils/loadContract.js
const { ethers } = require('ethers');
const FarmDAppABI = require('../../contracts/build/contracts/FarmDapp.json').abi;

const loadContract = (contractAddress, signer) => {
    return new ethers.Contract(contractAddress, FarmDAppABI, signer);
};

module.exports = { loadContract };