const fs = require('fs');
let content = fs.readFileSync('frontend/src/App.jsx', 'utf8');

// Replace COLORS block
const newColors = `const COLORS = {
  bg: "#050505", card: "rgba(255, 255, 255, 0.03)", card2: "rgba(255, 255, 255, 0.05)",
  purple: "#8b5cf6", pink: "#f43f5e", cyan: "#06b6d4",
  yellow: "#f59e0b", green: "#10b981", orange: "#f97316",
  text: "#f8fafc", muted: "#94a3b8",
};`;
content = content.replace(/const COLORS = \{[\s\S]*?\};\n/, newColors + '\n');

// Replace style.textContent
const newStyleStr = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
  :root { --glass-bg: rgba(255, 255, 255, 0.03); --glass-border: rgba(255, 255, 255, 0.08); }
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:#050505;color:#f8fafc;font-family:'Plus Jakarta Sans',sans-serif;min-height:100vh;overflow-x:hidden;}
  .sp-root{min-height:100vh;position:relative;}
  .mesh-bg { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1; background: radial-gradient(circle at 15% 50%, rgba(6,182,212,0.12), transparent 30%), radial-gradient(circle at 85% 30%, rgba(139,92,246,0.12), transparent 30%); filter: blur(60px); pointer-events: none; }
  .sp-title{font-family:'Outfit',sans-serif;letter-spacing:-0.02em;}
  .sp-card { background: var(--glass-bg); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid var(--glass-border); border-radius: 24px; box-shadow: 0 8px 32px 0 rgba(0,0,0,0.3); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease; }
  .sp-card:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.4), 0 0 30px rgba(6,182,212,0.15); }
  .sp-btn { font-family: 'Outfit', sans-serif; font-weight: 600; cursor: pointer; border: none; border-radius: 14px; padding: 14px 32px; font-size: 15px; letter-spacing: 0.02em; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); position: relative; overflow: hidden; }
  .sp-btn::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); transition: left 0.5s ease; }
  .sp-btn:hover::before { left: 100%; }
  .sp-btn:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 10px 25px rgba(6,182,212,0.3); }
  .sp-btn:active { transform: translateY(0) scale(0.98); }
  .sp-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; pointer-events: none; }
  .sp-input { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; color: #f8fafc; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; padding: 14px 20px; width: 100%; outline: none; transition: all 0.3s ease; backdrop-filter: blur(10px); }
  .sp-input:focus { border-color: rgba(6,182,212,0.6); background: rgba(255,255,255,0.05); box-shadow: 0 0 0 4px rgba(6,182,212,0.1); }
  textarea.sp-input { resize: vertical; min-height: 120px; line-height: 1.6; }
  .sp-tag { display: inline-flex; align-items: center; border-radius: 10px; padding: 6px 14px; font-size: 13px; font-family: 'Outfit', sans-serif; font-weight: 600; margin: 4px; backdrop-filter: blur(4px); }
  .sp-tab { font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 15px; padding: 10px 24px; border-radius: 12px; cursor: pointer; border: none; transition: all 0.3s ease; background: transparent; color: #94a3b8; }
  .sp-tab.active { background: linear-gradient(135deg, #06b6d4, #3b82f6); color: white; box-shadow: 0 4px 15px rgba(6,182,212,0.3); }
  .sp-tab:hover:not(.active) { color: white; background: rgba(255,255,255,0.05); }
  .sp-progress-bar { height: 8px; border-radius: 99px; background: rgba(255,255,255,0.05); overflow: hidden; margin: 8px 0; box-shadow: inset 0 1px 3px rgba(0,0,0,0.2); }
  .sp-progress-fill { height: 100%; border-radius: 99px; transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 0 10px rgba(255,255,255,0.3); }
  .sp-day-card { border-radius: 20px; padding: 22px; margin-bottom: 16px; border: 1px solid rgba(255,255,255,0.05); background: rgba(255,255,255,0.02); transition: all 0.3s ease; backdrop-filter: blur(8px); }
  .sp-day-card:hover { transform: translateY(-4px); background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.1); box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
  .sp-topic-row { display: flex; align-items: center; gap: 14px; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.03); cursor: pointer; transition: all 0.2s; }
  .sp-topic-row:last-child { border-bottom: none; }
  .sp-topic-row:hover { transform: translateX(6px); color: #fff; }
  .sp-checkbox { width: 22px; height: 22px; border-radius: 6px; border: 2px solid rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
  .sp-checkbox.done { background: linear-gradient(135deg, #10b981, #059669); border-color: transparent; box-shadow: 0 0 10px rgba(16,185,129,0.4); transform: scale(1.1); }
  .sp-quiz-opt { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 16px 20px; cursor: pointer; text-align: left; color: #f8fafc; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; width: 100%; transition: all 0.3s ease; margin-bottom: 12px; backdrop-filter: blur(10px); }
  .sp-quiz-opt:hover { border-color: rgba(6,182,212,0.4); background: rgba(6,182,212,0.05); transform: translateY(-2px); }
  .sp-quiz-opt.correct { border-color: #10b981; background: rgba(16,185,129,0.1); box-shadow: 0 0 15px rgba(16,185,129,0.2); }
  .sp-quiz-opt.wrong { border-color: #ef4444; background: rgba(239,68,68,0.1); box-shadow: 0 0 15px rgba(239,68,68,0.2); }
  .sp-upload-zone { border: 2px dashed rgba(255,255,255,0.15); border-radius: 20px; padding: 40px; text-align: center; cursor: pointer; transition: all 0.3s ease; background: rgba(255,255,255,0.01); backdrop-filter: blur(4px); }
  .sp-upload-zone:hover { border-color: rgba(6,182,212,0.6); background: rgba(6,182,212,0.05); transform: scale(1.02); }
  .sp-orb { position: fixed; border-radius: 50%; pointer-events: none; z-index: -1; filter: blur(100px); opacity: 0.4; mix-blend-mode: screen; }
  @keyframes float1 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(30px, -50px) scale(1.1); } }
  @keyframes float2 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-40px, 40px) scale(0.9); } }
  .sp-glow { position: relative; }
  .sp-glow::after { content:''; position:absolute; inset: -1px; background: linear-gradient(135deg, rgba(6,182,212,0.4), rgba(139,92,246,0.4)); border-radius: inherit; z-index: -1; filter: blur(12px); opacity: 0; transition: opacity 0.3s ease; }
  .sp-glow:hover::after { opacity: 1; }
  @keyframes fadeInScale{from{opacity:0;transform:scale(0.95) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}
  .sp-fadein{animation:fadeInScale 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;}
  @keyframes spin{to{transform:rotate(360deg)}}
  .sp-spin{animation:spin 1s linear infinite;display:inline-block;width:20px;height:20px;border:2px solid white;border-top-color:transparent;border-radius:50%;}
  .sp-error{background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.2);border-radius:14px;padding:16px 20px;color:#fca5a5;font-size:14px;margin-bottom:20px; backdrop-filter: blur(4px); display: flex; align-items: center; gap: 10px; }
`;
content = content.replace(/style.textContent = `[\s\S]*?`;\n/, 'style.textContent = `' + newStyleStr + '`;\n');

// Replace Orbs component
const newOrbs = `function Orbs() {
  return (
    <>
      <div className="mesh-bg"></div>
      <div className="sp-orb" style={{ width: 600, height: 600, background: "radial-gradient(circle, #06b6d4, transparent 60%)", top: "-10%", left: "-10%", animation: "float1 12s ease-in-out infinite" }} />
      <div className="sp-orb" style={{ width: 500, height: 500, background: "radial-gradient(circle, #8b5cf6, transparent 60%)", bottom: "-5%", right: "-10%", animation: "float2 15s ease-in-out infinite" }} />
      <div className="sp-orb" style={{ width: 400, height: 400, background: "radial-gradient(circle, #ec4899, transparent 60%)", top: "30%", right: "30%", animation: "float1 10s ease-in-out infinite reverse" }} />
    </>
  );
}`;
content = content.replace(/function Orbs\(\) \{[\s\S]*?<\/>\n  \);\n\}/, newOrbs);

// Global replacements for inline styles
content = content.replace(/linear-gradient\(135deg,#7c3aed,#ec4899,#fbbf24\)/g, "linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)");
content = content.replace(/linear-gradient\(90deg,#7c3aed,#ec4899,#fbbf24\)/g, "linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6)");
content = content.replace(/linear-gradient\(135deg,#7c3aed,#ec4899\)/g, "linear-gradient(135deg, #06b6d4, #3b82f6)");
content = content.replace(/linear-gradient\(90deg,#7c3aed,#ec4899\)/g, "linear-gradient(90deg, #06b6d4, #3b82f6)");

content = content.replace(/"#1a1830"/g, '"rgba(255, 255, 255, 0.03)"');
content = content.replace(/"#221f38"/g, '"rgba(255, 255, 255, 0.05)"');
content = content.replace(/"#7c3aed"/g, '"#06b6d4"');
content = content.replace(/"#ec4899"/g, '"#3b82f6"');

content = content.replace(/"rgba\(124,58,237,0.15\)"/g, '"rgba(255, 255, 255, 0.05)"');
content = content.replace(/"rgba\(124,58,237,0.3\)"/g, '"rgba(255, 255, 255, 0.1)"');
content = content.replace(/border: "1px solid rgba\(124,58,237,0.2\)"/g, 'border: "1px solid rgba(255, 255, 255, 0.08)", backdropFilter: "blur(12px)"');

fs.writeFileSync('frontend/src/App.jsx', content);
console.log("SUCCESS!");
