import { useState, useRef } from "react";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const gradients = [
  "linear-gradient(135deg, #7c3aed, #ec4899)",
  "linear-gradient(135deg, #06b6d4, #7c3aed)",
  "linear-gradient(135deg, #fbbf24, #f97316)",
  "linear-gradient(135deg, #10b981, #06b6d4)",
  "linear-gradient(135deg, #ec4899, #fbbf24)",
];

const COLORS = {
  bg: "#0f0e17", card: "#1a1830", card2: "#221f38",
  purple: "#7c3aed", pink: "#ec4899", cyan: "#06b6d4",
  yellow: "#fbbf24", green: "#10b981", orange: "#f97316",
  text: "#fffffe", muted: "#a7a9be",
};

const style = document.createElement("style");
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:#0f0e17;}
  .sp-root{font-family:'DM Sans',sans-serif;background:#0f0e17;min-height:100vh;color:#fffffe;}
  .sp-title{font-family:'Syne',sans-serif;}
  .sp-card{background:#1a1830;border-radius:20px;border:1px solid rgba(124,58,237,0.2);}
  .sp-btn{font-family:'Syne',sans-serif;font-weight:700;cursor:pointer;border:none;border-radius:12px;padding:12px 28px;font-size:15px;transition:transform 0.15s,box-shadow 0.15s;}
  .sp-btn:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(124,58,237,0.4);}
  .sp-btn:active{transform:translateY(0);}
  .sp-btn:disabled{opacity:0.5;cursor:not-allowed;transform:none;}
  .sp-input{background:#221f38;border:1.5px solid rgba(124,58,237,0.3);border-radius:12px;color:#fffffe;font-family:'DM Sans',sans-serif;font-size:14px;padding:12px 16px;width:100%;outline:none;transition:border-color 0.2s;}
  .sp-input:focus{border-color:#7c3aed;}
  .sp-tag{display:inline-block;border-radius:8px;padding:4px 12px;font-size:13px;font-family:'Syne',sans-serif;font-weight:600;margin:3px;}
  .sp-day-card{border-radius:16px;padding:18px;margin-bottom:12px;border:1px solid rgba(255,255,255,0.08);background:#1a1830;transition:transform 0.2s,box-shadow 0.2s;}
  .sp-day-card:hover{transform:translateX(4px);box-shadow:-4px 0 20px rgba(124,58,237,0.3);}
  .sp-topic-row{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);cursor:pointer;transition:opacity 0.2s;}
  .sp-topic-row:last-child{border-bottom:none;}
  .sp-topic-row:hover{opacity:0.85;}
  .sp-checkbox{width:20px;height:20px;border-radius:6px;border:2px solid rgba(124,58,237,0.5);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all 0.2s;}
  .sp-checkbox.done{background:linear-gradient(135deg,#7c3aed,#ec4899);border-color:transparent;}
  .sp-tab{font-family:'Syne',sans-serif;font-weight:700;font-size:15px;padding:10px 24px;border-radius:10px;cursor:pointer;border:none;transition:all 0.2s;background:transparent;color:#a7a9be;}
  .sp-tab.active{background:linear-gradient(135deg,#7c3aed,#ec4899);color:white;}
  .sp-tab:hover:not(.active){color:white;background:rgba(124,58,237,0.15);}
  .sp-progress-bar{height:8px;border-radius:99px;background:#221f38;overflow:hidden;margin:8px 0;}
  .sp-progress-fill{height:100%;border-radius:99px;transition:width 0.5s ease;}
  .sp-quiz-opt{background:#221f38;border:2px solid rgba(124,58,237,0.2);border-radius:12px;padding:14px 18px;cursor:pointer;text-align:left;color:#fffffe;font-family:'DM Sans',sans-serif;font-size:14px;width:100%;transition:all 0.2s;margin-bottom:10px;}
  .sp-quiz-opt:hover{border-color:#7c3aed;background:rgba(124,58,237,0.1);}
  .sp-quiz-opt.correct{border-color:#10b981;background:rgba(16,185,129,0.15);}
  .sp-quiz-opt.wrong{border-color:#ef4444;background:rgba(239,68,68,0.15);}
  .sp-glow{box-shadow:0 0 40px rgba(124,58,237,0.15),0 0 80px rgba(236,72,153,0.08);}
  textarea.sp-input{resize:vertical;min-height:100px;}
  .sp-upload-zone{border:2px dashed rgba(124,58,237,0.4);border-radius:16px;padding:32px;text-align:center;cursor:pointer;transition:all 0.2s;background:rgba(124,58,237,0.04);}
  .sp-upload-zone:hover{border-color:#7c3aed;background:rgba(124,58,237,0.08);}
  .sp-orb{position:fixed;border-radius:50%;pointer-events:none;z-index:0;filter:blur(80px);opacity:0.18;}
  @keyframes pulse{0%,100%{opacity:0.18}50%{opacity:0.28}}
  .sp-orb{animation:pulse 6s ease-in-out infinite;}
  @keyframes fadeIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  .sp-fadein{animation:fadeIn 0.4s ease both;}
  @keyframes spin{to{transform:rotate(360deg)}}
  .sp-spin{animation:spin 1s linear infinite;display:inline-block;width:18px;height:18px;border:2px solid white;border-top-color:transparent;border-radius:50%;}
  .sp-error{background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);border-radius:12px;padding:14px 18px;color:#fca5a5;font-size:14px;margin-bottom:16px;}
`;
document.head.appendChild(style);

// ── Helpers ──────────────────────────────────────────────
function Spinner() {
  return <span className="sp-spin" />;
}

function Orbs() {
  return (
    <>
      <div className="sp-orb" style={{ width: 400, height: 400, background: "#7c3aed", top: -100, left: -100 }} />
      <div className="sp-orb" style={{ width: 300, height: 300, background: "#ec4899", bottom: 50, right: -80, animationDelay: "2s" }} />
      <div className="sp-orb" style={{ width: 250, height: 250, background: "#06b6d4", top: "40%", right: "20%", animationDelay: "4s" }} />
    </>
  );
}

// ── Header ───────────────────────────────────────────────
function Header({ tab, setTab, hasPlan, onReset }) {
  return (
    <div style={{ position: "relative", zIndex: 1, padding: "32px 32px 0" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div>
            <div className="sp-title" style={{ fontSize: 32, fontWeight: 800, background: "linear-gradient(135deg,#7c3aed,#ec4899,#fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              StudyFlow AI
            </div>
            <div style={{ color: COLORS.muted, fontSize: 14, marginTop: 2 }}>Powered by Claude · Your AI study companion</div>
          </div>
          {hasPlan && (
            <button className="sp-btn" onClick={onReset}
              style={{ background: "rgba(124,58,237,0.15)", color: COLORS.purple, fontSize: 13, padding: "8px 16px", border: "1px solid rgba(124,58,237,0.3)" }}>
              ← New Plan
            </button>
          )}
        </div>
        {hasPlan && (
          <div style={{ display: "flex", gap: 6, background: "#1a1830", borderRadius: 14, padding: 6, border: "1px solid rgba(124,58,237,0.2)" }}>
            {["Plan", "Progress", "Quiz"].map((t) => (
              <button key={t} className={`sp-tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>{t}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Setup Form ───────────────────────────────────────────
function SetupForm({ onGenerate, loading }) {
  const [syllabus, setSyllabus] = useState("");
  const [examDate, setExamDate] = useState("");
  const [hours, setHours] = useState(4);
  const [error, setError] = useState("");
  const fileRef = useRef();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setSyllabus(ev.target.result);
    reader.readAsText(file);
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minStr = minDate.toISOString().split("T")[0];

  const handleSubmit = async () => {
    setError("");
    if (!syllabus.trim()) { setError("Please enter or upload your syllabus topics."); return; }
    if (!examDate) { setError("Please select your exam date."); return; }
    try {
      await onGenerate(syllabus, examDate, hours);
    } catch (e) {
      setError(e.message || "Something went wrong. Check your backend is running.");
    }
  };

  return (
    <div className="sp-fadein" style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "40px auto", padding: "0 24px 60px" }}>
      <div className="sp-card sp-glow" style={{ padding: 36 }}>
        <div className="sp-title" style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>✨ Create Your Study Plan</div>
        <div style={{ color: COLORS.muted, fontSize: 14, marginBottom: 28 }}>
          Claude AI will analyze your syllabus and build a smart day-by-day plan tailored to your schedule.
        </div>

        {error && <div className="sp-error">⚠️ {error}</div>}

        <div className="sp-upload-zone" onClick={() => fileRef.current.click()} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>📄</div>
          <div className="sp-title" style={{ fontWeight: 700, marginBottom: 4 }}>Upload Syllabus (.txt)</div>
          <div style={{ color: COLORS.muted, fontSize: 13 }}>Click to upload a text file</div>
          <input ref={fileRef} type="file" accept=".txt" style={{ display: "none" }} onChange={handleFile} />
        </div>

        <div style={{ textAlign: "center", color: COLORS.muted, fontSize: 13, margin: "12px 0" }}>— or type below —</div>

        <label style={{ display: "block", marginBottom: 6, fontSize: 13, color: COLORS.muted, fontWeight: 500 }}>
          Syllabus Topics
        </label>
        <textarea
          className="sp-input"
          placeholder="e.g. Arrays, Linked Lists, Binary Trees, Sorting Algorithms, Dynamic Programming..."
          value={syllabus}
          onChange={(e) => setSyllabus(e.target.value)}
          style={{ marginBottom: 20 }}
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
          <div>
            <label style={{ display: "block", marginBottom: 6, fontSize: 13, color: COLORS.muted, fontWeight: 500 }}>📅 Exam Date</label>
            <input type="date" className="sp-input" min={minStr} value={examDate} onChange={(e) => setExamDate(e.target.value)} />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: 6, fontSize: 13, color: COLORS.muted, fontWeight: 500 }}>
              ⏰ Study Hours/Day: <span style={{ color: COLORS.yellow, fontWeight: 700 }}>{hours}h</span>
            </label>
            <input type="range" min={1} max={10} value={hours} onChange={(e) => setHours(Number(e.target.value))}
              style={{ width: "100%", marginTop: 12, accentColor: "#7c3aed" }} />
          </div>
        </div>

        <button className="sp-btn" disabled={loading}
          style={{ width: "100%", background: "linear-gradient(135deg,#7c3aed,#ec4899)", color: "white", fontSize: 16, padding: 15 }}
          onClick={handleSubmit}>
          {loading
            ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><Spinner /> Claude is building your plan...</span>
            : "🚀 Generate My Study Plan"}
        </button>
      </div>
    </div>
  );
}

// ── Plan Tab ─────────────────────────────────────────────
function PlanTab({ plan, onToggle }) {
  const all = plan.flatMap((d) => d.topics);
  const done = all.filter((t) => t.done).length;
  const pct = all.length ? Math.round((done / all.length) * 100) : 0;

  return (
    <div className="sp-fadein" style={{ maxWidth: 760, margin: "0 auto", padding: "24px 24px 60px" }}>
      <div className="sp-card" style={{ padding: 24, marginBottom: 24, display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
        <div style={{ flex: 1 }}>
          <div className="sp-title" style={{ fontWeight: 700, marginBottom: 6 }}>Overall Progress</div>
          <div className="sp-progress-bar">
            <div className="sp-progress-fill" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#7c3aed,#ec4899,#fbbf24)" }} />
          </div>
          <div style={{ color: COLORS.muted, fontSize: 13, marginTop: 4 }}>{done} of {all.length} topics completed</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div className="sp-title" style={{ fontSize: 40, fontWeight: 800, background: "linear-gradient(135deg,#7c3aed,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {pct}%
          </div>
          <div style={{ color: COLORS.muted, fontSize: 13 }}>Complete</div>
        </div>
      </div>

      {plan.map((day, idx) => {
        const dayDone = day.topics.filter((t) => t.done).length;
        const dayPct = Math.round((dayDone / day.topics.length) * 100);
        return (
          <div key={day.day} className="sp-day-card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: gradients[idx % gradients.length], display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="sp-title" style={{ fontWeight: 800, color: "white", fontSize: 16 }}>D{day.day}</span>
                </div>
                <div>
                  <div className="sp-title" style={{ fontWeight: 700, fontSize: 15 }}>Day {day.day}</div>
                  <div style={{ color: COLORS.muted, fontSize: 12 }}>{day.date}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 80 }}>
                  <div className="sp-progress-bar" style={{ height: 6 }}>
                    <div className="sp-progress-fill" style={{ width: `${dayPct}%`, background: gradients[idx % gradients.length] }} />
                  </div>
                </div>
                <span style={{ fontSize: 12, color: COLORS.muted }}>{dayPct}%</span>
              </div>
            </div>
            {day.topics.map((topic) => (
              <div key={topic.id} className="sp-topic-row" onClick={() => onToggle(day.day, topic.id)}>
                <div className={`sp-checkbox ${topic.done ? "done" : ""}`}>
                  {topic.done && <span style={{ color: "white", fontSize: 12 }}>✓</span>}
                </div>
                <span style={{ fontSize: 14, textDecoration: topic.done ? "line-through" : "none", color: topic.done ? COLORS.muted : COLORS.text, flex: 1 }}>
                  {topic.name}
                </span>
                {topic.done && <span style={{ fontSize: 11, color: COLORS.green, fontWeight: 600 }}>Done!</span>}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

// ── Progress Tab ─────────────────────────────────────────
function ProgressTab({ plan }) {
  const all = plan.flatMap((d) => d.topics.map((t) => ({ ...t, day: d.day })));
  const done = all.filter((t) => t.done);
  const pending = all.filter((t) => !t.done);
  const pct = all.length ? Math.round((done.length / all.length) * 100) : 0;

  return (
    <div className="sp-fadein" style={{ maxWidth: 760, margin: "0 auto", padding: "24px 24px 60px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Topics", value: all.length, color: COLORS.purple, icon: "📚" },
          { label: "Completed", value: done.length, color: COLORS.green, icon: "✅" },
          { label: "Remaining", value: pending.length, color: COLORS.orange, icon: "⏳" },
        ].map((s) => (
          <div key={s.label} className="sp-card" style={{ padding: 20, textAlign: "center" }}>
            <div style={{ fontSize: 28 }}>{s.icon}</div>
            <div className="sp-title" style={{ fontSize: 32, fontWeight: 800, color: s.color, margin: "4px 0" }}>{s.value}</div>
            <div style={{ color: COLORS.muted, fontSize: 13 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="sp-card" style={{ padding: 28, marginBottom: 24, textAlign: "center" }}>
        <div className="sp-title" style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Study Completion</div>
        <div style={{ position: "relative", display: "inline-block", width: 140, height: 140 }}>
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r="60" fill="none" stroke="#221f38" strokeWidth="12" />
            <circle cx="70" cy="70" r="60" fill="none" stroke="url(#pg)" strokeWidth="12"
              strokeDasharray={`${2 * Math.PI * 60}`}
              strokeDashoffset={`${2 * Math.PI * 60 * (1 - pct / 100)}`}
              strokeLinecap="round" transform="rotate(-90 70 70)"
              style={{ transition: "stroke-dashoffset 0.6s ease" }}
            />
            <defs>
              <linearGradient id="pg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7c3aed" /><stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
            <div className="sp-title" style={{ fontSize: 28, fontWeight: 800 }}>{pct}%</div>
            <div style={{ fontSize: 11, color: COLORS.muted }}>done</div>
          </div>
        </div>
      </div>

      {done.length > 0 && (
        <div className="sp-card" style={{ padding: 24 }}>
          <div className="sp-title" style={{ fontWeight: 700, marginBottom: 12, color: COLORS.green }}>✅ Completed Topics</div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {done.map((t) => (
              <span key={t.id} className="sp-tag" style={{ background: "rgba(16,185,129,0.15)", color: COLORS.green, border: "1px solid rgba(16,185,129,0.3)" }}>
                {t.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Quiz Tab ─────────────────────────────────────────────
function QuizTab({ plan }) {
  const doneTopic = plan.flatMap((d) => d.topics).filter((t) => t.done).map((t) => t.name);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const loadQuiz = async () => {
    if (doneTopic.length === 0) return;
    setLoading(true); setError("");
    try {
      const res = await fetch(`${API}/quiz/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topics: doneTopic }),
      });
      if (!res.ok) throw new Error("Quiz generation failed");
      const data = await res.json();
      setQuiz(data.quiz);
      setQIdx(0); setSelected(null); setScore(0); setFinished(false);
    } catch (e) {
      setError("Failed to generate quiz. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  if (doneTopic.length === 0) {
    return (
      <div className="sp-fadein" style={{ maxWidth: 500, margin: "60px auto", padding: "0 24px", textAlign: "center" }}>
        <div className="sp-card" style={{ padding: 40 }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🎯</div>
          <div className="sp-title" style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>No Topics Completed Yet</div>
          <div style={{ color: COLORS.muted, fontSize: 14 }}>Go to the Plan tab, study a topic, and mark it as done to unlock quiz questions.</div>
        </div>
      </div>
    );
  }

  if (!quiz && !loading) {
    return (
      <div className="sp-fadein" style={{ maxWidth: 500, margin: "60px auto", padding: "0 24px", textAlign: "center" }}>
        <div className="sp-card sp-glow" style={{ padding: 40 }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🧠</div>
          <div className="sp-title" style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Ready to Test Yourself?</div>
          <div style={{ color: COLORS.muted, fontSize: 14, marginBottom: 24 }}>
            Claude will generate {Math.min(doneTopic.length, 5)} quiz questions based on your {doneTopic.length} completed topic{doneTopic.length > 1 ? "s" : ""}.
          </div>
          {error && <div className="sp-error" style={{ marginBottom: 16 }}>⚠️ {error}</div>}
          <button className="sp-btn" style={{ background: "linear-gradient(135deg,#7c3aed,#ec4899)", color: "white", width: "100%" }} onClick={loadQuiz}>
            🚀 Generate Quiz with Claude
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px 24px", color: COLORS.muted }}>
        <div className="sp-spin" style={{ margin: "0 auto 20px", width: 32, height: 32, borderWidth: 3, borderColor: "#7c3aed", borderTopColor: "transparent" }} />
        <div className="sp-title" style={{ fontSize: 16 }}>Claude is generating your quiz...</div>
      </div>
    );
  }

  if (finished) {
    const pct = Math.round((score / quiz.length) * 100);
    return (
      <div className="sp-fadein" style={{ maxWidth: 520, margin: "40px auto", padding: "0 24px" }}>
        <div className="sp-card sp-glow" style={{ padding: 40, textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 12 }}>{pct >= 80 ? "🎉" : pct >= 50 ? "👍" : "💪"}</div>
          <div className="sp-title" style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Quiz Complete!</div>
          <div className="sp-title" style={{ fontSize: 52, fontWeight: 800, background: "linear-gradient(135deg,#7c3aed,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {score}/{quiz.length}
          </div>
          <div style={{ color: COLORS.muted, marginBottom: 28 }}>{pct}% accuracy · {pct >= 80 ? "Excellent!" : pct >= 50 ? "Good job!" : "Keep studying!"}</div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="sp-btn" style={{ background: "linear-gradient(135deg,#7c3aed,#ec4899)", color: "white" }} onClick={loadQuiz}>
              New Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = quiz[qIdx];
  const handleAnswer = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.answer) setScore((s) => s + 1);
  };
  const next = () => {
    if (qIdx + 1 >= quiz.length) { setFinished(true); return; }
    setQIdx((i) => i + 1); setSelected(null);
  };

  return (
    <div className="sp-fadein" style={{ maxWidth: 600, margin: "40px auto", padding: "0 24px 60px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <span style={{ color: COLORS.muted, fontSize: 14 }}>Question {qIdx + 1} of {quiz.length}</span>
        <span className="sp-tag" style={{ background: "rgba(124,58,237,0.2)", color: COLORS.purple }}>Score: {score}</span>
      </div>
      <div className="sp-progress-bar" style={{ marginBottom: 24 }}>
        <div className="sp-progress-fill" style={{ width: `${(qIdx / quiz.length) * 100}%`, background: "linear-gradient(90deg,#7c3aed,#ec4899)" }} />
      </div>
      <div className="sp-card" style={{ padding: 28, marginBottom: 20 }}>
        <div className="sp-title" style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.5 }}>{q.q}</div>
      </div>
      {q.options.map((opt, i) => (
        <button key={i} className={`sp-quiz-opt ${selected !== null ? (i === q.answer ? "correct" : selected === i ? "wrong" : "") : ""}`}
          onClick={() => handleAnswer(i)}>
          <span style={{ fontWeight: 600, marginRight: 10, color: COLORS.purple }}>{String.fromCharCode(65 + i)}.</span>
          {opt}
        </button>
      ))}
      {selected !== null && (
        <button className="sp-btn" style={{ width: "100%", marginTop: 8, background: "linear-gradient(135deg,#7c3aed,#ec4899)", color: "white" }} onClick={next}>
          {qIdx + 1 >= quiz.length ? "See Results 🎉" : "Next Question →"}
        </button>
      )}
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────
export default function App() {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("Plan");

  const handleGenerate = async (syllabus, examDate, hours) => {
    setLoading(true);
    const res = await fetch(`${API}/plan/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ syllabus, examDate, hoursPerDay: hours }),
    });
    if (!res.ok) {
      setLoading(false);
      const err = await res.json();
      throw new Error(err.error || "Plan generation failed");
    }
    const data = await res.json();
    setPlan(data.plan);
    setLoading(false);
    setTab("Plan");
  };

  const handleToggle = (dayNum, topicId) => {
    setPlan((prev) =>
      prev.map((d) =>
        d.day === dayNum
          ? { ...d, topics: d.topics.map((t) => t.id === topicId ? { ...t, done: !t.done } : t) }
          : d
      )
    );
  };

  return (
    <div className="sp-root">
      <Orbs />
      <Header tab={tab} setTab={setTab} hasPlan={!!plan} onReset={() => { setPlan(null); setTab("Plan"); }} />
      {!plan
        ? <SetupForm onGenerate={handleGenerate} loading={loading} />
        : <>
            {tab === "Plan" && <PlanTab plan={plan} onToggle={handleToggle} />}
            {tab === "Progress" && <ProgressTab plan={plan} />}
            {tab === "Quiz" && <QuizTab plan={plan} />}
          </>
      }
    </div>
  );
}
