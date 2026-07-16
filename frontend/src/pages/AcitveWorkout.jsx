import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiPlay, FiPause, FiChevronsRight, FiPlus, FiMinus, 
  FiCheckCircle, FiClock, FiZap, FiActivity, FiLayers, 
  FiAlertTriangle, FiShield, FiRotateCcw, FiLogOut, FiAward, FiTrendingUp 
} from "react-icons/fi";
import "../styles/ActiveWorkout.css";

// Mocking a structured mission workout configuration injected from the parent Workout route
const MISSION_DATA = {
  id: "m_push_alpha",
  name: "PUSH DAY: OVERRIDE",
  totalExercises: 3,
  targetXp: 350,
  exercises: [
    {
      id: "ex_1",
      name: "Progressive Bench Press",
      muscleGroup: "Chest",
      secondaryMuscles: ["Triceps", "Front Delts"],
      videoFolder: "chest",
      videoFile: "chest_01.mp4",
      difficulty: "Intermediate",
      targetSets: 4,
      targetReps: 10,
      targetWeight: 60,
      history: { target: "60 kg × 10", lastSession: "57.5 kg × 10", personalBest: "65 kg × 8" },
      steps: ["Lie flat on the bench.", "Grip the bar slightly wider than shoulder-width.", "Lower the weight slowly to mid-chest.", "Press upward explosively while keeping shoulders locked.", "Repeat for the target repetition framework."],
      mistakes: ["Bouncing the bar forcefully off your sternum.", "Flaring elbows outward at a sharp 90-degree angle.", "Arching the lumbar spine excessively off the bench pad."],
      safety: ["Ensure a spotter or safety rails are active.", "Execute a thorough progressive warm-up first.", "Maintain complete kinetic control over the eccentric load phase."]
    },
    {
      id: "ex_2",
      name: "Incline Dumbbell Press",
      muscleGroup: "Chest",
      secondaryMuscles: ["Front Delts", "Triceps"],
      videoFolder: "chest",
      videoFile: "chest_02.mp4",
      difficulty: "Intermediate",
      targetSets: 3,
      targetReps: 12,
      targetWeight: 24,
      history: { target: "24 kg × 12", lastSession: "22.5 kg × 12", personalBest: "26 kg × 10" },
      steps: ["Set incline bench to a 30-45 degree angle.", "Position dumbbells at chest level with neutral wrists.", "Drive dumbbells up until arms are fully extended.", "Lower slowly down to deep chest pocket stretch."],
      mistakes: ["Using too steep of an angle shifting work to front delts.", "Clashing dumbbells together at the top of the movement."],
      safety: ["Keep your feet planted flat on the floor for lateral balance.", "Drop weights safely to the side if catastrophic failure occurs."]
    },
    {
      id: "ex_3",
      name: "Overhead Barbell Press",
      muscleGroup: "Shoulders",
      secondaryMuscles: ["Triceps", "Core"],
      videoFolder: "shoulders",
      videoFile: "shoulder_01.mp4",
      difficulty: "Advanced",
      targetSets: 3,
      targetReps: 8,
      targetWeight: 45,
      history: { target: "45 kg × 8", lastSession: "42.5 kg × 8", personalBest: "50 kg × 6" },
      steps: ["Rack barbell at upper chest height.", "Brace your core, glutes, and thighs tightly.", "Press bar straight overhead, clearing your chin/face.", "Lock out arms at the apex and hold for a brief count."],
      mistakes: ["Leaning backward excessively, hyperextending lower back.", "Failing to lock out elbows at the top peak configuration."],
      safety: ["Use a lifting belt if managing high relative RPE loads.", "Do not push past failure without micro safety arms configured."]
    }
  ]
};

const AI_COACH_TIPS = [
  "Form is your ultimate shield; never compromise execution mechanics for ego metrics.",
  "Excellent pace, Commander. Keep tracking those active load intervals cleanly.",
  "Hydration balances cellular energy matrix output. Take a sip during this sequence.",
  "Deep diaphragmatic breaths here. Only a few strategic tactical nodes left in this mission.",
  "Focus on the eccentric cadence. Control the descent to activate deep fiber recruitment."
];

const ActiveWorkout = () => {
  // Core Interface Lifecycle States
  const navigate = useNavigate();

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [activeTab, setActiveTab] = useState("guide"); // guide | instructions

  // Dynamic Metrics Engine
  const [elapsedTime, setElapsedTime] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [earnedXp, setEarnedXp] = useState(0);
  
  // Interactive Logging Tracking States
  const currentExercise = MISSION_DATA.exercises[currentExerciseIndex];
  const [completedStructure, setCompletedStructure] = useState({}); // Tracking sets dynamically per exercise
  const [activeWeight, setActiveWeight] = useState(currentExercise.targetWeight);
  const [activeReps, setActiveReps] = useState(currentExercise.targetReps);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  
  // Rest Control Arrays
  const [isResting, setIsResting] = useState(false);
  const [restRemaining, setRestRemaining] = useState(60);
  const [activeAiTip, setActiveAiTip] = useState(AI_COACH_TIPS[0]);

  // Performance Bonus Toggles
  const [perfectWorkout, setPerfectWorkout] = useState(true);
  const [perfectPace, setPerfectPace] = useState(true);

  // Layout Reference Accessors
  const timerRef = useRef(null);
  const restTimerRef = useRef(null);

  // 1. Core Mission Duration Clock
  useEffect(() => {
    if (!isPaused && !isComplete) {
      timerRef.current = setInterval(() => {
        setElapsedTime(prev => {
          const nextTime = prev + 1;
          // Dynamically compute real-time metrics
          setCaloriesBurned(Math.floor(nextTime * 0.24));
          return nextTime;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isPaused, isComplete]);

  // 2. Rest Phase Engine
  useEffect(() => {
    if (isResting && restRemaining > 0 && !isPaused) {
      restTimerRef.current = setInterval(() => {
        setRestRemaining(prev => {
          if (prev <= 1) {
            clearInterval(restTimerRef.current);
            setIsResting(false);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(restTimerRef.current);
    }
    return () => clearInterval(restTimerRef.current);
  }, [isResting, restRemaining, isPaused]);

  // Update layout defaults when cycling exercises
  useEffect(() => {
    setActiveWeight(currentExercise.targetWeight);
    setActiveReps(currentExercise.targetReps);
    // Find next uncompleted set index for this exercise
    const setStatus = completedStructure[currentExercise.id] || Array(currentExercise.targetSets).fill(false);
    const firstIncomplete = setStatus.indexOf(false);
    setCurrentSetIndex(firstIncomplete !== -1 ? firstIncomplete : currentExercise.targetSets - 1);
  }, [currentExerciseIndex]);

  // 3. Dynamic Progression Theme Engine (Blue -> Purple -> Gold)
  const calculateProgressPct = () => {
    let totalPlannedSets = 0;
    let completedSetsCount = 0;
    
    MISSION_DATA.exercises.forEach(ex => {
      totalPlannedSets += ex.targetSets;
      const setStatus = completedStructure[ex.id] || Array(ex.targetSets).fill(false);
      completedSetsCount += setStatus.filter(Boolean).length;
    });

    if (totalPlannedSets === 0) return 0;
    return Math.floor((completedSetsCount / totalPlannedSets) * 100);
  };

  const progressPercentage = calculateProgressPct();

  const getDynamicThemeClass = () => {
    if (progressPercentage >= 100) return "theme-gold-complete";
    if (progressPercentage >= 50) return "theme-purple-midway";
    return "theme-blue-start";
  };

  // 4. Interactive Logging Logic Handles
  const toggleSetStatus = (setIdx) => {
    const currentSetStatus = completedStructure[currentExercise.id] || Array(currentExercise.targetSets).fill(false);
    const updatedStatus = [...currentSetStatus];
    
    // Toggle completion state
    updatedStatus[setIdx] = !updatedStatus[setIdx];
    
    setCompletedStructure({
      ...completedStructure,
      [currentExercise.id]: updatedStatus
    });

    if (updatedStatus[setIdx]) {
      // If completed a set, calculate XP allocation dynamically
      setEarnedXp(prev => prev + 25);
      // Automatically shift to next set index for clarity
      if (setIdx + 1 < currentExercise.targetSets) {
        setCurrentSetIndex(setIdx + 1);
      }
    } else {
      setEarnedXp(prev => Math.max(0, prev - 25));
    }
  };

  const handleCompleteActiveSet = () => {
    const currentSetStatus = completedStructure[currentExercise.id] || Array(currentExercise.targetSets).fill(false);
    const updatedStatus = [...currentSetStatus];
    
    // Complete the current actively targeted set
    updatedStatus[currentSetIndex] = true;
    
    setCompletedStructure({
      ...completedStructure,
      [currentExercise.id]: updatedStatus
    });

    setEarnedXp(prev => prev + 25);

    // Initialize Rest Countdown Phase & Refresh AI Tips Randomly
    setActiveAiTip(AI_COACH_TIPS[Math.floor(Math.random() * AI_COACH_TIPS.length)]);
    setRestRemaining(60);
    setIsResting(true);

    // Advance set pointers automatically if available
    if (currentSetIndex + 1 < currentExercise.targetSets) {
      setCurrentSetIndex(currentSetIndex + 1);
    } else {
      // Check if there are more exercises to advance to automatically down the pipeline
      if (currentExerciseIndex + 1 < MISSION_DATA.exercises.length) {
        // Stay on this exercise screen until they click next, or let them view completions
      }
    }
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex + 1 < MISSION_DATA.exercises.length) {
      setCurrentExerciseIndex(prev => prev + 1);
    } else {
      // All exercises processed through workspace pipeline -> Trigger Terminal Completion Summary
      triggerMissionComplete();
    }
  };

  const triggerMissionComplete = () => {
    let finalXpBonus = MISSION_DATA.targetXp;
    if (perfectWorkout) finalXpBonus += 50;
    if (perfectPace) finalXpBonus += 20;
    
    setEarnedXp(finalXpBonus);
    setIsComplete(true);
  };

  // Clock string compilation formatter (MM:SS)
  const formatTimeStr = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Form rendering for individual target statuses
  const activeSetStatusArray = completedStructure[currentExercise.id] || Array(currentExercise.targetSets).fill(false);

  return (
    <motion.div 
      className={`active-workout-workspace-canvas ${getDynamicThemeClass()}`}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* BACKGROUND PARTICULATE AND GRID MESH NODES */}
      <div className="tactical-grid-overlay" />
      <div className="dynamic-ambient-glow-core" />

      {/* 1. GLOBAL WORKOUT HUD HEADER */}
      <header className="workout-tactical-header">
        <div className="header-meta-left">
          <div className="mission-badge-alert">
            <span className="beacon-ping" />
            <span className="badge-string">LIVE MISSION AXIS</span>
          </div>
          <h1>{MISSION_DATA.name}</h1>
        </div>

        <div className="header-metrics-control-dock">
          <div className="hud-metric-card-node">
            <FiClock className="metric-icon" />
            <div className="metric-text-wrap">
              <span className="metric-label">ELAPSED TIME</span>
              <span className="metric-value font-monospace">{formatTimeStr(elapsedTime)}</span>
            </div>
          </div>

          <div className="hud-metric-card-node">
            <FiActivity className="metric-icon icon-calories" />
            <div className="metric-text-wrap">
              <span className="metric-label">ENERGY BURNED</span>
              <span className="metric-value font-monospace">{caloriesBurned} <span className="sub-tag">kcal</span></span>
            </div>
          </div>

          <div className="hud-metric-card-node text-glow-xp">
            <FiZap className="metric-icon icon-xp" />
            <div className="metric-text-wrap">
              <span className="metric-label">XP SECURED</span>
              <span className="metric-value font-monospace">+{earnedXp} XP</span>
            </div>
          </div>

          <div className="hud-streak-indicator-node">
            <span className="streak-fire-icon">🔥</span>
            <div className="streak-meta">
              <span className="streak-count">12 DAYS</span>
              <span className="streak-label">STREAK BALANCED</span>
            </div>
          </div>

          <button className="workout-pause-trigger-btn" onClick={() => setIsPaused(true)} aria-label="Pause Mission Operations">
            <FiPause /> <span>PAUSE</span>
          </button>
        </div>
      </header>

      {/* 2. CORE PERFORMANCE LAYOUT GRID */}
      <div className="active-workout-layout-grid-deck">
        
        {/* LEFT SECTOR: ACTIVE KINETIC TRACKER & GUIDES */}
        <div className="workout-left-sector-column">
          
          {/* PROGRESS SUBHEADER FRAME */}
          <div className="mission-progress-broadcaster-panel">
            <div className="progress-meta-text-row">
              <span className="exercise-index-marker font-monospace">
                EXERCISE <span className="highlight-text">{currentExerciseIndex + 1}</span> / {MISSION_DATA.totalExercises}
              </span>
              <span className="completion-percentage-marker font-monospace">{progressPercentage}% METRIC ACCUMULATED</span>
            </div>
            <div className="progress-bar-rail-enclosure">
              <motion.div 
                className="progress-bar-fill-laser" 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* MAIN CURRENT EXERCISE TRACKER CORE */}
          <div className="current-exercise-focus-payload-card">
            <div className="exercise-card-header-line">
              <div className="title-block">
                <h2>{currentExercise.name}</h2>
                <div className="muscle-pill-tags-row">
                  <span className="primary-muscle-badge font-monospace">{currentExercise.muscleGroup}</span>
                  {currentExercise.secondaryMuscles.map((sm, i) => (
                    <span key={i} className="secondary-muscle-badge font-monospace">+{sm}</span>
                  ))}
                </div>
              </div>
              <div className="difficulty-bracket-tag font-monospace">
                <FiLayers /> <span>{currentExercise.difficulty.toUpperCase()}</span>
              </div>
            </div>

            {/* TWIN CARD VIEWPORT FRAME: GRAPHIC INTERACTIVE LAYER + FORM VALUES */}
            <div className="exercise-interactive-split-matrix">
              
              {/* VIDEO EMBED CONTAINER */}
              <div className="exercise-animation-guide-theater">
                <div className="theater-tab-selector-bar">
                  <button className={`tab-anchor ${activeTab === "guide" ? "active" : ""}`} onClick={() => setActiveTab("guide")}>
                    CORE POSTURE ANIMATION
                  </button>
                  <button className={`tab-anchor ${activeTab === "instructions" ? "active" : ""}`} onClick={() => setActiveTab("instructions")}>
                    TACTICAL DEPLOYMENT STEPS
                  </button>
                </div>

                <div className="theater-display-screen-deck">
                  <AnimatePresence mode="wait">
                    {activeTab === "guide" ? (
                      <motion.div 
                        key="video-track"
                        className="video-projection-layer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {/* 
                          CRITICAL SPEC REQUIREMENT: Uses flexible structural reference string tracking 
                          relative paths via structural folder matching variables map smoothly 
                        */}
                        <video 
                          className="kinetic-loop-video-element"
                          src={`/assets/videos/${currentExercise.videoFolder}/${currentExercise.videoFile}`}
                          autoPlay 
                          loop 
                          muted 
                          playsInline
                        />
                        <div className="video-scanner-overlay" />
                        
                        {/* MUSCLE ANATOMICAL OVERLAY LEGEND */}
                        <div className="muscle-highlight-legend-box font-monospace">
                          <span className="legend-title">// LOAD BIOMETRIC FOCUS</span>
                          <div className="legend-row"><span className="bead primary-bead"/> <span className="lbl">Primary: {currentExercise.muscleGroup}</span></div>
                          <div className="legend-row">
                            <span className="bead secondary-bead"/> 
                            <span className="lbl">Secondary: {currentExercise.secondaryMuscles.join(", ")}</span>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="instruction-specs"
                        className="instruction-text-scroller-box"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="instruction-section">
                          <h4><FiCheckCircle className="sec-icon text-cyan" /> STEP-BY-STEP CADENCE</h4>
                          <ol>
                            {currentExercise.steps.map((st, i) => <li key={i}>{st}</li>)}
                          </ol>
                        </div>

                        <div className="instruction-section">
                          <h4><FiAlertTriangle className="sec-icon text-red" /> RESTRICTED CRITICAL MISTAKES</h4>
                          <ul>
                            {currentExercise.mistakes.map((mis, i) => <li key={i} className="text-error-dim">{mis}</li>)}
                          </ul>
                        </div>

                        <div className="instruction-section">
                          <h4><FiShield className="sec-icon text-green" /> COMPLIANCE SAFETY PROTOCOLS</h4>
                          <ul>
                            {currentExercise.safety.map((saf, i) => <li key={i} className="text-safe-dim">{saf}</li>)}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* CONTROLS AND RUNTIME WEIGHT SPEC ADJUSTMENTS */}
              <div className="exercise-logging-and-history-panel">
                
                {/* HISTORICAL TARGET ENGINE BOARD */}
                <div className="exercise-historical-progression-rack">
                  <div className="history-metric-node">
                    <span className="lbl">MISSION TARGET</span>
                    <span className="val font-monospace">{currentExercise.history.target}</span>
                  </div>
                  <div className="history-metric-node">
                    <span className="lbl">LAST SESSION</span>
                    <span className="val font-monospace text-muted-gray">{currentExercise.history.lastSession}</span>
                  </div>
                  <div className="history-metric-node glow-border-gold">
                    <span className="lbl text-gold">PERSONAL BEST</span>
                    <span className="val font-monospace text-gold">{currentExercise.history.personalBest}</span>
                  </div>
                </div>

                {/* THE ACTIVE SET SELECTOR TRACK */}
                <div className="interactive-set-tracker-rail">
                  <span className="rail-label font-monospace">// SELECT TARGET OPERATION SET</span>
                  <div className="set-nodes-flex-row">
                    {activeSetStatusArray.map((completed, idx) => (
                      <button
                        key={idx}
                        className={`set-interactive-node-bubble font-monospace ${idx === currentSetIndex ? "state-active" : ""} ${completed ? "state-checked" : ""}`}
                        onClick={() => setCurrentSetIndex(idx)}
                      >
                        <span className="set-label">SET {idx + 1}</span>
                        <span className="set-status-sub-indicator">
                          {completed ? "●" : "○"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* INCREMENT / DECREMENT INTERACTIVE INPUT COMPONENT */}
                <div className="kinetic-stepper-control-matrix">
                  <div className="stepper-chassis-node">
                    <span className="stepper-label font-monospace">MASS CALIBRATION (KG)</span>
                    <div className="stepper-interactive-row">
                      <button className="stepper-action-btn" onClick={() => setActiveWeight(prev => Math.max(0, prev - 2.5))} aria-label="Reduce load by 2.5 kilograms">
                        <FiMinus />
                      </button>
                      <span className="stepper-value-readout font-monospace">{activeWeight}</span>
                      <button className="stepper-action-btn" onClick={() => setActiveWeight(prev => prev + 2.5)} aria-label="Increase load by 2.5 kilograms">
                        <FiPlus />
                      </button>
                    </div>
                  </div>

                  <div className="stepper-chassis-node">
                    <span className="stepper-label font-monospace">REPETITION FREQUENCY</span>
                    <div className="stepper-interactive-row">
                      <button className="stepper-action-btn" onClick={() => setActiveReps(prev => Math.max(0, prev - 1))} aria-label="Reduce reps by 1">
                        <FiMinus />
                      </button>
                      <span className="stepper-value-readout font-monospace">{activeReps}</span>
                      <button className="stepper-action-btn" onClick={() => setActiveReps(prev => prev + 1)} aria-label="Increase reps by 1">
                        <FiPlus />
                      </button>
                    </div>
                  </div>
                </div>

                {/* COMPLETE SET TRANSMIT COUPLER ACTION */}
                <button 
                  className="global-action-complete-set-trigger-btn font-monospace"
                  onClick={handleCompleteActiveSet}
                >
                  COMPLETE SET {currentSetIndex + 1} <span className="btn-accent-subtext">// TRANSMIT LOG</span>
                </button>

                {/* TOGGLE/MANUAL DIRECT CHECK TRIGGER */}
                <button 
                  className={`manual-toggle-override-link font-monospace ${activeSetStatusArray[currentSetIndex] ? "text-red" : "text-cyan"}`}
                  onClick={() => toggleSetStatus(currentSetIndex)}
                >
                  {activeSetStatusArray[currentSetIndex] ? "[ FORCE SET INCOMPLETE UNCHECK ]" : "[ MANUAL FORCE MARK CHECKED ]"}
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT SECTOR: REST TIMERS, EXTENSIONS, PREVIEWS & COGNITIVE HUD */}
        <div className="workout-right-sector-column">
          
          {/* DYNAMIC TIMEOUT OVERLAY CARD BOX CONTAINER */}
          <div className="rest-countdown-terminal-chassis-card">
            <div className="hud-card-header-strip font-monospace">// COGNITIVE REST ORIENTATION PROFILE</div>
            
            <div className="rest-timer-interactive-centralized-hub">
              {isResting ? (
                <div className="circular-countdown-graphic-wrapper">
                  {/* Dynamic SVG Ring Vector Layout */}
                  <svg className="circular-countdown-vector-svg" viewBox="0 0 100 100">
                    <circle className="bg-rail-track" cx="50" cy="50" r="44" />
                    <motion.circle 
                      className="active-countdown-indicator-laser" 
                      cx="50" cy="50" r="44" 
                      strokeDasharray="276.46"
                      initial={{ strokeDashoffset: 0 }}
                      animate={{ strokeDashoffset: (1 - restRemaining / 60) * 276.46 }}
                      transition={{ duration: 1, ease: "linear" }}
                    />
                  </svg>
                  <div className="countdown-readout-absolute-text font-monospace">
                    <span className="numeric-digits">{restRemaining}</span>
                    <span className="unit-string">SECONDS</span>
                  </div>
                </div>
              ) : (
                <div className="rest-idle-placeholder-box font-monospace">
                  <div className="pulse-radar-dot" />
                  <span className="status-idle-title">AWAITING LAYER RECRUITMENT</span>
                  <span className="status-sub-desc">Complete a set execution row above to fire the kinetic tactical rest cycle tracker.</span>
                </div>
              )}

              {/* TIMEOUT OVERRIDE MODIFIERS */}
              {isResting && (
                <div className="rest-control-actions-button-group">
                  <button className="rest-modifier-btn font-monospace" onClick={() => setRestRemaining(prev => prev + 15)}>
                    +15 SECONDS
                  </button>
                  <button className="rest-modifier-btn btn-skip-override font-monospace" onClick={() => setIsResting(false)}>
                    SKIP ORIENTATION
                  </button>
                </div>
              )}
            </div>

            {/* ARTIFICIAL AI INTEGRATION LOG STREAM */}
            <div className="ai-coach-tactical-tip-stream-box">
              <span className="ai-stream-tag font-monospace">🤖 TACTICAL INTELLIGENCE PROTOCOL:</span>
              <p className="ai-stream-quote-text">"{activeAiTip}"</p>
            </div>
          </div>

          {/* NEXT PREVIEW MATRIX SECTOR FRAME */}
          <div className="next-exercise-preview-horizon-card">
            <div className="hud-card-header-strip font-monospace">// UPCOMING OBJECTIVE PREVIEW</div>
            {currentExerciseIndex + 1 < MISSION_DATA.exercises.length ? (
              <div className="preview-payload-active-row">
                <div className="preview-meta-details-left">
                  <h5>{MISSION_DATA.exercises[currentExerciseIndex + 1].name}</h5>
                  <span className="preview-sub-specs font-monospace">
                    {MISSION_DATA.exercises[currentExerciseIndex + 1].targetSets} Sets × {MISSION_DATA.exercises[currentExerciseIndex + 1].targetReps} Reps | Target Weight: {MISSION_DATA.exercises[currentExerciseIndex + 1].targetWeight}kg
                  </span>
                </div>
                <button className="advance-exercise-navigation-trigger-btn" onClick={handleNextExercise} aria-label="Advance to upcoming exercise module">
                  <span>NEXT EXERCISE</span> <FiChevronsRight />
                </button>
              </div>
            ) : (
              <div className="preview-payload-terminal-row">
                <span className="final-objective-alert-string font-monospace text-gold">💥 CURRENT TARGET OBJECTIVE IS THE FINAL NODE</span>
                <button className="advance-exercise-navigation-trigger-btn final-completion-glow" onClick={triggerMissionComplete}>
                  <span>COMPILE REWARD SCHEMATICS</span> <FiAward />
                </button>
              </div>
            )}
          </div>

          {/* REALTIME SYSTEM DIAGNOSTIC WORKSPACE STATISTICS FRAME */}
          <div className="realtime-live-statistics-hud-board">
            <div className="hud-card-header-strip font-monospace">// SYSTEM TELEMETRY DIAGNOSTICS LOG</div>
            <div className="diagnostic-data-table-rows">
              <div className="diag-row font-monospace">
                <span className="lbl">COMPLETED STRUCTURAL ITEMS</span>
                <span className="val">{currentExerciseIndex} / {MISSION_DATA.totalExercises} Nodes</span>
              </div>
              <div className="diag-row font-monospace">
                <span className="lbl">REMAINING TRAJECTORY CORES</span>
                <span className="val">{MISSION_DATA.totalExercises - currentExerciseIndex} Modules</span>
              </div>
              <div className="diag-row font-monospace">
                <span className="lbl">CHRONO WORKOUT DURATION</span>
                <span className="val">{formatTimeStr(elapsedTime)}</span>
              </div>
              <div className="diag-row font-monospace">
                <span className="lbl">CONVERSION CALORIC COEFFICIENT</span>
                <span className="val">{caloriesBurned} kcal Max Output</span>
              </div>
              <div className="diag-row font-monospace text-gold">
                <span className="lbl">CALCULATED TRANSACTION REWARD</span>
                <span className="val">+{earnedXp} XP Baseline Matrix</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. PAUSE INTERSTITIAL SCREEN MODAL CONTEXT */}
      {createPortal(
        <AnimatePresence>
          {isPaused && (
            <motion.div 
              className="tactical-interstitial-modal-backplane"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="pause-menu-terminal-chassis"
                initial={{ scale: 0.95, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
              >
                <div className="pause-scanner-beam-line" />
                <div className="pause-header-icon-housing">
                  <FiPause className="icon-pulse-animation" />
                </div>
                <h2>MISSION CHRONO SUSPENDED</h2>
                <p className="pause-sub-statement font-monospace">// Operational telemetry arrays are frozen in local state.</p>
                
                <div className="pause-options-action-stack-list">
                  <button className="pause-action-btn-node primary-resume font-monospace" onClick={() => setIsPaused(false)}>
                    RESUME CURRENT CAMPAIGN OPERATION
                  </button>
                  <button className="pause-action-btn-node font-monospace" onClick={() => { setElapsedTime(0); setEarnedXp(0); setIsPaused(false); }}>
                    RESTART MISSION FROM ENTRY BASELINE
                  </button>
                  <button className="pause-action-btn-node exit-danger-node font-monospace" onClick={()=>navigate("/workouts")}>
                    ABORT MISSION AND PURGE DATA STACK
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* 4. MISSION COMPLETE CELEBRATION TERMINAL OVERLAY */}
      {createPortal(
        <AnimatePresence>
          {isComplete && (
            <motion.div 
              className="tactical-interstitial-modal-backplane completion-celebration-override"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="mission-complete-celebration-chassis-card"
                initial={{ scale: 0.9, y: 50, rotateX: -15 }}
                animate={{ scale: 1, y: 0, rotateX: 0 }}
                transition={{ type: "spring", damping: 22, stiffness: 200 }}
              >
                <div className="victory-fireworks-laser-trim" />
                
                <div className="celebration-header-icon-seal">
                  <FiAward className="seal-vector" />
                </div>

                <h2 className="victory-glitch-headline font-monospace">MISSION COMPLETE</h2>
                <span className="sub-victory-bracket-tag">// OBJECTIVES COMPLETELY SECURED //</span>

                {/* REWARD TOKENS DISPLAY MATRIX LAYOUT */}
                <div className="victory-xp-transaction-hero-badge font-monospace">
                  <div className="xp-numerical-display">+{earnedXp} <span className="unit-label">XP</span></div>
                  <div className="xp-transaction-status-tag">LEVEL UP REGISTERED // COMMANDER RANK EXPANDED</div>
                </div>

                {/* ACHIEVEMENTS / BONUS CORE SECTOR LISTS */}
                <div className="unlocked-achievements-grid-flex">
                  <div className="achievement-unlocked-row-item glow-border-gold">
                    <FiZap className="ach-icon text-gold" />
                    <div className="ach-text">
                      <span className="ach-title text-gold font-monospace">PERFECT WORKOUT CORE SECURED</span>
                      <span className="ach-desc">Every single planned active operational lifting set completed checkmark verified (+50 XP).</span>
                    </div>
                  </div>

                  <div className="achievement-unlocked-row-item glow-border-cyan">
                    <FiTrendingUp className="ach-icon text-cyan" />
                    <div className="ach-text">
                      <span className="ach-title text-cyan font-monospace">TEMPO MATRIX MATCHED</span>
                      <span className="ach-desc">Stayed completely on schedule within internal pacing coefficients (+20 XP).</span>
                    </div>
                  </div>
                </div>

                {/* FINAL AGGREGATE SUMMARY TELEMETRY GRID DATA LIST TABLE */}
                <div className="final-mission-telemetry-summary-table">
                  <div className="summary-data-box font-monospace">
                    <span className="lbl">TOTAL OPERATIONAL CHRONO TIME</span>
                    <span className="val text-white">{formatTimeStr(elapsedTime)}</span>
                  </div>
                  <div className="summary-data-box font-monospace">
                    <span className="lbl">ACCUMULATED BIO CALORIES</span>
                    <span className="val text-white">{caloriesBurned} kcal</span>
                  </div>
                  <div className="summary-data-box font-monospace">
                    <span className="lbl">COMPLETED EXERCISE BLOCK MATRIX</span>
                    <span className="val text-white">{MISSION_DATA.totalExercises} / {MISSION_DATA.totalExercises} Nodes</span>
                  </div>
                </div>

                <button 
                  className="close-celebration-screen-and-commit-data-btn font-monospace"
                  onClick={()=> navigate("/workouts")}
                >
                  COMMIT DATA MATRIX & REFRESH REEVALUATION CORE
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

    </motion.div>
  );
};

export default ActiveWorkout;