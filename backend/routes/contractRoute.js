import express from 'express';
import { createContract, getClientContracts, getContractById, addBidToContract, deleteContract } from '../controllers/contractController.js';

const route = express.Router();


route.get('/client/:clientId', getClientContracts);

// Get a specific contract by ID
route.get('/:id', getContractById);

// Create a new contract
route.post('/', createContract);

// Add a bid to a contract
route.post('/:id/bids', addBidToContract);

// Delete a contract
route.delete('/:id', deleteContract);




export default route;