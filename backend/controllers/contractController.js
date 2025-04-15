// backend/controllers/contractController.js
const { loadContract } = require('../utils/loadContract');
const { ethers } = require('ethers');
require('dotenv').config();

const contractAddress = process.env.CONTRACT_ADDRESS;
const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);
const signer = wallet.connect(provider);

const contract = loadContract(contractAddress, signer);

const addProduce = async (req, res) => {
    const { details } = req.body;
    try {
        const result = await contract.addProduce(details);
        res.json(result);
    } catch (error) {
        console.error('Error adding produce:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { addProduce };