const questionAnswerPrompts = (role, experience, topicToFocus, numberOfQuestions) => `
You are an expert interviewer. Generate ${numberOfQuestions} interview questions for a ${role} with ${experience} years of experience, focusing on ${topicToFocus}.

Requirements:
1. Mix technical and behavioral questions.
2. For each question, provide a detailed, beginner-friendly answer.
3. Output MUST be a valid JSON array of objects.
4. Each object must have "question" and "answer" keys.

Structure example:
[
  { "question": "Explain React hooks.", "answer": "Hooks are and functions that let you..." }
]

Important: Return ONLY the JSON array. Do not include any introductory or concluding text.
`;

const conceptExplainPrompt = (question) => `
You are a technical mentor. Explain the following interview question in depth for a beginner: "${question}"

Requirements:
1. Provide a thorough but simple explanation.
2. Include a short, descriptive title for the concept.
3. Include code examples if relevant.
4. Output MUST be a valid JSON object.

Structure:
{
  "title": "Understanding React Hooks",
  "explanation": "..."
}

Important: Return ONLY the JSON object. Do not include any introductory or concluding text.
`;

module.exports = { questionAnswerPrompts, conceptExplainPrompt };
