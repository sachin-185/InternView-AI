const path = require("path");
// Always load backend/.env even if `node server.js` is run from the repo root
require("dotenv").config({ path: path.join(__dirname, ".env") });
console.log("Environment loaded. HUGGINGFACE_TOKEN present:", !!process.env.HUGGINGFACE_TOKEN);
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const sessionRoutes = require("./routes/sessionRoutes");
const questionRoutes = require("./routes/questionRoutes");
connectDB();
const authRoutes = require("./routes/authRoutes");
const { protect } = require("./middleware/authMiddleware");
const { generateInterviewQuestions, generateContentExplanation } = require("./controllers/aiController");

const app = express();

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);
app.post("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.post("/api/ai/generate-explanation", protect, generateContentExplanation);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
