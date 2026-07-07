import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { FaDiscord, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser } from "react-icons/fi";
import "../styles/Login.css";

const loginBootVariants = {
  initial: {
    opacity: 0,
    clipPath: "inset(49.5% 45% 49.5% 45%)", 
    filter: "brightness(4) contrast(1.5)",
  },
  animate: {
    opacity: 1,
    clipPath: [
      "inset(49.5% 45% 49.5% 45%)",
      "inset(43% 0% 43% 0%)", 
      "inset(0% 0% 0% 0%)", 
    ],
    filter: "brightness(1) contrast(1)",
    transition: {
      duration: 0.5,
      times: [0, 0.4, 1],
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    clipPath: "inset(0% 0% 100% 0%)",
    transition: { duration: 0.3 },
  },
};

const Login = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [systemTime, setSystemTime] = useState("00:00:00");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [comets, setComets] = useState([]);
  const [dataGrid, setDataGrid] = useState([]);

  const clockRef = useRef(null);
  const isGlitchingRef = useRef(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 90, mass: 1.2 };
  const rotateY = useSpring(
    useTransform(mouseX, [-400, 400], [-7, 7]),
    springConfig,
  );
  const rotateX = useSpring(
    useTransform(mouseY, [-400, 400], [7, -7]),
    springConfig,
  );

  const bgX = useSpring(
    useTransform(mouseX, [-400, 400], [15, -15]),
    springConfig,
  );
  const bgY = useSpring(
    useTransform(mouseY, [-400, 400], [15, -15]),
    springConfig,
  );

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left - width / 2;
    const mouseYPos = e.clientY - rect.top - height / 2;
    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const generatedComets = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * -10,
      duration: Math.random() * 4 + 8,
      size: Math.random() * 2 + 1.5,
    }));
    setComets(generatedComets);

    const generatedNodes = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      char: Math.random() > 0.5 ? "1" : "0",
      delay: Math.random() * -5,
      width: `${Math.random() * 3.5 + 1.5}px`,
      height: `${Math.random() * 3.5 + 1.5}px`,
      bgColor: Math.random() > 0.35 ? "var(--neon-cyan)" : "#0077ff",
      boxShadow:
        Math.random() > 0.5 ? "0 0 8px var(--neon-cyan)" : "0 0 6px #0055ff",
    }));
    setDataGrid(generatedNodes);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const timeString = now.toTimeString().split(" ")[0];
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
          .join("");
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

  const handleFakeSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (isRegistering) setIsRegistering(false);
    }, 2200);
  };

  const systemTransitionVariants = {
    initial: {
      opacity: 0.1,
      clipPath: "inset(45% 0% 45% 0%)",
      filter: "brightness(2) contrast(1.5) hue-rotate(90deg)",
    },
    animate: {
      opacity: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      filter: "brightness(1) contrast(1) hue-rotate(0deg)",
      transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] },
    },
    exit: {
      opacity: 0.2,
      clipPath: "inset(48% 0% 48% 0%)",
      filter: "brightness(3) contrast(2) saturate(0)",
      transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <motion.div
      className={`terminal-screen-wrapper ${isInputFocused ? "hull-glitch-active" : ""}`}
      variants={loginBootVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div
        className="parallax-mouse-tracker-plane"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />

      <motion.div
        className="atmospheric-parallax-hull"
        style={{ x: bgX, y: bgY }}
      >
        <div className="grid-matrix-floor" />
        <div className="skyline-silhouettes" />
        <div className="vignette-shading" />
        <div className="cyber-wave-interferer" />

        {comets.map((c) => (
          <motion.div
            key={c.id}
            className="data-comet-beam"
            initial={{ top: "-10%", left: c.left, opacity: 0 }}
            animate={{ top: "110%", opacity: [0, 1, 1, 0] }}
            transition={{
              duration: c.duration,
              repeat: Infinity,
              delay: c.delay,
              ease: "linear",
            }}
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
              animationDelay: `${d.delay}s`,
            }}
          >
            {d.char}
          </span>
        ))}
      </motion.div>

      <div className="hud-corner-svg-container top-left">
        <svg viewBox="0 0 100 100" fill="none">
          <path
            d="M2 40 V15 L15 2 H40"
            stroke="var(--neon-cyan)"
            strokeWidth="2.5"
            className="outer-glow-trace"
          />
        </svg>
      </div>
      <div className="hud-corner-svg-container top-right">
        <svg viewBox="0 0 100 100" fill="none">
          <path
            d="M98 40 V15 L85 2 H60"
            stroke="var(--neon-cyan)"
            strokeWidth="2.5"
            className="outer-glow-trace"
          />
        </svg>
      </div>
      <div className="hud-corner-svg-container bottom-left">
        <svg viewBox="0 0 100 100" fill="none">
          <path
            d="M2 60 V85 L15 98 H40"
            stroke="var(--neon-cyan)"
            strokeWidth="2.5"
            className="outer-glow-trace"
          />
        </svg>
      </div>
      <div className="hud-corner-svg-container bottom-right">
        <svg viewBox="0 0 100 100" fill="none">
          <path
            d="M98 60 V85 L85 98 H60"
            stroke="var(--neon-cyan)"
            strokeWidth="2.5"
            className="outer-glow-trace"
          />
        </svg>
      </div>
      <div className="hud-perimeter-glass-wire" />

      <header className="hud-system-header">
        <div
          className="header-branding"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <div className="protocol-lbl">
            ASCEND <span className="dim">PROTOCOL</span>
          </div>
          <div className="sub-status">
            <span className="ver">v 3.0.0_ULTRA</span>
            <span className="pulse-tag">CORE ONLINE</span>
          </div>
        </div>
        <div className="header-chronograph" onMouseEnter={triggerTimerGlitch}>
          <span className="lbl">MATRIX TIME</span>
          <span ref={clockRef} className="time-digits">
            {systemTime}
          </span>
        </div>
      </header>

      <main className="hud-workspace-grid">
        <aside className="workspace-column side-layout">
          <div className="glass-hud-card angle-tr hover-reactive-card">
            <div className="card-glitch-line" />
            <div className="card-lbl">SYSTEM STATUS</div>
            <ul className="status-tree">
              <li>
                <span className="indicator-dot active" /> Core Engine
                Operational
              </li>
              <li>
                <span className="indicator-dot active" /> Firewall Defenses
                Maximum
              </li>
              <li>
                <span className="indicator-dot active" /> Quantum Link Connected
              </li>
            </ul>
          </div>
          <div className="glass-hud-card side-brackets-only text-center hover-reactive-card">
            <div className="card-glitch-line" />
            <div className="card-lbl dim-lbl">AUTHENTICATOR KEY</div>
            <div className="id-code-line">SECURE_NODE_OK</div>
          </div>
        </aside>

        <motion.section
          className="workspace-column center-layout"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          <div
            className="brand-hologram-space"
            style={{ transform: "translateZ(30px)" }}
          >
            <div className="rotating-gyro-ring" />
            <div className="brand-vector-svg">
              <svg viewBox="0 0 160 120" fill="none">
                <path
                  d="M80 5 L145 92 L120 92 L80 38 L40 92 L15 92 Z"
                  fill="url(#hudLogoGrad)"
                  className="glint-wing"
                />
                <path
                  d="M80 44 L110 84 L95 84 L80 64 L65 84 L50 84 Z"
                  fill="#00d2ff"
                  className="glow-arrow"
                />
                <path
                  d="M68 92 L92 92 L80 104 Z"
                  fill="#00d2ff"
                  opacity="0.6"
                />
                <circle cx="80" cy="112" r="3" fill="#00d2ff" />
                <defs>
                  <linearGradient
                    id="hudLogoGrad"
                    x1="80" y1="5" x2="80" y2="92"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="65%" stopColor="#25a2ff" />
                    <stop offset="100%" stopColor="#005fad" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1 className="brand-text-logo">
              ASCEND<span className="cyan-neon">FIT</span>
            </h1>
            <div className="brand-subtitle-line">
              <span className="subtitle">AUTHENTICATION CONSOLE</span>
            </div>
          </div>

          <div style={{ position: "relative", width: "390px" }}>
            <AnimatePresence mode="wait">
              {!isRegistering ? (
                <motion.div
                  key="login-console"
                  variants={systemTransitionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className={`glass-terminal-console ${isInputFocused ? "console-focused-glow" : ""} ${isSubmitting ? "console-overloaded" : ""}`}
                >
                  <div className="hud-matrix-scanner-beam cyan-beam" />
                  <div className="console-laser-trim" />
                  <div
                    className="console-header-tag"
                    style={{ marginTop: "6px" }}
                  >
                    INITIALIZE ACCESS PROFILE
                  </div>

                  <form onSubmit={handleFakeSubmit} className="console-form">
                    <div className="console-input-row custom-animated-input-wrapper">
                      <div className="input-hud-bracket top-left" />
                      <div className="input-hud-bracket bottom-right" />
                      <FiMail className="input-icon" />
                      <input
                        type="email"
                        placeholder="Enter access credentials"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                        required
                      />
                      <div className="input-underbar-glow" />
                    </div>

                    <div className="console-input-row custom-animated-input-wrapper">
                      <div className="input-hud-bracket top-left" />
                      <div className="input-hud-bracket bottom-right" />
                      <FiLock className="input-icon" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter decrypt sequence"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                        required
                      />
                      <div className="input-underbar-glow" />
                      <button
                        type="button"
                        className="password-toggle-eye"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>

                    <motion.button
                      type="submit"
                      className={`console-submit-btn ${isSubmitting ? "btn-processing" : ""}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="btn-side-ticker left" />
                      <div className="shimmer" />
                      <span className="btn-text">
                        {isSubmitting ? "DECRYPTING..." : "ACCESS SYSTEM"}
                      </span>
                      <div className="btn-side-ticker right" />
                    </motion.button>
                  </form>

                  <div className="console-footer-links">
                    <span className="dim">System Unassigned? </span>
                    <button
                      type="button"
                      onClick={() => setIsRegistering(true)}
                      className="bright-link action-panel-btn"
                    >
                      Register Node ID
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="register-console"
                  variants={systemTransitionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className={`glass-terminal-console console-register-glow ${isInputFocused ? "console-focused-glow" : ""} ${isSubmitting ? "console-overloaded" : ""}`}
                >
                  <div className="hud-matrix-scanner-beam purple-beam" />
                  <div className="console-laser-trim laser-purple" />
                  <div
                    className="console-header-tag text-purple"
                    style={{ marginTop: "6px" }}
                  >
                    PROVISION NEW NODE
                  </div>

                  <form onSubmit={handleFakeSubmit} className="console-form">
                    <div className="console-input-row custom-animated-input-wrapper">
                      <div className="input-hud-bracket top-left" />
                      <div className="input-hud-bracket bottom-right" />
                      <FiUser className="input-icon" />
                      <input
                        type="text"
                        placeholder="Enter identification name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                        required
                      />
                      <div className="input-underbar-glow" />
                    </div>

                    <div className="console-input-row custom-animated-input-wrapper">
                      <div className="input-hud-bracket top-left" />
                      <div className="input-hud-bracket bottom-right" />
                      <FiMail className="input-icon" />
                      <input
                        type="email"
                        placeholder="Assign transmission mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                        required
                      />
                      <div className="input-underbar-glow" />
                    </div>

                    <div className="console-input-row custom-animated-input-wrapper">
                      <div className="input-hud-bracket top-left" />
                      <div className="input-hud-bracket bottom-right" />
                      <FiLock className="input-icon" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Generate core password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                        required
                      />
                      <div className="input-underbar-glow" />
                      <button
                        type="button"
                        className="password-toggle-eye"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>

                    <div className="console-input-row custom-animated-input-wrapper">
                      <div className="input-hud-bracket top-left" />
                      <div className="input-hud-bracket bottom-right" />
                      <FiLock className="input-icon" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm decrypt code"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                        required
                      />
                      <div className="input-underbar-glow" />
                      <button
                        type="button"
                        className="password-toggle-eye"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>

                    <motion.button
                      type="submit"
                      className={`console-submit-btn btn-purple ${isSubmitting ? "btn-processing" : ""}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="btn-side-ticker left" />
                      <div className="shimmer" />
                      <span className="btn-text">
                        {isSubmitting ? "ENCRYPTING ID..." : "CREATE NODE ID"}
                      </span>
                      <div className="btn-side-ticker right" />
                    </motion.button>
                  </form>

                  <div className="console-footer-links">
                    <span className="dim">Already Assigned? </span>
                    <button
                      type="button"
                      onClick={() => setIsRegistering(false)}
                      className="bright-link action-panel-btn link-purple"
                    >
                      Return to Login
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="hologram-stage-floor">
            <div className="ring outer-dashed" />
            <div className="ring center-glow" />
          </div>
        </motion.section>

        <aside className="workspace-column side-layout">
          <div className="glass-hud-card angle-tl hover-reactive-card">
            <div className="card-glitch-line" />
            <div className="card-header-with-icon">
              <span className="bracket-icon">⤓</span>
              <div className="card-lbl">DAILY DATA FEED</div>
            </div>
            <div className="mission-content-box">
              <p>Break down existing structural frameworks.</p>
              <div className="reward-node">
                <span className="mini-lbl">REWARD LINK</span>
                <span className="xp-amount">+500 DATA CORE</span>
              </div>
            </div>
          </div>
          <div className="glass-hud-card angle-bl text-center hover-reactive-card">
            <div className="card-glitch-line" />
            <div className="card-lbl">SYS LINK</div>
            <div className="network-status-wrapper">
              <div className="wireframe-hud-globe">
                <div className="lat" />
                <div className="lng" />
              </div>
              <div className="online-tag">LINKED_OK</div>
            </div>
          </div>
        </aside>
      </main>

      <footer className="hud-system-footer">
        <span className="copyright">© 2026 ASCENDFIT // DIVISION ZERO</span>
        <div className="social-nodes">
          <a href="#discord" className="icon-link">
            <FaDiscord />
          </a>
          <a href="#twitter" className="icon-link">
            <FaTwitter />
          </a>
          <a href="#instagram" className="icon-link">
            <FaInstagram />
          </a>
          <a href="#youtube" className="icon-link">
            <FaYoutube />
          </a>
        </div>
      </footer>
    </motion.div>
  );
};

export default Login;