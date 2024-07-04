import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema({
    bidId: { type: String, required: true },
    bidderName: { type: String, required: true },
    amount: { type: Number, required: true },
    timestamp: { type: Date, required: true, default: Date.now }
  });
  
  const contractSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    clientId: { type: String, required: true },
    bids: [bidSchema]
  });

  const contractModel = mongoose.model('Contract', contractSchema);

export default contractModel;