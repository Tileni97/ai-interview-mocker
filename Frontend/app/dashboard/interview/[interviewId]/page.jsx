"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Lightbulb, Camera, CameraOff } from "lucide-react";
import Link from "next/link";
import Webcam from "react-webcam";
import LoadingSpinner from "@/components/ui/LoadingSpinner"; // Import a loading spinner component
import ErrorComponent from "@/components/ui/ErrorComponent"; // Import a reusable error component

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);
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
          <div className="space-y-6">
            <InterviewInfo data={interviewData} />
            <InfoBox />
          </div>
          <WebcamSection
            webCamEnabled={webCamEnabled}
            setWebCamEnabled={setWebCamEnabled}
          />
        </div>
      )}
      {!isLoading && !error && (
        <div className="mt-8 flex justify-end">
          <Link href={`/dashboard/interview/${params.interviewId}/start`}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Start Interview
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

function InterviewInfo({ data }) {
  if (!data) return <div>Loading...</div>;
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <InfoItem label="Job Role/Position" value={data.jobPosition} />
      <InfoItem label="Job Description/Tech Stack" value={data.jobDesc} />
      <InfoItem label="Years of Experience" value={data.jobExperience} />
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <span className="font-semibold text-gray-700">{label}:</span>
      <span className="ml-2 text-gray-600">{value}</span>
    </div>
  );
}

function InfoBox() {
  return (
    <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-50">
      <h2 className="flex gap-2 items-center text-yellow-700 font-semibold mb-3">
        <Lightbulb size={20} />
        Information
      </h2>
      <p className="text-yellow-800">
        {process.env.NEXT_PUBLIC_INFORMATION ||
          "Important information will be displayed here."}
      </p>
    </div>
  );
}

function WebcamSection({ webCamEnabled, setWebCamEnabled }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
      {webCamEnabled ? (
        <Webcam
          audio={false}
          mirrored={true}
          style={{ width: "100%", maxWidth: "400px", height: "auto" }}
        />
      ) : (
        <div className="w-full max-w-[400px] h-[300px] bg-gray-200 rounded-lg flex items-center justify-center">
          <CameraOff size={48} className="text-gray-400" />
        </div>
      )}
      <Button
        variant="outline"
        className="mt-4"
        onClick={() => setWebCamEnabled(!webCamEnabled)}
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
    </div>
  );
}

export default Interview;
