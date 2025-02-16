const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", (req, res) => {
  console.log("Received request:", req.body); // ✅ Debugging log

  if (!req.body.text) {
    return res.status(400).json({ reply: "Error: No message received!" });
  }

  const userMessage = req.body.text;
  res.json({ reply: `AI: You said "${userMessage}"` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
