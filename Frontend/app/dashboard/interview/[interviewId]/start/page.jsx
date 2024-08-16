"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import LoadingSpinner from "@/components/ui/LoadingSpinner"; // Import a loading spinner component
import ErrorComponent from "@/components/ui/ErrorComponent"; // Import a reusable error component

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    setIsLoading(true);
    setError(null); // Reset error state before fetching
    try {
      const response = await fetch(
        `/api/mock-interviews/${params.interviewId}`,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`, // Implement this function to get the token
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch interview details");
      const data = await response.json();
      setInterviewData(data);
      if (data.jsonMockResp) {
        setMockInterviewQuestion(JSON.parse(data.jsonMockResp));
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
      setError(
        <ErrorComponent
          message="Failed to load interview details. Please try again."
          onRetry={GetInterviewDetails} // Retry fetching data on error
        />
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Simplified usage without unnecessary memoization
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="font-bold text-3xl text-gray-800 mb-6">
        Let's Get Started
      </h1>
      {isLoading ? (
        <LoadingSpinner /> // Show loading spinner while data is being fetched
      ) : error ? (
        error // Show error component if there's an error
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <QuestionsSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
          />
          <RecordAnswerSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            interviewData={interviewData}
          />
        </div>
      )}
      {!isLoading && !error && (
        <div className="mt-8 flex justify-end gap-4">
          {activeQuestionIndex > 0 && (
            <Button
              variant="outline"
              onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
            >
              Previous Question
            </Button>
          )}
          {activeQuestionIndex !== mockInterviewQuestion.length - 1 && (
            <Button
              onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
            >
              Next Question
            </Button>
          )}
          {activeQuestionIndex === mockInterviewQuestion.length - 1 && (
            <Link
              href={`/dashboard/interview/${interviewData?.mockId}/feedback`}
            >
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                End Interview
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default StartInterview;
