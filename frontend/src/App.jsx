import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LogoIntro from "./components/LogoIntro";
import Landing from "./pages/Landing"; 
import Login from "./pages/Login";     
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import Exercises from "./pages/Exercises";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/profile"  element={<Profile />} />
        <Route path="/settings"  element={<Settings />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  // Check if the logo intro has already been shown in this active browser session
  const [showIntro, setShowIntro] = useState(() => {
    const hasSeenIntro = sessionStorage.getItem("ascendfit_intro_shown");
    return hasSeenIntro ? false : true;
  });

  const handleIntroComplete = () => {
    // Flag this session so the intro doesn't trigger on refresh
    sessionStorage.setItem("ascendfit_intro_shown", "true");
    setShowIntro(false);
  };

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {showIntro ? (
          <LogoIntro key="system-logo-intro" onComplete={handleIntroComplete} />
        ) : (
          <AnimatedRoutes key="app-main-router-context" />
        )}
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;