import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import useAppContext from "../hooks/useAppContext";

import { 
  FiBookOpen, 
  FiSearch, 
  FiFilter, 
  FiPlus, 
  FiInfo, 
  FiLayers, 
  FiTrendingUp, 
  FiCpu, 
  FiX, 
  FiChevronRight, 
  FiCheck,
  FiZap,
  FiClock
} from "react-icons/fi";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/Exercises.css";

const Exercises = () => {
  const navigate = useNavigate();
  const {
    appData,
    updateExercises
  } = useAppContext();
  const canvasRef = useRef(null);
  const [activeTab, setActiveTab] = useState("exercises");
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  
  // Interactive State Matrix
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedEquipment, setSelectedEquipment] = useState("All");
  const [selectedExercise, setSelectedExercise] = useState(null);
  
  // Simulation Mode state (Browsing vs Add-To-Workout Mode Context)
  const [isBrowsingContext, setIsBrowsingContext] = useState(true);
  const addedTracker = appData.exercises.addedTracker;

  // Mock Database Array
  const exerciseDatabase = appData.exercises.exerciseList;

  const recentlyViewed = appData.exercises.recentlyViewed;

  const aiCoachRecommendation =
  appData.exercises.aiCoachRecommendation;

  // Matrix Particle Canvas Sync Loop
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

  // Real-time mouse matrix coordinate mapper for the 3D card tilt effect
  const handleMouseMove3D = (e, currentTarget) => {
    const rect = currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    currentTarget.style.setProperty("--mouse-x", `${x}px`);
    currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  const filteredDatabase = exerciseDatabase.filter((ex) => {
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ex.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || ex.muscleGroup === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || ex.difficulty === selectedDifficulty;
    const matchesEquipment = selectedEquipment === "All" || ex.equipment === selectedEquipment;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesEquipment;
  });

  const triggerCardInspect = (exercise) => {
    setSelectedExercise(exercise);

    if (!recentlyViewed.includes(exercise.id)) {
      updateExercises({
        recentlyViewed: [
          exercise.id,
          ...recentlyViewed.filter(id => id !== exercise.id)
        ].slice(0, 4)
      });
    }
  };

  const toggleAddWorkoutNode = (id, e) => {
    e.stopPropagation();

    updateExercises({
      addedTracker: {
        ...addedTracker,
        [id]: !addedTracker[id]
      }
    });
  };

  return (
    <div className="edb-viewport-wrapper">
      <canvas ref={canvasRef} className="edb-background-particle-plane" />
      <div className="edb-perimeter-glass-wire" />

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMinimized={isSidebarMinimized}
        setIsMinimized={setIsSidebarMinimized}
        onLogout={() => navigate("/login")}
      />

      <div className="edb-workspace-axis">
        <Header title="EXERCISE LIBRARY ENGINE" />

        <div className="edb-scrollable-content-node">
          
          {/* TOP SHELF DASHBOARD ROW */}
          <div className="edb-top-dashboard-row">
            <div className="edb-recommendation-panel db-angle-tl">
              <div className="edb-reco-glitched-border" />
              <div className="edb-section-header-tag">
                <span className="edb-ai-bead" /> <FiCpu /> AI REC_COACH // TELEMETRY SUGGESTION
              </div>
              <div className="edb-reco-core-content">
                <div className="edb-reco-meta">
                  <h4>{aiCoachRecommendation.name}</h4>
                  <div className="edb-meta-chips">
                    <span className="edb-badge-chip b-chest">{aiCoachRecommendation.muscleGroup}</span>
                    <span className="edb-badge-chip b-inter">{aiCoachRecommendation.difficulty}</span>
                  </div>
                </div>
                <p className="edb-reco-explanation">{aiCoachRecommendation.reasoning}</p>
              </div>
            </div>

            <div className="edb-context-toggle-box">
              <span className="edb-context-lbl">SYSTEM ACCESS CONTEXT</span>
              <div className="edb-toggle-mesh">
                <button 
                  className={`edb-toggle-node ${isBrowsingContext ? "active" : ""}`}
                  onClick={() => setIsBrowsingContext(true)}
                >
                  STANDARD BROWSE
                </button>
                <button 
                  className={`edb-toggle-node ${!isBrowsingContext ? "active" : ""}`}
                  onClick={() => setIsBrowsingContext(false)}
                >
                  WORKOUT DISPATCH
                </button>
              </div>
              <p className="edb-context-subtext-desc">
                {isBrowsingContext 
                  ? "Displaying general asset exploration layout. Sub-actions trigger technical core data summaries."
                  : "Active link established to Routine Compiler. Interface unlocking structural modification commands."}
              </p>
            </div>
          </div>

          {/* DYNAMIC CATEGORY TRACKER CHIPS */}
          <div className="edb-category-scroller-bar">
            {["All", "Chest", "Back", "Legs", "Shoulders", "Arms", "Core"].map((category) => (
              <button
                key={category}
                className={`edb-category-chip-btn ${selectedCategory === category ? "edb-chip-active" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                <span className="edb-chip-laser-dot" />
                {category.toUpperCase()}
              </button>
            ))}
          </div>

          {/* COMBINED OPERATIONAL DISPATCH CONSOLE BAR */}
          <div className="edb-operations-console">
            
            {/* SEARCH MATRIX INPUT CONTAINER WITH ADVANCED GLOW/HOVER SYSTEMS */}
            <div className="edb-search-matrix-input">
              <div className="edb-search-shimmer-track" />
              <FiSearch className="edb-search-icon-vector" />
              <input 
                type="text" 
                placeholder="Query database strings... (e.g. Bench Press, Squat)" 
                className="edb-terminal-field"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="edb-search-laser-ray" />
              <div className="edb-search-scanner-bar" />
              <div className="edb-input-frame-corners" />
            </div>

            {/* EXPANDED SYSTEM FILTER MATRIX CHANNELS */}
            <div className="edb-dropdown-filter-array">
              <div className="edb-select-shell">
                <FiFilter className="edb-select-decor-icon" />
                <select 
                  className="edb-system-select"
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                >
                  <option value="All">ALL DIFFICULTIES</option>
                  <option value="Beginner">BEGINNER CORE</option>
                  <option value="Intermediate">INTERMEDIATE INDEX</option>
                  <option value="Advanced">ADVANCED MATRIX</option>
                </select>
              </div>

              <div className="edb-select-shell">
                <FiLayers className="edb-select-decor-icon" />
                <select 
                  className="edb-system-select"
                  value={selectedEquipment}
                  onChange={(e) => setSelectedEquipment(e.target.value)}
                >
                  <option value="All">ALL EQUIPMENT</option>
                  <option value="Bodyweight">BODYWEIGHT AXIS</option>
                  <option value="Dumbbell">DUMBBELL STRUCT</option>
                  <option value="Barbell">BARBELL LOAD</option>
                  <option value="Machine">MACHINE SYSTEM</option>
                </select>
              </div>
            </div>
          </div>

          {/* CORE ELEMENT DATABASE MESH LAYOUT */}
          {filteredDatabase.length === 0 ? (
            <div className="edb-empty-state-banner db-angle-tl">
              <div className="edb-empty-sonar-wave" />
              <h3>ZERO SCHEMATIC ARTIFACTS INTERCEPTED</h3>
              <p>No active database entries comply with specified search string filters. Adjust variables to align signal frequencies.</p>
              <button className="edb-reset-filter-trigger" onClick={() => { setSearchQuery(""); setSelectedCategory("All"); setSelectedDifficulty("All"); setSelectedEquipment("All"); }}>
                RESET COMPILER GRID
              </button>
            </div>
          ) : (
            <div className="edb-database-grid-mesh">
              {filteredDatabase.map((exercise) => (
                <div 
                  key={exercise.id} 
                  className="edb-exercise-hud-card"
                  onMouseMove={(e) => handleMouseMove3D(e, e.currentTarget)}
                  onClick={() => triggerCardInspect(exercise)}
                >
                  <div className="edb-card-hologram-glow" />
                  <div className="edb-card-scanline-beam" />
                  <div className="edb-card-anchor-tr" />
                  
                  <div className="edb-card-top-identity">
                    <span className="wcc-input-cyber-laser" style={{ top: 0, height: "1px", width: "40%" }} />
                    <span className="edb-muscle-group-subtag">{exercise.muscleGroup.toUpperCase()} HUB</span>
                    <span className={`edb-difficulty-bead bead-${exercise.difficulty.toLowerCase()}`}>
                      {exercise.difficulty.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="edb-card-title-string">{exercise.name}</h3>
                  <p className="edb-card-truncated-desc">{exercise.description}</p>

                  <div className="edb-card-hardware-footer">
                    <span className="edb-equipment-spec"><FiLayers /> {exercise.equipment}</span>
                    
                    {isBrowsingContext ? (
                      <button className="edb-card-action-btn-trigger">
                        VIEW SCHEMATIC <FiChevronRight />
                      </button>
                    ) : (
                      <button 
                        className={`edb-card-add-btn-node ${addedTracker[exercise.id] ? "added" : ""}`}
                        onClick={(e) => toggleAddWorkoutNode(exercise.id, e)}
                      >
                        {addedTracker[exercise.id] ? (
                          <>ADDED TO FILE <FiCheck /></>
                        ) : (
                          <>ADD TO WORKOUT <FiPlus /></>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ACCESS HISTORY STREAM FOOTER */}
          <div className="edb-history-horizontal-cluster">
            <div className="edb-history-title">
              <FiClock /> RECENT SIGNAL TELEMETRIES:
            </div>
            <div className="edb-history-row-nodes">
              {recentlyViewed.map((viewedId) => {
                const matchedObj = exerciseDatabase.find(e => e.id === viewedId);
                if (!matchedObj) return null;
                return (
                  <div 
                    key={viewedId} 
                    className="edb-history-micro-chip"
                    onClick={() => setSelectedExercise(matchedObj)}
                  >
                    <span className="edb-micro-bead" />
                    <span className="edb-micro-lbl">{matchedObj.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* DETAILED SPECIFICATION HOVER DRAWER OVERLAY PANEL */}
      <AnimatePresence>
        {selectedExercise && (
          <div className="edb-drawer-overlay-backdrop" onClick={() => setSelectedExercise(null)}>
            <motion.div 
              className="edb-drawer-panel-glass-shell db-angle-tl"
              initial={{ x: "100%", opacity: 0.8 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.8 }}
              transition={{ type: "spring", stiffness: 380, damping: 35 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="edb-drawer-cyber-top-rim" />
              
              <div className="edb-drawer-header-actions">
                <div className="edb-system-id-label">ASSET_SPEC // {selectedExercise.id.toUpperCase()}</div>
                <button className="edb-drawer-close-btn" onClick={() => setSelectedExercise(null)}>
                  <FiX />
                </button>
              </div>

              <div className="edb-drawer-scrollable-body">
                <h2 className="edb-drawer-main-title">{selectedExercise.name}</h2>
                
                <div className="edb-drawer-badge-grid">
                  <div className="edb-drawer-spec-badge">
                    <span className="edb-badge-lbl">TARGET INDICES</span>
                    <span className="edb-badge-value text-cyan">{selectedExercise.muscleGroup}</span>
                  </div>
                  <div className="edb-drawer-spec-badge">
                    <span className="edb-badge-lbl">DIFFICULTY RATING</span>
                    <span className="edb-badge-value text-purple">{selectedExercise.difficulty}</span>
                  </div>
                  <div className="edb-drawer-spec-badge">
                    <span className="edb-badge-lbl">EQUIPMENT ANCHOR</span>
                    <span className="edb-badge-value">{selectedExercise.equipment}</span>
                  </div>
                </div>

                <div className="edb-drawer-content-section">
                  <h4 className="edb-section-subtitle-matrix"><FiInfo /> STRUCTURAL ANATOMICAL SUMMARY</h4>
                  <p className="edb-drawer-description-block">{selectedExercise.description}</p>
                </div>

                <div className="edb-drawer-content-section">
                  <h4 className="edb-section-subtitle-matrix"><FiTrendingUp /> COACH EXECUTION PROCEDURES & PROTOCOLS</h4>
                  <ul className="edb-tips-list-block">
                    {selectedExercise.tips && selectedExercise.tips.map((tip, index) => (
                      <li key={index} className="edb-tip-item-element">
                        <div className="edb-bullet-laser-dash" />
                        <p>{tip}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="edb-drawer-media-placeholder-container">
                  <div className="edb-media-grid-lines" />
                  <FiZap className="edb-media-icon-glitch" />
                  <span>HOLOGRAPHIC VIDEO RECONSTRUCTION LINK DISCONNECTED</span>
                  <p className="edb-media-subtext">Layout placeholder verified. Camera recording streams can be injected without framework disruption.</p>
                </div>
              </div>

              <div className="edb-drawer-footer-actions-panel">
                <button className="edb-drawer-abort-trigger-btn" onClick={() => setSelectedExercise(null)}>
                  CLOSE RECONSTRUCTION
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Exercises;