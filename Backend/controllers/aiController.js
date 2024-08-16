// controllers/aiController.js

import { generateMockInterview, analyzeUserAnswer } from '../services/aiService.js';
import { body, validationResult } from 'express-validator';

const generateMockInterviewHandler = [
  body('jobPosition').notEmpty().trim(),
  body('jobDesc').notEmpty().trim(),
  body('jobExperience').notEmpty().trim(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { jobPosition, jobDesc, jobExperience } = req.body;
      const interviewQuestions = await generateMockInterview(jobPosition, jobDesc, jobExperience);
      res.json({ success: true, data: interviewQuestions });
    } catch (error) {
      next(error);
    }
  }
];

const analyzeUserAnswerHandler = [
  body('question').notEmpty().trim(),
  body('correctAnswer').notEmpty().trim(),
  body('userAnswer').notEmpty().trim(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { question, correctAnswer, userAnswer } = req.body;
      const analysis = await analyzeUserAnswer(question, correctAnswer, userAnswer);
      res.json({ success: true, data: analysis });
    } catch (error) {
      next(error);
    }
  }
];

export { generateMockInterviewHandler, analyzeUserAnswerHandler };
