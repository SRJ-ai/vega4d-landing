import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BrainCircuit, Database, Hand, Activity, ChevronRight, Mail, Phone, MapPin, MessageCircle, CheckCircle, Loader2, Play } from 'lucide-react';
import { supabase } from './lib/supabase';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

function App() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

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

  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans selection:bg-primary-500/30 relative">
      
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.15]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary-600/20 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-teal-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed w-full z-50 glass border-b-0 border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-600 to-teal-400 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  <Hand className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight text-white">
                  Vega4D
                </span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="hidden md:block"
              >
                <div className="flex items-center space-x-8">
                  <a href="#about" className="hover:text-white transition-colors text-sm font-medium text-slate-400">Platform</a>
                  <a href="#datasets" className="hover:text-white transition-colors text-sm font-medium text-slate-400">Datasets</a>
                  <a href="#contact" className="hover:text-white transition-colors text-sm font-medium text-slate-400">Enterprise</a>
                  <a href="https://cal.com/vega4d" target="_blank" rel="noopener noreferrer" className="relative group overflow-hidden bg-white/10 hover:bg-white/20 border border-white/10 text-white px-5 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-md">
                    <span className="relative z-10">Book Demo</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-teal-500/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-40 pb-32 lg:pt-56 lg:pb-40 overflow-hidden relative">
          <motion.div style={{ y }} className="absolute inset-0 z-0 opacity-30">
            <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-primary-500 rounded-full blur-[150px] mix-blend-screen animate-pulse"></div>
            <div className="absolute top-[30%] right-[20%] w-[400px] h-[400px] bg-indigo-500 rounded-full blur-[120px] mix-blend-screen" style={{ animation: 'pulse 4s infinite alternate-reverse' }}></div>
          </motion.div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm font-medium mb-8 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                VLA Foundation Models Ready
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-6xl lg:text-8xl font-extrabold tracking-tighter mb-8 text-white leading-[1.1]">
                High-Fidelity <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-indigo-400 to-teal-400 text-glow">
                  Robotic Dexterity
                </span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-xl lg:text-2xl text-slate-400 mb-12 leading-relaxed max-w-2xl mx-auto font-light">
                Premium multi-modal kinematics data. We capture, annotate, and synthesize complex human demonstrations with sub-millimeter precision.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a href="#datasets" className="group relative inline-flex justify-center items-center gap-2 bg-white text-black px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105">
                  Explore Datasets
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="https://cal.com/vega4d" target="_blank" rel="noopener noreferrer" className="group inline-flex justify-center items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-full text-lg font-medium transition-all backdrop-blur-md hover:border-white/20">
                  <Play className="w-4 h-4 fill-current opacity-70 group-hover:opacity-100 transition-opacity" />
                  Watch Platform Demo
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section id="about" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="mb-20"
            >
              <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight text-white">
                Engineered for <span className="text-slate-400">Precision</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl text-slate-400 max-w-2xl font-light">
                Our proprietary capture pipeline ensures zero information loss between human demonstration and robot execution.
              </motion.p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Large Bento Item */}
              <motion.div variants={fadeInUp} className="md:col-span-2 glass-card p-10 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                    <Activity className="w-7 h-7 text-primary-400" />
                  </div>
                  <h3 className="text-3xl font-semibold mb-4 text-white tracking-tight">Multi-Modal Sync Capture</h3>
                  <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                    Synchronized multi-camera volumetric setups capturing RGB, Depth, and sub-millimeter joint kinematics simultaneously at 120fps.
                  </p>
                </div>
                {/* Decorative element */}
                <div className="absolute right-0 bottom-0 w-64 h-64 opacity-20 pointer-events-none translate-x-1/4 translate-y-1/4">
                  <div className="w-full h-full border-[1px] border-primary-500 rounded-full absolute animate-[ping_3s_infinite]"></div>
                  <div className="w-3/4 h-3/4 border-[1px] border-primary-400 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              </motion.div>

              {/* Smaller Bento Item */}
              <motion.div variants={fadeInUp} className="glass-card p-10 group relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                    <BrainCircuit className="w-7 h-7 text-indigo-400" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-white tracking-tight">Expert Annotation</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Frame-by-frame joint tracking, complex action segmentation, and object interaction labeling by robotics domain experts.
                  </p>
                </div>
              </motion.div>

              {/* Smaller Bento Item */}
              <motion.div variants={fadeInUp} className="md:col-span-3 glass-card p-10 flex flex-col md:flex-row items-center gap-10 group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="md:w-1/3 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                    <Database className="w-7 h-7 text-teal-400" />
                  </div>
                  <h3 className="text-3xl font-semibold mb-4 text-white tracking-tight">VLA Ready</h3>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    Pre-processed, normalized, and instantly formatted for the latest Vision-Language-Action architectures. Skip the data wrangling.
                  </p>
                </div>
                <div className="md:w-2/3 w-full h-48 bg-black/50 rounded-2xl border border-white/5 relative overflow-hidden flex items-center p-6">
                   {/* Abstract code/data viz */}
                   <div className="w-full space-y-3 opacity-60">
                     <div className="h-4 w-1/3 bg-teal-500/20 rounded"></div>
                     <div className="h-4 w-3/4 bg-slate-700/50 rounded"></div>
                     <div className="h-4 w-1/2 bg-slate-700/50 rounded"></div>
                     <div className="h-4 w-5/6 bg-slate-700/50 rounded"></div>
                     <div className="h-4 w-1/4 bg-primary-500/20 rounded"></div>
                   </div>
                   <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-black/80 to-transparent"></div>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </section>

        {/* Datasets Section */}
        <section id="datasets" className="py-32 relative border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
            >
              <div>
                <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight text-white">
                  Curated <span className="text-slate-400">Datasets</span>
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-xl text-slate-400 max-w-xl font-light">
                  Accelerate your R&D instantly. High-fidelity motion data for fundamental manipulation tasks.
                </motion.p>
              </div>
              <motion.a variants={fadeInUp} href="https://cal.com/vega4d" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-400 font-medium inline-flex items-center gap-2 group pb-2 border-b border-white/20 hover:border-primary-400 transition-colors">
                Request Custom Collection 
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid lg:grid-cols-2 gap-8"
            >
              <motion.div variants={fadeInUp} className="glass-card overflow-hidden group">
                <div className="h-72 bg-black/60 relative overflow-hidden flex items-center justify-center border-b border-white/5">
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)]"></div>
                   <div className="grid grid-cols-8 gap-1 w-full px-12 opacity-50 mix-blend-screen group-hover:scale-110 transition-transform duration-[10s] ease-out">
                      {Array.from({length: 32}).map((_, i) => (
                        <div key={i} className="h-1 rounded-full bg-primary-500 animate-pulse" style={{ animationDelay: `${i * 50}ms`, animationDuration: '2s' }}></div>
                      ))}
                   </div>
                   <div className="absolute bottom-6 left-6 glass px-4 py-2 rounded-xl text-xs font-medium text-white tracking-wider font-mono border-white/10">
                     1M+ FRAMES • 21 KEYPOINTS
                   </div>
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-bold mb-3 text-white tracking-tight">Dexterous Manipulation v1</h3>
                  <p className="text-slate-400 mb-8 leading-relaxed">
                    In-hand manipulation, re-grasping, and complex tool usage (screwdrivers, pens, scissors). Includes highly accurate contact-force estimates.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {['RGB-D', '6D Poses', 'Tool Use'].map(tag => (
                      <span key={tag} className="px-4 py-1.5 bg-white/5 rounded-full text-xs font-medium text-slate-300 border border-white/10">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="glass-card overflow-hidden group">
                <div className="h-72 bg-black/60 relative overflow-hidden flex items-center justify-center border-b border-white/5">
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.15),transparent_70%)]"></div>
                   <div className="w-full flex items-center justify-center gap-8 opacity-50 mix-blend-screen group-hover:scale-110 transition-transform duration-[10s] ease-out">
                      <div className="w-24 h-24 border border-teal-500/30 rounded-full animate-[spin_4s_linear_infinite] flex items-center justify-center">
                        <div className="w-2 h-2 bg-teal-400 rounded-full absolute top-0"></div>
                      </div>
                      <div className="w-24 h-24 border border-teal-500/30 rounded-full animate-[spin_4s_linear_infinite_reverse] flex items-center justify-center">
                        <div className="w-2 h-2 bg-teal-400 rounded-full absolute bottom-0"></div>
                      </div>
                   </div>
                   <div className="absolute bottom-6 left-6 glass px-4 py-2 rounded-xl text-xs font-medium text-white tracking-wider font-mono border-white/10">
                     500K FRAMES • BIMANUAL
                   </div>
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-bold mb-3 text-white tracking-tight">Bimanual Assembly Core</h3>
                  <p className="text-slate-400 mb-8 leading-relaxed">
                    Two-handed coordination for assembling small parts, cable routing, and folding. Unparalleled synchronization precision across 8 camera views.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {['Bimanual', 'Assembly', 'Deformables'].map(tag => (
                      <span key={tag} className="px-4 py-1.5 bg-white/5 rounded-full text-xs font-medium text-slate-300 border border-white/10">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 relative border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="glass-card p-8 lg:p-16 max-w-5xl mx-auto relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
              
              <div className="grid lg:grid-cols-2 gap-16 relative z-10">
                <motion.div variants={fadeInUp}>
                  <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight text-white">Scale your <br/>robotics data.</h2>
                  <p className="text-slate-400 mb-12 text-lg leading-relaxed font-light">
                    Access existing datasets immediately or request custom data collection tailored to your specific end-effectors.
                  </p>
                  <div className="space-y-8">
                    {[
                      { icon: <Mail className="w-5 h-5" />, label: "Email", value: "data@vega4d.ai" },
                      { icon: <Phone className="w-5 h-5" />, label: "Phone", value: "+1 (555) 019-2834" },
                      { icon: <MapPin className="w-5 h-5" />, label: "HQ", value: "San Francisco, CA" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-400">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-sm text-slate-500 font-medium mb-1">{item.label}</p>
                          <p className="font-semibold text-white text-lg tracking-tight">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all font-light" placeholder="First Name" />
                      </div>
                      <div>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all font-light" placeholder="Last Name" />
                      </div>
                    </div>
                    <div>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all font-light" placeholder="Company Email" />
                    </div>
                    <div>
                      <textarea name="message" value={formData.message} onChange={handleInputChange} required rows="4" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all font-light resize-none" placeholder="Tell us about your data needs..."></textarea>
                    </div>
                    
                    {submitStatus === 'success' && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-3 text-green-400">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">Message sent securely.</span>
                      </motion.div>
                    )}
                    {submitStatus === 'error' && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-medium">
                        Failed to send message. Please try again.
                      </motion.div>
                    )}

                    <button type="submit" disabled={isSubmitting} className="w-full bg-white text-black font-semibold py-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 flex justify-center items-center gap-2">
                      {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</> : 'Send Request'}
                    </button>
                  </form>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-black py-12 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Hand className="w-5 h-5 text-white" />
              <span className="font-bold text-lg text-white tracking-tight">Vega4D</span>
            </div>
            <p className="text-slate-500 text-sm font-light">© {new Date().getFullYear()} Vega4D Inc. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-slate-500 font-medium">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </footer>

        {/* Floating WhatsApp Button */}
        <a 
          href="https://wa.me/15551234567" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-400 hover:scale-110 transition-all z-50 group"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute right-full mr-4 bg-white text-black font-medium text-sm px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
            Chat with us
          </span>
        </a>
      </div>
    </div>
  );
}

export default App;
