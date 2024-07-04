// db.js

import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(
            'mongodb://localhost:27017/bricklink', // Replace with your MongoDB connection string
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                // Remove useCreateIndex and useFindAndModify from options
            }
        );
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
};
