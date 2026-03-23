import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, CheckCircle2, AlertCircle, Calendar, Zap, Activity, BrainCircuit, ArrowRight } from 'lucide-react';

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// ── Shared UI Architecture ───────────────────────────────────────

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
          <div className="w-[1.5px] h-[1.5px] bg-white rounded-full shadow-[0_0_8px_white]" />
          <div className="w-[1.5px] h-[70px] bg-gradient-to-b from-white/60 to-transparent opacity-40 blur-[0.5px]" />
        </span>
      ))}
    </div>
  );
};

const StaticStars = () => {
  const [stars] = useState(() => 
    Array.from({ length: 50 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: 0.1 + Math.random() * 0.4
    }))
  );

  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute w-[1px] h-[1px] bg-white/60"
          style={{ top: s.top, left: s.left, opacity: s.opacity }}
        />
      ))}
    </div>
  );
};

const Background = () => (
  <div className="fixed inset-0 -z-10 bg-[#000000] overflow-hidden pointer-events-none">
    <StaticStars />
    <div className="absolute w-[800px] h-[800px] bg-white/[0.03] blur-[150px] -top-[300px] -left-[300px]" />
    <div className="absolute w-[800px] h-[800px] bg-white/[0.03] blur-[150px] -bottom-[300px] -right-[300px]" />
    <ShootingStars />
  </div>
);

const GlassCard = ({ children, className = '', hover = true, onClick }) => (
  <motion.div
    onClick={onClick}
    whileHover={hover ? { transform: 'translateY(-2px)', borderColor: 'rgba(255,255,255,0.15)' } : {}}
    className={`glass-panel p-6 md:p-8 ${className} ${onClick ? 'cursor-pointer' : ''}`}
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05),transparent_70%)] pointer-events-none" />
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    <div className="relative z-10">{children}</div>
  </motion.div>
);

const PremiumButton = ({ children, onClick, disabled, loading, variant = 'primary', className = '' }) => {
  const isPrimary = variant === 'primary';
  const btnClass = isPrimary 
    ? 'bg-white text-black font-semibold shadow-[0_4px_15px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_25px_rgba(255,255,255,0.2)] hover:bg-zinc-100' 
    : 'border border-white/10 text-white hover:bg-white/[0.03]';

  return (
    <motion.button
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled || loading}
      className={`flex items-center justify-center rounded-xl px-6 py-3.5 text-sm transition-all duration-300 disabled:opacity-30 ${btnClass} ${className}`}
    >
        {loading ? (
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className={`w-5 h-5 border-2 rounded-full ${isPrimary ? 'border-black/20 border-t-black' : 'border-white/20 border-t-white'}`} />
        ) : children}
    </motion.button>
  );
};

const ProgressBar = ({ value, label }) => (
  <div className="w-full">
    {label && <div className="flex justify-between text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-500 mb-2"><span>{label}</span><span>{Math.round(value)}%</span></div>}
    <div className="w-full h-[6px] bg-white/[0.05] rounded-full overflow-hidden">
      <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 1 }} className="h-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.3)]" />
    </div>
  </div>
);

// ── Application Header ──────────────────────────────────────────

const Header = ({ tab, setTab, hasPlan, onReset }) => (
  <motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/80 backdrop-blur-2xl">
    <div className="max-w-6xl mx-auto flex items-center justify-between h-20 px-6">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center"><BrainCircuit className="w-5 h-5 text-black" strokeWidth={2.5}/></div>
          <span className="font-bold tracking-[-0.03em] text-lg">FLOW.AI</span>
        </div>
        {hasPlan && (
          <nav className="hidden md:flex bg-white/[0.03] p-1 rounded-xl border border-white/[0.04]">
            {['Plan', 'Progress', 'Quiz'].map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`relative px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all ${tab === t ? 'text-black' : 'text-zinc-500 hover:text-zinc-300'}`}>
                {tab === t && <motion.div layoutId="tab" className="absolute inset-0 bg-white rounded-lg shadow-lg" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                <span className="relative z-10">{t}</span>
              </button>
            ))}
          </nav>
        )}
      </div>
      {hasPlan && <button onClick={onReset} className="text-[10px] font-bold text-zinc-500 hover:text-white uppercase tracking-[0.2em] transition-colors">Reset Session</button>}
    </div>
  </motion.header>
);

// ── Application Pages ──────────────────────────────────────────

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

  return (
    <div className="max-w-xl mx-auto pt-20 pb-32 px-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tighter mb-4 italic">The Future of Study.</h2>
        <p className="text-zinc-500 font-medium">Inject your curriculum vectors. Synthetic planning calibrated for pure execution.</p>
      </motion.div>

      <GlassCard className="relative">
        <AnimatePresence>
          {error && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mb-6">
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-xs font-bold flex items-center gap-3"><AlertCircle className="w-4 h-4"/>{error}</div>
            </motion.div>
          )}
        </AnimatePresence>

        <div onClick={() => fileRef.current.click()} className="group border border-dashed border-white/10 hover:border-white/30 rounded-2xl p-10 text-center cursor-pointer transition-all bg-white/[0.01] mb-8">
          <UploadCloud className="w-8 h-8 mx-auto text-zinc-600 group-hover:text-white mb-4 transition-colors" />
          <div className="text-sm font-bold text-white mb-1">Upload Vectors</div>
          <div className="text-[11px] text-zinc-600 font-bold uppercase tracking-widest">Plaintext Analysis System</div>
          <input ref={fileRef} type="file" accept=".txt" className="hidden" onChange={handleFile} />
        </div>

        <div className="space-y-6 mb-8">
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">Subject Context</label>
            <textarea placeholder="Paste syllabus content or learning objectives..." value={syllabus} onChange={(e)=>setSyllabus(e.target.value)} className="neumorphic-input w-full h-28 p-4 text-sm leading-relaxed" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">Terminal Date</label>
              <input type="date" min={minStr} value={examDate} onChange={(e)=>setExamDate(e.target.value)} className="neumorphic-input w-full p-4 text-xs [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
            </div>
            <div>
              <label className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2"><span>Daily Load</span><span className="text-white">{hours}H</span></label>
              <input type="range" min={1} max={12} value={hours} onChange={(e)=>setHours(Number(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none accent-white cursor-pointer" />
            </div>
          </div>
        </div>

        <PremiumButton onClick={async () => {
          setError("");
          if(!syllabus.trim() || !examDate) return setError("Data fields incomplete.");
          try { await onGenerate(syllabus, examDate, hours); } catch(e) { setError(e.message); }
        }} loading={loading} className="w-full">Initialize Matrix</PremiumButton>
      </GlassCard>
    </div>
  );
};

const PlanTab = ({ plan, onToggle }) => {
  const all = plan.flatMap(d => d.topics);
  const done = all.filter(t => t.done).length;
  const pct = all.length ? Math.round((done/all.length)*100) : 0;

  return (
    <div className="max-w-2xl mx-auto pt-12 pb-32 px-6">
      <div className="mb-12"><ProgressBar label="Neural Synchronization" value={pct} /></div>
      <div className="space-y-6">
        {plan.map((day, ix) => (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ix * 0.1 }} key={day.day}>
            <GlassCard className="p-0 overflow-hidden" hover={false}>
              <div className={`px-6 py-4 bg-white/[0.02] border-b border-white/[0.05] flex justify-between items-center text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] italic`}>
                <span>Phase {day.day} // {day.date}</span>
                <span className={`${day.topics.every(t=>t.done) ? 'text-white' : ''}`}>{day.topics.filter(t=>t.done).length}/{day.topics.length} Nodes</span>
              </div>
              <div className="p-4 space-y-1">
                {day.topics.map((t) => (
                  <div key={t.id} onClick={() => onToggle(day.day, t.id)} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/[0.02] transition-colors cursor-pointer group">
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center border transition-all ${t.done ? 'bg-white border-white' : 'border-zinc-700 bg-transparent group-hover:border-zinc-500'}`}>
                      {t.done && <CheckCircle2 className="w-4 h-4 text-black" strokeWidth={3}/>}
                    </div>
                    <span className={`text-sm font-medium transition-all ${t.done ? 'text-zinc-600 line-through' : 'text-zinc-200'}`}>{t.name}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ProgressTab = ({ plan }) => {
  const all = plan.flatMap(d => d.topics);
  const done = all.filter(t => t.done).length;
  const pct = all.length ? Math.round((done/all.length)*100) : 0;

  return (
    <div className="max-w-4xl mx-auto pt-12 pb-32 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[
          { l: 'Structure', v: all.length, i: <BrainCircuit className="w-4 h-4"/> },
          { l: 'Assimilated', v: done, i: <CheckCircle2 className="w-4 h-4"/> },
          { l: 'Remaining', v: all.length - done, i: <Zap className="w-4 h-4"/> }
        ].map((s, idx) => (
          <GlassCard key={idx} className="flex flex-col gap-4">
            <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500 uppercase tracking-widest"><span>{s.l}</span>{s.i}</div>
            <div className="text-4xl font-bold tracking-tighter italic">{s.v}</div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="flex flex-col md:flex-row items-center gap-12 p-12">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="96" cy="96" r="80" stroke="rgba(255,255,255,0.05)" strokeWidth="4" fill="none" />
            <motion.circle cx="96" cy="96" r="80" stroke="white" strokeWidth="6" strokeLinecap="round" fill="none"
              initial={{ strokeDasharray: 502, strokeDashoffset: 502 }}
              animate={{ strokeDashoffset: 502 * (1 - pct/100) }}
              transition={{ duration: 1.5 }}
            />
          </svg>
          <div className="absolute text-4xl font-bold tracking-tighter italic">{pct}%</div>
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold tracking-tight mb-3 italic">Synthetic Integrity: {pct === 100 ? 'Absolute' : 'Synchronizing'}</h3>
          <p className="text-zinc-500 text-sm leading-relaxed mb-6">Execution is proceeding through the established curriculum vectors. Current integrity is validated at {pct}% assimilated data.</p>
          <div className="flex flex-wrap gap-2">
            {all.filter(t=>t.done).slice(-3).map(t => (
              <span key={t.id} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 bg-white text-black border border-white">Assimilated: {t.name}</span>
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

const QuizTab = ({ plan }) => {
  const doneTopic = plan.flatMap(d => d.topics).filter(t => t.done).map(t => t.name);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const startQuiz = async () => {
    setLoading(true); setError("");
      try {
        const r = await fetch(`${API}/quiz/generate`, {
          method: 'POST', headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ topics: doneTopic })
        });
      if(!r.ok) throw new Error("Synchronization Refused.");
      const d = await r.json();
      setQuiz(d.quiz); setIdx(0); setSelected(null); setScore(0); setDone(false);
    } catch(e) { setError(e.message); } finally { setLoading(false); }
  };

  if(!doneTopic.length) return (
    <div className="max-w-xl mx-auto pt-20 px-6"><GlassCard className="text-center py-20"><BrainCircuit className="w-10 h-10 mx-auto text-zinc-700 mb-6"/><div className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-2">Insufficient Data Roots</div><p className="text-xs text-zinc-600">Assimilate topics in the Plan module to begin diagnostics.</p></GlassCard></div>
  );

  if(!quiz && !loading) return (
    <div className="max-w-xl mx-auto pt-20 px-6"><GlassCard className="text-center py-20"><Zap className="w-10 h-10 mx-auto text-white mb-6"/><h2 className="text-2xl font-bold tracking-tight italic mb-8">Execute Diagnostic Routine</h2>{error && <div className="text-red-400 mb-6 text-xs font-bold">{error}</div>}<PremiumButton onClick={startQuiz} variant="secondary" className="mx-auto block">Launch Validation</PremiumButton></GlassCard></div>
  );

  if(loading) return <div className="py-40 text-center"><motion.div animate={{rotate:360}} transition={{repeat:Infinity, duration:1}} className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full mx-auto mb-6"/><div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest animate-pulse">Synthesizing Diagnostics...</div></div>;

  if(done) return (
    <div className="max-w-xl mx-auto pt-20 px-6"><GlassCard className="text-center py-20"><div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Diagnostic Results</div><div className="text-8xl font-bold tracking-tighter italic mb-4">{score}<span className="text-4xl text-zinc-800">/{quiz.length}</span></div><p className="text-zinc-500 text-sm mb-10 italic">Integrity Validation: {Math.round(score/quiz.length*100)}% Assimilation Accuracy</p><PremiumButton onClick={startQuiz} className="mx-auto block">Re-Validate Integrity</PremiumButton></GlassCard></div>
  );

  const q = quiz[idx];
  return (
    <div className="max-w-2xl mx-auto pt-16 pb-32 px-6">
      <div className="flex justify-between items-end mb-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500"><span>Sequence {idx+1}/{quiz.length}</span><span>Score: {score}</span></div>
      <ProgressBar value={(idx/quiz.length)*100} />
      <h2 className="text-2xl font-bold tracking-tight italic mt-12 mb-10 leading-snug">{q.q}</h2>
      <div className="space-y-3">
        {q.options.map((opt, i) => {
          const isSel = selected === i;
          const isCorr = i === q.answer;
          let cls = "bg-white/[0.02] border-white/[0.08] hover:border-white/20";
          if(selected !== null) {
            if(isCorr) cls = "bg-white text-black border-white font-bold";
            else if(isSel) cls = "bg-red-500/10 border-red-500/50 text-red-100 opacity-60";
            else cls = "opacity-20 border-white/5";
          }
          return <button key={i} onClick={() => selected === null && (setSelected(i), setScore(s => s + (i === q.answer ? 1 : 0)))} className={`w-full text-left p-5 rounded-2xl border transition-all ${cls}`}><span className="text-[14px] font-medium leading-relaxed">{opt}</span></button>;
        })}
      </div>
      <AnimatePresence>{selected !== null && (<motion.div initial={{opacity:0, y:10}} animate={{opacity:1,y:0}} className="mt-8 flex justify-end"><PremiumButton onClick={() => idx+1 >= quiz.length ? setDone(true) : (setIdx(i=>i+1), setSelected(null))} className="flex items-center gap-2"><span>Proceed</span><ArrowRight className="w-4 h-4"/></PremiumButton></motion.div>)}</AnimatePresence>
    </div>
  );
};

// ── Root Entry ──────────────────────────────────────────────────

export default function App() {
  const [p, setP] = useState(null);
  const [l, setL] = useState(false);
  const [t, setT] = useState("Plan");

  const handleGen = async (syllabus, examDate, hoursPerDay) => {
    setL(true);
    try {
      const r = await fetch(`${API}/plan/generate`, {
        method: "POST", headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ syllabus, examDate, hoursPerDay })
      });
      if(!r.ok) { setL(false); const e = await r.json(); throw new Error(e.error || "Neural Fault."); }
      const d = await r.json(); setP(d.plan); setL(false); setT("Plan");
    } catch(e) { setL(false); throw e; }
  };

  return (
    <>
      <Background />
      <Header tab={t} setTab={setT} hasPlan={!!p} onReset={()=>{setP(null);setT("Plan")}} />
      <AnimatePresence mode="wait">
        <motion.main key={t || 'setup'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          {!p ? <SetupForm onGenerate={handleGen} loading={l} /> : (
            <>
              {t === "Plan" && <PlanTab plan={p} onToggle={(dn, tid) => setP(old => old.map(d => d.day === dn ? {...d, topics: d.topics.map(ti => ti.id === tid ? {...ti, done: !ti.done} : ti)} : d))} />}
              {t === "Progress" && <ProgressTab plan={p} />}
              {t === "Quiz" && <QuizTab plan={p} />}
            </>
          )}
        </motion.main>
      </AnimatePresence>
    </>
  );
}
