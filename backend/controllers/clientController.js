import contractModel from "../models/contractModel.js";


const getClientContracts = async (req, res) => {
    try {
        const clientId = req.params.clientId;
        const contracts = await contractModel.find({
            clientId: clientId,
            status: 'open'
        });
        res.status(200).json(contracts);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const getAllContracts = async (req, res) => {
    try {
        const contracts = await contractModel.find(); // Fetch all contracts
        res.status(200).json(contracts);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



// Get a specific contract by ID
const getContractById = async (req, res) => {
    try {
        const contract = await contractModel.findById(req.params.id);
        if (!contract) {
            return res.status(404).json({
                message: 'Contract not found'
            });
        }
        res.status(200).json(contract);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Create a new contract
const createContract = async (req, res) => {
    const {
        title,
        description,
        clientId,
        status,
        bids
    } = req.body;
    console.log(req.body);
    const newContract = new contractModel({
        title,
        description,
        clientId,
        status,
        bids: bids || []
    });

    try {
        const savedContract = await newContract.save();
        res.status(201).json(savedContract);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


// Delete a contract
const deleteContract = async (req, res) => {
    const {
        id
    } = req.params;
    try {
        const contract = await contractModel.findById(id);
        if (!contract) {
            return res.status(404).json({
                message: 'Contract not found'
            });
        }

        await contractModel.findByIdAndDelete(id);
        return res.status(200).json({
            message: 'Contract deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

// accept a bid by client
const acceptBidByClient = async (req, res) => {
    const {
        contractId,
        bidId
    } = req.params;
    try {
        const contract = await contractModel.findById(contractId);
        if (!contract) {
            return res.status(404).json({
                message: 'Contract not found'
            });
        }

        let bid = contract.bids.find(bid => bid.bidId === bidId);
        // Update contract status to 'accepted'
        contract.status = 'Project started';
        // Keep only the accepted bid
        contract.bids = [bid];
        console.log(contract);
        // // Save the updated contract
        await contract.save();

        res.status(200).json({
            message: 'Bid accepted and contract updated',
            contract
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while accepting the bid',
            error
        });
    }
};

// reject a bid by client
const rejectBidByClient = async (req, res) => {
    const {
        contractId,
        bidId
    } = req.params;

    try {
        const contract = await contractModel.findById(contractId);
        if (!contract) {
            return res.status(404).json({
                message: 'Contract not found'
            });
        }
        // Find the index of the bid to reject
        const bidIndex = contract.bids.findIndex(bid => bid.bidId === bidId);
        if (bidIndex === -1) {
            return res.status(404).json({
                message: 'Bid not found'
            });
        }

        // Remove the bid from the bids array
        contract.bids.splice(bidIndex, 1);

        // Save the updated contract
        await contract.save();

        res.status(200).json({
            message: 'Bid rejected and removed from contract',
            contract
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while rejecting the bid',
            error
        });
    }
};


// get client accepted contracts
const getClientAccept = async (req, res) => {
    const {
        clientId
    } = req.params;

    try {
        const contracts = await contractModel.find({
            clientId: clientId,
            status: 'Project started'
        });
        console.log(contracts);
        res.status(200).json(contracts);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



export {
    getAllContracts,
    createContract,
    getClientContracts,
    getContractById,
    deleteContract,
    acceptBidByClient,
    getClientAccept,
    rejectBidByClient
};