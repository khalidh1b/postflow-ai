const TermsAndConditions = () => {
  return (
    <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Terms and Conditions</h1>
          <p className="text-muted-foreground">PostFlow AI</p>
          <p className="text-sm text-muted-foreground mt-2">Effective Date: November 10, 2025</p>
        </div>

        <article className="space-y-8">
          <Section number="1" title="Introduction">
            <p>
              Welcome to PostFlow AI. By accessing or using our website and services (the
              "Service"), you agree to be bound by these Terms and Conditions.
            </p>
            <p>If you do not agree, please do not use our Service.</p>
          </Section>

          <Section number="2" title="Description of Service">
            <p>
              PostFlow AI is a web-based tool that helps users generate LinkedIn post ideas, captions, and content using
              artificial intelligence.
            </p>
          </Section>

          <Section number="3" title="Eligibility">
            <p>There's no age restrictions to use this Service.</p>
          </Section>

          <Section number="4" title="Accounts">
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all activities
              under your account.
            </p>
          </Section>

          <Section number="5" title="Acceptable Use">
            <p>
              You agree not to misuse our Service or use it to create spam, misleading, or harmful content. We reserve
              the right to suspend or terminate accounts that violate these terms.
            </p>
          </Section>

          <Section number="6" title="Intellectual Property">
            <p>
              All content, features, and functionality of PostFlow AI are owned by us or our licensors. You may not
              copy, modify, or redistribute any part of the Service without permission.
            </p>
          </Section>

          <Section number="7" title="Payments">
            <p>
              Payments are processed securely via third-party platforms (e.g., Paddle). Prices are listed in USD and may
              change over time.
            </p>
          </Section>

          <Section number="8" title="Limitation of Liability">
            <p>
              We are not liable for any indirect, incidental, or consequential damages arising from your use of the
              Service.
            </p>
          </Section>

          <Section number="9" title="Termination">
            <p>
              We may suspend or terminate access at any time for violation of these Terms or other legitimate reasons.
            </p>
          </Section>

          <Section number="10" title="Contact">
            <p>
              For questions about these Terms, contact us at{" "}
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

export default TermsAndConditions;