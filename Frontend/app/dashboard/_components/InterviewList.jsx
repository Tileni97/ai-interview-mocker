"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";
import { getToken } from "@/lib/auth";
import Spinner from "@/components/ui/spinner"; // Ensure this path is correct

function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      GetInterviewList();
    }
  }, [user]);

  const GetInterviewList = async () => {
    try {
      const token = await getToken();
      const response = await fetch("/api/mock-interviews", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch interview list");

      const data = await response.json();
      setInterviewList(data);
    } catch (error) {
      console.error("Error fetching interview list:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {loading ? (
          <Spinner /> // Use the Spinner component during loading
        ) : interviewList.length > 0 ? (
          interviewList.map((interview, index) => (
            <InterviewItemCard interview={interview} key={index} />
          ))
        ) : (
          <p>No previous interviews found.</p>
        )}
      </div>
    </div>
  );
}

export default InterviewList;
