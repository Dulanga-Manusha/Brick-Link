import workerModel from "../models/workerModel.js";

// get all the projecs 

const getAllProjects = async (req, res) => {
    const projects = await workerModel.find();

    res.json(projects);
}

//apply for a project 

const applyToProject = async (req, res) => {
    const { projectId } = req.params;
    const { workerId, workerType, status } = req.body;

    console.log('projectId:', projectId);
    console.log('workerId:',workerId, 'workerType:', workerType, 'status:', status);
  
    try {
      // Find the project by projectId
      const project = await workerModel.findById(projectId);
      console.log('project:', project)
  
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      // Create a new worker object
      const newWorker = {
        userId: workerId, // Assuming workerId is the userId
        position: workerType,
        status: status || 'pending'
      };
      // Add the new worker to the workers array in the project
      project.workers.push(newWorker);
  
      // Save the updated project document
      await project.save();
  
      res.status(201).json({ message: 'Worker applied successfully', project });
    } catch (error) {
      console.error('Error applying worker:', error);
      res.status(500).json({ message: 'An error occurred while applying worker', error });
    }
  };

// get the projects that worker already applied and its status

const getAppliedProjects = async (req, res) => {
    const { workerId } = req.params;
  
    try {
      // Find all projects where the workerId is in the workers array
      const projects = await workerModel.find({ 'workers.userId': workerId });
  
      // Iterate over each project to find the work type the worker applied for
      const appliedProjects = projects.map(project => {
        const workerDetails = project.workers.find(worker => worker.userId.toString() === workerId);
        const appliedWorkType = project.workerTypes.find(type => type.position === workerDetails.position);
        return {
          projectId: project._id,
          contractId: project.contractId,
          appliedWorkType,
          workerDetails,
        };
      });
      console.log('appliedProjects:', appliedProjects)
      res.json(appliedProjects);
      console.log(appliedProjects);
    } catch (error) {
      console.error('Error fetching applied projects:', error);
      res.status(500).json({ message: 'An error occurred while fetching applied projects', error });
    }
  };


  const cancelApplication = async (req, res) => {
    const { projectId, userId } = req.params;
    console.log('projectId:', projectId, 'userId:', userId)

    try {
        const project = await workerModel.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Find the index of the worker to remove
        const workerIndex = project.workers.findIndex(worker => worker.userId.toString() === userId);

        if (workerIndex === -1) {
            return res.status(404).json({ message: 'Worker not found in this project' });
        }

        // Remove the worker from the workers array
        project.workers.splice(workerIndex, 1);

        await project.save();

        res.json({ message: 'Application cancelled successfully', project });
    } catch (error) {
        console.error('Error cancelling application:', error);
        res.status(500).json({ message: 'An error occurred while cancelling application', error });
    }
};
  







export { getAllProjects, applyToProject, getAppliedProjects, cancelApplication };