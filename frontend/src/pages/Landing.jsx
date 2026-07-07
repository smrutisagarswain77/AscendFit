import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import { motion } from "framer-motion";
import { FaDiscord, FaInstagram, FaTwitter, FaYoutube, FaTerminal, FaShieldAlt, FaChartLine } from "react-icons/fa";
import "../styles/Landing.css";

const Landing = () => {
  const navigate = useNavigate(); 
  const [systemTime, setSystemTime] = useState("00:00:00");
  const [comets, setComets] = useState([]);
  const [dataGrid, setDataGrid] = useState([]);

  const clockRef = useRef(null);
  const isGlitchingRef = useRef(false);

  useEffect(() => {
    const generatedComets = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * -10,
      duration: Math.random() * 4 + 8,
      size: Math.random() * 2 + 1.5
    }));
    setComets(generatedComets);

    const generatedNodes = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      char: Math.random() > 0.5 ? "1" : "0",
      delay: Math.random() * -5,
      width: `${Math.random() * 3.5 + 1.5}px`,
      height: `${Math.random() * 3.5 + 1.5}px`,
      bgColor: Math.random() > 0.35 ? "var(--neon-cyan)" : "#0077ff",
      boxShadow: Math.random() > 0.5 ? "0 0 8px var(--neon-cyan)" : "0 0 6px #0055ff"
    }));
    setDataGrid(generatedNodes);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const timeString = now.toTimeString().split(' ')[0];
      setSystemTime(timeString);
      
      if (!isGlitchingRef.current && clockRef.current) {
        clockRef.current.innerText = timeString;
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const triggerTimerGlitch = () => {
    if (isGlitchingRef.current || !clockRef.current) return;
    isGlitchingRef.current = true;
    clockRef.current.classList.add("glitching-text");

    let counter = 0;
    const glitchInterval = setInterval(() => {
      if (clockRef.current) {
        clockRef.current.innerText = Array.from({ length: 8 })
          .map(() => Math.floor(Math.random() * 10).toString())
          .join('');
      }
      counter++;
      if (counter > 10) {
        clearInterval(glitchInterval);
        isGlitchingRef.current = false;
        if (clockRef.current) {
          clockRef.current.classList.remove("glitching-text");
          clockRef.current.innerText = systemTime;
        }
      }
    }, 50);
  };

  const crtScreenExit = {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    exit: {
      opacity: [1, 0.8, 1, 0],
      clipPath: [
        "inset(0% 0% 0% 0%)",
        "inset(42% 0% 42% 0%)", 
        "inset(49.5% 45% 49.5% 45%)", 
        "inset(50% 50% 50% 50%)" 
      ],
      filter: [
        "brightness(1) contrast(1)",
        "brightness(3) contrast(1.5) hue-rotate(90deg)", 
        "brightness(5) contrast(3)",
        "brightness(10)"
      ],
      transition: {
        duration: 0.5,
        times: [0, 0.3, 0.7, 1],
        ease: "linear"
      }
    }
  };

  return (
    <motion.div 
      className="terminal-screen-wrapper landing-wrapper"
      variants={crtScreenExit}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="atmospheric-parallax-hull">
        <div className="grid-matrix-floor" />
        <div className="cyber-wave-interferer" />

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

        {dataGrid.map((d) => (
          <span
            key={d.id}
            className="matrix-binary-node basic-node-fade"
            style={{ 
              top: d.top, 
              left: d.left,
              width: d.width,
              height: d.height,
              backgroundColor: d.bgColor,
              boxShadow: d.boxShadow,
              animationDelay: `${d.delay}s`
            }}
          >
            {d.char}
          </span>
        ))}
      </div>

      <div className="hud-corner-svg-container top-left"><svg viewBox="0 0 100 100" fill="none"><path d="M2 40 V15 L15 2 H40" stroke="var(--neon-cyan)" strokeWidth="2.5" /></svg></div>
      <div className="hud-corner-svg-container top-right"><svg viewBox="0 0 100 100" fill="none"><path d="M98 40 V15 L85 2 H60" stroke="var(--neon-cyan)" strokeWidth="2.5" /></svg></div>
      <div className="hud-corner-svg-container bottom-left"><svg viewBox="0 0 100 100" fill="none"><path d="M2 60 V85 L15 98 H40" stroke="var(--neon-cyan)" strokeWidth="2.5" /></svg></div>
      <div className="hud-corner-svg-container bottom-right"><svg viewBox="0 0 100 100" fill="none"><path d="M98 60 V85 L85 98 H60" stroke="var(--neon-cyan)" strokeWidth="2.5" /></svg></div>
      <div className="hud-perimeter-glass-wire" />

      <header className="hud-system-header">
        <div className="header-branding">
          <div className="protocol-lbl">ASCEND <span className="dim">PROTOCOL</span></div>
          <div className="sub-status"><span className="ver">v 3.0.0_ULTRA</span><span className="pulse-tag">DASHBOARD_LIVE</span></div>
        </div>
        <div className="header-chronograph" onMouseEnter={triggerTimerGlitch}>
          <span className="lbl">MATRIX TIME</span>
          <span ref={clockRef} className="time-digits">{systemTime}</span>
        </div>
      </header>

      <motion.main className="landing-workspace-grid">
        <motion.section className="landing-hero-card glass-hud-card">
          <div className="card-glitch-line" />
          <div className="rotating-gyro-ring hero-gyro" />
          <div className="hero-branding-group">
            <h1 className="brand-text-logo main-hero-title">ASCEND<span className="cyan-neon">FIT</span></h1>
            <p className="hero-terminal-desc">NEXT-GENERATION QUANTUM BIOMETRIC MONITORING INFRASTRUCTURE. DATA STRUCTURING FOR ARCHITECTING ELITE PHYSIOLOGICAL PERFORMANCE NODES.</p>
          </div>
          <div className="hero-action-cluster">
            <motion.button 
              className="console-submit-btn landing-cta-btn" 
              whileHover={{ scale: 1.03 }} 
              whileTap={{ scale: 0.98 }} 
              onClick={() => navigate("/login")}
            >
              <div className="btn-side-ticker left" /><span className="btn-text">INITIALIZE CORE CONSOLE</span><div className="btn-side-ticker right" />
            </motion.button>
          </div>
        </motion.section>

        <div className="landing-features-grid">
          <div className="glass-hud-card hover-reactive-card feature-node-card">
            <div className="card-glitch-line" /><FaTerminal className="feature-icon text-cyan" /><div className="card-lbl">01 // REALTIME METRICS</div>
            <p className="feature-desc">Stream structural physical telemetry down directly into localized data nodes safely.</p>
          </div>
          <div className="glass-hud-card hover-reactive-card feature-node-card">
            <div className="card-glitch-line" /><FaShieldAlt className="feature-icon text-purple" /><div className="card-lbl">02 // SECURE QUANTUM LOCK</div>
            <p className="feature-desc">Asymmetric firewall parameters keeping unauthorized deckers away from biological records.</p>
          </div>
          <div className="glass-hud-card hover-reactive-card feature-node-card">
            <div className="card-glitch-line" /><FaChartLine className="feature-icon text-green" /><div className="card-lbl">03 // ANALYTICS DECK</div>
            <p className="feature-desc">Deconstruct historical performance graphs through dynamic high-fidelity matrix scopes.</p>
          </div>
        </div>
      </motion.main>

      <footer className="hud-system-footer">
        <span className="copyright">© 2026 ASCENDFIT // DIVISION ZERO</span>
        <div className="social-nodes">
          <a href="#discord" className="icon-link"><FaDiscord /></a><a href="#twitter" className="icon-link"><FaTwitter /></a><a href="#instagram" className="icon-link"><FaInstagram /></a><a href="#youtube" className="icon-link"><FaYoutube /></a>
        </div>
      </footer>
    </motion.div>
  );
};

export default Landing;