import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./dashboard/_components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Link href="#" className="inline-flex items-center px-4 py-2 mb-8 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-full dark:bg-indigo-800 dark:text-indigo-200 hover:bg-indigo-200 dark:hover:bg-indigo-700 transition">
              <span className="mr-2">New</span>
              <span>Tubeguruji.com All new Apps</span>
              <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
            </Link>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6">
              <span className="block text-gray-900 dark:text-white">AI Mock Interview</span>
              <span className="block text-indigo-600 dark:text-indigo-400">Taker</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Double your chances of landing that job offer with our AI-powered interview prep. Practice, refine, and excel in your next interview.
            </p>
          </div>

          <div className="mt-10 flex justify-center">
            <Link href="/dashboard" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition">
              Get Started
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </Link>
            <Link href="https://youtu.be/Q5LM985yUmQ" className="ml-4 inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 transition">
              Watch video
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
            </Link>
          </div>

          <div className="mt-20">
            <h2 className="text-center text-gray-400 text-sm font-semibold uppercase tracking-wide">Featured in</h2>
            <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
              {/* Replace these divs with actual logos */}
              <div className="flex justify-center col-span-1 md:col-span-2 lg:col-span-1">
                <img className="h-12" src="/path-to-logo1.svg" alt="Company 1" />
              </div>
              <div className="flex justify-center col-span-1 md:col-span-2 lg:col-span-1">
                <img className="h-12" src="/path-to-logo2.svg" alt="Company 2" />
              </div>
              {/* Add more logo placeholders as needed */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}