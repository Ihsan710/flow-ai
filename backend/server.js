import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import planRouter from "./routes/plan.js";
import quizRouter from "./routes/quiz.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

app.use("/api/plan", planRouter);
app.use("/api/quiz", quizRouter);

app.get("/health", (_, res) => res.json({ status: "ok" }));

app.listen(PORT, () => console.log(`🚀 StudyFlow API running on http://localhost:${PORT}`));
