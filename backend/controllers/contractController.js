import contractModel from "../models/contractModel.js";



const getClientContracts = async (req, res) => {
  try {
      const clientId = req.params.clientId;
      const contracts = await contractModel.find({clientId : clientId});
      console.log(contracts);
      res.status(200).json(contracts);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};
  


  const getAllContracts = async (req, res) => {
    try {
      const contracts = await contractModel.find(); // Fetch all contracts
      res.status(200).json(contracts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };



  // Get a specific contract by ID
  const getContractById = async (req, res) => {
    try {
      const contract = await contractModel.findById(req.params.id);
      if (!contract) {
        return res.status(404).json({ message: 'Contract not found' });
      }
      res.status(200).json(contract);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Create a new contract
  const createContract = async (req, res) => {
    const { title, description, clientId, bids } = req.body;
    const newContract = new contractModel({
      title,
      description,
      clientId,
      bids:bids || []
    });
  
    try {
      const savedContract = await newContract.save();
      res.status(201).json(savedContract);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Add a bid to a contract
  const addBidToContract = async (req, res) => {
    const { bidId, bidderName, amount } = req.body;
    console.log("yo yo",req.body);

  
    try {
      const contract = await contractModel.findById(req.params.id);
      if (!contract) {
        return res.status(404).json({ message: 'Contract not found' });
      }
  
      contract.bids.push({
        bidId,
        bidderName,
        amount,
        timestamp: new Date()
      });

  
      const updatedContract = await contract.save();
      res.status(200).json(updatedContract);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Delete a contract
  const deleteContract = async (req, res) => {
    try {
      const contract = await contractModel.findById(req.params.id);
      if (!contract) {
        return res.status(404).json({ message: 'Contract not found' });
      }
  
      await contract.remove();
      res.status(200).json({ message: 'Contract deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

export { getAllContracts,createContract, getClientContracts, getContractById, addBidToContract, deleteContract };