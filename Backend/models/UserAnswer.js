import mongoose from "mongoose";
import MockInterview from "./MockInterview.js";

const userAnswerSchema = new mongoose.Schema(
  {
    mockIdRef: {
      type: String,
      required: true,
      ref: "MockInterview",
      trim: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    correctAns: {
      type: String,
      required: true,
      trim: true,
    },
    userAns: {
      type: String,
      required: true,
      trim: true,
    },
    feedback: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    userEmail: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// Pre-save hook to check referential integrity
userAnswerSchema.pre("save", async function (next) {
  try {
    const mockInterviewExists = await MockInterview.exists({
      mockId: this.mockIdRef,
    });
    if (!mockInterviewExists) {
      throw new Error(
        "Invalid mockIdRef: No corresponding MockInterview found"
      );
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Adding indexes
userAnswerSchema.index({ mockIdRef: 1 });
userAnswerSchema.index({ userEmail: 1 });

const UserAnswer = mongoose.model("UserAnswer", userAnswerSchema);

export default UserAnswer;
