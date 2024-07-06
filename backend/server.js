// index.js

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js';
import contractRoute from "./routes/contractRoute.js"
import clientRoute from "./routes/clientRoute.js"
import workerRoute from "./routes/workerRoute.js"


// Load environment variables from .env file
import 'dotenv/config';

// Connect to MongoDB
connectDB();

// Create Express server
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API endpoints
app.use('/api/user', userRouter);
app.use('/api/contract', contractRoute);
app.use('/api/client', clientRoute);
app.use('/api/worker', workerRoute);

// Root endpoint
app.get('/', (req, res) => {
    res.send('API working');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
