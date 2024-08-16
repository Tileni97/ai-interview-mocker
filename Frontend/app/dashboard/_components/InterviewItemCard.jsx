import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

function InterviewItemCard({ interview }) {
  const router = useRouter();

  const onStart = () => {
    router.push(`/dashboard/interview/${interview?.mockId}`);
  };

  const onFeedbackPress = () => {
    router.push(`/dashboard/interview/${interview.mockId}/feedback`);
  };

  if (!interview) {
    return (
      <div className="border shadow-sm rounded-lg p-3">
        No interview data available
      </div>
    );
  }

  return (
    <div className="border shadow-sm rounded-lg p-4">
      <h2 className="font-bold text-primary text-lg">
        {interview.jobPosition}
      </h2>
      <p className="text-sm text-gray-600">
        {interview.jobExperience} Years of Experience
      </p>
      <p className="text-xs text-gray-400">
        Created At: {new Date(interview.createdAt).toLocaleDateString()}
      </p>
      <div className="flex justify-between mt-4 gap-4">
        <Button
          size="sm"
          variant="outline"
          className="w-full"
          onClick={onFeedbackPress}
        >
          View Feedback
        </Button>
        <Button size="sm" className="w-full" onClick={onStart}>
          Start Interview
        </Button>
      </div>
    </div>
  );
}

export default React.memo(InterviewItemCard); // Optimize performance with React.memo
