// // db.js

import mongoose from 'mongoose';

export const connectDB = async () => {

    (await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.cldkcmd.mongodb.net/brick-link`).then(()=>console.log('DB connected'))); 
}
