import { GoogleGenerativeAI } from "@google/generative-ai";

// Make sure to use the correct environment variable format for Vite
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error(
    "Missing Gemini API key! Make sure VITE_GEMINI_API_KEY is set in your .env file"
  );
}

const genAI = new GoogleGenerativeAI(API_KEY);

export const getGeminiResponse = async (prompt) => {
  if (!API_KEY) {
    throw new Error("Gemini API key is not configured");
  }

  try {
    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate content with safety settings
    const generationConfig = {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    };

    // Generate the response
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    // Get the response
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Detailed Gemini API Error:", error);
    if (error.message.includes("API key")) {
      throw new Error("Invalid API key. Please check your configuration.");
    } else {
      throw new Error(`AI Service Error: ${error.message}`);
    }
  }
};
