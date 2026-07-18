import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiCpu, FiZap, FiActivity, FiClock, FiPlay, FiTrendingUp, 
  FiSend, FiPlus, FiGrid, FiSmile, FiRefreshCw
} from "react-icons/fi";

import useAppContext from "../hooks/useAppContext";


import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/AICoach.css";

const AICoach = () => {
  const navigate = useNavigate();
  const {
    appData,
    addAIMessage,
    clearAIConversation,
    addWorkout,
    setAIRecommendation,
    setRecoveryScore,
    setDailyTip
  } = useAppContext();
  const canvasRef = useRef(null);
  const chatEndRef = useRef(null);
  const [activeTab, setActiveTab] = useState("ai-coach");
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const [generatorForm, setGeneratorForm] = useState({
    goal: "Muscle Gain",
    time: "45 Minutes",
    equipment: "Dumbbells"
  });
  const [generatedWorkout, setGeneratedWorkout] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const messages = appData.aiCoach.conversation;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];
    const count = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 16000), 40);

    class CognitiveNode {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random() * 0.25 + 0.05;
        this.pulse = Math.random() * 0.005 + 0.002;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        this.alpha += this.pulse;
        if (this.alpha > 0.4 || this.alpha < 0.05) this.pulse = -this.pulse;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
      }
      draw() {
        ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(189, 0, 255, ${this.alpha})`;
        ctx.fill();
      }
    }

    const handleResize = () => {
      canvas.width = window.innerWidth; canvas.height = window.innerHeight;
      particles = Array.from({ length: count }, () => new CognitiveNode());
    };
    handleResize(); window.addEventListener("resize", handleResize);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.update(); p.draw();
        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x, dy = p.y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 210, 255, ${(1 - d / 110) * 0.04})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      });
      animationId = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(animationId); window.removeEventListener("resize", handleResize); };
  }, []);

  // FIXED: block: "nearest" eliminates screen/page window shift glitch completely
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [appData.aiCoach.conversation, isTyping]);

  const handleSendMessage = (textToSend) => {
    const prompt = textToSend || userInput;
    if (!prompt.trim()) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { id: `u-${Date.now()}`, sender: "user", text: prompt, timestamp: userTime };
    
    addAIMessage(userMsg);
    if (!textToSend) setUserInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const aiTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      let aiResponseText = "Understood. I have parsed your workout arrays. Your consistency threshold is at 94% this week. Let's continue pushing the active load limits.";
      let suggestions = ["Analyze Progress", "Nutrition Tips"];

      if (prompt.toLowerCase().includes("workout") || prompt.toLowerCase().includes("leg")) {
        aiResponseText = "Perfect choice. Given that your chest load metrics are saturated (+150% capacity) and your streak baseline is standing strong at 18 days, a targeted 45-minute lower-body structural load matrix is highly recommended. Shall we generate it?";
        suggestions = ["Generate Leg Split", "Motivate Me"];
      } else if (prompt.toLowerCase().includes("progress")) {
        aiResponseText = "Your 7-day kinetic diagnostics show 5 completed sessions and an accumulative +850 XP transaction record. Your recovery rate is hovering efficiently at 82%. Excellent operational consistency.";
        suggestions = ["Suggest Recovery", "Ask Anything"];
      } else if (prompt.toLowerCase().includes("motivate")) {
        aiResponseText = "You are currently holding an elite tier sequence, Commander. You are exactly 180 XP away from breaking into the Commander Rank. One intense, high-output training cycle today secures that placement.";
        suggestions = ["Generate Workout", "Nutrition Tips"];
      }

      addAIMessage({
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: aiResponseText,
          timestamp: aiTime,
          suggestions
      });
    }, 1200);
  };

  const triggerWorkoutGeneration = () => {
    setIsGenerating(true);
    setGeneratedWorkout(null);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedWorkout({
        title: `${generatorForm.goal.toUpperCase()} MATRIX`,
        duration: generatorForm.time,
        equipment: generatorForm.equipment,
        exercises: [
          { name: "Barbell Progressive Squats", sets: "4 Sets x 8 Reps", load: "RPE 8" },
          { name: "Dumbbell Romanian Deadlifts", sets: "3 Sets x 10 Reps", load: "Controlled Tempo" },
          { name: "Walking Lunges (Weighted)", sets: "3 Sets x 12 Reps per leg", load: "+40 XP Factor" }
        ]
      });
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.03 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
  };

  return (
    <div className="db-viewport-wrapper">
      <canvas ref={canvasRef} className="ai-quantum-canvas-backdrop" />
      
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMinimized={isSidebarMinimized}
        setIsMinimized={setIsSidebarMinimized}
        onLogout={() => navigate("/login")}
      />
      
      <div className="db-workspace-axis">
        <Header title="AI COGNITION MATRIX" />

        <motion.div 
          className="ai-dashboard-grid-layout"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* LEFT COLUMN: INTERACTIVE VIEWPORT SECTOR */}
          <div className="ai-left-column-deck">
            
            {/* HERO PANEL */}
            <motion.div className="ai-identity-hero-card" variants={cardVariants}>
              <div className="ai-glitch-scanner-wire" />
              <div className="ai-avatar-core-wrapper">
                <div className="ai-avatar-pulse-ring" />
                <div className="ai-avatar-icon-housing">
                  <FiCpu className="ai-avatar-kinetic-logo" />
                </div>
              </div>
              <div className="ai-identity-readout">
                <div className="ai-online-status-strip">
                  <span className="status-bead-pulse" />
                  <span className="status-string">ASCEND AI OPERATIONAL</span>
                </div>
                <h3>COMMAND INTEL CORE</h3>
                <p>{appData.aiCoach.dailyTip}</p>
              </div>
            </motion.div>

            {/* COMMUNICATIONS CHAT HUB (BOUNDED INTRA-SCROLL CONTAINER) */}
            <motion.div className="ai-chat-terminal-card" variants={cardVariants}>
              <div className="ai-terminal-inner-scroll">
                <AnimatePresence mode="popLayout">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`chat-message-bubble-row ${msg.sender === "user" ? "row-user" : "row-ai"}`}
                    >
                      {msg.sender === "ai" && (
                        <div className="chat-avatar-token"><FiCpu /></div>
                      )}
                      <div className="chat-bubble-payload">
                        <div className="chat-bubble-metadata">
                          <span className="sender-tag">{msg.sender === "user" ? "COMMANDER" : "ASCEND_CORE"}</span>
                          <span className="time-tag">{msg.timestamp}</span>
                        </div>
                        <p className="chat-bubble-text">{msg.text}</p>
                        
                        {msg.sender === "ai" && msg.suggestions && (
                          <div className="chat-inline-suggestions-rail">
                            {msg.suggestions.map((sug, i) => (
                              <button 
                                key={i} 
                                className="chat-inline-chip-node"
                                onClick={() => handleSendMessage(sug)}
                              >
                                {sug}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div 
                      className="chat-message-bubble-row row-ai"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="chat-avatar-token running-pulse"><FiCpu /></div>
                      <div className="chat-bubble-payload typing-container">
                        <span className="hud-sub-bracket-tag">// SYNTHESIZING_BIOMETRIC_REPLY</span>
                        <div className="ai-typing-indicator-dots">
                          <span className="dot" />
                          <span className="dot" />
                          <span className="dot" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={chatEndRef} />
              </div>

              {/* CHIPS AND TRANSMIT FIELDBAR */}
              <div className="ai-macro-chips-input-deck">
                <div className="macro-chip-scrollway">
                  {[
                    { text: "Generate Workout", desc: "Build new load split" },
                    { text: "Analyze Progress", desc: "Diagnostic extraction" },
                    { text: "Suggest Recovery", desc: "Optimize biometrics" },
                    { text: "Nutrition Tips", desc: "Fuel calibration" },
                    { text: "Motivate Me", desc: "Rank amplification" }
                  ].map((macro, idx) => (
                    <button 
                      key={idx} 
                      className="ai-input-macro-node"
                      onClick={() => handleSendMessage(macro.text)}
                    >
                      <span className="macro-title">{macro.text}</span>
                      <span className="macro-desc">{macro.desc}</span>
                    </button>
                  ))}
                </div>

                <form 
                  className="ai-terminal-input-form" 
                  onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                >
                  <div className="ai-input-field-enclosure">
                    <input 
                      type="text" 
                      placeholder="Input custom tactical query (e.g., 'Optimize my leg block pattern'...)"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                    />
                    <div className="input-field-laser-trim" />
                  </div>
                  <button type="submit" className="ai-terminal-submit-btn" aria-label="Transmit Prompt">
                    <FiSend />
                  </button>
                </form>
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: INSIGHTS & HUD DATA */}
          <div className="ai-right-column-deck">
            
            {/* BIO HUD CARD */}
            <motion.div className="ai-telemetry-hud-card" variants={cardVariants}>
              <div className="hud-card-corner-notch top-left" />
              <div className="hud-card-corner-notch bottom-right" />
              <div className="hud-card-header">
                <FiActivity /> <h5>COACH BIOMETRIC STATUS</h5>
              </div>
              <div className="hud-telemetry-grid-metrics">
                <div className="metric-box">
                  <span className="lbl">RECOVERY OVERRIDE</span>
                  <span className="val metric-glow-green">{appData.aiCoach.recoveryScore}%</span>
                </div>
                <div className="metric-box">
                  <span className="lbl">ENERGY MATRIX</span>
                  <span className="val metric-glow-blue">HIGH</span>
                </div>
                <div className="metric-box full-span-row">
                  <span className="lbl">RECOMMENDED TARGET WINDOW</span>
                  <span className="val text-cyan">45 MINUTES <span className="sub-unit">ACTIVE LOAD</span></span>
                </div>
              </div>
            </motion.div>

            {/* PROACTIVE BANNER */}
            <motion.div className="ai-telemetry-hud-card alert-layout-border" variants={cardVariants}>
              <div className="hud-card-header text-purple-glow">
                <FiZap /> <h5>PROACTIVE RECOMMENDATION</h5>
              </div>
              <div className="proactive-recommendation-body">
                <div className="rec-badge-line">
                  <span className="rec-title">{appData.aiCoach.recommendation.workout}</span>
                  <span className="rec-time"><FiClock /> 42 MINS</span>
                </div>
                <p className="rec-reason-statement">
                  <span className="reason-label">REASONING:</span> {appData.aiCoach.recommendation.reason}
                </p>
              </div>
            </motion.div>

            {/* GENERATOR RACK */}
            <motion.div className="ai-telemetry-hud-card generator-panel" variants={cardVariants}>
              <div className="hud-card-header">
                <FiGrid /> <h5>KILLER GENERATIVE WORKOUT CORE</h5>
              </div>
              
              <div className="generative-form-controls">
                <div className="form-field-group">
                  <label>TARGET OBJECTIVE GOAL</label>
                  <select 
                    value={generatorForm.goal}
                    onChange={(e) => setGeneratorForm({...generatorForm, goal: e.target.value})}
                  >
                    <option value="Muscle Gain">MUSCLE DENSITY MULTIPLY</option>
                    <option value="Strength Core">MAXIMUM RPE OUTPUT</option>
                    <option value="Endurance Asset">METABOLIC ACCELERATION</option>
                  </select>
                </div>

                <div className="form-field-dual-row">
                  <div className="form-field-group">
                    <label>TIME DURATION</label>
                    <select 
                      value={generatorForm.time}
                      onChange={(e) => setGeneratorForm({...generatorForm, time: e.target.value})}
                    >
                      <option value="30 Minutes">30 MINS WINDOW</option>
                      <option value="45 Minutes">45 MINS OPTIMAL</option>
                      <option value="60 Minutes">60 MINS EXTENDED</option>
                    </select>
                  </div>
                  <div className="form-field-group">
                    <label>EQUIPMENT ARRAY</label>
                    <select 
                      value={generatorForm.equipment}
                      onChange={(e) => setGeneratorForm({...generatorForm, equipment: e.target.value})}
                    >
                      <option value="Dumbbells">DUMBBELLS LOAD</option>
                      <option value="Full Gym">FULL RACK LAYER</option>
                      <option value="Bodyweight">CALISTHENICS MODIFIER</option>
                    </select>
                  </div>
                </div>

                <button 
                  className={`generative-trigger-action-btn ${isGenerating ? "processing-state" : ""}`}
                  onClick={triggerWorkoutGeneration}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <FiRefreshCw className="spinning-vector-loader" />
                      <span>COMPILING STRUCTURAL MATRIX...</span>
                    </>
                  ) : (
                    <>
                      <FiCpu /> <span>DEPLOY SCHEMATIC ENGINE</span>
                    </>
                  )}
                </button>
              </div>

              <AnimatePresence>
                {generatedWorkout && (
                  <motion.div 
                    className="generated-blueprint-payload-card"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="blueprint-header">
                      <h6>{generatedWorkout.title}</h6>
                      <span>{generatedWorkout.duration}</span>
                    </div>
                    <div className="blueprint-exercises-list">
                      {generatedWorkout.exercises.map((ex, i) => (
                        <div key={i} className="blueprint-exercise-row">
                          <span className="ex-name">{ex.name}</span>
                          <div className="ex-meta-specs">
                            <span className="ex-sets">{ex.sets}</span>
                            <span className="ex-load">{ex.load}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button 
                      className="blueprint-add-to-workouts-btn"
                      onClick={() => {

                        addWorkout({
                            id: Date.now(),
                            title: generatedWorkout.title,
                            duration: generatedWorkout.duration,
                            completed: false,
                            exercises: generatedWorkout.exercises
                        });

                        setGeneratedWorkout(null);

                    }}
                    >
                      <FiPlus /> <span>INJECT INTO MY WORKOUTS PAGE</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* PERFORMANCE LOG DIAGNOSTICS */}
            <motion.div className="ai-telemetry-hud-card" variants={cardVariants}>
              <div className="hud-card-header">
                <FiTrendingUp /> <h5>DIAGNOSTIC WEEKLY BREAKDOWN</h5>
              </div>
              <div className="progress-analysis-readout-rows">
                <div className="diagnostic-row-item">
                  <span className="lbl">METRIC CYCLE</span>
                  <span className="val">{appData.statistics.totalWorkouts} WORKOUTS INDEXED</span>
                </div>
                <div className="diagnostic-row-item">
                  <span className="lbl">TRANSACTION GAINS</span>
                  <span className="val text-green">+{appData.user.currentXP} XP</span>
                </div>
                <div className="diagnostic-row-item">
                  <span className="lbl">CONSISTENCY ACCURACY</span>
                  <span className="val color-gold">EXCELLENT RATE</span>
                </div>
                <p className="diagnostic-summary-paragraph">
                  <span className="insight-tag">COACH RECOMMENDATION:</span> Your velocity profiles indicate quad overloading has decreased. Push the hyper-volume matrix configuration upward on legs next cycle.
                </p>
              </div>
            </motion.div>

            {/* COGNITIVE MEMORY CARD */}
            <motion.div className="ai-telemetry-hud-card" variants={cardVariants}>
              <div className="hud-card-header">
                <FiSmile /> <h5>COGNITIVE MEMORY LOG MATRIX</h5>
              </div>
              <div className="memory-card-payload">
                <p className="motivation-alert-text">
                  You are currently trailing exactly <span className="highlight-amber">{appData.user.nextLevelXP - appData.user.currentXP} XP</span> clear of breaking into the coveted <span className="highlight-cyan">{appData.user.rank}</span>. Executing today's suggested operational chest/push layout satisfies this deployment parameter completely.
                </p>
                <div className="memory-recall-historical-footer-pills">
                  <div className="recall-historical-pill">
                    <span className="pill-tag">PREVIOUS SESSION CORE:</span>
                    <p>You skipped lower-body layout configurations. Today we recalibrate alignment fields parameters.</p>
                  </div>
                  <div className="recall-historical-pill">
                    <span className="pill-tag">STREAK BASELINE MULTIPLIER:</span>
                    <p>Consistency matrix surged from 4 to 18 operational nodes. Superior persistence index output.</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AICoach;