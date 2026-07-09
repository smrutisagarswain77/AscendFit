import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiBell, FiUser, FiActivity, FiTerminal, FiShield } from "react-icons/fi";
import "../styles/Header.css";

const Header = ({ title }) => {
  const navigate = useNavigate();
  const [systemTime, setSystemTime] = useState("00:00:00");
  const [msCount, setMsCount] = useState("000");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfilePanel, setShowProfilePanel] = useState(false);

  // High-frequency synchronized atomic timer loop
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setSystemTime(now.toTimeString().split(" ")[0]);
      setMsCount(String(now.getMilliseconds()).padStart(3, "0"));
    }, 1);
    return () => clearInterval(timer);
  }, []);

  const alertsLog = [
    { id: "ALRT_01", message: "AI Coach completed data stream mapping.", time: "2m ago" },
    { id: "ALRT_02", message: "Biometric load threshold reached 85%.", time: "12m ago" },
  ];

  return (
    <header className="hd-system-node">
      {/* GLOBAL BACKGROUND ENERGY PULSE MESH */}
      <div className="hd-header-laser-beam" />

      <div className="hd-branding-group">
        <div className="hd-protocol-lbl">
          CORE_INTERFACE // <span className="hd-cyan-neon hd-glitch-text" data-text={title.toUpperCase()}>{title.toUpperCase()}</span>
        </div>
        <div className="hd-sub-status">
          <div className="hd-pulse-dot" /> 
          <span className="hd-pulse-tag">MATRIX TELEMETRY STABLE</span>
        </div>
      </div>

      {/* RE-ENGINEERED HIGH-DENSITY CLUSTER ARCHITECTURE */}
      <div className="hd-controls-cluster">
        
        {/* HYPER-INTERACTIVE CHRONOGRAPH GRAPHIC CONTAINER */}
        <div className="hd-chronograph-wrapper">
          <div className="hd-timer-matrix-grid-back" />
          <span className="hd-lbl">FRAME TIME CLOCK</span>
          <div className="hd-time-digits-container">
            <span className="hd-time-digits">{systemTime}</span>
            <span className="hd-ms-digits">.{msCount}</span>
          </div>
          <div className="hd-timer-laser-scanner" />
        </div>

        {/* ALERTS SYSTEM LOG HUB */}
        <div className="hd-interactive-panel-anchor">
          <button 
            className={`hd-icon-trigger-btn ${showNotifications ? "hd-panel-active" : ""}`}
            onClick={() => { navigate("/notification") }}
          >
            <FiBell className="hd-icon-layer" />
            <span className="hd-alert-badge-ping" />
            <div className="hd-btn-glow-shell" />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                className="hd-dropdown-glass-panel hd-angle-br"
                initial={{ opacity: 0, y: 15, scale: 0.96, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 10, scale: 0.96, filter: "blur(4px)" }}
                transition={{ type: "spring", stiffness: 500, damping: 24 }}
              >
                <div className="hd-panel-header">
                  <span><FiTerminal /> ALERTS_LOG</span>
                  <span className="hd-cyan-neon">SECURE</span>
                </div>
                <div className="hd-panel-scroller">
                  {alertsLog.map((alert) => (
                    <div key={alert.id} className="hd-panel-item-row">
                      <div className="hd-item-meta">
                        <span className="hd-item-id">{alert.id}</span>
                        <span className="hd-item-timestamp">{alert.time}</span>
                      </div>
                      <p className="hd-item-txt">{alert.message}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* BIOMETRIC OPERATOR FRAME IDENTITY CONTAINER */}
        <div className="hd-interactive-panel-anchor">
          <button 
            className={`hd-profile-trigger-btn ${showProfilePanel ? "hd-panel-active" : ""}`}
            onClick={() => { navigate("/profile") }}
          >
            <div className="hd-avatar-frame">
              <FiUser />
              <div className="hd-avatar-corner-brackets" />
            </div>
            <div className="hd-avatar-meta-stack">
              <span className="hd-user-callsign">OP_ZERO</span>
              <span className="hd-user-sub-node">SYS_ADMIN</span>
            </div>
            <div className="hd-profile-glow-shell" />
          </button>

          <AnimatePresence>
            {showProfilePanel && (
              <motion.div 
                className="hd-dropdown-glass-panel hd-angle-bl"
                initial={{ opacity: 0, y: 15, scale: 0.96, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 10, scale: 0.96, filter: "blur(4px)" }}
                transition={{ type: "spring", stiffness: 500, damping: 24 }}
              >
                <div className="hd-panel-header">
                  <span><FiShield /> BIOMETRIC IDENTITY</span>
                  <span className="hd-status-online-lbl">ONLINE</span>
                </div>
                <div className="hd-profile-stats-grid">
                  <div className="hd-stat-mini-box">
                    <span className="hd-box-lbl">SYNC ENGINES</span>
                    <span className="hd-box-val hd-cyan-neon">100%</span>
                  </div>
                  <div className="hd-stat-mini-box">
                    <span className="hd-box-lbl">QUANTUM LINK</span>
                    <span className="hd-box-val">SECURE</span>
                  </div>
                </div>
                <div className="hd-panel-footer-action">
                  <FiActivity className="hd-pulse-icon" /> ANALYZING NODE DATA TRACE
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </header>
  );
};

export default Header;