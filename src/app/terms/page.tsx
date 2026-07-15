import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export const metadata: Metadata = generatePageMetadata({
  title: "Terms of Service",
  description:
    "FastVideoS terms of service. Understand the rules governing your use of our free online media download tool.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <Breadcrumbs items={[{ name: "Terms of Service", href: "/terms" }]} />

      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: July 15, 2026</p>

      <div className="mt-8 space-y-8 text-base leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
          <p className="mt-3">
            By accessing or using FastVideoS (the &ldquo;Service&rdquo;), you agree to be bound
            by these Terms of Service. If you do not agree to these terms, please do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">2. Description of Service</h2>
          <p className="mt-3">
            FastVideoS provides a free, browser-based tool that allows users to extract media
            information and download content from supported platforms. The Service is provided
            &ldquo;as is&rdquo; without warranties of any kind.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">3. Acceptable Use</h2>
          <p className="mt-3">You agree to use FastVideoS only for lawful purposes. Specifically, you agree to:</p>
          <ul className="mt-3 ml-4 list-disc space-y-2 marker:text-primary">
            <li>Download only content you own or have explicit permission to download</li>
            <li>Respect copyright laws and intellectual property rights</li>
            <li>Comply with the terms of service of the source platforms</li>
            <li>Not use the Service for commercial redistribution of copyrighted content</li>
            <li>Not attempt to overload, disrupt, or reverse-engineer the Service</li>
            <li>Not use automated scripts or bots to access the Service excessively</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">4. Intellectual Property</h2>
          <p className="mt-3">
            The FastVideoS website, its design, features, and content are the intellectual property
            of FastVideoS. Media content downloaded through the Service belongs to its respective
            copyright holders. We do not claim ownership of any third-party content.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">5. Limitation of Liability</h2>
          <p className="mt-3">
            FastVideoS is provided as a free tool and is offered &ldquo;as is&rdquo; without any
            warranties, express or implied. We are not liable for any damages arising from your use
            of the Service, including but not limited to direct, indirect, incidental, or
            consequential damages.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">6. User Responsibility</h2>
          <p className="mt-3">
            You are solely responsible for determining whether your use of the Service complies with
            applicable laws in your jurisdiction. FastVideoS does not monitor, verify, or endorse the
            content that users choose to download. You assume all risk associated with the use of
            downloaded content.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">7. Service Availability</h2>
          <p className="mt-3">
            We strive to maintain high availability but do not guarantee uninterrupted access. The
            Service may be temporarily unavailable due to maintenance, updates, or circumstances
            beyond our control. We reserve the right to modify, suspend, or discontinue any aspect
            of the Service at any time.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">8. Rate Limiting</h2>
          <p className="mt-3">
            To ensure fair usage and service quality, FastVideoS implements rate limiting. Excessive
            requests may be temporarily blocked. Continued abuse may result in permanent access
            restrictions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">9. Changes to Terms</h2>
          <p className="mt-3">
            We reserve the right to update these Terms of Service at any time. Changes will be
            effective immediately upon posting. Continued use of the Service constitutes acceptance
            of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">10. Contact</h2>
          <p className="mt-3">
            For questions about these Terms, please visit our{" "}
            <Link href="/contact" className="text-primary hover:underline">contact page</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
