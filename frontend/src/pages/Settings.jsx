import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FiUser, FiEye, FiBell, FiSliders, 
  FiAlertTriangle, FiRadio, FiKey, FiLogOut, FiTrash2,
  FiShield
} from "react-icons/fi";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/Settings.css";

const Settings = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [activeTab, setActiveTab] = useState("settings"); // Kept matching your route scheme
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [activeSubSector, setActiveSubSector] = useState("account");

  // --- STATE LAYER: CONFIGURATION MATRIX DATA ---
  const [accountData, setAccountData] = useState({
    username: "Alok",
    email: "alok.operator@ascendfit.io",
    bio: "Biometric systems tuned to absolute high-performance output vectors."
  });

  const [appearance, setAppearance] = useState({
    theme: "Cyber Blue", // Cyber Blue, Neon Purple, Crimson Red, Emerald Green
    hudIntensity: "Normal", // Minimal, Normal, Extreme
    particles: true,
    motionEffects: true
  });

  const [notifications, setNotifications] = useState({
    workoutReminder: true,
    dailyQuest: true,
    levelUp: true,
    achievements: true,
    aiSuggestions: false
  });

  const [workoutPrefs, setWorkoutPrefs] = useState({
    restTimer: "60s",
    units: "Metric",
    goal: "Muscle Gain"
  });

  // --- BACKGROUND PARTICLE SYSTEM ENGINE ---
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
      if (appearance.particles) {
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
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeMatrix);
    };
  }, [appearance.particles]);

  // --- 3D GLOW HOVER MATHEMATICS ---
  const handleMouseMove3D = (e, target) => {
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };

  const getThemeColor = () => {
    switch(appearance.theme) {
      case "Neon Purple": return "#bd00ff";
      case "Crimson Red": return "#ff0055";
      case "Emerald Green": return "#00ffaa";
      default: return "#00d2ff"; // Cyber Blue
    }
  };

  const subSectors = [
    { id: "account", label: "ACCOUNT", icon: <FiUser /> },
    { id: "appearance", label: "APPEARANCE", icon: <FiEye /> },
    { id: "notifications", label: "NOTIFICATIONS", icon: <FiBell /> },
    { id: "workout", label: "WORKOUT PREFS", icon: <FiSliders /> },
    { id: "system", label: "SYSTEM ENGINE", icon: <FiRadio /> }
  ];

  const panelCardVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
  };

  return (
    <div className="db-viewport-wrapper" style={{ "--accent-matrix": getThemeColor() }}>
      <canvas ref={canvasRef} className="db-background-particle-plane" />
      <div className="db-perimeter-glass-wire" />

      {/* RE-LINKED CORE SIDEBAR COMPONENT */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMinimized={isSidebarMinimized}
        setIsMinimized={setIsSidebarMinimized}
        onLogout={() => navigate("/login")}
      />

      <div className="db-workspace-axis">
        {/* RE-LINKED CORE GLOBAL HEADER */}
        <Header title="SYSTEM PREFERENCES CORE" />

        {/* CONTROLS SUB-SELECTOR DECK */}
        <div className="up-settings-subnav-dock">
          {subSectors.map((sector) => (
            <button
              key={sector.id}
              className={`up-settings-subnav-btn ${activeSubSector === sector.id ? "sector-active" : ""}`}
              onClick={() => setActiveSubSector(sector.id)}
            >
              <span className="sector-icon">{sector.icon}</span>
              <span className="sector-label">{sector.label}</span>
              {activeSubSector === sector.id && <motion.div className="sector-active-line" layoutId="activeLine" />}
            </button>
          ))}
        </div>

        <motion.main 
          className="up-settings-viewport-container"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.03 } } }}
        >
          {/* SECTION 1: ACCOUNT VECTORS */}
          {activeSubSector === "account" && (
            <motion.div 
              className="db-glass-hud-card up-3d-glow-card" 
              variants={panelCardVariants}
              onMouseMove={(e) => handleMouseMove3D(e, e.currentTarget)}
            >
              <div className="db-card-glitch-line" />
              <div className="db-node-target-corner db-t-l" />
              <div className="db-node-target-corner db-b-r" />
              <div className="db-card-lbl"><FiUser /> 1. ACCOUNT INTEGRATION</div>
              
              <div className="up-panel-body-grid fields-stack">
                <div className="up-input-container-node">
                  <label>OPERATOR IDENTIFIER</label>
                  <input 
                    type="text" 
                    value={accountData.username} 
                    onChange={(e) => setAccountData({...accountData, username: e.target.value})} 
                    className="up-form-field" 
                  />
                </div>
                <div className="up-input-container-node">
                  <label>COMMS SECURE ROUTE (EMAIL)</label>
                  <input 
                    type="email" 
                    value={accountData.email} 
                    onChange={(e) => setAccountData({...accountData, email: e.target.value})} 
                    className="up-form-field" 
                  />
                </div>
                <div className="up-input-container-node">
                  <label>BIOMETRIC IDENTITY OVERVIEW</label>
                  <textarea 
                    value={accountData.bio} 
                    onChange={(e) => setAccountData({...accountData, bio: e.target.value})} 
                    className="up-form-field textarea-field" 
                  />
                </div>
                <div className="settings-action-row">
                  <button className="up-panel-action-btn secondary-matrix-btn" onClick={() => alert("Password tracking payload active.")}>
                    <FiKey /> GENERATE NEW ENCRYPTION KEY (CHANGE PASSWORD)
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* SECTION 2: COSMETIC DISPLAY CORE */}
          {activeSubSector === "appearance" && (
            <motion.div 
              className="db-glass-hud-card up-3d-glow-card" 
              variants={panelCardVariants}
              onMouseMove={(e) => handleMouseMove3D(e, e.currentTarget)}
            >
              <div className="db-card-glitch-line" />
              <div className="db-node-target-corner db-t-l" />
              <div className="db-node-target-corner db-b-r" />
              <div className="db-card-lbl"><FiEye /> 2. COSMETIC MATRIX CONTROL</div>

              <div className="up-panel-body-grid switches-stack">
                <div className="hud-interactive-option-row">
                  <div className="option-info">
                    <span className="opt-title">SYSTEM HUE TINT</span>
                    <span className="opt-desc">Shifts global system display accent frequencies.</span>
                  </div>
                  <div className="selector-segmented-array">
                    {["Cyber Blue", "Neon Purple", "Crimson Red", "Emerald Green"].map((t) => (
                      <button 
                        key={t} 
                        className={`segment-chip ${appearance.theme === t ? "active" : ""}`}
                        onClick={() => setAppearance({...appearance, theme: t})}
                      >
                        {t.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="hud-interactive-option-row">
                  <div className="option-info">
                    <span className="opt-title">HUD GLOW AMPLITUDE</span>
                    <span className="opt-desc">Controls CSS neon shadow intensity configurations.</span>
                  </div>
                  <div className="selector-segmented-array">
                    {["Minimal", "Normal", "Extreme"].map((intensity) => (
                      <button 
                        key={intensity} 
                        className={`segment-chip ${appearance.hudIntensity === intensity ? "active" : ""}`}
                        onClick={() => setAppearance({...appearance, hudIntensity: intensity})}
                      >
                        {intensity.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="hud-interactive-option-row">
                  <div className="option-info">
                    <span className="opt-title">HUD PARTICLE ENGINE</span>
                    <span className="opt-desc">Toggles background network grid canvas to preserve system resources.</span>
                  </div>
                  <button 
                    className={`futuristic-toggle-button ${appearance.particles ? "engaged" : "halted"}`}
                    onClick={() => setAppearance({...appearance, particles: !appearance.particles})}
                  >
                    <div className="status-bead-indicator" />
                    <span>{appearance.particles ? "◉ ONLINE" : "◯ OFFLINE"}</span>
                  </button>
                </div>

                <div className="hud-interactive-option-row">
                  <div className="option-info">
                    <span className="opt-title">MOTION AND INTERPOLATIONS</span>
                    <span className="opt-desc">Enables structural animation frame parsing for accessibility.</span>
                  </div>
                  <button 
                    className={`futuristic-toggle-button ${appearance.motionEffects ? "engaged" : "halted"}`}
                    onClick={() => setAppearance({...appearance, motionEffects: !appearance.motionEffects})}
                  >
                    <div className="status-bead-indicator" />
                    <span>{appearance.motionEffects ? "◉ ENABLED" : "◯ DISABLED"}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* SECTION 3: NOTIFICATION DISPATCH */}
          {activeSubSector === "notifications" && (
            <motion.div 
              className="db-glass-hud-card up-3d-glow-card" 
              variants={panelCardVariants}
              onMouseMove={(e) => handleMouseMove3D(e, e.currentTarget)}
            >
              <div className="db-card-glitch-line" />
              <div className="db-node-target-corner db-t-l" />
              <div className="db-node-target-corner db-b-r" />
              <div className="db-card-lbl"><FiBell /> 3. COMMS RELAY TELEMETRY</div>

              <div className="up-panel-body-grid switches-stack">
                {[
                  { id: "workoutReminder", label: "WORKOUT REMINDER", desc: "Alerts system operator to initiate logged physical sets." },
                  { id: "dailyQuest", label: "DAILY QUEST REMINDER", desc: "Pushes system matrix update notifications upon challenge resets." },
                  { id: "levelUp", label: "LEVEL UP TELEMETRY", desc: "Flashes alerts upon threshold calculations exceeding tier floors." },
                  { id: "achievements", label: "ACHIEVEMENTS ANNOUNCEMENTS", desc: "Interrupts HUD view array to celebrate performance spikes." },
                  { id: "aiSuggestions", label: "AI SUGGESTIONS PROMPTS", desc: "Permits internal AI matrix to push adaptive biometric tips." }
                ].map((notif) => (
                  <div className="hud-interactive-option-row" key={notif.id}>
                    <div className="option-info">
                      <span className="opt-title">{notif.label}</span>
                      <span className="opt-desc">{notif.desc}</span>
                    </div>
                    <button 
                      className={`futuristic-toggle-button ${notifications[notif.id] ? "engaged" : "halted"}`}
                      onClick={() => setNotifications({...notifications, [notif.id]: !notifications[notif.id]})}
                    >
                      <div className="status-bead-indicator" />
                      <span>{notifications[notif.id] ? "◉ ACTIVE" : "◯ INACTIVE"}</span>
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* SECTION 4: WORKOUT CONFIG CONSTANTS */}
          {activeSubSector === "workout" && (
            <motion.div 
              className="db-glass-hud-card up-3d-glow-card" 
              variants={panelCardVariants}
              onMouseMove={(e) => handleMouseMove3D(e, e.currentTarget)}
            >
              <div className="db-card-glitch-line" />
              <div className="db-node-target-corner db-t-l" />
              <div className="db-node-target-corner db-b-r" />
              <div className="db-card-lbl"><FiSliders /> 4. WORKOUT PREFERENCE CONSTANTS</div>

              <div className="up-panel-body-grid switches-stack">
                <div className="hud-interactive-option-row">
                  <div className="option-info">
                    <span className="opt-title">DEFAULT REST TIMER</span>
                    <span className="opt-desc">Default downtime interval injected between active training blocks.</span>
                  </div>
                  <div className="selector-segmented-array">
                    {["30s", "60s", "90s", "120s"].map((time) => (
                      <button 
                        key={time} 
                        className={`segment-chip ${workoutPrefs.restTimer === time ? "active" : ""}`}
                        onClick={() => setWorkoutPrefs({...workoutPrefs, restTimer: time})}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="hud-interactive-option-row">
                  <div className="option-info">
                    <span className="opt-title">PREFERRED MEASUREMENT UNITS</span>
                    <span className="opt-desc">Global metric configuration parsing metrics.</span>
                  </div>
                  <div className="selector-segmented-array">
                    {["Metric", "Imperial"].map((unit) => (
                      <button 
                        key={unit} 
                        className={`segment-chip ${workoutPrefs.units === unit ? "active" : ""}`}
                        onClick={() => setWorkoutPrefs({...workoutPrefs, units: unit})}
                      >
                        {unit.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="hud-interactive-option-row">
                  <div className="option-info">
                    <span className="opt-title">PRIMARY PERFORMANCE GOAL</span>
                    <span className="opt-desc">Directs internal neural processing units toward custom metrics.</span>
                  </div>
                  <div className="selector-segmented-array grid-2x2">
                    {["Weight Loss", "Muscle Gain", "Endurance", "General Fitness"].map((g) => (
                      <button 
                        key={g} 
                        className={`segment-chip ${workoutPrefs.goal === g ? "active" : ""}`}
                        onClick={() => setWorkoutPrefs({...workoutPrefs, goal: g})}
                      >
                        {g.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SECTION 5: CORE OS SYSTEM PANEL & DANGER TERMINAL */}
          {activeSubSector === "system" && (
            <div className="up-settings-double-deck">
              
              <motion.div 
                className="db-glass-hud-card up-3d-glow-card system-status-override" 
                variants={panelCardVariants}
                onMouseMove={(e) => handleMouseMove3D(e, e.currentTarget)}
              >
                <div className="db-card-glitch-line" />
                <div className="db-node-target-corner db-t-l" />
                <div className="db-node-target-corner db-b-r" />
                <div className="db-card-lbl"><FiRadio /> ASCENDFIT SYSTEM STATUS</div>
                
                <div className="system-grid-status-board">
                  <div className="status-data-line"><span>Backend Connection</span><span className="val success-text"><div className="status-dot green" /> ● ONLINE</span></div>
                  <div className="status-data-line"><span>AI Core</span><span className="val success-text"><div className="status-dot green" /> ● READY</span></div>
                  <div className="status-data-line"><span>Workout Engine</span><span className="val success-text"><div className="status-dot green" /> ● READY</span></div>
                  <div className="status-data-line"><span>Gamification Engine</span><span className="val success-text"><div className="status-dot green" /> ● ACTIVE</span></div>
                  <div className="status-data-line"><span>Notifications</span><span className="val success-text"><div className="status-dot green" /> ● ACTIVE</span></div>
                  <div className="status-data-line text-footer-meta"><span>App Version</span><span className="val meta-grey">v1.0.0</span></div>
                  <div className="status-data-line text-footer-meta"><span>Developer</span><span className="val meta-grey">AscendFit Team</span></div>
                </div>
                <div className="about-legal-manifest-row">
                  <span onClick={() => alert("Privacy Document Stream active.")}>PRIVACY POLICY</span>
                  <span onClick={() => alert("Terms Array dispatched.")}>TERMS</span>
                  <span onClick={() => alert("Open source structural licenses verified.")}>OPEN SOURCE LICENSES</span>
                </div>
              </motion.div>

              <motion.section 
                className="db-glass-hud-card up-3d-glow-card danger-zone-panel" 
                variants={panelCardVariants}
                onMouseMove={(e) => handleMouseMove3D(e, e.currentTarget)}
              >
                <div className="db-card-glitch-line" />
                <div className="db-node-target-corner db-t-l" />
                <div className="db-node-target-corner db-b-r" />
                <div className="db-card-lbl danger-txt"><FiShield /> 7. CORE FAULT SECTOR [DANGER ZONE]</div>
                
                <div className="up-panel-body-grid danger-layout">
                  <div className="danger-explainer-box">
                    <FiAlertTriangle className="danger-flash-warning-icon" />
                    <p>Destructive operating parameters located below. Actions will break authentication hashes permanently.</p>
                  </div>
                  <div className="danger-button-cluster">
                    <button className="danger-action-trigger-btn signout-btn" onClick={() => navigate("/login")}>
                      <FiLogOut /> LOGOUT SESSION
                    </button>
                    <button className="danger-action-trigger-btn wipe-btn" onClick={() => alert("Cascade deletion initiated.")}>
                      <FiTrash2 /> DELETE OPERATOR ACCOUNT
                    </button>
                  </div>
                </div>
              </motion.section>

            </div>
          )}
        </motion.main>
      </div>
    </div>
  );
};

export default Settings;