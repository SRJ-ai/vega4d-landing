export default function Terms() {
  return (
    <main className="pt-32 pb-16 px-6 sm:px-12 md:px-24 max-w-4xl mx-auto text-neutral-300">
      <h1 className="text-4xl md:text-5xl font-mono tracking-tight text-white mb-12">
        Terms of Service
      </h1>
      
      <div className="space-y-8 text-base md:text-lg leading-relaxed">
        <section>
          <h2 className="text-xl text-white font-medium mb-4">1. Acceptance of Terms</h2>
          <p>
            By integrating with the Vega4D platform or accessing our kinematic datasets, you agree to these terms. Our infrastructure is designed for enterprise-grade VLA model training and requires strict adherence to security protocols.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-white font-medium mb-4">2. License & Access</h2>
          <p>
            Access to our sub-millimeter tracking datasets is granted via a non-transferable, revocable license strictly limited to the development of embodied AI and foundation models. Redistribution of raw kinematic data is strictly prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-white font-medium mb-4">3. Enterprise Compliance</h2>
          <p>
            Enterprise Tier clients must maintain minimum security standards when integrating with the Hive API. We reserve the right to sever connections that compromise the integrity of our zero-latency network.
          </p>
        </section>
      </div>
    </main>
  );
}
