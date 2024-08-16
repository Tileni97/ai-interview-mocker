import UserAnswer from "../models/UserAnswer.js";
import { analyzeUserAnswer } from "./aiController.js";

const createUserAnswer = async (req, res) => {
  try {
    const { mockIdRef, question, correctAns, userAns } = req.body;

    // Analyze user answer using AI
    const { analysis } = await analyzeUserAnswer({
      question,
      correctAnswer: correctAns,
      userAnswer: userAns,
    });

    // Extract feedback and rating from AI analysis
    const [feedback, ratingString] = analysis.split("Rating:");
    const rating = ratingString.trim().split("/")[0]; // Assuming rating is given as "X/10"

    const userAnswer = new UserAnswer({
      mockIdRef,
      question,
      correctAns,
      userAns,
      feedback: feedback.trim(),
      rating,
      userEmail: req.user.email, // Assuming you have user authentication
    });

    await userAnswer.save();
    res.status(201).json(userAnswer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserAnswers = async (req, res) => {
  try {
    const userId = req.user.sub;
    const userAnswers = await UserAnswer.find({
      mockIdRef: req.params.mockId,
      userEmail: req.user.email,
    });
    res.json(userAnswers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createUserAnswer, getUserAnswers };
