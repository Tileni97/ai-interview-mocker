import mongoose from 'mongoose';

const mockInterviewSchema = new mongoose.Schema({
  jsonMockResp: Object,
  jobPosition: String,
  jobDesc: String,
  jobExperience: String,
  createdBy: String,
  mockId: String,
}, { timestamps: true });

const MockInterview = mongoose.model('MockInterview', mockInterviewSchema);

export default MockInterview;