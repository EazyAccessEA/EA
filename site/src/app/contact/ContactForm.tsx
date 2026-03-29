"use client";

import { useState, useCallback } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { submitContactForm, type ContactFormState } from "./action";
import { Turnstile } from "@/components/ui/Turnstile";

const initialState: ContactFormState = { success: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex items-center gap-2 rounded-button border-[1.5px] border-accent bg-accent px-7 py-[11px] font-body text-[13px] font-medium text-[#FDFCFA] transition-all hover:bg-accent-dark hover:border-accent-dark disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Sending..." : "Send message"}
      {!pending && (
        <span className="inline-block transition-transform group-hover:translate-x-0.5">
          →
        </span>
      )}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const [turnstileToken, setTurnstileToken] = useState("");

  const handleVerify = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const handleExpire = useCallback(() => {
    setTurnstileToken("");
  }, []);

  if (state.success) {
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
    <form action={formAction} className="space-y-6">
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

      {/* Hidden Turnstile token field */}
      <input type="hidden" name="cf-turnstile-response" value={turnstileToken} />

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
      {state.error && (
        <p className="rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 font-body text-[13px] font-medium text-red-700">
          {state.error}
        </p>
      )}

      {/* Submit */}
      <SubmitButton />

      <p className="font-body text-[11px] font-light leading-relaxed text-faint">
        We read every message. If your enquiry requires a response, we will
        reply within a few working days. We will never add you to a marketing
        list without your consent.
      </p>
    </form>
  );
}
