import express from 'express';
import {getAllProjects, applyToProject, getAppliedProjects, cancelApplication} from '../controllers/workerController.js';

const route = express.Router();

route.get("/getAllProjects", getAllProjects);
route.post("/apply/:projectId", applyToProject);
route.get("/getAppliedProjects/:workerId", getAppliedProjects);
route.delete("/cancelApplication/:projectId/:userId", cancelApplication);


//end points
workerRouter.get('/findWorks', findWorks);



export default route;