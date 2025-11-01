import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
  // Image path (served from /uploads)
  image: { type: String },
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;
