import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact Us — FastVideoS",
  description:
    "Have a question, bug report, or feature request? Get in touch with the FastVideoS team. We would love to hear from you.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />
      <ContactForm />
    </div>
  );
}
