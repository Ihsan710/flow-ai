import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();
/**
 * POST /api/quiz/generate
 * Body: { topics: string[] }
 * Returns: { quiz: Question[] }
 *
 * Question = { q: string, options: string[4], answer: number (0-3) }
 */
router.post("/generate", async (req, res) => {
  const { topics } = req.body;

  if (!topics || !Array.isArray(topics) || topics.length === 0) {
    return res.status(400).json({ error: "topics array is required." });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const topicList = topics.slice(0, 8).join(", ");

  const prompt = `You are a knowledgeable teacher creating a quiz to test understanding.

Generate exactly ${Math.min(topics.length, 5)} multiple-choice questions based on these topics:
${topicList}

RULES:
1. Each question must test conceptual understanding (not trivia).
2. Each question has exactly 4 options.
3. Only one option is correct.
4. The correct answer index (0-3) must vary — don't always put the answer at index 0.
5. Keep questions clear and concise.
6. Respond ONLY with a valid JSON array. No explanation, no markdown, no backticks.

RESPONSE FORMAT (strict JSON array):
[
  {
    "q": "What is the time complexity of binary search?",
    "options": ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    "answer": 1
  }
]`;

  try {
    const result = await model.generateContent(prompt);
    const raw = result.response.text() || "[]";
    const cleaned = raw.replace(/```json|```/gi, "").trim();
    const quiz = JSON.parse(cleaned);

    res.json({ quiz });
  } catch (err) {
    console.error("Quiz generation error:", err);
    res.status(500).json({ error: "Failed to generate quiz. Please try again." });
  }
});

export default router;
