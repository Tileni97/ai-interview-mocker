import express from 'express';
import authenticateJWT from '../middleware/authenticateJWT.js';
import * as mockInterviewController from '../controllers/mockInterviewController.js';
import * as aiController from '../controllers/aiController.js';
import MockInterview from '../models/MockInterview.js';

const router = express.Router();

router.use(authenticateJWT);

// Middleware to validate mockId parameter for routes that use it
router.param('mockId', async (req, res, next, mockId) => {
  try {
    const mockInterview = await MockInterview.findOne({ mockId });
    if (!mockInterview) {
      return res.status(404).json({ message: 'Mock interview not found' });
    }
    req.mockInterview = mockInterview;
    next();
  } catch (error) {
    next(error);
  }
});

// Mock Interview Routes
router.post('/', mockInterviewController.createMockInterview);
router.get('/:mockId', mockInterviewController.getMockInterview);
router.get('/', mockInterviewController.getAllMockInterviews);

// AI Routes
router.post('/generate', aiController.generateMockInterviewHandler);
router.post('/analyze', aiController.analyzeUserAnswerHandler);  // Add the analyze route here

export default router;
