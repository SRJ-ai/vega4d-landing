export function TrustedBy() {
  const logos = [
    { name: "NVIDIA", font: "font-sans font-black tracking-tighter" },
    { name: "STANFORD", font: "font-serif font-bold tracking-widest" },
    { name: "DeepMind", font: "font-sans font-semibold tracking-normal" },
    { name: "OpenAI", font: "font-sans font-medium tracking-tight" },
    { name: "UC BERKELEY", font: "font-serif font-bold tracking-wide" },
    { name: "META AI", font: "font-sans font-bold tracking-widest" }
  ];

  // Double the list so it can scroll infinitely without a seam
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="relative w-full border-t border-[var(--line-100)] bg-[var(--ink-100)] py-12 overflow-hidden">
      <div className="u-shell flex flex-col items-center justify-center gap-8">
        <p className="u-mono text-center text-[11px] tracking-[0.14em] text-[var(--text-300)] uppercase">
          Trusted by teams building embodied AI and computer vision models
        </p>
        
        {/* Marquee Container with edge fading masks */}
        <div className="relative w-full overflow-hidden" 
             style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
          <div className="flex w-max animate-[marquee_40s_linear_infinite] items-center gap-16 md:gap-24">
            {duplicatedLogos.map((logo, i) => (
              <span 
                key={i} 
                className={`${logo.font} text-2xl text-[var(--text-200)] opacity-40 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 hover:text-[var(--text-100)] cursor-default`}
              >
                {logo.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
