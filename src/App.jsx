import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const useTypewriter = (text, speed = 38, startDelay = 600) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timeout;
    let interval;
    timeout = setTimeout(() => {
      let i = 0;
      interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
};

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const videoRef = useRef(null);
  const prevXRef = useRef(null);
  
  const { displayed, done } = useTypewriter("we'd love to\nhear from you!");

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.innerWidth < 1024) return;
      if (!videoRef.current || isNaN(videoRef.current.duration)) return;

      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const deltaX = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      const deltaScrub = (deltaX / window.innerWidth) * 0.8 * videoRef.current.duration;
      let targetTime = videoRef.current.currentTime + deltaScrub;
      
      targetTime = Math.max(0, Math.min(targetTime, videoRef.current.duration));
      videoRef.current.currentTime = targetTime;
    };

    const handleSeeked = () => {
      // Ensure smooth tracking frame to frame
    };

    window.addEventListener('mousemove', handleMouseMove);
    if (videoRef.current) {
      videoRef.current.addEventListener('seeked', handleSeeked);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (videoRef.current) {
        videoRef.current.removeEventListener('seeked', handleSeeked);
      }
    };
  }, []);

  useEffect(() => {
    const checkMobileAutoplay = () => {
      if (window.innerWidth < 1024 && videoRef.current) {
        videoRef.current.autoplay = true;
        videoRef.current.play().catch(e => console.error("Autoplay prevented:", e));
      }
    };
    checkMobileAutoplay();
    window.addEventListener('resize', checkMobileAutoplay);
    return () => window.removeEventListener('resize', checkMobileAutoplay);
  }, []);

  const services = ["Brand", "Digital", "Campaign", "Other"];
  const navLinks = ["Labs", "Studio", "Openings", "Shop"];

  const toggleService = (service) => {
    setSelectedServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  return (
    <div className="relative bg-white text-neutral-900 font-sans selection:bg-[#EAECE9] selection:text-[#1C2E1E] antialiased overflow-x-hidden flex flex-col lg:block lg:min-h-screen">
      
      {/* Interactive Navbar */}
      <header className="fixed top-0 inset-x-0 z-20 px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center bg-transparent">
        {/* Logo */}
        <div className="flex flex-row gap-3 items-center">
          <span className="text-[21px] sm:text-[26px] tracking-tight text-black font-medium select-none">
            Mainframe&reg;
          </span>
          <span className="text-[25px] sm:text-[30px] text-black select-none tracking-[-0.02em] font-medium leading-none mb-1">
            &#10033;
          </span>
        </div>
        
        {/* Desktop Nav Links */}
        <div className="hidden md:flex flex-row text-[23px] text-black">
          {navLinks.map((link, idx) => (
            <React.Fragment key={link}>
              <a href="#" className="hover:opacity-60 transition-opacity">{link}</a>
              {idx < navLinks.length - 1 && (
                <span className="opacity-40">,&nbsp;</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Desktop CTA */}
        <a href="#contact" className="hidden md:block text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity">
          Get in touch
        </a>

        {/* Mobile Hamburger */}
        <button 
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-6 h-6 relative z-30" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={`w-6 h-[2px] bg-black block transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`w-6 h-[2px] bg-black block transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-[2px] bg-black block transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-10 bg-white/95 backdrop-blur-sm transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 text-2xl font-medium">
          {navLinks.map((link) => (
            <a key={link} href="#" onClick={() => setIsMobileMenuOpen(false)}>{link}</a>
          ))}
          <a href="#contact" className="underline underline-offset-4" onClick={() => setIsMobileMenuOpen(false)}>Get in touch</a>
        </div>
      </div>

      {/* Background Video Component */}
      <div className="order-last lg:order-none relative lg:absolute lg:inset-0 lg:z-0 overflow-hidden pointer-events-none w-full aspect-square md:aspect-video lg:aspect-auto lg:h-full bg-neutral-50 lg:bg-transparent">
        <video 
          ref={videoRef}
          className="w-full h-full object-cover object-right lg:object-right-bottom" 
          muted 
          playsInline 
          preload="auto" 
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4" 
        />
      </div>

      {/* Content Layout Container */}
      <div className="relative z-10 flex flex-col order-first lg:order-none w-full bg-white lg:bg-transparent pb-8 lg:pb-0 lg:min-h-screen">
        <main id="spade-hero" className="w-full max-w-7xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center mt-20 lg:mt-0">
          
          {/* Typewriter Hook and Headline */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-6xl lg:text-[76px] font-normal tracking-tight text-black leading-[1.08] mb-8 select-none w-full whitespace-pre-wrap">
              {displayed}
              {!done && <span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-blink" />}
            </h1>
          </motion.div>

          {/* Secondary Description Text */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <p className="text-lg md:text-xl text-[#5A635A] leading-relaxed font-normal mb-14 max-w-2xl">
              Whether you have questions, feedback, <br className="hidden sm:block" /> drop us a message and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          {/* Interactive Multi-Select Service Pills */}
          <div className="mb-8">
            <h2 className="text-2xl font-medium tracking-tight mb-2">What sort of service?</h2>
            <p className="opacity-85 text-[#738273] mb-8">Select all that apply</p>
            
            <div className="flex flex-wrap gap-3">
              {services.map(service => {
                const isActive = selectedServices.includes(service);
                return (
                  <motion.button
                    key={service}
                    onClick={() => toggleService(service)}
                    className={`px-5 py-3 rounded-full flex items-center gap-2 transition-all duration-300 ${isActive ? 'bg-[#1C2E1E] text-white shadow-md shadow-emerald-950/5 transform' : 'bg-white text-[#1C2E1E] border border-[#F1F3F1] hover:bg-[#F1F3F1]/55'}`}
                  >
                    {isActive && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                         <Check className="w-4 h-4" />
                      </motion.div>
                    )}
                    {service}
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Contingent Feedback Status Banner */}
          <div className="min-h-[60px] max-w-md">
            <AnimatePresence mode="wait">
              {selectedServices.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.5, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="italic text-xs pt-4"
                >
                  Please click to select services above.
                </motion.div>
              ) : (
                <motion.div
                  key="active"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mt-4"
                >
                  <div className="bg-[#FAFBF9] border border-[#F1F3F1] rounded-2xl p-4 flex justify-between items-center">
                    <span className="text-sm font-medium text-[#1C2E1E]">
                      Ready to inquire about: {selectedServices.join(", ")}
                    </span>
                    <button className="text-[#4D6D47] uppercase text-xs font-bold tracking-wider hover:opacity-70 transition-opacity ml-4 flex-shrink-0">
                      Let's Go &rarr;
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </main>
      </div>
    </div>
  );
}

export default App;
