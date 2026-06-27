require("dotenv").config();
const { HfInference } = require("@huggingface/inference");

const HF_TOKEN = process.env.HUGGINGFACE_TOKEN;
const hf = new HfInference(HF_TOKEN);
const MODEL_ID = "Qwen/Qwen2.5-7B-Instruct";

const prompt = `Generate 3 interview questions for an AI Engineer. Return ONLY a JSON array.`;

async function test() {
  console.log("Testing HF Chat with token:", HF_TOKEN ? "Present" : "Missing");
  try {
    const response = await hf.chatCompletion({
      model: MODEL_ID,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
      temperature: 0.7,
    });
    console.log("SUCCESS!");
    console.log("Response:", JSON.stringify(response, null, 2));
  } catch (error) {
    console.error("FAILED!");
    console.error("Error Code:", error.status || error.code || "unknown");
    console.error("Error Message:", error.message);
    if (error.response) {
      console.error("Response Data:", await error.response.text());
    }
  }
}

test();
