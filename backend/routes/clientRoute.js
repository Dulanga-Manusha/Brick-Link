import express from 'express';

import {
    getAllContracts,
    createContract,
    getClientContracts,
    getContractById,
    deleteContract,
    acceptBidByClient,
    getClientAccept,
    rejectBidByClient
} from '../controllers/clientController.js';

const route = express.Router();

route.get("/getAllContracts", getAllContracts);

route.get('/clientopen/:clientId', getClientContracts);

route.get('/clientaccept/:clientId', getClientAccept);

// Get a specific contract by ID
route.get('/:id', getContractById);

// Create a new contract
route.post('/', createContract);

// Delete a contract
route.delete('/:id', deleteContract);

// Accept a bid by client
route.post('/:contractId/bids/:bidId/accept', acceptBidByClient);

// Reject a bid by client
route.post('/:contractId/bids/:bidId/reject', rejectBidByClient);



export default route;