import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./dashboard/_components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <span className="inline-flex items-center px-4 py-2 mb-8 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-full dark:bg-indigo-800 dark:text-indigo-200 hover:bg-indigo-200 dark:hover:bg-indigo-700 transition">
              <svg
                className="mr-2 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              New Feature
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6">
              <span className="block text-gray-900 dark:text-white">
                Ace Your Next Interview
              </span>
              <span className="block text-indigo-600 dark:text-indigo-400">
                with AI-Powered Practice
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Elevate your interview performance with our intelligent AI assistant.
              Prepare, practice, and perfect your responses for your dream job.
            </p>
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition"
            >
              Start Practicing
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </div>

          <div className="mt-24 flex justify-center">
            <div className="max-w-md px-4 sm:px-0">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
                Prepare for Your Dream Job
              </h2>
              <p className="text-base text-gray-500 dark:text-gray-300">
                Our AI-powered interview practice platform helps you identify your
                strengths, improve your weaknesses, and ace your next interview.
                Get personalized feedback and practice with real-world scenarios
                to boost your confidence and land that job offer.
              </p>
            </div>
          </div>

          <div className="mt-24 flex justify-center">
            <div className="max-w-md px-4 sm:px-0">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
                Unlock Your Full Potential
              </h2>
              <p className="text-base text-gray-500 dark:text-gray-300">
                Our AI assistant provides tailored recommendations based on your
                unique strengths and weaknesses. Receive detailed insights to
                enhance your interview skills and stand out from the competition.
              </p>
            </div>
          </div>

          <div className="mt-24 flex justify-center">
            <div className="max-w-md px-4 sm:px-0">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
                Boost Your Confidence
              </h2>
              <p className="text-base text-gray-500 dark:text-gray-300">
                Practice with realistic interview scenarios and get instant
                feedback to improve your responses. Build your confidence and
                impress interviewers with your polished performance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}