import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiGrid, 
  FiActivity, 
  FiBookOpen, 
  FiCpu, 
  FiSliders, 
  FiLogOut 
} from "react-icons/fi";
import "../styles/Sidebar.css";

const Sidebar = ({ activeTab, setActiveTab, isMinimized, setIsMinimized, onLogout }) => {
  const navigationFeatures = [
    { id: "dashboard", label: "Dashboard", icon: <FiGrid /> },
    { id: "workouts", label: "Workouts", icon: <FiActivity /> },
    { id: "exercises", label: "Exercises", icon: <FiBookOpen /> },
    { id: "ai-coach", label: "AI Coach", icon: <FiCpu /> },
    { id: "settings", label: "Settings", icon: <FiSliders /> }
  ];

  return (
    <aside className={`sb-deck ${isMinimized ? "sb-minimized" : ""}`}>
      
      {/* BRAND VECTOR DECK - PARSED EXACTLY FROM LOGIN CONSOLE */}
      <div className="sb-brand-node" onClick={() => setIsMinimized(!isMinimized)}>
        <div className="sb-logo-interaction-shell">
          <div className="sb-logo-energy-burst" />
          <motion.div 
            className="sb-brand-vector-svg"
            whileHover={{ 
              scale: 1.15,
              rotate: isMinimized ? 192 : 12,
              filter: "drop-shadow(0 0 15px rgba(0, 210, 255, 0.85))"
            }}
            whileTap={{ 
              scale: 0.88, 
              rotate: isMinimized ? 90 : -90,
              filter: "drop-shadow(0 0 25px #ffffff)" 
            }}
            animate={{ rotate: isMinimized ? 180 : 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 16 }}
          >
            <svg viewBox="0 0 160 120" fill="none">
              <path
                d="M80 5 L145 92 L120 92 L80 38 L40 92 L15 92 Z"
                fill="url(#sidebarHudLogoGrad)"
                className="sb-glint-wing"
              />
              <path
                d="M80 44 L110 84 L95 84 L80 64 L65 84 L50 84 Z"
                fill="#00d2ff"
                className="sb-glow-arrow"
              />
              <path
                d="M68 92 L92 92 L80 104 Z"
                fill="#00d2ff"
                opacity="0.6"
              />
              <circle cx="80" cy="112" r="3" fill="#00d2ff" />
              <defs>
                <linearGradient
                  id="sidebarHudLogoGrad"
                  x1="80" y1="5" x2="80" y2="92"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="65%" stopColor="#25a2ff" />
                  <stop offset="100%" stopColor="#005fad" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {!isMinimized && (
            <motion.h1 
              className="sb-brand-text"
              initial={{ opacity: 0, x: -15, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -10, filter: "blur(2px)" }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              ASCEND<span className="sb-cyan-neon">FIT</span>
            </motion.h1>
          )}
        </AnimatePresence>
      </div>

      {/* RE-ARCHITECTED NAV DECK WITH CYBER HOVER STAGES */}
      <nav className="sb-links-container">
        {navigationFeatures.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`sb-nav-item-link ${isActive ? "sb-active-node" : ""} ${isMinimized ? "sb-item-squeezed" : ""}`}
              onClick={() => setActiveTab(item.id)}
            >
              {/* RE-ACTIVE CELL BACKGROUND SHELL */}
              <div className="sb-node-hover-bg" />
              
              {/* TARGET CORNER BRACKETS */}
              <div className="sb-node-corner sb-tl" />
              <div className="sb-node-corner sb-br" />

              {isActive && (
                <motion.div 
                  layoutId="globalSidebarHighlight"
                  className="sb-active-pill-tracker"
                  transition={{ type: "spring", stiffness: 450, damping: 26 }}
                />
              )}
              
              <motion.span 
                className="sb-nav-item-icon"
                animate={{ scale: isMinimized ? 1.15 : 1, x: isMinimized ? 4 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {item.icon}
              </motion.span>
              
              <AnimatePresence mode="wait">
                {!isMinimized && (
                  <motion.span 
                    className="sb-nav-item-label"
                    initial={{ opacity: 0, x: -10, filter: "blur(2px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -10, filter: "blur(2px)" }}
                    transition={{ duration: 0.18 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {isActive && <div className="sb-active-laser-indicator" />}
            </button>
          );
        })}
      </nav>

      {/* OVERHAULED LOGOUT TRACKER NODE */}
      <div className="sb-footer-action">
        <button 
          className={`sb-nav-item-link sb-exit-trigger-node ${isMinimized ? "sb-item-squeezed" : ""}`} 
          onClick={onLogout}
        >
          <div className="sb-node-hover-bg-logout" />
          <motion.span 
            className="sb-nav-item-icon"
            animate={{ scale: isMinimized ? 1.15 : 1, x: isMinimized ? 4 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <FiLogOut />
          </motion.span>
          <AnimatePresence mode="wait">
            {!isMinimized && (
              <motion.span 
                className="sb-nav-item-label"
                initial={{ opacity: 0, x: -10, filter: "blur(2px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -10, filter: "blur(2px)" }}
                transition={{ duration: 0.18 }}
              >
                LOGOUT
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;