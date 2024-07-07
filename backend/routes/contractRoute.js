import express from 'express';

import {
    getAllContracts,
    addBidToContract,
    getContractsByContractor,
    addPositionsToContract,
    getRequestsofWrokers,
    stopRequestingWorkers,
    acceptWorkerRequest,
    rejectWorkerRequest,
    getCurrentContracts,
    completeContract
} from '../controllers/contractController.js';

const route = express.Router();



route.get("/getAllContracts", getAllContracts);

// Add a bid to a contract
route.post('/:id/bids', addBidToContract);

// Get contracts by contractor ID
route.get('/:contractorId/mycontracts', getContractsByContractor);

// add positions to a contract
route.post('/:contractId/request', addPositionsToContract);

route.get('/:contractorId/requests', getRequestsofWrokers);

route.post('/:projectId/close', stopRequestingWorkers);

route.patch('/:workerId/accept', acceptWorkerRequest);
route.patch('/:workerId/reject', rejectWorkerRequest);

route.get('/:contractorId/contracts', getCurrentContracts);

route.patch('/:projectId/complete', completeContract);


export default route;