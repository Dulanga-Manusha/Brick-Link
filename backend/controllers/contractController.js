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
  }catch (error) {
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

    
    })
    console.log("done")
    ;


    const updatedContract = await contract.save();
    res.status(200).json(updatedContract);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};


// for finding contracts of a contractor without associated projects
const getContractsByContractor = async (req, res) => {
  const { contractorId } = req.params;

  try {
    // Step 1: Find all contract IDs that have associated projects
    const projectsWithContractIds = await projectModel.find().distinct('contractId');

    // Step 2: Find all contracts where the contractor is the bidder and exclude those with associated projects
    const contracts = await contractModel.find({
      'bids.bidderId': contractorId,
      status: 'Project started',
      _id: { $nin: projectsWithContractIds }
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
    res.status(500).json({ message: error.message });
  }
};



// for Find workers in contractor
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



// get requests of workers for a contractor for WorkerRequests.jsx
const getRequestsofWrokers = async (req, res) => {
  const { contractorId } = req.params;

  try {
    // Step 1: Find all contracts where the contractor is the bidder
    const contracts = await contractModel.find({
      'bids.bidderId': contractorId
    });

    // Extract contract IDs
    const contractIds = contracts.map(contract => contract._id);

    // Step 2: Find all projects with status "open" and contractId in the found contracts
    const projects = await projectModel.find({
      contractId: { $in: contractIds },
      status: 'open'
    }).populate('contractId', 'title description clientId bids');

    // Step 3: Fetch client and worker details for each project
    const projectsWithDetails = await Promise.all(
      projects.map(async project => {
        // Fetch client name
        const client = await userModel.findById(project.contractId.clientId, 'name');
        const clientName = client ? client.name : 'Unknown';

        // Fetch worker names
        const pendingWorkersWithNames = await Promise.all(
          project.workers
            .filter(worker => worker.status === 'pending')
            .map(async worker => {
              const workerUser = await userModel.findById(worker.userId, 'name');
              return {
                ...worker.toObject(),
                workerName: workerUser ? workerUser.name : 'Unknown'
              };
            })
        );

        return {
          id: project._id,
          title: project.contractId.title,
          description: project.contractId.description,
          clientName,
          budget: project.contractId.bids[0].amount,
          workerTypes: project.workerTypes,
          workers: pendingWorkersWithNames
        };
      })
    );

    res.status(200).json(projectsWithDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// stop requesting workers for a project
const stopRequestingWorkers = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await projectModel.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    project.status = 'Project Started';
    await project.save();
    res.status(200).json({ message: 'Project closed successfully' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// accepts worker requests
const acceptWorkerRequest = async (req, res) => {
  const { workerId } = req.params;
  const { projectId } = req.body;

  try {
    const project = await projectModel.findOneAndUpdate(
      { _id: projectId, 'workers._id': workerId },
      { $set: { 'workers.$.status': 'accepted' } },
      { new: true }
    );


    if (!project) {
      return res.status(404).json({ message: 'Project or worker not found' });
    }

    res.status(200).json({ message: 'Worker request accepted', project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// rejects worker requests
const rejectWorkerRequest = async (req, res) => {
  const { workerId } = req.params;
  const { projectId } = req.body;

  try {
    const project = await projectModel.findOneAndUpdate(
      { _id: projectId, 'workers._id': workerId },
      { $set: { 'workers.$.status': 'rejected' } },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project or worker not found' });
    }

    res.status(200).json({ message: 'Worker request rejected', project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// get current contracts for a contractor
const getCurrentContracts = async (req, res) => {
  const { contractorId } = req.params;

  try {
    // Step 1: Find all contracts where the contractor is the bidder
    const contracts = await contractModel.find({
      'bids.bidderId': contractorId
    });

    // Extract contract IDs
    const contractIds = contracts.map(contract => contract._id);

    // Step 2: Find all projects with status "Project Started" and contractId in the found contracts
    const projects = await projectModel.find({
      contractId: { $in: contractIds },
      status: 'Project Started'
    }).populate('contractId', 'title description clientId bids');

    // Step 3: Fetch client and worker details for each project
    const projectsWithDetails = await Promise.all(
      projects.map(async project => {
        // Fetch client name
        const client = await userModel.findById(project.contractId.clientId, 'name');
        const clientName = client ? client.name : 'Unknown';

        // Fetch worker names and salaries
        const acceptedWorkersWithNames = await Promise.all(
          project.workers
            .filter(worker => worker.status === 'accepted')
            .map(async worker => {
              const workerUser = await userModel.findById(worker.userId, 'name');
              const workerType = project.workerTypes.find(type => type.position === worker.position);
              return {
                ...worker.toObject(),
                workerName: workerUser ? workerUser.name : 'Unknown',
                salary: workerType ? workerType.salary : 'Unknown'
              };
            })
        );

        return {
          id: project._id,
          title: project.contractId.title,
          description: project.contractId.description,
          clientName,
          budget: project.contractId.bids[0].amount,
          workerTypes: project.workerTypes,
          workers: acceptedWorkersWithNames
        };
      })
    );

    res.status(200).json(projectsWithDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const completeContract = async (req, res) => {
  const { projectId } = req.params;

  try {
    // Step 1: Find the project by its ID and update its status to "Completed"
    const project = await projectModel.findByIdAndUpdate(
      projectId,
      { status: 'Completed' },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Step 2: Find the associated contract using the contractId from the project
    const contractId = project.contractId;
    const contract = await contractModel.findByIdAndUpdate(
      contractId,
      { status: 'Completed' },
      { new: true }
    );

    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    // Step 3: Return a success response
    res.status(200).json({
      message: 'Project and contract status updated to Completed',
      project,
      contract
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export {
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
};