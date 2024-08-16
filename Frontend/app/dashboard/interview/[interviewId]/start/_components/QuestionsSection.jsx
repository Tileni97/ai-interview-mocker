"use client";

import React, { useCallback } from "react";
import { Lightbulb, Volume2 } from "lucide-react";
import { toast } from "sonner";

const QuestionButtons = React.memo(
  ({ questions, activeIndex, onQuestionClick }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
      {questions.map((question, index) => (
        <button
          key={index}
          onClick={() => onQuestionClick(index)}
          className={`p-2 border rounded-full text-xs md:text-sm text-center
          ${
            activeIndex === index
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
          aria-label={`Select Question ${index + 1}`}
        >
          Question #{index + 1}
        </button>
      ))}
    </div>
  )
);

function QuestionsSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  setActiveQuestionIndex,
}) {
  const textToSpeech = useCallback((text) => {
    if (!text) {
      toast.error("No text to read");
      return;
    }

    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      console.error("Text-to-speech not supported");
      toast.error("Text-to-speech is not supported in your browser");
    }
  }, []);

  const handleQuestionClick = useCallback(
    (index) => {
      setActiveQuestionIndex(index);
    },
    [setActiveQuestionIndex]
  );

  if (!mockInterviewQuestion || mockInterviewQuestion.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-center text-gray-600">
          No interview questions available.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <QuestionButtons
        questions={mockInterviewQuestion}
        activeIndex={activeQuestionIndex}
        onQuestionClick={handleQuestionClick}
      />
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">
          {mockInterviewQuestion[activeQuestionIndex]?.question || "N/A"}
        </h2>
        <button
          onClick={() =>
            textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
          }
          className="flex items-center text-blue-600 hover:text-blue-800"
          aria-label="Listen to question"
        >
          <Volume2 size={16} className="mr-2" />
          Listen to question
        </button>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="flex items-center text-blue-800 font-semibold mb-2">
          <Lightbulb size={16} className="mr-2" />
          Note:
        </h3>
        <p className="text-sm text-blue-700">
          {process.env.NEXT_PUBLIC_QUESTION_NOTE ||
            "Important note about the interview process."}
        </p>
      </div>
    </div>
  );
}

export default QuestionsSection;
