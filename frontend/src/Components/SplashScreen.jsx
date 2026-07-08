import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCpu, FiTerminal, FiShield, FiActivity } from "react-icons/fi";
import "../styles/SplashScreen.css";

const SplashScreen = ({ onComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentSystemStage, setCurrentSystemStage] = useState("INIT_BOOT_SEQUENCE");
  
  // High-fidelity mock system logs sequence
  const bootTelemetryLogs = [
    { threshold: 0, label: "CRITICAL// STAGE_01: BREAKING EXISTING STRUCTURES..." },
    { threshold: 22, label: "SECURE// SYNCHRONIZING PARTICLE SWARM ENGINE..." },
    { threshold: 45, label: "ACCESS// ESTABLISHING QUANTUM LINK LAYER..." },
    { threshold: 68, label: "DECRYPT// PARSING DIVISION ZERO USER IDENTITY..." },
    { threshold: 88, label: "SUCCESS// AUTHORIZING BIOMETRIC SHIELD PASS..." },
    { threshold: 98, label: "STABLE// INTERFACING TO LIVE HUD STREAM..." }
  ];

  useEffect(() => {
    // Dynamic interval stepping to replicate unpredictable game engine loads
    const linearProgressTimer = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(linearProgressTimer);
          return 100;
        }
        
        // Calculate random realistic tick increments between 1 and 4
        const systematicJump = Math.floor(Math.random() * 3) + 1;
        const nextProgressValue = Math.min(prevProgress + systematicJump, 100);

        // Update active telemetry log label based on percentage thresholds
        const activeLogMatch = [...bootTelemetryLogs]
          .reverse()
          .find(log => nextProgressValue >= log.threshold);
          
        if (activeLogMatch) {
          setCurrentSystemStage(activeLogMatch.label);
        }

        return nextProgressValue;
      });
    }, 45); // Approximate duration: ~2-3 seconds of boot diagnostics

    return () => clearInterval(linearProgressTimer);
  }, []);

  // Fire completion callback to navigate after a tiny buffer for immersive layout exit
  useEffect(() => {
    if (loadingProgress === 100) {
      const routingDelay = setTimeout(() => {
        if (onComplete) onComplete();
      }, 500);
      return () => clearTimeout(routingDelay);
    }
  }, [loadingProgress, onComplete]);

  return (
    <div className="ss-viewport-shield">
      {/* SCANNING LASER SWEEPER */}
      <div className="ss-laser-glint-bar" />
      
      <div className="ss-central-matrix-deck">
        
        {/* PARSED BRAND LOGO FROM CONSOLE */}
        <motion.div 
          className="ss-branding-logo-wrapper"
          animate={{ 
            scale: [1, 1.03, 1],
            filter: ["drop-shadow(0 0 15px rgba(0, 210, 255, 0.4))", "drop-shadow(0 0 30px rgba(0, 210, 255, 0.85))", "drop-shadow(0 0 15px rgba(0, 210, 255, 0.4))"]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 160 120" fill="none" className="ss-vector-svg">
            <path d="M80 5 L145 92 L120 92 L80 38 L40 92 L15 92 Z" fill="url(#ssLogoGrad)" />
            <path d="M80 44 L110 84 L95 84 L80 64 L65 84 L50 84 Z" fill="#00d2ff" className="ss-glow-arrow" />
            <path d="M68 92 L92 92 L80 104 Z" fill="#00d2ff" opacity="0.6" />
            <circle cx="80" cy="112" r="3" fill="#00d2ff" />
            <defs>
              <linearGradient id="ssLogoGrad" x1="80" y1="5" x2="80" y2="92" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="65%" stopColor="#25a2ff" />
                <stop offset="100%" stopColor="#005fad" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* SYSTEM CAPTION */}
        <h1 className="ss-title-string">
          ASCEND<span className="ss-cyan-neon">FIT</span>
        </h1>
        <p className="ss-division-tag">// DIVISION ZERO CALIBRATION MODULE</p>

        {/* HUD TRACK DATA STATS */}
        <div className="ss-hud-telemetry-grid">
          <div className="ss-telemetry-box">
            <FiCpu className="ss-box-icon" />
            <div className="ss-meta-stack">
              <span className="ss-box-lbl">HOST FRAMEWORK</span>
              <span className="ss-box-val">CORE_V.2026</span>
            </div>
          </div>
          <div className="ss-telemetry-box">
            <FiShield className="ss-box-icon ss-cyan" />
            <div className="ss-meta-stack">
              <span className="ss-box-lbl">ENCRYPTION ENGINE</span>
              <span className="ss-box-val">SECURE_LINK</span>
            </div>
          </div>
        </div>

        {/* HARDWARE PROGRESS LOADING DISPATCHER */}
        <div className="ss-bar-perimeter-wire">
          <motion.div 
            className="ss-loading-progress-core" 
            style={{ width: `${loadingProgress}%` }}
          />
          {/* Subtle neon glowing tracker tip */}
          <div className="ss-bar-glint-point" style={{ left: `${loadingProgress}%` }} />
        </div>

        {/* PERCENTAGE READOUT AND CONSOLE TRACK STRINGS */}
        <div className="ss-readout-footer-row">
          <div className="ss-console-feed-stack">
            <span className="ss-terminal-symbol"><FiTerminal /></span>
            <AnimatePresence mode="wait">
              <motion.span 
                key={currentSystemStage}
                className="ss-stage-label-text"
                initial={{ opacity: 0, y: 4, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -4, filter: "blur(2px)" }}
                transition={{ duration: 0.15 }}
              >
                {currentSystemStage}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="ss-percentage-numeric-node">
            {loadingProgress}<span className="ss-percent-symbol">%</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SplashScreen;