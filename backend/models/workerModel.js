import mongoose from 'mongoose';

const workerTypeSchema = new mongoose.Schema({
  position: { type: String, required: true },
  salary: { type: Number, required: true }
});

const workerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    position: { type: String, required: true }
});

const projectSchema = new mongoose.Schema({
  contractId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contract', required: true },
  status: { type: String, required: true },
  workerTypes : [workerTypeSchema],
  workers: [workerSchema]
});

const projectModel = mongoose.model('Project', projectSchema);

export default projectModel;