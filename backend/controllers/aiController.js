const {
  questionAnswerPrompts,
  conceptExplainPrompt,
} = require("../utils/prompts");
const { HfInference } = require("@huggingface/inference");

const HF_TOKEN = process.env.HUGGINGFACE_TOKEN;
const hf = new HfInference(HF_TOKEN);
const MODEL_ID = "Qwen/Qwen2.5-7B-Instruct";

/**
 * Helper to extract JSON from a potentially messy string
 */
const extractJSON = (text) => {
  try {
    // Try direct parse first
    return JSON.parse(text);
  } catch (e) {
    // Find the first '[' or '{' and the last ']' or '}'
    const startBracket = text.search(/[\[\{]/);

    // Find the last index of either ']' or '}'
    let endBracket = -1;
    const lastCloseBracket = text.lastIndexOf("]");
    const lastCloseBrace = text.lastIndexOf("}");
    endBracket = Math.max(lastCloseBracket, lastCloseBrace);

    if (startBracket !== -1 && endBracket !== -1 && endBracket > startBracket) {
      const potentialJson = text.slice(startBracket, endBracket + 1);
      try {
        return JSON.parse(potentialJson);
      } catch (innerError) {
        console.error("Failed to parse extracted JSON:", innerError);
        throw new Error("Invalid format returned from AI. Please try again.");
      }
    }
    throw new Error("No valid response found in AI output");
  }
};

const queryAI = async (prompt) => {
  if (!HF_TOKEN) {
    throw new Error(
      "Hugging Face Token is missing. Please add HUGGINGFACE_TOKEN to your .env file.",
    );
  }

  try {
    const response = await hf.chatCompletion({
      model: MODEL_ID,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("HF API Error:", error);
    if (
      error.message.includes("401") ||
      error.message.includes("Unauthorized")
    ) {
      throw new Error(
        "Invalid Hugging Face Token. Please check your .env file.",
      );
    }
    throw new Error(
      "AI Service is temporarily unavailable. Please try again later.",
    );
  }
};

const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;
    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const prompt = questionAnswerPrompts(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions,
    );
    const responseText = await queryAI(prompt);

    const data = extractJSON(responseText);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in generateInterviewQuestions:", error);
    res.status(500).json({
      message: "Server error during AI generation",
      error: error.message,
    });
  }
};

const generateContentExplanation = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }
    const prompt = conceptExplainPrompt(question);
    const responseText = await queryAI(prompt);

    const data = extractJSON(responseText);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in generateContentExplanation:", error);
    res.status(500).json({
      message: "Server error during AI generation",
      error: error.message,
    });
  }
};

module.exports = { generateInterviewQuestions, generateContentExplanation };
