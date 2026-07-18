"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { contactFormSchema } from "@/lib/schemas";
import type { ContactFormInput } from "@/lib/schemas";
import Link from "next/link";

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormInput) => {
    setSubmitError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "An error occurred"
      );
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-foreground">Message Sent</h2>
        <p className="mt-3 text-muted-foreground">
          Thank you for reaching out. We&apos;ll get back to you as soon as possible.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Contact Us
      </h1>
      <p className="mt-3 text-base text-muted-foreground">
        Have a question, bug report, or feature request? We&apos;d love to hear from you.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-5"
        noValidate
      >
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={cn(
              "h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-all",
              "focus:border-primary focus:ring-2 focus:ring-primary/20",
              errors.email ? "border-destructive" : "border-input"
            )}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="subject"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Subject
          </label>
          <input
            id="subject"
            type="text"
            {...register("subject")}
            className={cn(
              "h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-all",
              "focus:border-primary focus:ring-2 focus:ring-primary/20",
              errors.subject ? "border-destructive" : "border-input"
            )}
            placeholder="What's this about?"
          />
          {errors.subject && (
            <p className="mt-1 text-xs text-destructive">{errors.subject.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            {...register("message")}
            className={cn(
              "w-full resize-none rounded-lg border bg-background px-3 py-2.5 text-sm outline-none transition-all",
              "focus:border-primary focus:ring-2 focus:ring-primary/20",
              errors.message ? "border-destructive" : "border-input"
            )}
            placeholder="Tell us more..."
          />
          {errors.message && (
            <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>
          )}
        </div>

        {submitError && (
          <p className="text-sm text-destructive" role="alert">{submitError}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send Message
            </>
          )}
        </button>
      </form>
    </>
  );
}
