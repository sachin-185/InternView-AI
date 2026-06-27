require('dotenv').config();
const { HfInference } = require('@huggingface/inference');

const HF_TOKEN = process.env.HUGGINGFACE_TOKEN;
const hf = new HfInference(HF_TOKEN);
const MODEL_ID = "HuggingFaceH4/zephyr-7b-beta";

const prompt = `<|system|>
You are an expert interviewer. Generate 3 interview questions for an AI Engineer. Return ONLY a JSON array.</s>
<|user|>
Generate the questions.</s>
<|assistant|>`;

async function test() {
    console.log("Testing HF TextGen with token:", HF_TOKEN ? "Present" : "Missing");
    try {
        const response = await hf.textGeneration({
            model: MODEL_ID,
            inputs: prompt,
            parameters: {
                max_new_tokens: 500,
                temperature: 0.7,
                return_full_text: false,
            }
        });
        console.log("SUCCESS!");
        console.log("Response:", response.generated_text);
    } catch (error) {
        console.error("FAILED!");
        console.error("Error Message:", error.message);
    }
}

test();
