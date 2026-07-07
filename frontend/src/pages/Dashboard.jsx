import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiAward, FiZap, FiActivity, FiTrendingUp, FiTerminal, FiPlus, FiRefreshCw } from "react-icons/fi";

// GLOBAL COMPONENT INJECTIONS
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [matrixDataStream, setMatrixDataStream] = useState([]);
  const [terminalLogs, setTerminalLogs] = useState([
    "SYS_INIT: Quantum terminal telemetry link synchronized...",
    "AURORA_ENGINE: High fidelity interface running on localized node.",
    "BIOMETRICS: Monitoring active biological vital channels."
  ]);

  useEffect(() => {
    // Generate dynamic background stream coordinates
    const streams = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${i * 4}%`,
      delay: Math.random() * -20,
      duration: Math.random() * 15 + 10,
      opacity: Math.random() * 0.15 + 0.02
    }));
    setMatrixDataStream(streams);
  }, []);

  const addLogMessage = (msg) => {
    setTerminalLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 5)]);
  };

  return (
    <motion.div 
      className="db-viewport-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* GLOBAL TECH GLASS ENVELOPE SHIELD */}
      <div className="db-perimeter-glass-wire" />
      <div className="db-scanning-horizon-laser" />
      <div className="db-grid-matrix-floor" />
      <div className="db-vignette-shading" />

      {/* MATRIX BACKGROUND STREAMS */}
      <div className="db-matrix-stream-canopy">
        {matrixDataStream.map((stream) => (
          <div 
            key={stream.id} 
            className="db-stream-column-line" 
            style={{ 
              left: stream.left, 
              animationDelay: `${stream.delay}s`, 
              animationDuration: `${stream.duration}s`,
              opacity: stream.opacity
            }} 
          />
        ))}
      </div>

      {/* REUSABLE GLOBAL SIDEBAR */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMinimized={isSidebarMinimized} 
        setIsMinimized={setIsSidebarMinimized}
        onLogout={() => navigate("/login")}
      />

      {/* CORE WORKSPACE FRAME CONTAINER */}
      <div className="db-main-workspace-deck">
        <Header title={activeTab} />

        {/* FULL GRID SCREEN LAYOUT FLOOR */}
        <main className="db-cards-grid-architecture">
          
          <div className="db-glass-hud-card db-angle-tr">
            <div className="db-card-glitch-line" />
            <div className="db-card-lbl"><FiAward /> TELEMETRY RANK</div>
            <div className="db-rank-core-wrapper">
              <div className="db-rank-circular-node">
                <span className="db-rnk-label">LVL</span>
                <span className="db-rnk-value">42</span>
              </div>
              <div className="db-rank-data-stream">
                <div className="db-data-row-meta">
                  <span>EXP NODE</span>
                  <span className="db-cyan-neon">77%</span>
                </div>
                <div className="db-matrix-linear-bar">
                  <div className="db-matrix-linear-fill" style={{ width: "77%" }} />
                </div>
              </div>
            </div>
          </div>

          <div className="db-glass-hud-card">
            <div className="db-card-glitch-line" />
            <div className="db-card-lbl"><FiZap /> TOTAL CALORIC METRIC</div>
            <div className="db-center-numerical-readout">
              <span className="db-massive-stat db-text-amber">642</span>
              <span className="db-sub-unit">KCAL CONSUMED</span>
            </div>
          </div>

          <div className="db-glass-hud-card">
            <div className="db-card-glitch-line" />
            <div className="db-card-lbl"><FiActivity /> ACTIVITY LOAD</div>
            <div className="db-center-numerical-readout">
              <span className="db-massive-stat db-text-cyan">52</span>
              <span className="db-sub-unit">MINUTES ENGAGED</span>
            </div>
          </div>

          <div className="db-glass-hud-card db-side-brackets-only">
            <div className="db-card-glitch-line" />
            <div className="db-card-lbl"><FiTrendingUp /> ACTIVE CYCLE STREAK</div>
            <div className="db-streak-display-architecture">
              <span className="db-streak-digit-glow">18</span>
              <span className="db-streak-lbl-sub">DAYS ACTIVE</span>
            </div>
          </div>

          <div className="db-glass-hud-card db-angle-br db-span-3">
            <div className="db-card-glitch-line" />
            <div className="db-card-lbl"><FiTerminal /> RUNTIME DIAGNOSTIC DECK INPUT</div>
            <div className="db-terminal-log-scroller">
              {terminalLogs.map((log, index) => (
                <div key={index} className="db-terminal-string-line">
                  <span className="db-terminal-prompt">&gt;</span> {log}
                </div>
              ))}
            </div>
          </div>

          <div className="db-glass-hud-card db-angle-tl db-span-1">
            <div className="db-card-glitch-line" />
            <div className="db-card-lbl"><FiPlus /> OVERRIDE COMMANDS</div>
            <div className="db-button-stack-layout">
              <button className="db-console-submit-btn" onClick={() => addLogMessage("Dispatched execution thread: INITIALIZE_NEW_WORKOUT")}>
                INITIALIZE WORKOUT DECK
              </button>
              <button className="db-console-submit-btn db-secondary" onClick={() => addLogMessage("Dispatched operational reset sequence.")}>
                <FiRefreshCw /> SYNC BIO-METRICS
              </button>
            </div>
          </div>

        </main>
      </div>
    </motion.div>
  );
};

export default Dashboard;