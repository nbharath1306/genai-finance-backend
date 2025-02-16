// index.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Get your Gemini API key from the .env file
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// POST endpoint to handle chat messages
app.post("/chat", async (req, res) => {
  const userMessage = req.body.text;

  if (!userMessage) {
    return res.status(400).json({ reply: "Error: No message received!" });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText?key=${GEMINI_API_KEY}`,
      {
        prompt: `You are a financial assistant. Answer this user's finance-related question professionally: ${userMessage}`,
      }
    );

    const aiReply = response.data.candidates[0].output;
    res.json({ reply: aiReply });
  } catch (error) {
    console.error("AI API Error:", error.response ? error.response.data : error);
    res.status(500).json({ reply: "Sorry, I couldn't fetch AI response." });
  }
});

// Start the backend server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Backend running on port ${PORT}`));



