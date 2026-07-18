import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FiActivity, 
  FiTrendingUp, 
  FiTerminal, 
  FiPlus, 
  FiPlay,
  FiBookOpen,
  FiCpu,
  FiCheckSquare,
  FiClock,
  FiZap
} from "react-icons/fi";

import useAppContext from "../hooks/useAppContext";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { appData } = useAppContext();
  const canvasRef = useRef(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  
  // State for interactive checklist matching Today's Missions
  const [missions, setMissions] = useState([
    { id: "m1", text: "Complete Workout", completed: false },
    { id: "m2", text: "Burn 500 kcal", completed: false },
    { id: "m3", text: "Finish 3 Quests", completed: false }
  ]);

  const terminalLogs = appData.systemFeed;

  // Handle interactive checkbox adjustments
  const toggleMission = (id) => {
    setMissions(prevMissions =>
      prevMissions.map(mission =>
        mission.id === id ? { ...mission, completed: !mission.completed } : mission
      )
    );
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    let animationFrameId;
    let particles = [];
    let particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 14000), 50);

    class QuantumParticle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.25;
        this.vy = (Math.random() - 0.5) * 0.25;
        this.radius = Math.random() * 1.2 + 0.5;
        this.alpha = Math.random() * 0.3 + 0.1;
        this.pulseSpeed = Math.random() * 0.006 + 0.002;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha += this.pulseSpeed;
        if (this.alpha > 0.45 || this.alpha < 0.05) this.pulseSpeed = -this.pulseSpeed;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 210, 255, ${this.alpha})`;
        ctx.fill();
      }
    }

    const resizeMatrix = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) particles.push(new QuantumParticle());
    };

    resizeMatrix();
    window.addEventListener("resize", resizeMatrix);

    const renderLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 210, 255, ${(1 - dist / 100) * 0.05})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeMatrix);
    };
  }, []);

  const panelCardVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
  };

  return (
    <div className="db-viewport-wrapper">
      <canvas ref={canvasRef} className="db-background-particle-plane" />
      <div className="db-perimeter-glass-wire" />

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMinimized={isSidebarMinimized}
        setIsMinimized={setIsSidebarMinimized}
        onLogout={() => navigate("/login")}
      />

      <div className="db-workspace-axis">
        <Header title="TACTICAL DATA DASHBOARD" />

        <motion.main 
          className="db-grid-workspace-layout"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.03 } } }}
        >
          {/* HERO PANEL */}
          <motion.div className="db-glass-hud-card db-angle-tl db-hero-span" variants={panelCardVariants}>
            <div className="db-card-glitch-line" />
            <div className="db-node-target-corner db-t-l" />
            <div className="db-node-target-corner db-b-r" />
            
            <div className="db-hero-flex-shell">
              <div className="db-hero-profile-meta">
                <div className="db-hero-avatar-shell">
                  <svg className="db-avatar-tech-hud" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="46" stroke="rgba(0, 210, 255, 0.2)" strokeWidth="2" fill="none" />
                    <circle cx="50" cy="50" r="40" stroke="#00d2ff" strokeWidth="2" fill="none" strokeDasharray="180 50" />
                    <path d="M35,78 C35,63 42,55 50,55 C58,55 65,63 65,78" stroke="#00d2ff" strokeWidth="2.5" fill="none" />
                    <circle cx="50" cy="38" r="10" stroke="#00d2ff" strokeWidth="2.5" fill="none" />
                  </svg>
                  <div className="db-avatar-pulse-ring" />
                </div>
                <div className="db-hero-identity-stack">
                  <span className="db-hero-welcome-string">Welcome Back</span>
                  <h2 className="db-hero-name-string">Good Morning {appData.user.username}</h2>
                </div>
              </div>
              <div className="db-hero-gamified-stats">
                <div className="db-hero-metric-node">
                  <span className="db-hero-node-lbl">RANK LAYER</span>
                  <div className="db-hero-level-badge">LEVEL {appData.user.level}</div>
                </div>
                <div className="db-hero-metric-node db-xp-progress-node">
                  <div className="db-xp-readout-row">
                    <span className="db-hero-node-lbl">XP PROGRESS</span>
                    <span className="db-hero-node-val">{appData.user.currentXP} / {appData.user.nextLevelXP} XP</span>
                  </div>
                  <div className="db-xp-bar-perimeter">
                    <div className="db-xp-bar-fill" style={{ width: `${(appData.user.currentXP / appData.user.nextLevelXP) * 100}%` }} />
                  </div>
                </div>
                <div className="db-hero-metric-node">
                  <span className="db-hero-node-lbl">CURRENT RUN</span>
                  <div className="db-hero-streak-badge">
                    <FiZap className="db-streak-fire-icon" /> {appData.user.streak} Day Streak
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* TODAY'S MISSION (INTERACTIVE CHECKLIST) */}
          <motion.div className="db-glass-hud-card db-angle-tr db-span-1" variants={panelCardVariants}>
            <div className="db-card-glitch-line" />
            <div className="db-node-target-corner db-t-l" />
            <div className="db-node-target-corner db-b-r" />
            <div className="db-card-lbl"><FiCheckSquare /> TODAY'S MISSION</div>
            <div className="db-mission-list-stack">
              {missions.map((mission) => (
                <label key={mission.id} className="db-mission-item-row">
                  <input 
                    type="checkbox" 
                    className="db-mission-checkbox" 
                    checked={mission.completed} 
                    onChange={() => toggleMission(mission.id)} 
                  />
                  <span className={`db-mission-item-text ${mission.completed ? "db-mission-completed-line" : ""}`}>
                    {mission.text}
                  </span>
                </label>
              ))}
              <div className="db-mission-reward-footer">
                <span className="db-reward-lbl">REWARD</span>
                <span className="db-reward-value text-cyan">+{appData.user.dailyMissionReward} XP</span>
              </div>
            </div>
          </motion.div>

          {/* AI COACH */}
          <motion.div className="db-glass-hud-card db-angle-bl db-span-1" variants={panelCardVariants}>
            <div className="db-card-glitch-line" />
            <div className="db-node-target-corner db-t-l" />
            <div className="db-node-target-corner db-b-r" />
            <div className="db-card-lbl"><FiCpu /> AI COACH</div>
            <div className="db-ai-coach-content">
              <p className="db-ai-greeting">Good morning.</p>
              <p className="db-ai-analysis-text">Today's recovery score is high.</p>
              <div className="db-ai-recommendation-card">
                <span className="db-rec-tag">RECOMMENDED</span>
                <h4 className="db-rec-title">Push Workout</h4>
                <div className="db-rec-duration-row">
                  <FiClock /> <span>45 min</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RECENT ACTIVITY */}
          <motion.div className="db-glass-hud-card db-span-1" variants={panelCardVariants}>
            <div className="db-card-glitch-line" />
            <div className="db-node-target-corner db-t-l" />
            <div className="db-node-target-corner db-b-r" />
            <div className="db-card-lbl"><FiActivity /> RECENT ACTIVITY</div>
            <div className="db-recent-activity-stack">
              <div className="db-timeline-header-node">Yesterday</div>
              <div className="db-activity-log-node">
                <div className="db-activity-main-line">
                  <span className="db-activity-title">Chest Workout</span>
                  <span className="db-activity-xp-gain">+120 XP</span>
                </div>
                <div className="db-activity-meta-line">
                  <span className="db-activity-subtext">Quest Completed</span>
                  <span className="db-activity-timestamp">7:32 PM</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* QUICK ACTIONS WITH ROUTING HOOKED UP */}
          <motion.div className="db-glass-hud-card db-angle-tr db-span-1" variants={panelCardVariants}>
            <div className="db-card-glitch-line" />
            <div className="db-node-target-corner db-t-l" />
            <div className="db-node-target-corner db-b-r" />
            <div className="db-card-lbl"><FiPlus /> QUICK ACTIONS</div>
            <div className="db-button-stack-layout">
              <button className="db-console-submit-btn" onClick={() => navigate("/workouts")}>
                <FiPlay /> Start Workout
              </button>
              <button className="db-console-submit-btn db-secondary" onClick={() => navigate("/exercises")}>
                <FiBookOpen /> Exercise Library
              </button>
              <button className="db-console-submit-btn db-ai-action-override" onClick={() => navigate("/ai-coach")}>
                <FiCpu /> Ask AI Coach
              </button>
            </div>
          </motion.div>

          {/* PROGRESS MATRIX */}
          <motion.div className="db-glass-hud-card db-angle-tl db-progress-matrix-span" variants={panelCardVariants}>
            <div className="db-card-glitch-line" />
            <div className="db-node-target-corner db-t-l" />
            <div className="db-node-target-corner db-b-r" />
            <div className="db-card-lbl"><FiTrendingUp /> PROGRESS MATRIX</div>
            <div className="db-progress-extended-grid">
              <div className="db-progress-sub-box">
                <span className="db-box-lbl">Heart Rate</span>
                <span className="db-streak-digit-glow text-cyan">{appData.user.heartRate}<span className="db-streak-lbl-sub">BPM</span></span>
              </div>
              <div className="db-progress-sub-box">
                <span className="db-box-lbl">Calories Burn</span>
                <span className="db-streak-digit-glow text-purple">{appData.user.caloriesBurned}<span className="db-streak-lbl-sub">KCAL</span></span>
              </div>
              <div className="db-progress-sub-box">
                <span className="db-box-lbl">Streak</span>
                <span className="db-streak-digit-glow text-cyan">{appData.user.streak}<span className="db-streak-lbl-sub">DAYS</span></span>
              </div>
              <div className="db-progress-sub-box db-highlight-weekly">
                <span className="db-box-lbl">Workout This Week</span>
                <span className="db-streak-digit-glow">{appData.user.weeklyWorkoutHours}<span className="db-streak-lbl-sub">Hours</span></span>
              </div>
              <div className="db-progress-sub-box db-highlight-weekly">
                <span className="db-box-lbl">Calories</span>
                <span className="db-streak-digit-glow text-purple">{(appData.user.caloriesBurned / 1000).toFixed(1)}<span className="db-streak-lbl-sub">K</span></span>
              </div>
              <div className="db-progress-sub-box db-highlight-weekly">
                <span className="db-box-lbl">XP Earned</span>
                <span className="db-streak-digit-glow text-cyan">{appData.user.totalXP}<span className="db-streak-lbl-sub">XP</span></span>
              </div>
            </div>
          </motion.div>

          {/* SYSTEM FEED */}
          <motion.div className="db-glass-hud-card db-angle-bl db-span-1" variants={panelCardVariants}>
            <div className="db-card-glitch-line" />
            <div className="db-node-target-corner db-t-l" />
            <div className="db-node-target-corner db-b-r" />
            <div className="db-card-lbl"><FiTerminal /> SYSTEM FEED</div>
            <div className="db-condensed-terminal-shell">
              {terminalLogs.map((log, index) => (
                <div key={index} className="db-terminal-log-row">
                  <span className="db-sub-terminal-prompt">&gt;</span>
                  <span className="db-terminal-text-node">{log}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
};

export default Dashboard;