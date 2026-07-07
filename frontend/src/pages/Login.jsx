import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaDiscord, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import "../styles/Login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [systemTime, setSystemTime] = useState("00:00:00");
  const [timeGlitch, setTimeGlitch] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [comets, setComets] = useState([]);
  const [dataGrid, setDataGrid] = useState([]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 80, mass: 1.5 };
  const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-7, 7]), springConfig);
  const rotateX = useSpring(useTransform(mouseY, [-400, 400], [7, -7]), springConfig);
  
  const bgX = useSpring(useTransform(mouseX, [-400, 400], [15, -15]), springConfig);
  const bgY = useSpring(useTransform(mouseY, [-400, 400], [15, -15]), springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left - width / 2;
    const mouseYPos = e.clientY - rect.top - height / 2;
    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const generatedComets = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * -10,
      duration: Math.random() * 4 + 3,
      size: Math.random() * 2 + 1
    }));
    setComets(generatedComets);

    const generatedNodes = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      char: Math.random() > 0.5 ? "1" : "0",
      delay: Math.random() * -5,
    }));
    setDataGrid(generatedNodes);

    const timer = setInterval(() => {
      const now = new Date();
      if (!timeGlitch) {
        setSystemTime(now.toTimeString().split(' ')[0]);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeGlitch]);

  const triggerTimerGlitch = () => {
    setTimeGlitch(true);
    let counter = 0;
    const glitchInterval = setInterval(() => {
      setSystemTime(() => 
        Array.from({ length: 8 }).map(() => Math.floor(Math.random() * 10).toString()).join('')
      );
      counter++;
      if (counter > 12) {
        clearInterval(glitchInterval);
        setTimeGlitch(false);
      }
    }, 60);
  };

  const handleFakeSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2200);
  };

  return (
    <div 
      className={`terminal-screen-wrapper ${isInputFocused ? "hull-glitch-active" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ULTRA BACKGROUND ENGINE */}
      <motion.div className="atmospheric-parallax-hull" style={{ x: bgX, y: bgY }}>
        <div className="grid-matrix-floor" />
        <div className="skyline-silhouettes" />
        <div className="vignette-shading" />
        <div className="cyber-wave-interferer" />

        {/* Dynamic Flying Data Streams */}
        {comets.map((c) => (
          <motion.div
            key={c.id}
            className="data-comet-beam"
            initial={{ top: "-10%", left: c.left, opacity: 0 }}
            animate={{ top: "110%", opacity: [0, 1, 1, 0] }}
            transition={{ duration: c.duration, repeat: Infinity, delay: c.delay, ease: "linear" }}
            style={{ width: c.size, height: c.size * 25 }}
          />
        ))}

        {/* Binary Floating Grid Matrices */}
        {dataGrid.map((d) => (
          <motion.span
            key={d.id}
            className="matrix-binary-node"
            animate={{ opacity: [0.1, 0.8, 0.3, 0.1], scale: [1, 1.2, 0.9, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: d.delay, ease: "easeInOut" }}
            style={{ top: d.top, left: d.left }}
          >
            {d.char}
          </motion.span>
        ))}
      </motion.div>

      {/* CORE HUD FRAME GEOMETRIES */}
      <div className="hud-corner-svg-container top-left">
        <svg viewBox="0 0 100 100" fill="none"><path d="M2 40 V15 L15 2 H40" stroke="var(--neon-cyan)" strokeWidth="2.5" className="outer-glow-trace" /></svg>
      </div>
      <div className="hud-corner-svg-container top-right">
        <svg viewBox="0 0 100 100" fill="none"><path d="M98 40 V15 L85 2 H60" stroke="var(--neon-cyan)" strokeWidth="2.5" className="outer-glow-trace" /></svg>
      </div>
      <div className="hud-corner-svg-container bottom-left">
        <svg viewBox="0 0 100 100" fill="none"><path d="M2 60 V85 L15 98 H40" stroke="var(--neon-cyan)" strokeWidth="2.5" className="outer-glow-trace" /></svg>
      </div>
      <div className="hud-corner-svg-container bottom-right">
        <svg viewBox="0 0 100 100" fill="none"><path d="M98 60 V85 L85 98 H60" stroke="var(--neon-cyan)" strokeWidth="2.5" className="outer-glow-trace" /></svg>
      </div>
      <div className="hud-perimeter-glass-wire" />

      {/* HEADER SYSTEM */}
      <header className="hud-system-header">
        <div className="header-branding">
          <div className="protocol-lbl">ASCEND <span className="dim">PROTOCOL</span></div>
          <div className="sub-status"><span className="ver">v 3.0.0_ULTRA</span><span className="pulse-tag">CORE ONLINE</span></div>
        </div>
        <div className="header-chronograph" onMouseEnter={triggerTimerGlitch}>
          <span className="lbl">MATRIX TIME</span>
          <span className={`time-digits ${timeGlitch ? "glitching-text" : ""}`}>{systemTime}</span>
        </div>
      </header>

      {/* CONTENT WORKSPACE VIEW */}
      <main className="hud-workspace-grid">
        {/* LEFT COLUMN */}
        <aside className="workspace-column side-layout">
          <div className="glass-hud-card angle-tr hover-reactive-card">
            <div className="card-glitch-line" />
            <div className="card-lbl">SYSTEM STATUS</div>
            <ul className="status-tree">
              <li><span className="indicator-dot active" /> Core Engine Operational</li>
              <li><span className="indicator-dot active" /> Firewall Defenses Maximum</li>
              <li><span className="indicator-dot active" /> Quantum Link Connected</li>
            </ul>
          </div>

          <div className="glass-hud-card side-brackets-only text-center hover-reactive-card">
            <div className="card-glitch-line" />
            <div className="card-lbl dim-lbl">AUTHENTICATOR KEY</div>
            <div className="id-code-line">SECURE_NODE_OK</div>
          </div>
        </aside>

        {/* CENTER ACTIVE CONSOLE */}
        <motion.section className="workspace-column center-layout" style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
          
          {/* LOGO AREA */}
          <div className="brand-hologram-space" style={{ transform: "translateZ(30px)" }}>
            <div className="rotating-gyro-ring" />
            <div className="brand-vector-svg">
              <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M80 5 L145 92 L120 92 L80 38 L40 92 L15 92 Z" fill="url(#hudLogoGrad)" className="glint-wing" />
                <path d="M80 44 L110 84 L95 84 L80 64 L65 84 L50 84 Z" fill="#00d2ff" className="glow-arrow" />
                <path d="M68 92 L92 92 L80 104 Z" fill="#00d2ff" opacity="0.6" />
                <circle cx="80" cy="112" r="3" fill="#00d2ff" />
                <defs>
                  <linearGradient id="hudLogoGrad" x1="80" y1="5" x2="80" y2="92" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="65%" stopColor="#25a2ff" />
                    <stop offset="100%" stopColor="#005fad" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1 className="brand-text-logo">ASCEND<span className="cyan-neon">FIT</span></h1>
            <div className="brand-subtitle-line"><span className="subtitle">AUTHENTICATION CONSOLE</span></div>
          </div>

          {/* BEVELED LOGIN CONSOLE */}
          <motion.div 
            className={`glass-terminal-console ${isInputFocused ? "console-focused-glow" : ""} ${isSubmitting ? "console-overloaded" : ""}`}
            style={{ transform: "translateZ(10px)" }}
          >
            <div className="console-laser-trim" />
            <div className="console-header-tag" style={{ marginTop: "6px" }}>INITIALIZE ACCESS PROFILE</div>

            <form onSubmit={handleFakeSubmit} className="console-form">
              
              {/* EMAIL INPUT WITH HOVER/FOCUS ANIMATIONS */}
              <div className="console-input-row custom-animated-input-wrapper">
                <div className="input-hud-bracket top-left" />
                <div className="input-hud-bracket bottom-right" />
                <FiMail className="input-icon" />
                <input 
                  type="email" 
                  placeholder="Enter access credentials" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  required 
                />
                <div className="input-underbar-glow" />
              </div>

              {/* PASSWORD INPUT WITH HOVER/FOCUS ANIMATIONS */}
              <div className="console-input-row custom-animated-input-wrapper">
                <div className="input-hud-bracket top-left" />
                <div className="input-hud-bracket bottom-right" />
                <FiLock className="input-icon" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter decrypt sequence" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  required 
                />
                <div className="input-underbar-glow" />
                <button type="button" className="password-toggle-eye" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <motion.button 
                type="submit" 
                className={`console-submit-btn ${isSubmitting ? "btn-processing" : ""}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="btn-side-ticker left" />
                <div className="shimmer" />
                <span className="btn-text">{isSubmitting ? "DECRYPTING..." : "ACCESS SYSTEM"}</span>
                <div className="btn-side-ticker right" />
              </motion.button>
            </form>

            <div className="console-footer-links">
              <span className="dim">System Unassigned? </span>
              <a href="#register" className="bright-link">Register Node ID</a>
            </div>
          </motion.div>

          <div className="hologram-stage-floor">
            <div className="ring outer-dashed" />
            <div className="ring center-glow" />
          </div>
        </motion.section>

        {/* RIGHT COLUMN */}
        <aside className="workspace-column side-layout">
          <div className="glass-hud-card angle-tl hover-reactive-card">
            <div className="card-glitch-line" />
            <div className="card-header-with-icon"><span className="bracket-icon">⤓</span><div className="card-lbl">DAILY DATA FEED</div></div>
            <div className="mission-content-box">
              <p>Break down existing structural frameworks.</p>
              <div className="reward-node"><span className="mini-lbl">REWARD LINK</span><span className="xp-amount">+500 DATA CORE</span></div>
            </div>
          </div>

          <div className="glass-hud-card angle-bl text-center hover-reactive-card">
            <div className="card-glitch-line" />
            <div className="card-lbl">SYS LINK</div>
            <div className="network-status-wrapper">
              <div className="wireframe-hud-globe"><div className="lat" /><div className="lng" /></div>
              <div className="online-tag">LINKED_OK</div>
            </div>
          </div>
        </aside>
      </main>

      <footer className="hud-system-footer">
        <span className="copyright">© 2026 ASCENDFIT // DIVISION ZERO</span>
        <div className="social-nodes">
          <a href="#discord" className="icon-link"><FaDiscord /></a>
          <a href="#twitter" className="icon-link"><FaTwitter /></a>
          <a href="#instagram" className="icon-link"><FaInstagram /></a>
          <a href="#youtube" className="icon-link"><FaYoutube /></a>
        </div>
      </footer>
    </div>
  );
};

export default Login;