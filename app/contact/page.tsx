// app/contact/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <main className="min-h-screen bg-voyager-dark flex items-center justify-center px-4">
        <div className="text-center">
          <CheckCircle className="w-12 h-12 text-voyager-gold mx-auto mb-4" />
          <h1 className="font-serif text-2xl text-voyager-cream mb-2">Message Sent</h1>
          <p className="text-voyager-text-secondary text-sm mb-6">We will respond within 48 hours.</p>
          <Link href="/" className="text-voyager-gold text-sm hover:underline">Back to home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-voyager-dark pb-28">
      <div className="max-w-lg mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-voyager-text-muted text-sm mb-8 hover:text-voyager-cream">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <h1 className="font-serif text-2xl text-voyager-cream mb-2">Contact</h1>
        <p className="text-voyager-text-secondary text-sm mb-8">We read every message.</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-voyager-cream text-sm mb-1.5">Name</label>
            <input
              type="text"
              required
              className="w-full rounded-xl bg-voyager-dark-elevated border border-voyager-border px-4 py-3 text-sm text-voyager-cream placeholder:text-voyager-text-muted focus:outline-none focus:border-voyager-gold/50"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-voyager-cream text-sm mb-1.5">Email</label>
            <input
              type="email"
              required
              className="w-full rounded-xl bg-voyager-dark-elevated border border-voyager-border px-4 py-3 text-sm text-voyager-cream placeholder:text-voyager-text-muted focus:outline-none focus:border-voyager-gold/50"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="block text-voyager-cream text-sm mb-1.5">Message</label>
            <textarea
              required
              rows={5}
              className="w-full rounded-xl bg-voyager-dark-elevated border border-voyager-border px-4 py-3 text-sm text-voyager-cream placeholder:text-voyager-text-muted focus:outline-none focus:border-voyager-gold/50 resize-none"
              placeholder="Tell us what you think..."
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-voyager-gold py-3 text-sm font-semibold text-voyager-dark flex items-center justify-center gap-2 hover:bg-voyager-gold-light transition-colors active:scale-95"
          >
            <Send className="w-4 h-4" />
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}
