export default function Privacy() {
  return (
    <main className="pt-32 pb-16 px-6 sm:px-12 md:px-24 max-w-4xl mx-auto text-neutral-300">
      <h1 className="text-4xl md:text-5xl font-mono tracking-tight text-white mb-12">
        Privacy Policy
      </h1>
      
      <div className="space-y-8 text-base md:text-lg leading-relaxed">
        <section>
          <h2 className="text-xl text-white font-medium mb-4">1. Information Collection</h2>
          <p>
            At Vega4D, we collect precise human kinematics and multimodal data strictly in our secure capture environments. The data provided through our platform, including enterprise integration details and proprietary model configurations, is handled with military-grade encryption.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-white font-medium mb-4">2. Zero-Information Loss & Security</h2>
          <p>
            Our core operating principle is zero-information loss. This applies not only to our kinematics capture but to how we store your enterprise integration data. All transmissions are secured via end-to-end encryption.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-white font-medium mb-4">3. Data Usage</h2>
          <p>
            Data provided by clients is used exclusively for fulfilling integration requests, managing enterprise tier access, and securely delivering our VLA foundation model datasets to authorized nodes.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-white font-medium mb-4">4. Contact Information</h2>
          <p>
            For privacy-related inquiries regarding your enterprise data, initialize a secure transmission channel via our support portal.
          </p>
        </section>
      </div>
    </main>
  );
}
