import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import './index.css';

const ease = [0.16, 1, 0.3, 1];

const App = () => {
  return (
    <div className="app-container">
      
      {/* Background Video */}
      <div className="video-container">
        <motion.video
          className="bg-video"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4"
          autoPlay
          muted
          playsInline
          loop
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease }}
        />
      </div>

      {/* Navbar */}
      <motion.nav
        className="navbar"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease }}
      >
        <div className="nav-left">
          {/* Logo */}
          <div className="logo-container">
            <div className="logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="3" width="6" height="18" rx="3" transform="rotate(-35 9 12)" fill="black" />
                <rect x="12" y="3" width="6" height="18" rx="3" transform="rotate(-35 15 12)" fill="black" />
              </svg>
            </div>
            <span className="brand-text">NeuralKinetics</span>
          </div>

          {/* Menu Button */}
          <button className="menu-button">
            <div className="menu-circle">
              <Plus size={12} strokeWidth={3} color="black" />
            </div>
            <span className="menu-text">Menu</span>
          </button>

          {/* Tags Pill (Desktop) */}
          <div className="tags-pill">
            <span className="tag-label">Advanced Bionics</span>
            <span className="tag-label">Cognitive AI</span>
          </div>
        </div>

        <div className="nav-right">
          {/* Adaptive Systems Pill (Desktop) */}
          <div className="adaptive-pill">
            <div className="adaptive-circle">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="3" cy="3" r="2" fill="white" />
                <circle cx="9" cy="3" r="2" fill="white" />
                <circle cx="3" cy="9" r="2" fill="white" />
                <circle cx="9" cy="9" r="2" fill="white" />
              </svg>
            </div>
            <span className="adaptive-text">Adaptive Systems</span>
          </div>
        </div>
      </motion.nav>

      {/* Spacer to push footer to bottom since we use flex space-between */}
      <div style={{ flex: 1 }}></div>

      {/* Footer Content */}
      <motion.div
        className="footer-wrapper"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 1, ease }}
      >
        <div className="footer-left">
          <motion.div
            className="subtitle-line"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease }}
          >
            <div className="dot"></div>
            <span className="subtitle-text">Best digital banking card 2026</span>
          </motion.div>

          <motion.h1
            className="main-heading"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8, ease }}
          >
            One Card, Zero <br />
            Limits. Worldwide.
          </motion.h1>

          <motion.div
            className="button-group"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8, ease }}
          >
            <button className="btn-primary">See Features</button>
            <button className="btn-secondary">How It Works</button>
          </motion.div>
        </div>

        <motion.div
          className="footer-right"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1, ease }} // Same as wrapper or slightly offset
        >
          <span className="footer-tag">Neuromorphic</span>
          <span className="footer-tag">AGI</span>
          <span className="footer-tag">Cybernetics</span>
        </motion.div>
      </motion.div>

    </div>
  );
};

export default App;
