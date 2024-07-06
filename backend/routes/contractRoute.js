import express from 'express';
import {
    getAllContracts,
    addBidToContract,
    getContractsByContractor,
    addPositionsToContract
} from '../controllers/contractController.js';

const route = express.Router();


route.get("/getAllContracts", getAllContracts);

// Add a bid to a contract
route.post('/:id/bids', addBidToContract);

// Get contracts by contractor ID
route.get('/:contractorId/mycontracts', getContractsByContractor);

// add positions to a contract
route.post('/:contractId/request', addPositionsToContract);


export default route;