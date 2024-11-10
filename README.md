# AI Mock Interview App

This is a full-stack AI-powered mock interview application, created using **Next.js**, **React**, **Drizzle ORM**, **OpenAI**, and **Clerk**. The application provides an interactive mock interview experience that simulates real interview scenarios, helping users practice and improve their interview skills.

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Future Enhancements](#future-enhancements)


## Features

- **Role-Based Interviews**: Choose from various roles and technologies (e.g., Junior Dev, React) to get tailored interview questions.
- **Real-Time Feedback**: Get instant feedback powered by AI to improve your answers.
- **Webcam and Microphone Support**: Practice real interview scenarios with webcam and microphone access.
- **User Authentication**: Secure authentication using Clerk, ensuring a personalized experience.
- **AI-Powered Responses**: Utilizes OpenAI to generate questions and feedback dynamically, making each interview unique.
- **Progress Tracking**: Track your progress, view past interviews, and identify areas for improvement.

## Screenshots
<img src="https://github.com/Tileni97/ai-interview-mocker/blob/Images/Screenshot%202024-11-10%20235458.png" alt="CryptoTracker Screenshot 2" width="700"/>
<img src="https://github.com/Tileni97/ai-interview-mocker/blob/Images/Screenshot%202024-11-10%20235650.png" alt="CryptoTracker Screenshot 2" width="700"/>
<img src="https://github.com/Tileni97/ai-interview-mocker/blob/Images/Screenshot%202024-11-10%20235717.png" alt="CryptoTracker Screenshot 2" width="700"/>
<img src="https://github.com/Tileni97/ai-interview-mocker/blob/Images/Screenshot%202024-11-11%20002152.png" alt="CryptoTracker Screenshot 2" width="700"/>


## Technologies Used

- **Next.js** - For server-side rendering and routing.
- **React** - UI components and interactive features.
- **Drizzle ORM** - Database ORM for seamless data management.
- **OpenAI** - Generates interview questions and feedback.
- **Clerk** - Provides authentication for users.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ai-mock-interview-app.git
   cd ai-mock-interview-app
2. Install dependencies:
   npm install
4. Set up environment variables:
   NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
   NEXT_PUBLIC_CLERK_API_KEY=your_clerk_api_key
   DATABASE_URL=your_database_url
5. Set up environment variables:
   npm run dev
The app will be available at http://localhost:3000.

Usage
Sign up / Login: Create an account or log in using Clerk authentication.
Choose Job Role and Tech Stack: Select the position and tech stack for the interview.
Enable Webcam and Microphone: Enable devices for an interactive interview experience.
Start Interview: Begin your mock interview and receive AI-generated questions.
Receive Feedback: Review AI-generated feedback to improve your responses.

Folder Structure
├── components       # Reusable React components
├── pages            # Next.js pages and API routes
├── public           # Static assets like images and logos
├── styles           # Global and component-specific styles
├── utils            # Helper functions and configurations
└── README.md        # Project documentation

Future Enhancements
Question Customization: Allow users to customize difficulty levels or types of questions.
Answer Analysis: Provide more detailed AI feedback on answers.
Interview Scheduling: Integrate scheduling features to set reminders or book sessions with mentors.
Community Feedback: Allow users to get feedback from a community of interviewers.

