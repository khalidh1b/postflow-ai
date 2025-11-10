const RefundPolicy = () => {
  return (
    <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Refund Policy</h1>
          <p className="text-muted-foreground">PostFlow AI</p>
          <p className="text-sm text-muted-foreground mt-2">Effective Date: November 10, 2025</p>
        </div>

        <article className="space-y-8">
          <Section number="1" title="Overview">
            <p>We aim to ensure customer satisfaction with our AI content generation service.</p>
          </Section>

          <Section number="2" title="Refund Eligibility">
            <p className="mb-3">
              Because PostFlow AI provides instant access to digital content and computing resources, we generally do
              not offer refunds after a purchase is completed.
            </p>
            <p className="font-semibold text-foreground mb-2">
              However, we may issue refunds in special cases, such as:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground/90">
              <li>Duplicate payment</li>
              <li>Accidental multiple charges</li>
              <li>Service not functioning as described (verified by our team)</li>
            </ul>
          </Section>

          <Section number="3" title="Requesting a Refund">
            <p>
              To request a refund, please contact us within 7 days of purchase at{" "}
              <a href="mailto:khalid@khalidhossen.pro" className="text-primary hover:underline">
                khalid@khalidhossen.pro
              </a>{" "}
              with your payment receipt or transaction ID.
            </p>
            <p className="mt-2">If approved, refunds will be issued to your original payment method.</p>
          </Section>

          <Section number="4" title="Subscription Cancellations">
            <p>
              If you have a recurring plan, you can cancel anytime. You'll retain access until the end of your billing
              cycle.
            </p>
          </Section>

          <Section number="5" title="Contact">
            <p className="font-semibold text-foreground mb-2">For refund or billing questions, contact:</p>
            <p>
              Email:{" "}
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

export default RefundPolicy;