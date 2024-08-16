"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle, Camera, CameraOff } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { getToken } from "@/lib/auth";

// Custom hook for managing webcam state
const useWebcamToggle = () => {
  const [webCamEnabled, setWebCamEnabled] = useState(true);
  const toggleWebCam = () => setWebCamEnabled((prevState) => !prevState);

  return { webCamEnabled, toggleWebCam };
};

// Custom hook for updating user answers
const useUpdateUserAnswer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateAnswer = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/user-answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to record user answer");
      const responseData = await response.json();
      toast.success("User Answer recorded successfully");
      return responseData;
    } catch (error) {
      console.error("Error recording user answer:", error);
      setError(
        "An error occurred while recording your answer. Please try again."
      );
      toast.error("Failed to record user answer");
    } finally {
      setLoading(false);
    }
  };

  return { updateAnswer, loading, error };
};

function RecordAnswerSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const { webCamEnabled, toggleWebCam } = useWebcamToggle();
  const { user } = useUser();

  const {
    error: speechToTextError,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: false,
    useLegacyResults: false,
  });

  const { updateAnswer, loading, error: updateError } = useUpdateUserAnswer();

  useEffect(() => {
    results?.forEach((result) =>
      setUserAnswer((prevAns) => prevAns + result?.transcript)
    );
  }, [results]);

  const updateUserAnswer = useCallback(async () => {
    if (userAnswer?.length > 10) {
      await updateAnswer({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
      });
      if (!updateError) {
        setUserAnswer("");
        setResults([]);
      }
    }
  }, [
    userAnswer,
    interviewData,
    mockInterviewQuestion,
    activeQuestionIndex,
    updateAnswer,
    updateError,
    setResults,
  ]);

  useEffect(() => {
    if (!isRecording && userAnswer?.length > 10) {
      updateUserAnswer();
    }
  }, [isRecording, userAnswer, updateUserAnswer]);

  const startStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        {webCamEnabled ? (
          <Webcam
            audio={false}
            mirrored={true}
            style={{ width: "100%", height: "auto" }}
          />
        ) : (
          <div className="w-full h-[300px] bg-gray-200 rounded-lg flex items-center justify-center">
            <CameraOff size={48} className="text-gray-400" />
          </div>
        )}
      </div>
      <div className="flex justify-between mb-4">
        <Button
          variant="outline"
          onClick={toggleWebCam}
          aria-label={webCamEnabled ? "Disable Camera" : "Enable Camera"}
        >
          {webCamEnabled ? (
            <>
              <CameraOff size={16} className="mr-2" />
              Disable Camera
            </>
          ) : (
            <>
              <Camera size={16} className="mr-2" />
              Enable Camera
            </>
          )}
        </Button>
        <Button
          disabled={loading}
          variant={isRecording ? "destructive" : "default"}
          onClick={startStopRecording}
          aria-label={isRecording ? "Stop Recording" : "Record Answer"}
        >
          {isRecording ? (
            <>
              <StopCircle size={16} className="mr-2" />
              Stop Recording
            </>
          ) : (
            <>
              <Mic size={16} className="mr-2" />
              Record Answer
            </>
          )}
        </Button>
      </div>
      {loading && (
        <p aria-live="polite" className="text-center text-gray-600">
          Processing your answer...
        </p>
      )}
      {(speechToTextError || updateError) && (
        <p aria-live="assertive" className="text-center text-red-600">
          Error: {speechToTextError || updateError}
        </p>
      )}
    </div>
  );
}

export default RecordAnswerSection;
