import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { Hand, Eye, Zap, Circle, Sparkles, ChevronRight, MessageCircle, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from './lib/supabase';

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// Advanced 3D Tilt Card Component
const TiltCard = ({ children, className, accentColor = 'rgba(255,178,77,0.1)' }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-3xl bg-[var(--color-void)] border border-white/5 shadow-2xl transition-all duration-300 ${className}`}
    >
      <div
        className="absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${accentColor}, transparent 70%)`
        }}
      />
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};

// Advanced Spotlight Hero Background
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
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0 opacity-50"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 178, 77, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[var(--color-ember)] opacity-20 rounded-full blur-[100px] animate-pulse"></div>
    </div>
  );
};

function App() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const { scrollYProgress } = useScroll();
  const yDrift = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const handleInputChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const { error } = await supabase.from('contacts').insert([
        { first_name: formData.firstName, last_name: formData.lastName, email: formData.email, message: formData.message }
      ]);
      if (error) throw error;
      setSubmitStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const heroHeading = "Robotic Dexterity".split(" ");

  return (
    <div className="min-h-screen bg-[var(--color-void)] text-[var(--color-bone)] font-sans selection:bg-[var(--color-gold)]/30 relative">
      
      {/* Global Film Grain & Texture */}
      <div className="noise-overlay"></div>

      <div className="relative z-10">
        {/* Nav - Minimalist */}
        <nav className="fixed w-full z-50 glass border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[var(--color-bone)]" />
              <span className="font-bold text-xl tracking-[0.2em] uppercase text-[var(--color-bone)]">Vega4D</span>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }} className="hidden md:flex items-center space-x-10 text-sm tracking-widest uppercase">
              <a href="#platform" className="hover:text-[var(--color-gold)] transition-colors">Platform</a>
              <a href="#contact" className="hover:text-[var(--color-gold)] transition-colors">Enterprise</a>
            </motion.div>
          </div>
        </nav>

        {/* Hero Section - Spotlight Interactive */}
        <section className="min-h-screen flex items-center pt-20 relative">
          <SpotlightHero />

          <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
            <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-4xl">
              <motion.div variants={fadeUp} className="mb-6">
                <span className="text-[var(--color-gold)] tracking-[0.3em] uppercase text-xs font-semibold">
                  Ascension through precision
                </span>
              </motion.div>
              
              <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-8 leading-[1.05]">
                {heroHeading.map((word, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8, delay: idx * 0.15 + 0.2, ease: "easeOut" }}
                    className="inline-block mr-4 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-bone)] text-glow-gold"
                  >
                    {word}
                  </motion.span>
                ))}
                <br />
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                >
                  Perfected.
                </motion.span>
              </h1>
              
              <motion.p variants={fadeUp} className="text-xl md:text-2xl text-white/50 font-light max-w-2xl leading-relaxed mb-12">
                We capture human kinematics in a multi-modal void. Zero information loss. Sub-millimeter fidelity. The definitive dataset for VLA foundation models.
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex gap-6 items-center">
                <a href="https://cal.com/vega4d" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center bg-[var(--color-bone)] text-[var(--color-void)] px-8 py-4 text-sm tracking-widest uppercase font-bold overflow-hidden transition-all hover:scale-105">
                  <span className="relative z-10 flex items-center gap-2">
                    Initiate Sequence <ChevronRight className="w-4 h-4" />
                  </span>
                  <div className="absolute inset-0 bg-[var(--color-gold)] opacity-0 group-hover:opacity-10 transition-opacity"></div>
                </a>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Crystalline Iridescent floating element */}
          <motion.div style={{ y: yDrift }} className="absolute bottom-20 right-20 w-[400px] h-[400px] opacity-30 mix-blend-screen pointer-events-none hidden lg:block">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,var(--color-violet),transparent_60%)] blur-[60px]"></div>
            <div className="absolute top-1/4 right-1/4 w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle_at_center,var(--color-cyan),transparent_60%)] blur-[40px]"></div>
          </motion.div>
        </section>

        {/* 3D Tilt Cards Montage Section */}
        <section id="platform" className="py-40 relative border-t border-white/5 bg-[var(--color-void)]">
          <div className="max-w-7xl mx-auto px-6 perspective-[2000px]">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="mb-32 flex flex-col items-center text-center">
              <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-light tracking-wide mb-6">
                The Anatomy of <span className="text-[var(--color-gold)] italic">Motion</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
                Our capture pipeline isolates pure interaction. High contrast. Sharp focus.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <TiltCard className="aspect-[4/5] flex flex-col items-center justify-center group" accentColor="rgba(255,178,77,0.1)">
                  <Eye className="w-16 h-16 text-white/20 mb-8 group-hover:text-[var(--color-gold)] transition-colors duration-700" strokeWidth={1} />
                  <h3 className="text-sm tracking-[0.2em] uppercase text-white/80 group-hover:text-white transition-colors">Perception</h3>
                </TiltCard>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
                <TiltCard className="aspect-[4/5] flex flex-col items-center justify-center group" accentColor="rgba(138,107,255,0.1)">
                  <Hand className="w-16 h-16 text-white/20 mb-8 group-hover:text-[var(--color-violet)] transition-colors duration-700" strokeWidth={1} />
                  <h3 className="text-sm tracking-[0.2em] uppercase text-white/80 group-hover:text-white transition-colors">Kinematics</h3>
                </TiltCard>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}>
                <TiltCard className="aspect-[4/5] flex flex-col items-center justify-center group" accentColor="rgba(79,195,255,0.1)">
                  <Zap className="w-16 h-16 text-white/20 mb-8 group-hover:text-[var(--color-cyan)] transition-colors duration-700" strokeWidth={1} />
                  <h3 className="text-sm tracking-[0.2em] uppercase text-white/80 group-hover:text-white transition-colors">Actuation</h3>
                </TiltCard>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Single Shock Cut */}
        <section className="py-32 bg-[var(--color-void)] border-y border-[var(--color-danger)]/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,42,42,0.05),transparent_60%)] mix-blend-screen"></div>
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3 }} className="inline-flex items-center justify-center relative">
              <Circle className="w-32 h-32 text-[var(--color-danger)] opacity-80 animate-pulse" strokeWidth={0.5} />
              <div className="absolute font-mono text-[var(--color-danger)] text-xs tracking-widest uppercase text-glow-danger whitespace-nowrap">
                Override
              </div>
            </motion.div>
            <h2 className="mt-12 text-4xl font-light text-[var(--color-danger)] tracking-tight">Zero latency. Infinite scale.</h2>
          </div>
        </section>

        {/* Contact Void */}
        <section id="contact" className="py-40 relative">
          <div className="max-w-3xl mx-auto px-6">
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="bg-[var(--color-void)] border border-white/5 shadow-2xl p-12 relative overflow-hidden rounded-3xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-violet)]/10 blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                
                <motion.h2 variants={fadeUp} className="text-3xl font-light tracking-wide mb-2">Connect to the Hive</motion.h2>
                <motion.p variants={fadeUp} className="text-white/40 mb-10 text-sm tracking-wide">Secure transmission channel for enterprise data requirements.</motion.p>
                
                <motion.form variants={fadeUp} className="space-y-8 relative z-10" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-8">
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full bg-transparent border-b border-white/20 py-3 text-[var(--color-bone)] placeholder:text-white/20 focus:outline-none focus:border-[var(--color-gold)] transition-colors rounded-none font-light" placeholder="FIRST NAME" />
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full bg-transparent border-b border-white/20 py-3 text-[var(--color-bone)] placeholder:text-white/20 focus:outline-none focus:border-[var(--color-gold)] transition-colors rounded-none font-light" placeholder="LAST NAME" />
                  </div>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full bg-transparent border-b border-white/20 py-3 text-[var(--color-bone)] placeholder:text-white/20 focus:outline-none focus:border-[var(--color-gold)] transition-colors rounded-none font-light" placeholder="ORGANIZATION EMAIL" />
                  <textarea name="message" value={formData.message} onChange={handleInputChange} required rows="3" className="w-full bg-transparent border-b border-white/20 py-3 text-[var(--color-bone)] placeholder:text-white/20 focus:outline-none focus:border-[var(--color-gold)] transition-colors rounded-none font-light resize-none" placeholder="TRANSMISSION DETAILS..."></textarea>
                  
                  {submitStatus === 'success' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 text-sm tracking-wider flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> TRANSMISSION LOGGED
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[var(--color-danger)] text-sm tracking-wider">
                      TRANSMISSION FAILED. RETRY.
                    </motion.div>
                  )}

                  <button type="submit" disabled={isSubmitting} className="group relative inline-flex items-center justify-center bg-white/5 border border-white/20 text-[var(--color-bone)] px-8 py-4 text-xs tracking-[0.2em] uppercase overflow-hidden transition-all hover:bg-[var(--color-gold)] hover:text-[var(--color-void)] hover:border-transparent w-full">
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Transmit'}
                  </button>
                </motion.form>
             </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-[var(--color-void)] py-12 relative z-10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-xs uppercase tracking-widest text-white/30">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Vega4D // {new Date().getFullYear()}</span>
            </div>
            <div className="flex gap-10">
              <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
              <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
            </div>
          </div>
        </footer>

        {/* Minimalist WhatsApp */}
        <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-8 w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-white/50 hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-all z-50 mix-blend-screen backdrop-blur-md">
          <MessageCircle className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}

export default App;
