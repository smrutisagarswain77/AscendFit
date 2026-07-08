import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiActivity, 
  FiSearch, 
  FiFilter, 
  FiPlus, 
  FiPlay, 
  FiEye, 
  FiEdit2, 
  FiTrash2, 
  FiClock, 
  FiZap, 
  FiX,
  FiCheckCircle
} from "react-icons/fi";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/Workouts.css";

const Workouts = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [activeTab, setActiveTab] = useState("workouts");
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  
  // Search, Filter & Global Page Pulse State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false); 

  const [newWorkout, setNewWorkout] = useState({ name: "", notes: "", category: "Push" });

  const [workouts, setWorkouts] = useState([
    {
      id: "w-01",
      name: "Hypertrophy Push Alpha",
      status: "In Progress",
      exercises: 6,
      duration: 52,
      calories: 480,
      date: "2026-07-08",
      readiness: "Ready",
      recovery: "High",
      aiRecommendation: true,
      category: "Push"
    },
    {
      id: "w-02",
      name: "Posterior Chain Pull Bravo",
      status: "Completed",
      exercises: 5,
      duration: 60,
      calories: 510,
      date: "2026-07-06",
      readiness: "Moderate",
      recovery: "Medium",
      aiRecommendation: false,
      category: "Pull"
    },
    {
      id: "w-03",
      name: "Anterior Quad Dominant Delta",
      status: "Draft",
      exercises: 7,
      duration: 45,
      calories: 400,
      date: "2026-07-02",
      readiness: "Rest Recommended",
      recovery: "Low",
      aiRecommendation: false,
      category: "Legs"
    }
  ]);

  const [activeUnfinishedWorkout] = useState({
    name: "Hypertrophy Push Alpha",
    completedExercises: 3,
    totalExercises: 6,
    elapsedMinutes: 32
  });

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

  const handleCreateWorkout = (e) => {
    e.preventDefault();
    if (!newWorkout.name.trim()) return;

    // Trigger unique data-grid synchronization pulse
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1200);

    const deployedNode = {
      id: `w-${Date.now()}`,
      name: newWorkout.name,
      status: "Draft",
      exercises: 0,
      duration: 0,
      calories: 0,
      date: new Date().toISOString().split('T')[0],
      readiness: "Ready",
      recovery: "High",
      aiRecommendation: false,
      category: newWorkout.category
    };

    setWorkouts([deployedNode, ...workouts]);
    setNewWorkout({ name: "", notes: "", category: "Push" });
    setShowCreateModal(false);
  };

  const deleteWorkoutNode = (id) => {
    setWorkouts(workouts.filter(w => w.id !== id));
  };

  const filteredWorkouts = workouts.filter(w => {
    const matchesSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          w.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (activeFilter === "All") return true;
    if (activeFilter === "Completed") return w.status === "Completed";
    if (activeFilter === "In Progress") return w.status === "In Progress";
    return true;
  });

  return (
    <div className={`wcc-viewport-wrapper ${isSyncing ? "wcc-grid-matrix-syncing" : ""}`}>
      <canvas ref={canvasRef} className="wcc-background-particle-plane" />
      <div className="wcc-perimeter-glass-wire" />
      
      {/* UNIQUE WAVE ELEMENT */}
      <div className="wcc-quantum-pulse-wave" />

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMinimized={isSidebarMinimized}
        setIsMinimized={setIsSidebarMinimized}
        onLogout={() => navigate("/login")}
      />

      <div className="wcc-workspace-axis">
        <Header title="WORKOUT COMMAND CENTER" />

        <div className="wcc-scrollable-content-node">
          
          {/* STATISTICS CLUSTER PANELS WITH DEPTH-SHIFT HOVER EFFECTS */}
          <div className="wcc-summary-grid">
            <div className="wcc-stat-hud-box db-angle-tl">
              <div className="wcc-stat-hover-glare" />
              <span className="wcc-stat-lbl">WORKOUTS THIS WEEK</span>
              <span className="wcc-stat-val text-cyan">5 <span className="wcc-stat-unit">SESSIONS</span></span>
            </div>
            <div className="wcc-stat-hud-box">
              <div className="wcc-stat-hover-glare" />
              <span className="wcc-stat-lbl">ENERGY EXPEDITION</span>
              <span className="wcc-stat-val text-purple">2,450 <span className="wcc-stat-unit">KCAL</span></span>
            </div>
            <div className="wcc-stat-hud-box">
              <div className="wcc-stat-hover-glare" />
              <span className="wcc-stat-lbl">TOTAL TIME LOAD</span>
              <span className="wcc-stat-val">158 <span className="wcc-stat-unit">MINS</span></span>
            </div>
            <div className="wcc-stat-hud-box db-angle-tr">
              <div className="wcc-stat-hover-glare" />
              <span className="wcc-stat-lbl">LONGEST WORKOUT THREAD</span>
              <span className="wcc-stat-val text-cyan">72 <span className="wcc-stat-unit">MINS</span></span>
            </div>
          </div>

          {/* ACTIVE LIVE INTERCEPT SESSION */}
          <AnimatePresence>
            {activeUnfinishedWorkout && (
              <motion.div 
                className="wcc-continue-glass-banner"
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                <div className="wcc-radar-pulse-glow" />
                <div className="wcc-continue-details">
                  <div className="wcc-live-tag">
                    <span className="wcc-blinking-dot" /> LIVE SESSION DETECTED
                  </div>
                  <h3>{activeUnfinishedWorkout.name}</h3>
                  <div className="wcc-live-metrics">
                    <span><FiActivity /> {activeUnfinishedWorkout.completedExercises} / {activeUnfinishedWorkout.totalExercises} Exercises</span>
                    <span><FiClock /> {activeUnfinishedWorkout.elapsedMinutes} mins elapsed</span>
                  </div>
                </div>
                <button className="wcc-action-glow-btn" onClick={() => navigate("/active-workout")}>
                  CONTINUE OPERATION <FiPlay />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CENTRAL COMMAND OPERATIONS BAR */}
          <div className="wcc-operations-row">
            <div className="wcc-search-wrapper-node">
              <FiSearch className="wcc-search-vector-icon" />
              <input 
                type="text" 
                placeholder="Query workout string... (e.g., Push, Chest)" 
                className="wcc-terminal-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="wcc-input-cyber-laser" />
            </div>

            <div className="wcc-filter-cluster">
              {["All", "Completed", "In Progress"].map((filter) => (
                <button
                  key={filter}
                  className={`wcc-filter-node-btn ${activeFilter === filter ? "wcc-active-filter" : ""}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            <button className="wcc-deploy-workout-btn" onClick={() => setShowCreateModal(true)}>
              <FiPlus /> DEPLOY NEW WORKOUT
            </button>
          </div>

          {/* WORKOUT INTERFACE MATRIX */}
          {filteredWorkouts.length === 0 ? (
            <div className="wcc-empty-state-card db-angle-bl db-angle-br">
              <div className="wcc-empty-radar-icon" />
              <h3>NO ACTIVE WORKOUT SCHEMATICS DETECTED</h3>
              <p>Initialize a new localized workout file to start tracking data records.</p>
              <button className="wcc-deploy-workout-btn" onClick={() => setShowCreateModal(true)}>
                <FiPlus /> CREATE FIRST WORKOUT
              </button>
            </div>
          ) : (
            <div className="wcc-cards-layout-mesh">
              {filteredWorkouts.map((workout) => (
                <div key={workout.id} className="wcc-workout-hud-card">
                  <div className="wcc-card-laser-scanner" />
                  
                  <div className="wcc-card-top-header">
                    <span className={`wcc-status-strip strip-${workout.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {workout.status === "Completed" && <FiCheckCircle />}
                      {workout.status === "In Progress" && <span className="wcc-blinking-dot" />}
                      {workout.status.toUpperCase()}
                    </span>
                    <span className="wcc-card-timestamp-lbl">{workout.date}</span>
                  </div>

                  <h4 className="wcc-card-title-string">{workout.name}</h4>
                  <span className="wcc-category-subtag-node">{workout.category.toUpperCase()} ROUTINE</span>

                  <div className={`wcc-readiness-node readiness-${workout.readiness.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="wcc-readiness-flex-row">
                      <span className="wcc-indicator-bead" />
                      <span className="wcc-readiness-label">{workout.readiness}</span>
                    </div>
                    <span className="wcc-recovery-sub-metric">Recovery: {workout.recovery}</span>
                    {workout.aiRecommendation && (
                      <div className="wcc-ai-badge-ticker"><FiZap /> AI RECOMMENDED TODAY</div>
                    )}
                  </div>

                  <div className="wcc-card-metrics-row">
                    <div className="wcc-mini-data-slot">
                      <span className="wcc-slot-lbl">EXERCISES</span>
                      <span className="wcc-slot-val">{workout.exercises}</span>
                    </div>
                    <div className="wcc-mini-data-slot">
                      <span className="wcc-slot-lbl">DURATION</span>
                      <span className="wcc-slot-val text-cyan">{workout.duration}m</span>
                    </div>
                    <div className="wcc-mini-data-slot">
                      <span className="wcc-slot-lbl">ENERGY LOAD</span>
                      <span className="wcc-slot-val text-purple">{workout.calories}K</span>
                    </div>
                  </div>

                  <div className="wcc-card-actions-footer">
                    <button className="wcc-footer-trigger-btn primary-start" onClick={() => navigate("/active-workout")}>
                      <FiPlay /> START
                    </button>
                    <div className="wcc-footer-secondary-group">
                      <button className="wcc-footer-trigger-btn" title="View Protocol"><FiEye /></button>
                      <button className="wcc-footer-trigger-btn" title="Modify Schematic"><FiEdit2 /></button>
                      <button className="wcc-footer-trigger-btn text-danger" title="Purge Record" onClick={() => deleteWorkoutNode(workout.id)}>
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL CONFIGURATION */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="wcc-modal-backdrop">
            <motion.div 
              className="wcc-modal-glass-container db-angle-tl db-angle-br"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
            >
              <div className="wcc-modal-glitch-line" />
              <div className="wcc-modal-header-row">
                <h3><FiActivity /> DEPLOY WORKOUT SCHEMATIC</h3>
                <button className="wcc-modal-close-trigger" onClick={() => setShowCreateModal(false)}>
                  <FiX />
                </button>
              </div>

              <form onSubmit={handleCreateWorkout} className="wcc-modal-form-body">
                <div className="wcc-form-field-group">
                  <label className="wcc-field-lbl">WORKOUT PROTOCOL NAME *</label>
                  <div className="wcc-modal-input-shell">
                    <input 
                      type="text" 
                      required
                      placeholder="Enter structural identifier..." 
                      className="wcc-form-input"
                      value={newWorkout.name}
                      onChange={(e) => setNewWorkout({...newWorkout, name: e.target.value})}
                    />
                    <span className="wcc-input-cyber-laser" />
                  </div>
                </div>

                <div className="wcc-form-field-group">
                  <label className="wcc-field-lbl">TARGET CATEGORY CLASSIFICATION</label>
                  <div className="wcc-modal-input-shell">
                    <select 
                      className="wcc-form-input wcc-select-override"
                      value={newWorkout.category}
                      onChange={(e) => setNewWorkout({...newWorkout, category: e.target.value})}
                    >
                      <option value="Push">PUSH INDEX</option>
                      <option value="Pull">PULL INDEX</option>
                      <option value="Legs">LEGS SYSTEM</option>
                    </select>
                    <span className="wcc-input-cyber-laser" />
                  </div>
                </div>

                <div className="wcc-modal-form-actions-footer">
                  <button type="button" className="wcc-form-cancel-btn" onClick={() => setShowCreateModal(false)}>
                    ABORT OPERATION
                  </button>
                  <button type="submit" className="wcc-form-deploy-btn">
                    DEPLOY SCHEMATIC
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Workouts;