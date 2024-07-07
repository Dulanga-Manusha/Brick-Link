import express from 'express';
import {
    getAllProjects,
    applyToProject,
    getAppliedProjects,
    cancelApplication,
    currentProjects
} from '../controllers/workerController.js';

const route = express.Router();

route.get("/getAllProjects", getAllProjects);
route.post("/apply/:projectId", applyToProject);
route.get("/getAppliedProjects/:workerId", getAppliedProjects);
route.delete("/cancelApplication/:projectId/:userId", cancelApplication);
route.get("/:workerId/current-works", currentProjects);



export default route;