import contractModel from "../models/contractModel.js";
import userModel from "../models/userModel.js";
import projectModel from "../models/workerModel.js";


const getAllContracts = async (req, res) => {
  try {
    const contracts = await contractModel.find({status: 'open'}); // Fetch all contracts

    // Fetch client details for each contract
    const contractsWithClientDetails = await Promise.all(
      contracts.map(async (contract) => {
        try {
          const client = await userModel.findById(contract.clientId, 'name'); // Fetch the client name
          return {
            ...contract.toObject(),
            clientName: client ? client.name : 'Unknown' // Add client name to the contract details
          };
        } catch (error) {
          console.error(`Error fetching client details for contract ID ${contract._id}:`, error);
          return {
            ...contract.toObject(),
            clientName: 'Unknown' // Handle the case where client details cannot be fetched
          };
        }
      })
    );
    res.status(200).json(contractsWithClientDetails);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// Add a bid to a contract
const addBidToContract = async (req, res) => {
  const {
    bidId,
    bidderId,
    bidderName,
    amount
  } = req.body;
  console.log("yo yo", req.body);


  try {
    const contract = await contractModel.findById(req.params.id);
    if (!contract) {
      return res.status(404).json({
        message: 'Contract not found'
      });
    }

    contract.bids.push({
      bidId,
      bidderId,
      bidderName,
      amount,
      timestamp: new Date()
    });


    const updatedContract = await contract.save();
    res.status(200).json(updatedContract);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};


// for my contracts in contractor
const getContractsByContractor = async (req, res) => {
  const {
    contractorId
  } = req.params;
  try {

    const contracts = await contractModel.find({
      status: 'Project started',
      'bids.bidderId': contractorId
    });

    // Fetch client details for each contract
    const contractsWithClientDetails = await Promise.all(
      contracts.map(async (contract) => {
        try {
          const client = await userModel.findById(contract.clientId, 'name'); // Fetch the client name
          return {
            ...contract.toObject(),
            clientName: client ? client.name : 'Unknown' // Add client name to the contract details
          };
        } catch (error) {
          console.error(`Error fetching client details for contract ID ${contract._id}:`, error);
          return {
            ...contract.toObject(),
            clientName: 'Unknown' // Handle the case where client details cannot be fetched
          };
        }
      })
    );
    res.status(200).json(contractsWithClientDetails);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// for request workers in contractor
const addPositionsToContract = async (req, res) => {
  const {
    contractId
  } = req.params;
  const positions = req.body;

  try {
    const project = new projectModel({
      contractId,
      status: "open",
      workerTypes: positions,
      workers: []
    });

    // console.log(project);
    // Save the Project document
    await project.save();

    res.status(201).json({
      message: 'Project created successfully',
      project
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({
      message: 'An error occurred while creating the project',
      error
    });
  }
};



export {
  getAllContracts,
  addBidToContract,
  getContractsByContractor,
  addPositionsToContract
};