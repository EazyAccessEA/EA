"use client";

import { useState, useCallback, type FormEvent } from "react";
import { Turnstile } from "@/components/ui/Turnstile";

export function ContactForm() {
  const [turnstileToken, setTurnstileToken] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleVerify = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const handleExpire = useCallback(() => {
    setTurnstileToken("");
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const body = {
      name: data.get("name"),
      email: data.get("email"),
      subject: data.get("subject"),
      message: data.get("message"),
      company_url: data.get("company_url"), // honeypot
      "cf-turnstile-response": turnstileToken,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await res.json();

      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Could not send your message. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[12px] border border-rule bg-surface p-8 text-center">
        <p className="font-display text-2xl italic text-ink">Message sent.</p>
        <p className="mt-3 font-body text-[15px] font-light leading-relaxed text-mid">
          Thank you for getting in touch. We read every message and will respond
          if a reply is appropriate.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot — invisible to real users, bots fill it in */}
      <div className="absolute -left-[9999px] -top-[9999px]" aria-hidden="true">
        <label htmlFor="company_url">Company URL</label>
        <input
          type="text"
          name="company_url"
          id="company_url"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block font-body text-[13px] font-medium text-ink-mid"
        >
          Name <span className="text-accent">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          autoComplete="name"
          className="mt-2 block w-full rounded-[8px] border border-rule bg-bg px-4 py-3 font-body text-[15px] font-light text-ink outline-none transition-colors placeholder:text-ghost focus:border-accent focus:ring-1 focus:ring-accent/20"
          placeholder="Your name"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block font-body text-[13px] font-medium text-ink-mid"
        >
          Email <span className="text-accent">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          className="mt-2 block w-full rounded-[8px] border border-rule bg-bg px-4 py-3 font-body text-[15px] font-light text-ink outline-none transition-colors placeholder:text-ghost focus:border-accent focus:ring-1 focus:ring-accent/20"
          placeholder="you@example.com"
        />
      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor="subject"
          className="block font-body text-[13px] font-medium text-ink-mid"
        >
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          className="mt-2 block w-full rounded-[8px] border border-rule bg-bg px-4 py-3 font-body text-[15px] font-light text-ink outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/20"
          defaultValue=""
        >
          <option value="" disabled>
            Select a topic
          </option>
          <option value="general">General enquiry</option>
          <option value="acquisition">Selling a software business</option>
          <option value="partnership">Partnership or collaboration</option>
          <option value="press">Press or media</option>
          <option value="product">Product feedback</option>
          <option value="other">Something else</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block font-body text-[13px] font-medium text-ink-mid"
        >
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          className="mt-2 block w-full resize-y rounded-[8px] border border-rule bg-bg px-4 py-3 font-body text-[15px] font-light leading-relaxed text-ink outline-none transition-colors placeholder:text-ghost focus:border-accent focus:ring-1 focus:ring-accent/20"
          placeholder="Tell us what you're thinking."
        />
      </div>

      {/* Turnstile */}
      <Turnstile onVerify={handleVerify} onExpire={handleExpire} />

      {/* Error message */}
      {status === "error" && errorMessage && (
        <p className="rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 font-body text-[13px] font-medium text-red-700">
          {errorMessage}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex items-center gap-2 rounded-button border-[1.5px] border-accent bg-accent px-7 py-[11px] font-body text-[13px] font-medium text-[#FDFCFA] transition-all hover:bg-accent-dark hover:border-accent-dark disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending..." : "Send message"}
        {status !== "sending" && (
          <span className="inline-block transition-transform group-hover:translate-x-0.5">
            →
          </span>
        )}
      </button>

      <p className="font-body text-[11px] font-light leading-relaxed text-faint">
        We read every message. If your enquiry requires a response, we will
        reply within a few working days. We will never add you to a marketing
        list without your consent.
      </p>
    </form>
  );
}
