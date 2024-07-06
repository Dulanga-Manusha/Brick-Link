import express from 'express';
import {findWorks} from '../controllers/workerController.js';

const workerRouter = express.Router();

//end points
workerRouter.get('/findWorks', findWorks);



export default workerRouter;