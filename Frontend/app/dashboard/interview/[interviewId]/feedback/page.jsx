"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";
import { toast } from "sonner"; // Assuming you're using sonner for notifications
import { Spinner } from "@/components/ui/spinner"; // Importing Spinner for loading state

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const getFeedback = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getToken();
      const response = await fetch(`/api/user-answers/${params.interviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        if (response.status >= 500) {
          throw new Error("Server error. Please try again later.");
        } else {
          throw new Error("Failed to fetch feedback. Please try again.");
        }
      }
      const data = await response.json();
      setFeedbackList(data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [params.interviewId]);

  useEffect(() => {
    getFeedback();
  }, [getFeedback]);

  if (loading) {
    return (
      <div className="p-10 flex justify-center items-center">
        <Spinner className="h-8 w-8" />{" "}
        {/* Spinner for better loading experience */}
        <span className="ml-2">Loading feedback...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10">
        <p className="text-red-500">{error}</p>
        <Button onClick={getFeedback} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  const overallRating =
    feedbackList.reduce((sum, item) => sum + item.rating, 0) /
    feedbackList.length;

  return (
    <div className="p-10">
      {feedbackList.length === 0 ? (
        <h2 className="font-bold text-xl text-gray-500">
          No Interview Feedback Record Found
        </h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">
            Congratulations!
          </h2>
          <h2 className="font-bold text-2xl">
            Here is your interview feedback
          </h2>
          <h2 className="text-primary text-lg my-3">
            Your overall interview rating:{" "}
            <strong>{overallRating.toFixed(1)}/10</strong>
          </h2>
          <h2 className="text-sm text-gray-500">
            Find below interview questions with correct answers, your answers,
            and feedback for improvement
          </h2>
          {feedbackList.map((item, index) => (
            <Collapsible key={index} className="mt-7">
              <CollapsibleTrigger
                className="p-2 bg-secondary rounded-lg flex justify-between my-2 text-left gap-7 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
                aria-expanded="false"
              >
                <span>{item.question}</span>
                <ChevronsUpDown className="h-5 w-5" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2">
                  <h2 className="text-red-500 p-2 border rounded-lg">
                    <strong>Rating: </strong>
                    {item.rating}/10
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                    <strong>Your Answer: </strong>
                    {item.userAns}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                    <strong>Correct Answer: </strong>
                    {item.correctAns}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary">
                    <strong>Feedback: </strong>
                    {item.feedback}
                  </h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>
      )}
      <Button onClick={() => router.replace("/dashboard")} className="mt-6">
        Go Home
      </Button>
    </div>
  );
}

export default React.memo(Feedback); // Optimizing performance with React.memo
