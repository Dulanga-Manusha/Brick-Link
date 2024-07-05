// // db.js

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


// import mongoose from "mongoose";

// export const connectDB = async () => {
//     try {
//         await mongoose.connect(
//             `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.cldkcmd.mongodb.net/brick-link`, 
//             { 
//                 useNewUrlParser: true, 
//                 useUnifiedTopology: true 
//             }
//         );
//         console.log('DB connected');
//     } catch (error) {
//         console.error('DB connection error:', error);
//     }
// }
