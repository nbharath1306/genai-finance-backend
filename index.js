const express = require("express");
const axios = require("axios");
require("dotenv").config();  // Ensure you're loading your environment variables from the .env file

const app = express();
app.use(express.json());

// Use your API key directly in the code (not recommended for production)
const GEMINI_API_KEY = "AIzaSyAXKMy8WSjQazIuv3g-chzEpzRK-CxB0m0"; // Your Gemini API key

app.post("/chat", async (req, res) => {
  const userMessage = req.body.text;

  if (!userMessage) {
    return res.status(400).json({ reply: "Error: No message received!" });
  }

  try {
    // Send a POST request to Gemini API
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText?key=${GEMINI_API_KEY}`,
      {
        prompt: `You are a financial assistant. Answer this user's finance-related question professionally: ${userMessage}`,
      }
    );

    // Extract the AI response from the Gemini API response
    const aiReply = response.data.candidates[0].output;

    // Send the AI response back to the client
    res.json({ reply: aiReply });
  } catch (error) {
    // Log the error details
    console.error("AI API Error:", error.response ? error.response.data : error.message);

    // Return the error message to the client
    res.status(500).json({
      reply: `Sorry, I couldn't fetch AI response. Error: ${error.response ? error.response.data : error.message}`,
    });
  }
});

// Start the backend server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Backend running on port ${PORT}`);
});




