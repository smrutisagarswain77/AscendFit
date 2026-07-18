import React, { useState, useEffect, useRef } from "react";
import useAppContext from "../hooks/useAppContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiAward, FiActivity, FiCpu, FiClock, FiAlertTriangle, 
  FiUser, FiCheckSquare, FiTrash2, FiMaximize2, FiX, 
  FiTerminal, FiLayers, FiRadio
} from "react-icons/fi";
import "../styles/Notification.css";

const Notification = ({ onClose }) => {
  const navigate = useNavigate();
  const {
    appData,
    toggleNotificationRead,
    markAllNotificationsRead,
    clearReadNotifications
  } = useAppContext();
  const canvasRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("All");
  
  // Real-time background logging array simulations
  const [liveLogs, setLiveLogs] = useState([
    { id: 1, text: "Workout Engine Online", time: "00:01" },
    { id: 2, text: "AI Connected & Calibrating", time: "00:03" },
    { id: 3, text: "Cloud Sync Complete [Sector 7]", time: "00:04" }
  ]);

  // --- COMPREHENSIVE PRODUCTION NOTIFICATION MATRIX ---
  
  const notifications = appData.notifications.items;

  // --- UNIFIED QUANTUM PARTICLE CANVAS MATRIX (Matches your Dashboard exactly) ---
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


  const iconMap = {
    award: <FiAward />,
    cpu: <FiCpu />,
    activity: <FiActivity />,
    clock: <FiClock />,
    alert: <FiAlertTriangle />,
    user: <FiUser />,
  };

  // --- LIVE TELEMETRY SIMULATOR LOGS ---
  useEffect(() => {
    const metrics = ["System Array Flushed", "Quest Core Validated", "Heartrate Cache Synced", "Neural Engine Peak Performance"];
    const interval = setInterval(() => {
      const timestamp = new Date().toTimeString().split(' ')[0].slice(0, 5);
      const chosenText = metrics[Math.floor(Math.random() * metrics.length)];
      setLiveLogs(prev => [{ id: Date.now(), text: chosenText, time: timestamp }, ...prev.slice(0, 4)]);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // --- CARD CONTROLLERS ---
  const markAllRead = () => {
      markAllNotificationsRead();
  };

  const clearRead = () => {
      clearReadNotifications();
  };

  const toggleRead = (id) => {
      toggleNotificationRead(id);
  };

  // --- STATS COMPILER ---
  const stats = {
    total: notifications.length,
    unread: notifications.filter(n => !n.isRead).length,
    achievements: notifications.filter(n => n.type === "Achievements").length,
    ai: notifications.filter(n => n.type === "AI").length,
    workouts: notifications.filter(n => n.type === "Workouts").length,
  };

  const filteredItems = notifications.filter(n => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Unread") return !n.isRead;
    return n.type === activeFilter;
  });

  const timelineGroups = ["TODAY", "YESTERDAY", "This Week", "Earlier"];

  // Framer motion containers for dynamic stagger loads
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="nt-viewport-matrix-shell">
      <canvas ref={canvasRef} className="nt-canvas-particle-layer" />
      <div className="nt-perimeter-cyber-border" />

      {/* ADVANCED PROFILE-STYLE RETICLE ESCAPE CROSSHAIR */}
      <button className="nt-abort-hud-crosshair" onClick={onClose || (() => navigate(-1))}>
        <div className="nt-crosshair-line line-horiz" />
        <div className="nt-crosshair-line line-vert" />
        <div className="nt-crosshair-box" />
        <FiX className="nt-escape-vector-icon" />
        <span className="nt-escape-readout-string">ABORT_LOG</span>
      </button>

      <div className="nt-central-layout-hub">
        
        {/* LEFT COLUMN: ACTIVE INTERACTIVE LOG WINDOW */}
        <div className="nt-logs-primary-viewport">
          
          <header className="nt-stream-header-deck">
            <div className="nt-branding-glitch-node">
              <FiTerminal className="nt-terminal-masthead-icon" />
              <div>
                <span className="nt-hud-subtext-tag">// DETECTING_RECENT_TRANSACTIONS</span>
                <h1 className="nt-page-headline">COMMAND LOGS</h1>
              </div>
            </div>

            <div className="nt-header-actions-deck">
              <div className="nt-count-badge-capsule">
                <span className="nt-badge-lbl unread-color">{stats.unread} UNREAD</span>
                <span className="nt-badge-split">|</span>
                <span className="nt-badge-lbl total-color">{stats.total} TOTAL</span>
              </div>
              <div className="nt-header-btn-cluster">
                <button className="nt-telemetry-action-btn" onClick={markAllRead}>
                  <FiCheckSquare /> <span>MARK ALL READ</span>
                </button>
                <button className="nt-telemetry-action-btn nt-danger-override" onClick={clearRead}>
                  <FiTrash2 /> <span>CLEAR ALL READ</span>
                </button>
              </div>
            </div>
          </header>

          {/* DYNAMIC CHIP RAIL */}
          <div className="nt-filter-chips-rail">
            {["All", "Unread", "Achievements", "Workouts", "AI", "System"].map(filter => (
              <button
                key={filter}
                className={`nt-filter-node-chip ${activeFilter === filter ? "nt-chip-engaged" : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                <span className="nt-chip-inner-text">{filter.toUpperCase()}</span>
                {activeFilter === filter && <motion.div className="nt-chip-laser-underline" layoutId="laserUnderline" />}
              </button>
            ))}
          </div>

          {/* TIMELINE BUFFER SCROLLWAY */}
          <motion.div 
            className="nt-timeline-scrollway"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={activeFilter}
          >
            {filteredItems.length === 0 ? (
              <div className="nt-empty-terminal-card">
                <FiRadio className="nt-radar-ping-vector" />
                <h4>COMMAND BUFFER EMPTY</h4>
                <p>No active session tokens matching criteria were caught in the stream network feed.</p>
              </div>
            ) : (
              timelineGroups.map(group => {
                const groupedData = filteredItems.filter(n => n.timeline === group);
                if (groupedData.length === 0) return null;

                return (
                  <div key={group} className="nt-timeline-quantum-section">
                    <div className="nt-timeline-horizontal-divider">
                      <span className="nt-timeline-string-tag">{group}</span>
                      <div className="nt-timeline-laser-run" />
                    </div>

                    <div className="nt-timeline-vertical-cards-stack">
                      {groupedData.map(item => (
                        <motion.div
                          key={item.id}
                          variants={itemVariants}
                          whileHover={{ y: -3, scale: 1.005, transition: { duration: 0.2 } }}
                          className={`nt-cyber-notification-card priority-${item.priority} ${item.isRead ? "state-read-dim" : "state-unread-pulse"}`}
                        >
                          <div className="nt-card-laser-scanner" />
                          <div className="nt-card-matrix-grid-overlay" />
                          
                          <div className="nt-priority-left-stripe" />

                          <div className="nt-card-inner-telemetry">
                            <div className="nt-card-top-meta-row">
                              <div className="nt-card-category-block">
                                <span className="nt-cat-vector-bracket">{iconMap[item.icon]}</span>
                                <span className="nt-cat-string-tag">{item.tag}</span>
                              </div>
                              <div className="nt-card-timestamp-block">
                                <FiMaximize2 className="nt-crosshair-icon-mini" />
                                <span>{item.timeText.toUpperCase()}</span>
                              </div>
                            </div>

                            <div className="nt-card-core-prose">
                              <h4 className="nt-card-title-node" onClick={() => toggleRead(item.id)}>
                                {item.title}
                              </h4>
                              <p className="nt-card-message-body">{item.message}</p>
                            </div>

                            {/* CONDITIONAL QUICK INTERACTIVE ACTION FOOTERS */}
                            {(item.action || item.meta) && (
                              <div className="nt-card-action-dock-bay">
                                {item.action ? (
                                  <button className="nt-macro-trigger-action-btn" onClick={() => navigate(item.action.route)}>
                                    <span className="nt-macro-btn-txt">{item.action.label}</span>
                                  </button>
                                ) : (
                                  <div className="nt-static-meta-pill">
                                    <span>{item.meta}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          {/* QUICK INTERACTIVE STATUS TOGGLE BEAD */}
                          <button 
                            className="nt-card-quick-read-toggle" 
                            onClick={() => toggleRead(item.id)}
                            title={item.isRead ? "Mark Unread" : "Mark Read"}
                          >
                            <div className="nt-status-bead-dot" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </motion.div>
        </div>

        {/* RIGHT COLUMN: AUXILIARY METRIC CONTROL DATA DOCKS */}
        <aside className="nt-auxiliary-metric-sidebar">
          
          {/* STATISTICS TERMINAL */}
          <div className="nt-hud-aux-card">
            <div className="nt-aux-corner-bracket" />
            <div className="nt-aux-header-strip">
              <FiLayers />
              <h5>LOG METRIC STATISTICS</h5>
            </div>
            <div className="nt-aux-metrics-stack">
              <div className="nt-aux-row">
                <span className="lbl">UNREAD BUFFERS</span>
                <span className="val color-amber">{stats.unread}</span>
              </div>
              <div className="nt-aux-row">
                <span className="lbl">ARCHIVED RECORDS</span>
                <span className="val">{stats.total - stats.unread}</span>
              </div>
              <div className="nt-aux-row">
                <span className="lbl">ACHIEVEMENTS LOADED</span>
                <span className="val color-gold">{stats.achievements}</span>
              </div>
              <div className="nt-aux-row">
                <span className="lbl">AI PREDICTIVE DISPATCHES</span>
                <span className="val color-purple">{stats.ai}</span>
              </div>
              <div className="nt-aux-row">
                <span className="lbl">COMPLETED TRAINING LOGS</span>
                <span className="val color-blue">{stats.workouts}</span>
              </div>
            </div>
          </div>

          {/* REALTIME SYSTEM STREAM TERMINAL */}
          <div className="nt-hud-aux-card system-feed-override">
            <div className="nt-aux-corner-bracket" />
            <div className="nt-aux-header-strip">
              <div className="nt-live-bead-pulse-glow" />
              <h5>LIVE CORES MATRIX FEED</h5>
            </div>
            <div className="nt-terminal-logs-screen">
              <AnimatePresence mode="popLayout">
                {liveLogs.map(log => (
                  <motion.div 
                    key={log.id} 
                    className="nt-terminal-log-line"
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="nt-term-time">[{log.time}]</span>
                    <span className="nt-term-string">&gt; {log.text.toUpperCase()}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div className="nt-terminal-listening-row">
                <span className="nt-terminal-cursor">_</span> SYSTEM LISTENING OK...
              </div>
            </div>
          </div>

        </aside>

      </div>
    </div>
  );
};

export default Notification;