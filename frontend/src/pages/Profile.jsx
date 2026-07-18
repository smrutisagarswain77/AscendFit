import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiX, FiCpu, FiZap, FiEdit2, FiSave, FiAward, 
  FiActivity, FiTarget, FiTrendingUp, FiCalendar, 
  FiClock, FiLayers, FiShield 
} from "react-icons/fi";
import { FaFireAlt } from "react-icons/fa"; 

import useAppContext from "../hooks/useAppContext";

import "../styles/Profile.css";

// SYSTEM CONSTANTS: ABSTRACT CONCEPTUAL DESIGN IDENTIFIERS
const RANK_TIERS = [
  { id: "recruit", name: "Recruit", symbolId: "binary_node", minXp: 0, color: "#8fa5b8", desc: "Initial clearance tier. Basic functional capacities verified." },
  { id: "cadet", name: "Cadet", symbolId: "vector_tri", minXp: 1000, color: "#00d2ff", desc: "Active field operator. Foundation structural layers online." },
  { id: "guardian", name: "Guardian", symbolId: "aegis_matrix", minXp: 3000, color: "#00ffaa", desc: "Defensive biological system protocol active." },
  { id: "warrior", name: "Warrior", symbolId: "blaze_core", minXp: 6000, color: "#ffb700", desc: "High-yield execution vector unlocked." },
  { id: "elite", name: "Elite Warrior", symbolId: "quad_pulsar", minXp: 10000, color: "#bd00ff", desc: "Advanced physical framework synchronization achieved." },
  { id: "commander", name: "Commander", symbolId: "orbit_array", minXp: 15000, color: "#ff007b", desc: "Tactical master layout initialized. Structural authority." },
  { id: "titan", name: "Titan", symbolId: "monolith_pillar", minXp: 22000, color: "#ff5500", desc: "Monolithic physical presence. Boundary limits broken." },
  { id: "ascendant", name: "Ascendant", symbolId: "vortex_rift", minXp: 30000, color: "#ffff00", desc: "Transcendent biometric performance envelope." },
  { id: "mythic", name: "Mythic", symbolId: "singularity", minXp: 40000, color: "#00ffff", desc: "Legendary performance parameters documented." },
  { id: "apex", name: "Apex", symbolId: "chronos_matrix", minXp: 50000, color: "#ffffff", desc: "Ultimate evolutionary ceiling. Absolute zenith." }
];

const Profile = () => {

  const { appData, updateUser } = useAppContext();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const avatarCanvasRef = useRef(null);
  
  const [userProfile, setUserProfile] = useState({
      username: appData.user.username,
      bio: appData.user.bio,
      height: appData.user.height,
      weight: appData.user.weight,
      fitnessGoal: appData.user.fitnessGoal,
      joinDate: appData.user.joinedDate,
      totalXp: appData.user.totalXP,
      streak: appData.user.streak,
      longestStreak: appData.user.streak,
      selectedAvatarOverride: null,
  });


  useEffect(() => {
    setUserProfile((prev) => ({
      ...prev,
      username: appData.user.username,
      bio: appData.user.bio,
      height: appData.user.height,
      weight: appData.user.weight,
      fitnessGoal: appData.user.fitnessGoal,
      joinDate: appData.user.joinedDate,
      totalXp: appData.user.totalXP,
      streak: appData.user.streak,
      longestStreak: appData.user.streak,
      selectedAvatarOverride:
        RANK_TIERS.find((tier) => tier.symbolId === appData.user.avatar) || null,
    }));

  }, [appData.user]);

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...userProfile });
  const [showEmblemSelector, setShowEmblemSelector] = useState(false);

  // Smooth Interpolation Reference Objects for Canvas Morph Engine
  const lastSymbolIdRef = useRef("quad_pulsar");
  const transitionProgressRef = useRef(1.0);

  const currentRankIndex = RANK_TIERS.reduce((acc, tier, index) => {
    return userProfile.totalXp >= tier.minXp ? index : acc;
  }, 0);
  
  const currentRank = RANK_TIERS[currentRankIndex];
  const nextRank = RANK_TIERS[currentRankIndex + 1] || null;
  
  const currentTierXpFloor = currentRank.minXp;
  const nextTierXpCeiling = nextRank ? nextRank.minXp : currentRank.minXp + 10000;
  const progressInTier = userProfile.totalXp - currentTierXpFloor;
  const totalTierRequired = nextTierXpCeiling - currentTierXpFloor;
  const xpPercentage = Math.min((progressInTier / totalTierRequired) * 100, 100);
  const xpRemaining = nextRank ? nextRank.minXp - userProfile.totalXp : 0;

  const activeEmblemObj =
  RANK_TIERS.find((tier) => tier.symbolId === appData.user.avatar) ||
  userProfile.selectedAvatarOverride ||
  currentRank;

  // Trigger Morphing Sequence when Active Emblem Swaps
  useEffect(() => {
    if (activeEmblemObj.symbolId !== lastSymbolIdRef.current) {
      transitionProgressRef.current = 0.0; // Reset morph timeline to start animation interpolation
    }
  }, [activeEmblemObj.symbolId]);

  const statsArray = [
    { label: "TOTAL WORKOUTS", value: "120", sub: "Sessions Cleared", icon: <FiActivity /> },
    { label: "WORKOUT HOURS", value: "87.4", sub: "Active Engine Time", icon: <FiClock /> },
    { label: "CALORIES BURNED", value: "64,200", sub: "Kcal Thermolysis", icon: <FaFireAlt /> },
    { label: "TOTAL XP EARNED", value: userProfile.totalXp.toLocaleString(), sub: "Cumulative Data Blocks", icon: <FiZap /> },
    { label: "EXERCISES COMPLETED", value: "482", sub: "Structural Sets Locked", icon: <FiLayers /> },
    { label: "LONGEST STREAK", value: `${userProfile.longestStreak} Days`, sub: "Unbroken Chain Zenith", icon: <FiShield /> },
    { label: "CURRENT LEVEL", value: "Level 21", sub: "System Status Tier", icon: <FiCpu /> }
  ];

  const personalRecords = [
    { label: "Longest Workout", value: "118 Min", meta: "Leg Day Overload Block" },
    { label: "Most Calories Burned", value: "945 Kcal", meta: "HIIT Circuit Threshold Crash" },
    { label: "Highest XP Single Day", value: "750 XP", meta: "2 Achievements Unlocked Combo" },
    { label: "Longest Streak Vector", value: "32 Days", meta: "Q1 Discipline Index Maintained" }
  ];

  const achievements = [
    { id: "ach-1", name: "First Workout", desc: "Initialize core physical layer telemetry.", unlocked: true, date: "2025.10.12", color: "#00d2ff" },
    { id: "ach-2", name: "7 Day Streak", desc: "Maintain neural discipline chain across 168 hours.", unlocked: true, date: "2025.10.19", color: "#00ffaa" },
    { id: "ach-3", name: "1000 XP Block", desc: "Harvest critical data metrics via performance.", unlocked: true, date: "2025.11.02", color: "#ffb700" },
    { id: "ach-4", name: "50 Workouts", desc: "Establish permanent operational adaptation footprint.", unlocked: true, date: "2026.02.14", color: "#bd00ff" },
    { id: "ach-5", name: "Beast Mode", desc: "Exceed 600 kcal burning parameters within single engine runtime.", unlocked: true, date: "2026.05.20", color: "#ff007b" },
    { id: "ach-6", name: "Apex Threshold", desc: "Register a 50-day consecutive tracking configuration.", unlocked: false, descLocked: "Locked: Maintain absolute continuity array.", color: "#778899" }
  ];

  const progressTimeline = [
    { date: "2026.05.20", event: "Earned Beast Mode Badge", detail: "Registered 945kcal tracking profile." },
    { date: "2026.04.02", event: "Unlocked Warrior Rank Structure", detail: "Crossed 6,000 global structural XP threshold." },
    { date: "2026.02.14", event: "Completed 50 Total Workouts", detail: "Consolidated systemic adaptation logging routines." },
    { date: "2025.10.12", event: "Initialized Profile Node", detail: "Recruit status validated. Database pipeline configured." }
  ];

  const recentActivityLog = [
    { title: "Workout Dispatched", meta: "Chest Hypertrophy Engine Alpha", time: "2 hours ago", xp: "+120 XP" },
    { title: "Quest Unlocked", meta: "Midweek Iron Compression Challenge", time: "Yesterday", xp: "+250 XP" },
    { title: "Achievement Unlocked", meta: "Beast Mode Vector Verified", time: "5 days ago", xp: "+500 XP" }
  ];

  // Particle background loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frameId;
    let particles = [];

    class StarfieldParticle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() * 0.15 + 0.05;
        this.radius = Math.random() * 1.0 + 0.4;
        this.alpha = Math.random() * 0.4 + 0.1;
      }
      update() {
        this.y -= this.speed;
        if (this.y < 0) this.reset();
      }
      draw() {
        ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 210, 255, ${this.alpha})`; ctx.fill();
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth; canvas.height = window.innerHeight;
      particles = Array.from({ length: 40 }, () => new StarfieldParticle());
    };
    resize(); window.addEventListener("resize", resize);

    const run = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      frameId = requestAnimationFrame(run);
    };
    run();
    return () => { cancelAnimationFrame(frameId); window.removeEventListener("resize", resize); };
  }, []);

  // CRAZY ABSTRACT CONCEPT DESIGN ENGINE (Renders unique animated geometry mapped to Identity Title)
  const drawIdentitySymbol = (ctx, symbolId, size, color, timeVal) => {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    switch (symbolId) {
      case "binary_node": // Recruit: Simple structural matrix point
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2);
        ctx.stroke();
        for (let i = 0; i < 4; i++) {
          let a = (i * Math.PI) / 2 + timeVal * 0.5;
          ctx.beginPath();
          ctx.arc(Math.cos(a) * size * 0.7, Math.sin(a) * size * 0.7, 3, 0, Math.PI * 2);
          ctx.fillStyle = color; ctx.fill();
        }
        break;

      case "vector_tri": // Cadet: Dynamic pointing vector arrays
        ctx.beginPath();
        for (let i = 0; i < 3; i++) {
          let a = (i * 2 * Math.PI) / 3 + timeVal;
          let x = Math.cos(a) * size * 0.8;
          let y = Math.sin(a) * size * 0.8;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath(); ctx.stroke();
        ctx.beginPath(); ctx.arc(0, 0, size * 0.2, 0, Math.PI * 2); ctx.stroke();
        break;

      case "aegis_matrix": // Guardian: Hardened security polygon walls
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          let a = (i * Math.PI) / 3;
          let r = size * (i % 2 === 0 ? 0.8 : 0.5);
          let x = Math.cos(a) * r;
          let y = Math.sin(a) * r;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-size * 0.4, 0); ctx.lineTo(size * 0.4, 0); ctx.stroke();
        break;

      case "blaze_core": // Warrior: Destructive energy spark nodes
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          let a = (i * Math.PI) / 4 + timeVal * 1.5;
          let r1 = size * 0.3;
          let r2 = size * (i % 2 === 0 ? 0.9 : 0.5);
          ctx.moveTo(Math.cos(a) * r1, Math.sin(a) * r1);
          ctx.lineTo(Math.cos(a) * r2, Math.sin(a) * r2);
        }
        ctx.stroke();
        break;

      case "quad_pulsar": // Elite Warrior: Cross-firing high frequency nodes
        ctx.save();
        ctx.rotate(timeVal);
        ctx.beginPath();
        ctx.moveTo(-size * 0.8, 0); ctx.lineTo(size * 0.8, 0);
        ctx.moveTo(0, -size * 0.8); ctx.lineTo(0, size * 0.8);
        ctx.stroke();
        // Pulsing secondary accent diamond
        let pulseOffset = Math.sin(timeVal * 4) * 0.15 + 0.5;
        ctx.beginPath();
        ctx.moveTo(0, -size * pulseOffset); ctx.lineTo(size * pulseOffset, 0);
        ctx.lineTo(0, size * pulseOffset); ctx.lineTo(-size * pulseOffset, 0);
        ctx.closePath(); ctx.stroke();
        ctx.restore();
        break;

      case "orbit_array": // Commander: Strategic trajectory control arrays
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2); ctx.stroke();
        ctx.save(); ctx.rotate(timeVal * 0.8);
        ctx.beginPath(); ctx.ellipse(0, 0, size * 0.9, size * 0.25, Math.PI / 4, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(0, 0, size * 0.9, size * 0.25, -Math.PI / 4, 0, Math.PI * 2); ctx.stroke();
        ctx.restore();
        break;

      case "monolith_pillar": // Titan: Unmovable monolithic core configuration
        let baseW = size * 0.4;
        let baseH = size * 0.8;
        ctx.strokeRect(-baseW / 2, -baseH / 2, baseW, baseH);
        ctx.strokeRect(-baseW / 1.3, -baseH / 3, baseW * 1.5, baseH / 1.5);
        ctx.beginPath();
        ctx.moveTo(-size * 0.7, 0); ctx.lineTo(size * 0.7, 0);
        ctx.stroke();
        break;

      case "vortex_rift": // Ascendant: Intertwined ascending warp spirals
        ctx.beginPath();
        for (let i = 0; i < 30; i++) {
          let stepAngle = i * 0.35 + timeVal * 2;
          let r = (i / 30) * size * 0.9;
          let x = Math.cos(stepAngle) * r;
          let y = Math.sin(stepAngle) * r;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
        break;

      case "singularity": // Mythic: Hyper-dense dark matter matrix
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.22, 0, Math.PI * 2);
        ctx.fillStyle = color; ctx.fill();
        ctx.stroke();
        // Gravity wave horizons
        ctx.save();
        for(let j=0; j<3; j++) {
          ctx.rotate(timeVal * 0.5 + j);
          ctx.beginPath();
          ctx.arc(0, 0, size * (0.4 + j * 0.22), 0, Math.PI * 1.3);
          ctx.stroke();
        }
        ctx.restore();
        break;

      case "chronos_matrix": // Apex: Hyper-dimensional master matrix lines
        ctx.save();
        ctx.rotate(-timeVal * 0.4);
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          let angle = (i * Math.PI) / 4;
          ctx.moveTo(Math.cos(angle) * size * 0.3, Math.sin(angle) * size * 0.3);
          ctx.lineTo(Math.cos(angle) * size * 0.95, Math.sin(angle) * size * 0.95);
        }
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(size * 0.6, 0);
        for(let k=1; k<=8; k++) {
          let a = (k * Math.PI) / 4;
          ctx.lineTo(Math.cos(a)*size*0.6, Math.sin(a)*size*0.6);
        }
        ctx.stroke();
        ctx.beginPath(); ctx.arc(0, 0, size * 0.15, 0, Math.PI * 2); ctx.fillStyle = "#ffffff"; ctx.fill();
        ctx.restore();
        break;

      default:
        ctx.arc(0, 0, 10, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.restore();
  };

  // Real-time Hologram Render Engine with Morphing Interpolations
  useEffect(() => {
    const canvas = avatarCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frameId;
    let angle = 0;

    const renderEmblemAnimation = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      angle += 0.015;

      // Handle structural transition steps safely
      if (transitionProgressRef.current < 1.0) {
        transitionProgressRef.current += 0.04; // Smooth speed increments
        if (transitionProgressRef.current >= 1.0) {
          transitionProgressRef.current = 1.0;
          lastSymbolIdRef.current = activeEmblemObj.symbolId; // Lock target symbol in frame
        }
      }

      const pVal = transitionProgressRef.current;

      // Outer static support ring
      ctx.beginPath(); ctx.arc(cx, cy, 68, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 210, 255, 0.08)"; ctx.lineWidth = 1; ctx.stroke();

      // Dashed rotating telemetry radar
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(-angle * 0.4);
      ctx.beginPath(); ctx.arc(0, 0, 58, 0, Math.PI * 2); ctx.setLineDash([6, 12]);
      ctx.strokeStyle = `${activeEmblemObj.color}33`; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.restore();

      // Dynamic orbit vectors
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(angle);
      ctx.beginPath(); ctx.arc(0, 0, 46, 0, Math.PI * 0.5);
      ctx.strokeStyle = activeEmblemObj.color; ctx.lineWidth = 2; ctx.stroke();
      ctx.restore();

      // MORPHING MATRIX SWITCHBOARD LOGIC
      ctx.save();
      ctx.translate(cx, cy);
      ctx.translate(0, Math.sin(angle * 2) * 2.5); // Floating animation alignment
      
      ctx.shadowBlur = 14 + Math.sin(angle * 3) * 5;
      ctx.shadowColor = activeEmblemObj.color;

      if (pVal < 1.0) {
        // Phase 1 Collapse: Shrink and twist the outgoing artifact asset
        ctx.save();
        ctx.scale(1 - pVal, 1 - pVal);
        ctx.rotate(pVal * 4);
        ctx.globalAlpha = 1 - pVal;
        drawIdentitySymbol(ctx, lastSymbolIdRef.current, 26, activeEmblemObj.color, angle);
        ctx.restore();

        // Phase 2 Expand: Flash and emerge incoming target asset layout
        ctx.save();
        ctx.scale(pVal, pVal);
        ctx.rotate((1 - pVal) * -4);
        ctx.globalAlpha = pVal;
        drawIdentitySymbol(ctx, activeEmblemObj.symbolId, 26, activeEmblemObj.color, angle);
        ctx.restore();
      } else {
        // Standard high performance processing runtime loop
        drawIdentitySymbol(ctx, activeEmblemObj.symbolId, 26, activeEmblemObj.color, angle);
      }

      ctx.restore();
      frameId = requestAnimationFrame(renderEmblemAnimation);
    };

    renderEmblemAnimation();
    return () => cancelAnimationFrame(frameId);
  }, [activeEmblemObj, activeEmblemObj.symbolId]);

  const handleMouseMove3D = (e, target) => {
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleProfileSave = (e) => {
    e.preventDefault();

    setUserProfile({ ...editForm });

    updateUser({
      username: editForm.username,
      bio: editForm.bio,
      height: editForm.height,
      weight: editForm.weight,
      fitnessGoal: editForm.fitnessGoal,
    });

    setIsEditing(false);
  };

  const selectAvatarEmblem = (tier) => {
    if (userProfile.totalXp >= tier.minXp) {

      updateUser({
        avatar: tier.symbolId,
        rank: tier.name,
      });

      setUserProfile((prev) => ({
        ...prev,
        selectedAvatarOverride: tier,
      }));

      setShowEmblemSelector(false);
    }
  };

  // Inline canvas generator blueprint for configuration previews inside the layout matrices
  const DrawerPreviewIcon = ({ symbolId, color }) => {
    const previewRef = useRef(null);
    useEffect(() => {
      const cv = previewRef.current; if (!cv) return;
      const c = cv.getContext("2d");
      c.clearRect(0,0,40,40); c.save(); c.translate(20,20);
      drawIdentitySymbol(c, symbolId, 13, color, 1.2);
      c.restore();
    }, [symbolId, color]);
    return <canvas ref={previewRef} width={40} height={40} style={{ display: 'block' }} />;
  };



  return (
    <div className="up-viewport-shell">
      <canvas ref={canvasRef} className="up-ambient-matrix-plane" />
      <div className="up-perimeter-grid-bracket" />

      <button className="up-quantum-close-trigger" onClick={() => navigate(-1)} title="TERMINATE PROFILE VIEWPORT">
        <div className="up-close-target-ring" />
        <div className="up-close-crosshair-h" />
        <div className="up-close-crosshair-v" />
        <FiX className="up-close-vector-icon" />
      </button>

      <div className="up-scroll-engine-frame">
        
        <section className="up-hero-identity-section up-3d-glow-card" onMouseMove={(e) => handleMouseMove3D(e, e.currentTarget)}>
          <div className="up-card-corner-tr" />
          <div className="up-hero-grid-layout">
            
            <div className="up-avatar-emblem-wrapper" onClick={() => setShowEmblemSelector(true)}>
              <div className="up-avatar-pulse-core" style={{ borderColor: activeEmblemObj.color }} />
              <canvas ref={avatarCanvasRef} width={160} height={160} className="up-emblem-vector-surface" />
              <div className="up-avatar-interactive-badge">
                <FiEdit2 />
              </div>
            </div>

            <div className="up-identity-metadata-block">
              <div className="up-rank-badge-row">
                <span className="up-rank-glitch-lbl" style={{ color: currentRank.color, textShadow: `0 0 8px ${currentRank.color}` }}>
                  {currentRank.name.toUpperCase()} RANK
                </span>
                <div className="up-streak-flame-chip">
                  <FaFireAlt className="up-flame-vector" />
                  <span>{userProfile.streak} DAY STREAK</span>
                </div>
              </div>

              <h1 className="up-identity-username">{userProfile.username}</h1>
              <p className="up-identity-bio-preview">"{userProfile.bio}"</p>

              <div className="up-xp-matrix-bar-container">
                <div className="up-xp-bar-numerical-labels">
                  <span className="up-xp-current-level-tag">LEVEL 21</span>
                  <span className="up-xp-split-ratio">
                    {userProfile.totalXp} / {nextRank ? nextRank.minXp : "MAX"} XP
                  </span>
                </div>
                <div className="up-xp-progress-track-rail">
                  <motion.div 
                    className="up-xp-progress-fill-laser" 
                    style={{ background: `linear-gradient(90deg, ${currentRank.color}, #bd00ff)` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${xpPercentage}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                  <div className="up-xp-bar-shimmer" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="up-dashboard-columns-matrix">
          
          <div className="up-telemetry-left-stack">
            
            <div className="up-system-card-panel up-3d-glow-card" onMouseMove={(e) => handleMouseMove3D(e, e.currentTarget)}>
              <div className="up-panel-header">
                <h3><FiCpu /> PROFILE RECONSTRUCTION VARIABLES</h3>
                {!isEditing ? (
                  <button className="up-panel-action-btn" onClick={() => setIsEditing(true)}>
                    EDIT ARRAYS <FiEdit2 />
                  </button>
                ) : (
                  <div className="up-action-button-group">
                    <button className="up-panel-action-btn success-btn" onClick={handleProfileSave}>
                      COMMIT <FiSave />
                    </button>
                    <button className="up-panel-action-btn cancel-btn" onClick={() => { setIsEditing(false); setEditForm({...userProfile}); }}>
                      ABORT
                    </button>
                  </div>
                )}
              </div>
              
              <div className="up-panel-body-grid">
                {!isEditing ? (
                  <div className="up-read-only-profile-grid">
                    <div className="up-info-cell"><span className="lbl">IDENTIFICATION</span><span className="val">{userProfile.username}</span></div>
                    <div className="up-info-cell"><span className="lbl">HEIGHT AXIS</span><span className="val">{userProfile.height}</span></div>
                    <div className="up-info-cell"><span className="lbl">MASS SPECIFICATION</span><span className="val">{userProfile.weight}</span></div>
                    <div className="up-info-cell span-2"><span className="lbl">FITNESS GOAL VECTOR</span><span className="val">{userProfile.fitnessGoal}</span></div>
                    <div className="up-info-divider" />
                    <div className="up-info-cell read-only"><span className="lbl">SYSTEM JOIN DATE</span><span className="val security-text"><FiCalendar /> {userProfile.joinDate}</span></div>
                    <div className="up-info-cell read-only"><span className="lbl">CURRENT RANK COMPILER</span><span className="val dynamic-color-text" style={{color: currentRank.color}}>{currentRank.name}</span></div>
                  </div>
                ) : (
                  <form className="up-editable-profile-form" onSubmit={handleProfileSave}>
                    <div className="up-input-container-node">
                      <label>USERNAME REFERENCE</label>
                      <input type="text" value={editForm.username} onChange={(e)=>setEditForm({...editForm, username: e.target.value})} className="up-form-field" />
                    </div>
                    <div className="up-input-container-node">
                      <label>HEIGHT MATRIX</label>
                      <input type="text" value={editForm.height} onChange={(e)=>setEditForm({...editForm, height: e.target.value})} className="up-form-field" />
                    </div>
                    <div className="up-input-container-node">
                      <label>MASS INDEX (KG)</label>
                      <input type="text" value={editForm.weight} onChange={(e)=>setEditForm({...editForm, weight: e.target.value})} className="up-form-field" />
                    </div>
                    <div className="up-input-container-node span-2">
                      <label>BIOMETRIC GOAL FOCUS COMMAND</label>
                      <input type="text" value={editForm.fitnessGoal} onChange={(e)=>setEditForm({...editForm, fitnessGoal: e.target.value})} className="up-form-field" />
                    </div>
                    <div className="up-input-container-node span-2">
                      <label>IDENTITY BIO CORE</label>
                      <textarea value={editForm.bio} onChange={(e)=>setEditForm({...editForm, bio: e.target.value})} className="up-form-field textarea-field" />
                    </div>
                  </form>
                )}
              </div>
            </div>

            {nextRank && (
              <div className="up-system-card-panel up-3d-glow-card" onMouseMove={(e) => handleMouseMove3D(e, e.currentTarget)}>
                <div className="up-panel-header">
                  <h3><FiTrendingUp /> PROXIMITY RANK EVOLUTION VECTOR</h3>
                </div>
                <div className="up-rank-evolution-map-node">
                  <div className="up-evolution-axis-row">
                    <div className="up-evo-rank-block">
                      <div className="up-canvas-preview-wrapper-node">
                        <DrawerPreviewIcon symbolId={currentRank.symbolId} color={currentRank.color} />
                      </div>
                      <span className="nm">{currentRank.name}</span>
                    </div>
                    <div className="up-evo-connector-line-laser">
                      <div className="up-laser-pulse-bead" />
                    </div>
                    <div className="up-evo-rank-block next-locked">
                      <div className="up-canvas-preview-wrapper-node">
                        <DrawerPreviewIcon symbolId={nextRank.symbolId} color={nextRank.color} />
                      </div>
                      <span className="nm">{nextRank.name}</span>
                    </div>
                  </div>
                  <div className="up-evo-telemetry-summary-alert">
                    <FiAward /> REQUIRING <strong style={{color: "#00d2ff"}}>{xpRemaining} XP</strong> ADDITIONAL SEGMENTS TO AUTO-CONSTRUCT NEXT DATA RANK.
                  </div>
                </div>
              </div>
            )}

            <div className="up-system-card-panel up-3d-glow-card" onMouseMove={(e) => handleMouseMove3D(e, e.currentTarget)}>
              <div className="up-panel-header">
                <h3><FiTarget /> PERSONAL CRITICAL RECORDS INDEX</h3>
              </div>
              <div className="up-personal-records-grid-layout">
                {personalRecords.map((record, index) => (
                  <div key={index} className="up-record-metric-card">
                    <span className="up-rec-label">{record.label.toUpperCase()}</span>
                    <span className="up-rec-value">{record.value}</span>
                    <span className="up-rec-meta-tag">// {record.meta}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="up-telemetry-right-stack">
            
            <div className="up-statistics-grid-layout-mesh">
              {statsArray.map((stat, idx) => (
                <div key={idx} className="up-stat-hud-block up-3d-glow-card" onMouseMove={(e) => handleMouseMove3D(e, e.currentTarget)}>
                  <div className="up-stat-icon-wrapper-corner">{stat.icon}</div>
                  <span className="up-stat-lbl-tag">{stat.label}</span>
                  <span className="up-stat-main-value">{stat.value}</span>
                  <span className="up-stat-sub-diagnostic">{stat.sub}</span>
                </div>
              ))}
            </div>

            <div className="up-system-card-panel up-3d-glow-card" onMouseMove={(e) => handleMouseMove3D(e, e.currentTarget)}>
              <div className="up-panel-header">
                <h3><FiAward /> HARDWARE ACHIEVEMENT BADGE GRID</h3>
              </div>
              <div className="up-achievements-hud-grid-mesh">
                {achievements.map((ach) => (
                  <div key={ach.id} className={`up-achievement-badge-node ${!ach.unlocked ? "node-locked-dimmed" : ""}`}>
                    <div className="up-badge-vector-hexagon" style={{ 
                      borderColor: ach.unlocked ? ach.color : "rgba(255,255,255,0.05)",
                      boxShadow: ach.unlocked ? `0 0 10px ${ach.color}22` : "none"
                    }}>
                      <FiAward className="up-badge-icon" style={{ color: ach.unlocked ? ach.color : "#3a4f60" }} />
                    </div>
                    <div className="up-badge-text-telemetry">
                      <h4>{ach.name}</h4>
                      <p>{ach.unlocked ? ach.desc : ach.descLocked}</p>
                      {ach.unlocked && <span className="unlocked-timestamp"><FiClock /> {ach.date}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className="up-dashboard-columns-matrix bottom-row-matrix">
          
          <div className="up-system-card-panel up-3d-glow-card" onMouseMove={(e) => handleMouseMove3D(e, e.currentTarget)}>
            <div className="up-panel-header">
              <h3><FiLayers /> HISTORICAL MILESTONE LOG TIME-STREAM</h3>
            </div>
            <div className="up-timeline-linear-rail">
              {progressTimeline.map((item, index) => (
                <div key={index} className="up-timeline-node-event">
                  <div className="up-timeline-left-time-stamp">{item.date}</div>
                  <div className="up-timeline-center-node-bead" />
                  <div className="up-timeline-right-event-data">
                    <h5>{item.event}</h5>
                    <p>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="up-system-card-panel up-3d-glow-card" onMouseMove={(e) => handleMouseMove3D(e, e.currentTarget)}>
            <div className="up-panel-header">
              <h3><FiActivity /> RECENT RUNTIME TERMINAL ACTIONS</h3>
            </div>
            <div className="up-recent-activity-list-mesh">
              {recentActivityLog.map((log, index) => (
                <div key={index} className="up-activity-strip-row">
                  <div className="up-activity-indicator-glow-dot" />
                  <div className="up-activity-meta-core">
                    <h6>{log.title}</h6>
                    <span>{log.meta}</span>
                  </div>
                  <div className="up-activity-right-metric-block">
                    <span className="time">{log.time}</span>
                    <span className="xp-add-badge">{log.xp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      <AnimatePresence>
        {showEmblemSelector && (
          <div className="up-selector-backdrop-overlay" onClick={() => setShowEmblemSelector(false)}>
            <motion.div 
              className="up-selector-drawer-window"
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 250 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="up-drawer-top-notch-bar" />
              <div className="up-drawer-header-row">
                <div>
                  <h3>RANK EMBLEM UNLOCK GRID</h3>
                  <p>Select any unlocked diagnostic symbol asset for immediate visual database override.</p>
                </div>
                <button className="up-drawer-close-trigger-btn" onClick={() => setShowEmblemSelector(false)}>
                  <FiX />
                </button>
              </div>

              <div className="up-emblem-cards-scrollable-mesh">
                {RANK_TIERS.map((tier) => {
                  const isUnlocked = userProfile.totalXp >= tier.minXp;
                  const isActiveSelection = activeEmblemObj.id === tier.id;
                  
                  return (
                    <div 
                      key={tier.id} 
                      className={`up-emblem-tier-selection-card ${!isUnlocked ? "tier-locked-shielded" : ""} ${isActiveSelection ? "tier-selected-active" : ""}`}
                      onClick={() => isUnlocked && selectAvatarEmblem(tier)}
                    >
                      <div className="up-tier-icon-vector-preview">
                        <DrawerPreviewIcon symbolId={tier.symbolId} color={isUnlocked ? tier.color : "#2a3b4a"} />
                      </div>
                      <div className="up-tier-identity-text">
                        <div className="up-tier-title-line">
                          <h4>{tier.name}</h4>
                          {isActiveSelection && <span className="active-tag-pill">ACTIVE INITIALIZED</span>}
                          {!isUnlocked && <span className="locked-tag-pill">LOCKED // {tier.minXp} XP REQ</span>}
                        </div>
                        <p>{tier.desc}</p>
                      </div>
                      {isUnlocked && <div className="up-tier-unlocked-status-bead" style={{ background: tier.color }} />}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;