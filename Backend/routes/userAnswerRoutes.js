import express from 'express';
import * as userAnswerController from '../controllers/userAnswerController.js';
import * as aiController from '../controllers/aiController.js';
import authenticateJWT from '../middleware/authenticateJWT.js';
import MockInterview from '../models/MockInterview.js';

const router = express.Router();

router.use(authenticateJWT);

// Middleware to validate mockIdRef in userAnswer routes
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

router.post('/', userAnswerController.createUserAnswer);
router.get('/:mockId', userAnswerController.getUserAnswers);
router.post('/analyze', aiController.analyzeUserAnswer); // Route for AI analysis

export default router;
