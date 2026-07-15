import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export const metadata: Metadata = generatePageMetadata({
  title: "Privacy Policy",
  description:
    "FastVideoS privacy policy. Learn how we handle your data, what we collect (almost nothing), and how we protect your privacy.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <Breadcrumbs items={[{ name: "Privacy Policy", href: "/privacy" }]} />

      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: July 15, 2026</p>

      <div className="mt-8 space-y-8 text-base leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground">1. Introduction</h2>
          <p className="mt-3">
            FastVideoS (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to
            protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard
            information when you use our website at fastvideos.com (the &ldquo;Service&rdquo;).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">2. Information We Collect</h2>
          <p className="mt-3">
            FastVideoS is designed to minimize data collection. We do not require account creation
            or registration. The information we may collect includes:
          </p>
          <ul className="mt-3 ml-4 list-disc space-y-2 marker:text-primary">
            <li><strong className="text-foreground">URLs you submit:</strong> Processed in real-time to extract media information. URLs are not stored after processing.</li>
            <li><strong className="text-foreground">Technical data:</strong> Standard web server logs including IP addresses, browser type, and access times for security and abuse prevention.</li>
            <li><strong className="text-foreground">Contact form data:</strong> If you choose to contact us, we collect the email address, subject, and message you provide.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">3. What We Do NOT Collect</h2>
          <ul className="mt-3 ml-4 list-disc space-y-2 marker:text-primary">
            <li>Personal identification information (no accounts, no names)</li>
            <li>Download history or activity logs</li>
            <li>Payment information (the service is free)</li>
            <li>Location data beyond what IP addresses inherently reveal</li>
            <li>Device fingerprints for tracking purposes</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">4. Cookies</h2>
          <p className="mt-3">
            FastVideoS uses minimal cookies. Essential cookies may be used for theme preference
            (dark/light mode). Third-party advertising partners may use cookies for ad personalization.
            You can disable cookies in your browser settings without affecting core functionality.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">5. Third-Party Services</h2>
          <p className="mt-3">
            We may use third-party services for analytics and advertising. These services may
            collect their own data according to their respective privacy policies. We recommend
            reviewing the privacy policies of any third-party services we use.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">6. Data Security</h2>
          <p className="mt-3">
            We use industry-standard security measures including HTTPS encryption, secure headers,
            and rate limiting to protect the Service and its users. However, no method of electronic
            transmission is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">7. Children&apos;s Privacy</h2>
          <p className="mt-3">
            FastVideoS is not directed at children under 13. We do not knowingly collect information
            from children under 13. If you believe a child has provided us with personal information,
            please contact us.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">8. Changes to This Policy</h2>
          <p className="mt-3">
            We may update this Privacy Policy from time to time. Changes will be posted on this page
            with an updated revision date. Continued use of the Service constitutes acceptance of any
            changes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">9. Contact Us</h2>
          <p className="mt-3">
            If you have questions about this Privacy Policy, please contact us through our{" "}
            <a href="/contact" className="text-primary hover:underline">contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
