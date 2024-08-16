import { generateMockInterviewHandler } from './aiController.js';
import MockInterview from '../models/MockInterview.js';

const createMockInterview = async (req, res, next) => {
  try {
    const { jobPosition, jobDesc, jobExperience } = req.body;
    const userId = req.user.sub;

    // Generate mock interview using AI
    const result = await new Promise((resolve) => {
      generateMockInterviewHandler[generateMockInterviewHandler.length - 1](
        { body: { jobPosition, jobDesc, jobExperience } },
        { json: resolve },
        next
      );
    });

    const generatedInterview = result.data;

    const mockInterview = new MockInterview({
      jsonMockResp: generatedInterview,
      jobPosition,
      jobDesc,
      jobExperience,
      createdBy: userId,
      mockId: Date.now().toString(), // Simple unique ID generation
    });

    await mockInterview.save();
    res.status(201).json(mockInterview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMockInterview = async (req, res) => {
  try {
    const mockInterview = await MockInterview.findOne({ mockId: req.params.mockId });
    if (!mockInterview) {
      return res.status(404).json({ message: 'Mock interview not found' });
    }
    res.json(mockInterview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllMockInterviews = async (req, res) => {
  try {
    const userId = req.user.sub;
    const mockInterviews = await MockInterview.find({ createdBy: userId });
    res.json(mockInterviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createMockInterview, getMockInterview, getAllMockInterviews };