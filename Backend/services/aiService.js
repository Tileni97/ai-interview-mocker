import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

function validateInput(input) {
  if (typeof input !== 'string' || input.trim() === '') {
    throw new Error('Invalid input: must be a non-empty string');
  }
}

function safeJSONParse(text) {
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    throw new Error("Failed to parse AI response");
  }
}

async function retryOperation(operation, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      console.warn(`Attempt ${i + 1} failed: ${error.message}`);
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
    }
  }
}

async function generateMockInterview(jobPosition, jobDescription, yearsOfExperience) {
  validateInput(jobPosition);
  validateInput(jobDescription);
  validateInput(yearsOfExperience);

  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            { text: `Job Position: ${jobPosition}, Job Description: ${jobDescription}, Years of Experience: ${yearsOfExperience}. Depending on this information, please give me 5 Interview questions with answers in JSON Format. Give questions and answers as fields in JSON.\n` },
          ],
        },
      ],
    });

    const result = await retryOperation(() => chatSession.sendMessage("Generate interview questions"));
    const responseText = await result.response.text(); // Ensure response is read as text
    return safeJSONParse(responseText);
  } catch (error) {
    console.error("Error generating mock interview:", error);
    throw new Error("Failed to generate mock interview questions");
  }
}

async function analyzeUserAnswer(question, correctAnswer, userAnswer) {
  validateInput(question);
  validateInput(correctAnswer);
  validateInput(userAnswer);

  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            { text: `Analyze this user answer for the question: "${question}". Correct answer: "${correctAnswer}". User answer: "${userAnswer}". Provide feedback and rate the answer out of 10 in JSON format with fields 'feedback' and 'rating'.\n` },
          ],
        },
      ],
    });

    const result = await retryOperation(() => chatSession.sendMessage("Analyze user answer"));
    const responseText = await result.response.text(); // Ensure response is read as text
    return safeJSONParse(responseText);
  } catch (error) {
    console.error("Error analyzing user answer:", error);
    throw new Error("Failed to analyze user answer");
  }
}

export { generateMockInterview, analyzeUserAnswer };
