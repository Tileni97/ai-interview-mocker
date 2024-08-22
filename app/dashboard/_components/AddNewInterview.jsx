"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDailog, setOpenDailog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const router = useRouter();
  const { user } = useUser();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const InputPrompt =
      `
      Job position: ${jobPosition},
      Job Description: ${jobDesc},
      Years of Experience: ${jobExperience}
    ` +
      `, Based on the job position, job description, and years of experience, provide ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions along with answers in JSON format with 'question' and 'answer' fields.`;

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const MockJsonResp = await result.response.text();

      // Clean up and parse the JSON response from the AI
      let cleanedJsonResp = MockJsonResp.replace(/^[\s\S]*?(\[|\{)/, "$1")
        .replace(/(\]|\})[^\]\}]*$/, "$1")
        .trim();

      let parsedJson;
      try {
        parsedJson = JSON.parse(cleanedJsonResp);
      } catch (jsonError) {
        console.error("JSON parsing error:", jsonError);
        console.log("Problematic JSON string:", cleanedJsonResp);
        throw new Error("Failed to parse JSON response from AI");
      }

      setJsonResponse(parsedJson);

      if (parsedJson) {
        const mockId = uuidv4();
        const resp = await db
          .insert(MockInterview)
          .values({
            mockId: mockId,
            jsonMockResp: JSON.stringify(parsedJson),
            jobPosition: jobPosition,
            jobDesc: jobDesc,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
          })
          .returning({ mockId: MockInterview.mockId });

        console.log("Inserted ID:", resp);
        if (resp && resp[0]?.mockId) {
          setOpenDailog(false);
          router.push("/dashboard/interview/" + resp[0].mockId);
        } else {
          console.error("Failed to get mockId from database response");
        }
      } else {
        console.log("ERROR: Parsed JSON is null or undefined");
      }
    } catch (error) {
      console.error("Error processing response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary
        hover:scale-105 hover:shadow-md cursor-pointer
         transition-all border-dashed"
        onClick={() => setOpenDailog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDailog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interviewing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add details about your job position/role, job description,
                    and years of experience
                  </h2>

                  <div className="mt-7 my-3">
                    <label>Job Role/Job Position</label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                      value={jobPosition}
                    />
                  </div>
                  <div className="my-3">
                    <label>Job Description/ Tech Stack (In Short)</label>
                    <Textarea
                      placeholder="Ex. React, Angular, NodeJs, MySql etc"
                      required
                      onChange={(event) => setJobDesc(event.target.value)}
                      value={jobDesc}
                    />
                  </div>
                  <div className="my-3">
                    <label>Years of experience</label>
                    <Input
                      placeholder="Ex. 5"
                      type="number"
                      max="100"
                      required
                      onChange={(event) => setJobExperience(event.target.value)}
                      value={jobExperience}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDailog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" /> Generating
                        from AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
