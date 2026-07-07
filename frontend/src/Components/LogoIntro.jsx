import React, { useEffect } from "react";
import "../styles/logointro.css";

const LogoIntro = ({ onComplete }) => {
  useEffect(() => {
    // Exact 2.5 second cinematic window before landing page mount
    const masterTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2500);

    return () => clearTimeout(masterTimer);
  }, [onComplete]);

  return (
    <div className="game-intro-universe">
      {/* High impact white out energy bloom */}
      <div className="garena-flash-overlay" />

      {/* Main Logo Container running on rock-solid CSS animation */}
      <div className="cinema-logo-master-box cinematic-entrance-assembly">
        <div className="vector-logo-aspect-lock">
          <svg viewBox="0 0 160 120" className="triple-a-emblem">
            <defs>
              <linearGradient id="garenaStyleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#00d2ff" />
                <stop offset="100%" stopColor="#0055ff" />
              </linearGradient>
            </defs>
            <path d="M80 10 L145 92 L120 92 L80 42 L40 92 L15 92 Z" fill="url(#garenaStyleGrad)" />
            <path d="M80 48 L110 88 L95 88 L80 68 L65 88 L50 88 Z" fill="#00d2ff" opacity="0.8" />
            <circle cx="80" cy="108" r="4" fill="#00d2ff" />
          </svg>
        </div>

        <div className="cinema-brand-wrap">
          <h1 className="cinematic-title">
            ASCEND<span className="cyan-power">FIT</span>
          </h1>
          <span className="cinematic-ticker">ENTERTAINMENT</span>
        </div>
      </div>
    </div>
  );
};

export default LogoIntro;