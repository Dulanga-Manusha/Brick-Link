import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js';
import contractRoute from "./routes/contractRoute.js"
import clientRoute from "./routes/clientRoute.js"
import workerRoute from "./routes/workerRoute.js"

import 'dotenv/config';



//app config
const app = express();
const port = 5000;

//middleware
app.use(cors());
app.use(express.json());

//db connection
connectDB();

// API endpoints
app.use('/api/user', userRouter);
app.use('/api/contract', contractRoute);
app.use('/api/client', clientRoute);
app.use('/api/worker', workerRoute);

app.get('/', (req, res) => {
    res.send('API working')
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

