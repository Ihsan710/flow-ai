import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, CheckCircle2, AlertCircle, Calendar, Zap, Activity, BrainCircuit } from 'lucide-react';

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// ── Ultra-Premium Vercel Monochrome Components ────────────────────────────────

const ShootingStars = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const top = Math.random() * 100;
      const left = Math.random() * 100;

      const newStar = {
        id: Math.random(),
        top,
        left,
        duration: 1 + Math.random() * 1.5,
      };

      setStars((prev) => [...prev.slice(-4), newStar]);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute pointer-events-none flex flex-col items-center"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            animation: `shoot ${star.duration}s linear forwards`,
          }}
        >
          {/* head */}
          <div className="w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_10px_white]" />
          {/* trail */}
          <div className="w-[2px] h-[80px] bg-gradient-to-b from-white/80 to-transparent opacity-50 blur-[1px]" />
        </span>
      ))}
    </div>
  );
};

const StaticStars = () => {
  const [stars] = useState(() => 
    Array.from({ length: 40 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }))
  );

  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map((pos, i) => (
        <div
          key={i}
          className="absolute w-[1px] h-[1px] bg-white/40"
          style={pos}
        />
      ))}
    </div>
  );
};

const BackgroundGlow = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#000000] overflow-hidden pointer-events-none">
      {/* 40 static background stars */}
      <StaticStars />
      
      {/* Ambient white glow (monochrome, no color) */}
      <div className="absolute w-[700px] h-[700px] bg-white/5 blur-[140px] top-[-200px] left-[-200px]" />
      <div className="absolute w-[600px] h-[600px] bg-white/5 blur-[140px] bottom-[-200px] right-[-200px]" />
      
      {/* Dynamic shooting stars layer */}
      <ShootingStars />
    </div>
  );
};

const GlassCard = ({ children, className = '', hover = true, onClick }) => {
  return (
    // Note: outer glass-panel styles are precisely defined in index.css
    <motion.div
      onClick={onClick}
      whileHover={hover ? { scale: 1.01, borderColor: "rgba(255,255,255,0.15)" } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`glass-panel p-6 md:p-8 transition duration-300 ${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Surface Gradient (secret sauce lit cards) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)] pointer-events-none" />
      
      {/* Top Reflection (luxury glass texture) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white/10 to-transparent opacity-20" />
      </div>

      <div className="relative z-10 w-full h-full">{children}</div>
    </motion.div>
  );
};

const PremiumButton = ({ children, onClick, disabled, loading, variant = 'primary', className = '' }) => {
  const isPrimary = variant === 'primary';
  // Precise user-provided primary button logic
  const btnClass = isPrimary 
    ? 'bg-white text-black font-medium rounded-xl px-6 py-3 transition shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:shadow-[0_6px_30px_rgba(255,255,255,0.25)] hover:bg-white/90' 
    : 'border border-white/[0.08] text-white hover:bg-white/[0.04] transition rounded-xl px-6 py-3';

  return (
    <motion.button
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled || loading}
      className={`relative flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed ${btnClass} ${className}`}
    >
      <div className="flex items-center gap-3">
        {loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className={`w-5 h-5 border-2 ${isPrimary ? 'border-black/30 border-t-black' : 'border-white/30 border-t-white'} rounded-full`}
          />
        ) : children}
      </div>
    </motion.button>
  );
};

const ProgressBar = ({ value }) => (
  <div className="w-full h-2 bg-white/[0.08] rounded-full overflow-hidden relative">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="h-full rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.3)] relative z-10"
    />
  </div>
);

const CircularProgress = ({ pct }) => (
  <div className="relative w-40 h-40 flex items-center justify-center">
    <svg className="w-full h-full transform -rotate-90">
      <circle cx="80" cy="80" r="70" stroke="rgba(255,255,255,0.08)" strokeWidth="4" fill="none" />
      <motion.circle
        cx="80" cy="80" r="70"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        initial={{ strokeDasharray: `${2 * Math.PI * 70}`, strokeDashoffset: `${2 * Math.PI * 70}` }}
        animate={{ strokeDashoffset: `${2 * Math.PI * 70 * (1 - pct / 100)}` }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
      <motion.span 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-4xl font-bold text-white tracking-tight"
      >
        {pct}%
      </motion.span>
    </div>
  </div>
);

// ── Application Sections ────────────────────────────────────────

const Header = ({ tab, setTab, hasPlan, onReset }) => {
  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 pt-8 pb-4 px-6 md:px-12 bg-[#050505]/80 backdrop-blur-3xl border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0a0a0a] rounded-xl flex items-center justify-center border border-white/[0.08]">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">FLOW.AI</h1>
            </div>
          </div>
          {hasPlan && (
            <button 
              onClick={onReset}
              className="text-xs text-[#a1a1aa] hover:text-white transition-colors uppercase tracking-widest font-medium"
            >
              Reset Matrix
            </button>
          )}
        </div>

        {hasPlan && (
          <div className="flex bg-[#0a0a0a] p-1 rounded-xl border border-white/[0.04]">
            {['Plan', 'Progress', 'Quiz'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative px-5 py-2 text-sm transition-colors ${tab === t ? 'text-black font-semibold' : 'text-[#a1a1aa] font-medium hover:text-white'}`}
              >
                {tab === t && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white rounded-lg shadow-[0_2px_10px_rgba(255,255,255,0.1)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{t}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.header>
  );
};

const SetupForm = ({ onGenerate, loading }) => {
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

  const minStr = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const handleSubmit = async () => {
    setError("");
    if (!syllabus.trim()) { setError("Provide your study topics to construct the matrix."); return; }
    if (!examDate) { setError("Target timeline synchronization failed. Select a date."); return; }
    try { await onGenerate(syllabus, examDate, hours); } 
    catch (e) { setError(e.message || "Failed to sync with Neural Engine."); }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto mt-16 px-6 pb-24"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-white mb-3">Initialize Protocol</h2>
        <p className="text-[#a1a1aa] text-lg max-w-lg mx-auto font-medium">Upload raw data vectors. The engine will synthesize a hyper-optimized trajectory calibrated for your execution.</p>
      </div>

      <GlassCard className="relative overflow-visible">
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <div className="bg-red-500/10 border border-red-500/20 text-white rounded-xl p-4 flex items-center gap-3 text-sm font-medium">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <p>{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div 
          onClick={() => fileRef.current.click()}
          className="border border-dashed border-white/10 hover:border-white/30 rounded-2xl p-8 text-center cursor-pointer transition-colors bg-[#050505] mb-8 group relative"
        >
          <UploadCloud className="w-8 h-8 mx-auto text-[#a1a1aa] group-hover:text-white transition-colors mb-4" />
          <h3 className="text-sm font-semibold text-white mb-2">Drop Syllabus Core (.txt)</h3>
          <p className="text-xs text-[#a1a1aa] font-medium">Click to browse system directories</p>
          <input ref={fileRef} type="file" accept=".txt" className="hidden" onChange={handleFile} />
        </div>

        <div className="space-y-6 mb-8 relative z-20">
          <div>
            <label className="block text-xs font-semibold text-[#a1a1aa] uppercase tracking-widest mb-2">Raw Topic Vectors</label>
            <textarea 
              placeholder="e.g. System Architecture, Memory Concepts, Execution Pipelines..." 
              value={syllabus} onChange={(e) => setSyllabus(e.target.value)} 
              className="neumorphic-input w-full h-32 px-4 py-3 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-[#a1a1aa] uppercase tracking-widest mb-2 flex items-center gap-2"><Calendar className="w-3.5 h-3.5"/> Deadlines</label>
              <input 
                type="date" min={minStr} 
                value={examDate} onChange={(e) => setExamDate(e.target.value)} 
                className="neumorphic-input w-full px-4 py-3 text-sm flex-1 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
              />
            </div>
            <div>
              <label className="flex justify-between items-end text-xs font-semibold text-[#a1a1aa] uppercase tracking-widest mb-2">
                <span className="flex items-center gap-2"><Zap className="w-3.5 h-3.5"/> Bandwidth</span>
                <span className="text-white text-sm">{hours}h / cycle</span>
              </label>
              <input 
                type="range" min={1} max={10} 
                value={hours} onChange={(e) => setHours(Number(e.target.value))} 
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
              />
            </div>
          </div>
        </div>

        <PremiumButton onClick={handleSubmit} loading={loading} className="w-full text-sm">
          Launch Simulation
        </PremiumButton>
      </GlassCard>
    </motion.div>
  );
};

const PlanTab = ({ plan, onToggle }) => {
  const all = plan.flatMap((d) => d.topics);
  const done = all.filter((t) => t.done).length;
  const pct = all.length ? Math.round((done / all.length) * 100) : 0;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto mt-12 px-6 pb-24 space-y-8">
      <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-6 mb-4">
        <div className="flex-1 w-full">
          <h2 className="text-xl font-bold text-white mb-2">System Synchronization</h2>
          <ProgressBar value={pct} />
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold tracking-tight text-white">{pct}%</div>
        </div>
      </div>

      <div className="space-y-4">
        {plan.map((day, idx) => {
          const dayDone = day.topics.filter((t) => t.done).length;
          const dayPct = Math.round((dayDone / day.topics.length) * 100);
          
          return (
            <motion.div 
              initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: idx * 0.05 }}
              key={day.day}
            >
              <GlassCard className="p-0 overflow-hidden" hover={false}>
                <div className="px-6 py-5 border-b border-white/[0.04] bg-[#111111] relative z-20">
                  <div className="flex items-center gap-4">
                    <div className="px-3 py-1.5 rounded-md bg-white text-black text-xs font-bold uppercase tracking-widest border border-white">Day {day.day}</div>
                    <p className="text-[#a1a1aa] text-sm font-semibold tracking-wide">{day.date}</p>
                  </div>
                  <div className="w-24">
                    <ProgressBar value={dayPct} />
                  </div>
                </div>

                <div className="p-2 relative z-20">
                  {day.topics.map((topic) => (
                    <motion.div 
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                      key={topic.id} 
                      onClick={() => onToggle(day.day, topic.id)}
                      className="flex items-start md:items-center gap-4 py-3 px-4 rounded-xl cursor-pointer transition-colors hover:border-white/10 border border-transparent"
                    >
                      <div className={`mt-0.5 md:mt-0 w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-all ${topic.done ? 'bg-white border-white text-black shadow-[0_0_10px_rgba(255,255,255,0.4)]' : 'border-[#a1a1aa] bg-transparent'}`}>
                        {topic.done && <CheckCircle2 className="w-4 h-4" strokeWidth={3} />}
                      </div>
                      <span className={`flex-1 text-sm md:text-base font-medium transition-colors ${topic.done ? 'text-zinc-600 line-through' : 'text-zinc-200'}`}>
                        {topic.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

const ProgressTab = ({ plan }) => {
  const all = plan.flatMap((d) => d.topics.map((t) => ({ ...t, day: d.day })));
  const done = all.filter((t) => t.done);
  const pending = all.filter((t) => !t.done);
  const pct = all.length ? Math.round((done.length / all.length) * 100) : 0;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto mt-12 px-6 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Total Assignments", value: all.length, icon: <Activity className="w-5 h-5 text-[#a1a1aa]" /> },
          { label: "Executed", value: done.length, icon: <CheckCircle2 className="w-5 h-5 text-white" /> },
          { label: "Pending", value: pending.length, icon: <Zap className="w-5 h-5 text-[#a1a1aa]" /> },
        ].map((s, i) => (
          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.05 }} key={s.label}>
            <GlassCard className="flex flex-col gap-3 p-6" hover={false}>
              <div className="flex items-center justify-between relative z-10">
                <div className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-widest">{s.label}</div>
                {s.icon}
              </div>
              <div className="text-4xl font-bold text-white tracking-tight relative z-10">{s.value}</div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <GlassCard className="flex flex-col md:flex-row items-center gap-12 p-10 md:p-14">
        <div className="shrink-0 relative z-20"><CircularProgress pct={pct} /></div>
        <div className="flex-1 relative z-20">
          <h2 className="text-xl font-bold text-white mb-2">Integrity Status</h2>
          <p className="text-sm text-[#a1a1aa] font-medium leading-relaxed mb-6">
            Neural assimilation is functioning at {pct}% capacity. Maintain execution velocity to achieve complete trajectory mapping.
          </p>
          <div className="flex flex-wrap gap-2 text-white">
            {done.slice(0, 5).map(t => (
              <span key={t.id} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#111111] border border-white/[0.08]">
                {t.name}
              </span>
            ))}
            {done.length > 5 && <span className="px-3 py-1.5 rounded-lg text-xs font-bold text-black bg-white">+{done.length - 5} verified</span>}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

const QuizTab = ({ plan }) => {
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
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topics: doneTopic }),
      });
      if (!res.ok) throw new Error("Connection Refused");
      const data = await res.json();
      setQuiz(data.quiz); setQIdx(0); setSelected(null); setScore(0); setFinished(false);
    } catch (e) { setError("Diagnostics failure. Engine offline."); } 
    finally { setLoading(false); }
  };

  if (doneTopic.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl mx-auto mt-16 px-6 pb-24 text-center">
        <GlassCard className="py-16">
          <div className="relative z-20 w-16 h-16 mx-auto bg-white/[0.05] border border-white/[0.08] rounded-full flex items-center justify-center mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </div>
          <h2 className="relative z-20 text-lg font-bold text-white mb-2">Insufficient Data</h2>
          <p className="relative z-20 text-sm text-[#a1a1aa] font-medium">Verify execution in the Plan module before initiating diagnostics.</p>
        </GlassCard>
      </motion.div>
    );
  }

  if (!quiz && !loading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl mx-auto mt-16 px-6 pb-24 text-center">
        <GlassCard className="py-16">
          <BrainCircuit className="relative z-20 w-12 h-12 text-[#a1a1aa] mx-auto mb-6" />
          <h2 className="relative z-20 text-xl font-bold text-white mb-3">Initiate Diagnostics</h2>
          <p className="relative z-20 text-sm text-[#a1a1aa] font-medium mb-8">Deploying evaluation routine based on {doneTopic.length} verified nodes.</p>
          
          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-6 overflow-hidden">
                <div className="relative z-20 text-red-400 border border-red-500/20 bg-red-500/10 p-4 rounded-xl text-sm font-semibold">{error}</div>
              </motion.div>
            )}
          </AnimatePresence>

          <PremiumButton onClick={loadQuiz} variant="secondary" className="w-full sm:w-auto mx-auto px-10 relative z-20">Start Assessment</PremiumButton>
        </GlassCard>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 relative z-20">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full mb-6" />
        <h2 className="text-sm font-semibold text-[#a1a1aa] uppercase tracking-widest animate-pulse">Compiling Verification...</h2>
      </div>
    );
  }

  if (finished) {
    const pct = Math.round((score / quiz.length) * 100);
    const isSuccess = pct >= 80;
    
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl mx-auto mt-16 px-6 pb-24 text-center">
        <GlassCard className="py-16 relative">
          <h3 className="text-xs font-semibold text-[#a1a1aa] tracking-widest uppercase mb-4 relative z-20">Diagnostics Complete</h3>
          <div className="text-7xl font-bold text-white tracking-tight mb-4 relative z-20">{score}<span className="text-3xl text-zinc-700">/{quiz.length}</span></div>
          <div className="text-lg font-medium text-[#a1a1aa] mb-10 relative z-20">
            {pct}% Efficiency — {isSuccess ? "Parameters Met" : "Recalibration Required"}
          </div>
          <PremiumButton onClick={loadQuiz} className="mx-auto block relative z-20" variant={isSuccess ? "primary" : "secondary"}>
            Run New Simulation
          </PremiumButton>
        </GlassCard>
      </motion.div>
    );
  }

  const q = quiz[qIdx];
  const handleAnswer = (i) => {
    if (selected !== null) return;
    setSelected(i);
    setScore((s) => s + (i === q.answer ? 1 : 0));
  };
  const next = () => {
    if (qIdx + 1 >= quiz.length) setFinished(true);
    else { setQIdx((i) => i + 1); setSelected(null); }
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto mt-12 px-6 pb-24 relative z-20">
      <div className="flex justify-between items-center mb-6">
        <div className="text-xs text-[#a1a1aa] font-semibold uppercase tracking-widest">
          Node {qIdx + 1} of {quiz.length}
        </div>
        <div className="text-sm font-semibold text-white">Score: {score}</div>
      </div>

      <ProgressBar value={(qIdx / quiz.length) * 100} />

      <h2 className="text-xl font-semibold text-white leading-relaxed mt-10 mb-8 shadow-sm">{q.q}</h2>

      <div className="space-y-3">
        {q.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = i === q.answer;
          let statusClass = "border-white/[0.04] bg-[#0a0a0a] hover:bg-white/[0.02]";
          if (selected !== null) {
            if (isCorrect) statusClass = "border-white bg-white text-black font-semibold shadow-[0_0_15px_rgba(255,255,255,0.2)]";
            else if (isSelected) statusClass = "border-white/[0.08] bg-[#111111] text-zinc-500 line-through";
            else statusClass = "border-white/[0.04] bg-transparent opacity-40";
          }

          return (
            <motion.button
              key={i}
              onClick={() => handleAnswer(i)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex gap-4 items-center ${statusClass}`}
            >
              <div className={`w-6 h-6 shrink-0 rounded-md flex items-center justify-center text-xs font-semibold ${selected !== null && isCorrect ? 'bg-black text-white' : selected !== null && isSelected ? 'bg-[#222222] text-[#a1a1aa]' : 'bg-white/10 text-[#a1a1aa]'}`}>
                {String.fromCharCode(65 + i)}
              </div>
              <span className="text-sm md:text-base font-medium">{opt}</span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 flex justify-end">
            <PremiumButton onClick={next} className="text-sm">
              {qIdx + 1 >= quiz.length ? "Finalize" : "Proceed"}
            </PremiumButton>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ── Root Application ─────────────────────────────────────────────
export default function App() {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("Plan");

  const handleGenerate = async (syllabus, examDate, hours) => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/plan/generate`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ syllabus, examDate, hoursPerDay: hours }),
      });
      if (!res.ok) { setLoading(false); const err = await res.json(); throw new Error(err.error || "Neural Link Failed"); }
      const data = await res.json();
      setPlan(data.plan); setLoading(false); setTab("Plan");
    } catch(err) {
      setLoading(false);
      throw err;
    }
  };

  const handleToggle = (dayNum, topicId) => {
    setPlan((prev) => prev.map((d) => d.day === dayNum ? { ...d, topics: d.topics.map((t) => t.id === topicId ? { ...t, done: !t.done } : t) } : d));
  };

  return (
    <>
      <BackgroundGlow />
      <Header tab={tab} setTab={setTab} hasPlan={!!plan} onReset={() => { setPlan(null); setTab("Plan"); }} />
      <AnimatePresence mode="wait">
        <motion.main key={tab || "setup"} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
          {!plan ? (
            <SetupForm onGenerate={handleGenerate} loading={loading} />
          ) : (
            <>
              {tab === "Plan" && <PlanTab plan={plan} onToggle={handleToggle} />}
              {tab === "Progress" && <ProgressTab plan={plan} />}
              {tab === "Quiz" && <QuizTab plan={plan} />}
            </>
          )}
        </motion.main>
      </AnimatePresence>
    </>
  );
}
