const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground">PostFlow AI</p>
          <p className="text-sm text-muted-foreground mt-2">Effective Date: November 10, 2025</p>
        </div>

        <article className="space-y-8">
          <Section number="1" title="Introduction">
            <p>
              Your privacy is important to us. This Privacy Policy explains how PostFlow AI collects, uses, and protects
              your information.
            </p>
          </Section>

          <Section number="2" title="Information We Collect">
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-foreground mb-1">Account Data</h3>
                <p>Name, email address, and password.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Usage Data</h3>
                <p>How you use our Service (e.g., generated text, logs).</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Payment Data</h3>
                <p>Processed securely by third-party providers (like Paddle). We do not store credit card details.</p>
              </div>
            </div>
          </Section>

          <Section number="3" title="How We Use Your Information">
            <p className="font-semibold text-foreground mb-2">We use your information to:</p>
            <ul className="list-disc list-inside space-y-1 text-foreground/90">
              <li>Provide and improve the Service</li>
              <li>Respond to inquiries and support requests</li>
              <li>Process payments and manage your account</li>
              <li>Send updates or promotional messages (you can opt out anytime)</li>
            </ul>
          </Section>

          <Section number="4" title="Data Sharing">
            <p>
              We do not sell or rent your data. We may share limited information with trusted partners (like payment
              processors) only as needed to deliver our Service.
            </p>
          </Section>

          <Section number="5" title="Data Security">
            <p>
              We use reasonable security measures (encryption, HTTPS) to protect your data, but no system is 100%
              secure.
            </p>
          </Section>

          <Section number="6" title="Your Rights">
            <p>
              You may request access, correction, or deletion of your data by emailing{" "}
              <a href="mailto:khalid@khalidhossen.pro" className="text-primary hover:underline">
                khalid@khalidhossen.pro
              </a>
              .
            </p>
          </Section>

          <Section number="7" title="Changes">
            <p>We may update this Privacy Policy from time to time. Updates will be posted on this page.</p>
          </Section>

          <Section number="8" title="Contact">
            <p>
              For privacy inquiries, contact{" "}
              <a href="mailto:khalid@khalidhossen.pro" className="text-primary hover:underline">
                khalid@khalidhossen.pro
              </a>
            </p>
          </Section>
        </article>
      </div>
    </main>
  )
}

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-foreground">
        <span className="text-primary">{number}.</span> {title}
      </h2>
      <div className="space-y-2 text-foreground/90 leading-relaxed">{children}</div>
    </section>
  )
};

export default PrivacyPolicy;