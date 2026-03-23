import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();
/**
 * POST /api/plan/generate
 * Body: { syllabus: string, examDate: string, hoursPerDay: number }
 * Returns: { plan: Day[] }
 *
 * Day = { day: number, date: string, topics: Topic[] }
 * Topic = { id: string, name: string, done: false }
 */
router.post("/generate", async (req, res) => {
  const { syllabus, examDate, hoursPerDay } = req.body;

  if (!syllabus || !examDate || !hoursPerDay) {
    return res.status(400).json({ error: "syllabus, examDate and hoursPerDay are required." });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const today = new Date().toISOString().split("T")[0];
  const daysUntilExam = Math.max(
    1,
    Math.ceil((new Date(examDate) - new Date()) / (1000 * 60 * 60 * 24))
  );

  const prompt = `You are an expert academic planner. Create a personalized day-by-day study plan.

INPUTS:
- Today's date: ${today}
- Exam date: ${examDate} (${daysUntilExam} days away)
- Available study hours per day: ${hoursPerDay}
- Syllabus / topics to cover:
${syllabus}

RULES:
1. Spread topics across the available days (max 14 days in the plan).
2. Assign 1-3 topics per day based on complexity and available hours.
3. Keep the last 1-2 days for revision (label them "Revision: <topic>").
4. Each topic name must be concise (under 8 words).
5. Respond ONLY with a valid JSON array. No explanation, no markdown, no backticks.

RESPONSE FORMAT (strict JSON array):
[
  {
    "day": 1,
    "date": "Mon, 10 Jun 2025",
    "topics": [
      { "id": "1-0", "name": "Introduction to Arrays", "done": false },
      { "id": "1-1", "name": "Array Operations & Complexity", "done": false }
    ]
  }
]`;

  try {
    const result = await model.generateContent(prompt);
    const raw = result.response.text() || "[]";

    // Strip any accidental markdown fences
    const cleaned = raw.replace(/```json|```/gi, "").trim();
    const plan = JSON.parse(cleaned);

    res.json({ plan });
  } catch (err) {
    console.error("Plan generation error:", err.message || "An unexpected error occurred.");
    res.status(500).json({ error: "Failed to generate plan. Please try again." });
  }
});

export default router;
