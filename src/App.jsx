import React, { useEffect } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Plus } from 'lucide-react';
import './index.css';

const ease = [0.16, 1, 0.3, 1];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const SpotlightHero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = ({ clientX, clientY }) => {
      mouseX.set(clientX);
      mouseY.set(clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="video-container" style={{ zIndex: 0, overflow: 'hidden' }}>
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.5,
          background: useMotionTemplate`
            radial-gradient(
              800px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 178, 77, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div 
        style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '300px',
          height: '300px',
          backgroundColor: '#ff7a18',
          opacity: 0.15,
          borderRadius: '50%',
          filter: 'blur(100px)'
        }}
      ></div>
    </div>
  );
};

const App = () => {
  return (
    <div className="app-container">
      
      {/* Global Noise Overlay */}
      <div className="noise-overlay"></div>

      {/* 1. HERO SECTION (100vh Locked) */}
      <div className="hero-section">
        {/* Interactive Spotlight Background */}
        <SpotlightHero />

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
                  <rect x="6" y="3" width="6" height="18" rx="3" transform="rotate(-35 9 12)" />
                  <rect x="12" y="3" width="6" height="18" rx="3" transform="rotate(-35 15 12)" />
                </svg>
              </div>
              <span className="brand-text">Vega4D</span>
            </div>

            {/* Menu Button */}
            <button className="menu-button">
              <div className="menu-circle">
                <Plus size={12} strokeWidth={3} color="#05060a" />
              </div>
              <span className="menu-text">Menu</span>
            </button>

            {/* Tags Pill (Desktop) */}
            <div className="tags-pill">
              <span className="tag-label">Human Kinematics</span>
              <span className="tag-label">VLA Models</span>
            </div>
          </div>

          <div className="nav-right">
            {/* Adaptive Systems Pill (Desktop) */}
            <div className="adaptive-pill">
              <div className="adaptive-circle">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="3" cy="3" r="2" fill="#05060a" />
                  <circle cx="9" cy="3" r="2" fill="#05060a" />
                  <circle cx="3" cy="9" r="2" fill="#05060a" />
                  <circle cx="9" cy="9" r="2" fill="#05060a" />
                </svg>
              </div>
              <span className="adaptive-text">Actuation Datasets</span>
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
              <span className="subtitle-text">The definitive dataset for foundation models</span>
            </motion.div>

            <motion.h1
              className="main-heading"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8, ease }}
            >
              Robotic Dexterity, <br />
              Perfected.
            </motion.h1>

            <motion.div
              className="button-group"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8, ease }}
            >
              <button className="btn-primary">View Datasets</button>
              <button className="btn-secondary">Technical Specs</button>
            </motion.div>
          </div>

          <motion.div
            className="footer-right"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1, ease }}
          >
            <span className="footer-tag">Sub-millimeter</span>
            <span className="footer-tag">Zero Latency</span>
            <span className="footer-tag">Multi-modal</span>
          </motion.div>
        </motion.div>
      </div>

      {/* 2. CORE FEATURES (Light Section) */}
      <section className="section-light">
        <motion.div 
          className="section-container"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 variants={fadeInUp} style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300, letterSpacing: '-0.03em' }}>
            The Anatomy of Motion
          </motion.h2>
          <motion.p variants={fadeInUp} style={{ color: 'rgba(255,255,255,0.5)', marginTop: '16px', maxWidth: '600px', lineHeight: 1.6 }}>
            Our capture pipeline isolates pure interaction. High contrast. Sharp focus. Designed exclusively for the next generation of Vision-Language-Action (VLA) foundation models.
          </motion.p>

          <div className="grid-3">
            <motion.div variants={fadeInUp} className="grid-item">
              <h3>Perception</h3>
              <p>We map the spatial environment with an array of multi-modal sensors, ensuring zero information loss and sub-millimeter tracking accuracy.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="grid-item">
              <h3>Kinematics</h3>
              <p>Every joint, every micro-movement is recorded, vectorized, and compiled into our definitive human kinematics dataset.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="grid-item">
              <h3>Actuation</h3>
              <p>Seamlessly translate biological motion into robotic actuation. Train your embodied AI to interact with the physical world flawlessly.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 3. THE INTERFACE (Dark Section) */}
      <section className="section-dark">
        <motion.div 
          className="section-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeInUp}>
            <div className="subtitle-line" style={{ marginBottom: '24px' }}>
              <div className="dot" style={{ backgroundColor: '#ffb24d' }}></div>
              <span className="subtitle-text" style={{ color: 'rgba(255,255,255,0.7)' }}>Infrastructure</span>
            </div>
            <h2 className="dark-text-huge">
              Infinite Scale.<br />
              Zero Information Loss.
            </h2>
          </motion.div>
        </motion.div>
      </section>

      {/* 4. FINAL CTA & FOOTER (Light Section) */}
      <section className="section-light" style={{ paddingBottom: '0' }}>
        <div className="final-cta">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            viewport={{ once: true }}
          >
            Connect to the Hive
          </motion.h2>
          <motion.button 
            className="btn-primary" 
            style={{ padding: '16px 32px', fontSize: '15px' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            viewport={{ once: true }}
          >
            Initialize Transmission
          </motion.button>
        </div>

        <footer className="site-footer">
          <div>&copy; {new Date().getFullYear()} Vega4D. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span style={{ cursor: 'pointer' }}>Privacy</span>
            <span style={{ cursor: 'pointer' }}>Terms</span>
            <span style={{ cursor: 'pointer' }}>Enterprise</span>
          </div>
        </footer>
      </section>

    </div>
  );
};

export default App;
