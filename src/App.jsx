import React from 'react';
import { BrainCircuit, Database, Hand, Activity, ChevronRight, Mail, Phone, MapPin } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-dark-900 text-slate-100 font-sans selection:bg-primary-500/30">
      {/* Navigation */}
      <nav className="fixed w-full z-50 glass border-b-0 border-slate-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-500 to-primary-400 flex items-center justify-center">
                <Hand className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                DexterityData
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#about" className="hover:text-primary-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">About</a>
                <a href="#datasets" className="hover:text-primary-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">Datasets</a>
                <a href="#contact" className="hover:text-primary-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">Contact</a>
                <a href="#contact" className="bg-primary-500 hover:bg-primary-400 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  Get Data
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-900/40 via-dark-900 to-dark-900 -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto animate-slide-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-primary-500/30 text-primary-400 text-sm font-medium mb-8">
              <Activity className="w-4 h-4" />
              <span>High-Fidelity Kinematics Data</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8">
              Powering the future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">Robotic Dexterity</span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              We collect, annotate, and synthesize premium video datasets of complex human hand movements. Train your robotic foundation models with sub-millimeter precision data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#datasets" className="inline-flex justify-center items-center gap-2 bg-primary-500 hover:bg-primary-400 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:-translate-y-1">
                Explore Datasets
                <ChevronRight className="w-5 h-5" />
              </a>
              <a href="#contact" className="inline-flex justify-center items-center gap-2 glass hover:bg-dark-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:-translate-y-1">
                Talk to Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features/About Section */}
      <section id="about" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Precision in Every Frame</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Our rigorous data collection and annotation pipeline ensures your models learn from the best human demonstrations available.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Activity className="w-8 h-8 text-primary-400" />,
                title: "Multi-Modal Capture",
                desc: "Synchronized multi-camera setups capturing RGB, Depth, and precise joint kinematics at 120fps."
              },
              {
                icon: <BrainCircuit className="w-8 h-8 text-primary-400" />,
                title: "Expert Annotation",
                desc: "Frame-by-frame joint tracking, action segmentation, and object interaction labeling by domain experts."
              },
              {
                icon: <Database className="w-8 h-8 text-primary-400" />,
                title: "Ready for Training",
                desc: "Pre-processed, normalized, and formatted for modern architectures like Vision-Language-Action (VLA) models."
              }
            ].map((feature, idx) => (
              <div key={idx} className="glass p-8 rounded-2xl hover:bg-dark-800 transition-colors group cursor-default">
                <div className="w-16 h-16 rounded-xl bg-dark-900 border border-slate-700 flex items-center justify-center mb-6 group-hover:border-primary-500/50 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Datasets Section */}
      <section id="datasets" className="py-24 bg-dark-900 relative border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Available Datasets</h2>
              <p className="text-slate-400 max-w-xl">Accelerate your R&D with our pre-packaged, highly curated datasets for various manipulation tasks.</p>
            </div>
            <a href="#contact" className="text-primary-400 hover:text-primary-300 font-medium inline-flex items-center gap-1 group">
              Request Custom Data Collection 
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="glass rounded-3xl overflow-hidden group">
              <div className="h-64 bg-dark-800 relative overflow-hidden flex items-center justify-center">
                 {/* Decorative background representing data */}
                 <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-500 to-transparent"></div>
                 <div className="grid grid-cols-6 gap-2 w-full px-8 opacity-40 group-hover:scale-105 transition-transform duration-700">
                    {Array.from({length: 24}).map((_, i) => (
                      <div key={i} className="h-2 rounded-full bg-primary-400/50 animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
                    ))}
                 </div>
                 <div className="absolute bottom-4 left-4 glass px-3 py-1 rounded-lg text-sm text-primary-300 font-mono">
                   1M+ Frames • 21 Keypoints
                 </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Dexterous Manipulation v1</h3>
                <p className="text-slate-400 mb-6">In-hand manipulation, re-grasping, and complex tool usage (screwdrivers, pens, scissors). Includes contact-force estimates.</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-dark-900 rounded-full text-xs text-slate-300 border border-slate-700">RGB-D</span>
                  <span className="px-3 py-1 bg-dark-900 rounded-full text-xs text-slate-300 border border-slate-700">6D Poses</span>
                  <span className="px-3 py-1 bg-dark-900 rounded-full text-xs text-slate-300 border border-slate-700">Tool Use</span>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl overflow-hidden group">
              <div className="h-64 bg-dark-800 relative overflow-hidden flex items-center justify-center">
                 <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500 to-transparent"></div>
                 <div className="grid grid-cols-4 gap-4 w-full px-8 opacity-40 group-hover:scale-105 transition-transform duration-700">
                    {Array.from({length: 16}).map((_, i) => (
                      <div key={i} className="h-8 rounded border border-teal-400/50 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></div>
                      </div>
                    ))}
                 </div>
                 <div className="absolute bottom-4 left-4 glass px-3 py-1 rounded-lg text-sm text-teal-300 font-mono">
                   500K Frames • Bimanual
                 </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Bimanual Assembly Setup</h3>
                <p className="text-slate-400 mb-6">Two-handed coordination for assembling small parts, cable routing, and folding. High-precision synchronization.</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-dark-900 rounded-full text-xs text-slate-300 border border-slate-700">Bimanual</span>
                  <span className="px-3 py-1 bg-dark-900 rounded-full text-xs text-slate-300 border border-slate-700">Assembly</span>
                  <span className="px-3 py-1 bg-dark-900 rounded-full text-xs text-slate-300 border border-slate-700">Deformables</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary-900/20 blur-[120px] rounded-full -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-3xl p-8 lg:p-16 max-w-5xl mx-auto border-primary-500/20 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to scale your robotics data?</h2>
                <p className="text-slate-400 mb-10 leading-relaxed">
                  Whether you need access to our existing datasets or require custom data collection tailored to your specific end-effectors and tasks, our team is ready to help.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-dark-800 flex items-center justify-center text-primary-400 border border-slate-700">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Email us</p>
                      <p className="font-medium text-lg">data@dexteritydata.ai</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-dark-800 flex items-center justify-center text-primary-400 border border-slate-700">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Call us</p>
                      <p className="font-medium text-lg">+1 (555) 019-2834</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-dark-800 flex items-center justify-center text-primary-400 border border-slate-700">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Location</p>
                      <p className="font-medium text-lg">San Francisco, CA</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">First Name</label>
                      <input type="text" className="w-full bg-dark-900 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors" placeholder="John" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Last Name</label>
                      <input type="text" className="w-full bg-dark-900 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors" placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Company Email</label>
                    <input type="email" className="w-full bg-dark-900 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors" placeholder="john@company.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">How can we help?</label>
                    <textarea rows="4" className="w-full bg-dark-900 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors resize-none" placeholder="Tell us about your data needs..."></textarea>
                  </div>
                  <button className="w-full bg-primary-500 hover:bg-primary-400 text-white font-semibold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:-translate-y-1">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-dark-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Hand className="w-5 h-5 text-primary-500" />
            <span className="font-bold text-lg">DexterityData</span>
          </div>
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} DexterityData Inc. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
