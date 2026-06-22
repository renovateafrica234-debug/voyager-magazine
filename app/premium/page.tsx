// app/premium/page.tsx — Subscription Tiers
"use client";

import Link from "next/link";
import { PAYSTACK_PLANS } from "@/lib/types";
import { Check, ArrowLeft, Crown } from "lucide-react";

export default function PremiumPage() {
  return (
    <main className="min-h-screen bg-voyager-dark px-4 py-8 pb-28">
      <div className="max-w-lg mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-voyager-text-muted text-sm mb-8 hover:text-voyager-cream"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Magazine
        </Link>

        <div className="text-center mb-10">
          <Crown className="w-8 h-8 text-voyager-gold mx-auto mb-3" />
          <h1 className="font-serif text-2xl text-voyager-cream mb-2">Unlock Voyager</h1>
          <p className="text-voyager-text-secondary text-sm">
            Support independent journalism and access exclusive stories.
          </p>
        </div>

        <div className="space-y-4">
          {PAYSTACK_PLANS.map((plan) => (
            <div
              key={plan.tier}
              className={`relative rounded-2xl border p-6 transition-all ${
                plan.tier === "premium"
                  ? "border-voyager-gold/40 bg-voyager-gold/5"
                  : "border-voyager-border bg-voyager-dark-elevated"
              }`}
            >
              {plan.tier === "premium" && (
                <span className="absolute -top-3 left-6 rounded-full bg-voyager-gold px-3 py-1 text-xs font-semibold text-voyager-dark">
                  Most Popular
                </span>
              )}
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <h3 className="text-voyager-cream font-semibold text-lg">{plan.name}</h3>
                  <p className="text-voyager-text-muted text-xs mt-0.5">{plan.description}</p>
                </div>
                <div className="text-right">
                  <span className="text-voyager-cream text-2xl font-bold">₦{plan.amountNgn}</span>
                  <span className="text-voyager-text-muted text-xs">/mo</span>
                </div>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-voyager-text-secondary text-sm">
                    <Check className="w-4 h-4 text-voyager-gold flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full rounded-full py-3 text-sm font-semibold transition-all active:scale-95 ${
                  plan.tier === "premium"
                    ? "bg-voyager-gold text-voyager-dark hover:bg-voyager-gold-light"
                    : "bg-voyager-cream/10 text-voyager-cream hover:bg-voyager-cream/20"
                }`}
              >
                Subscribe to {plan.name}
              </button>
            </div>
          ))}
        </div>

        <p className="text-voyager-text-muted text-xs text-center mt-8">
          Cancel anytime. Subscriptions billed monthly via Paystack.
        </p>
      </div>
    </main>
  );
}
