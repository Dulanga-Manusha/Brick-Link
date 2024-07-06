import contractModel from "../models/contractModel.js";
import userModel from "../models/userModel.js";
import projectModel from "../models/workerModel.js";

const findWorks = async (req, res) => {
    try {
      // Find all projects with the status 'Open'
      const projects = await projectModel.find({ status: 'Open' }).populate('contractId');
  
      const projectDetails = await Promise.all(
        projects.map(async (project) => {
          // Find the contract associated with the project
          const contract = await contractModel.findById(project.contractId);
  
          // Find the client associated with the contract
          const client = await userModel.findById(contract.clientId);
  
          return {
            title: contract.title,
            description: contract.description,
            contractorName: client ? client.name : 'Unknown',
            workerTypes: project.workerTypes
          };
        })
      );
      console.log('projectDetails:', projectDetails);
      res.status(200).json(projectDetails);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export {findWorks} ;
  