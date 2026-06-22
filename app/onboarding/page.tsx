// app/onboarding/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Compass, BookOpen, Sparkles, ChevronRight } from "lucide-react";

const steps = [
  {
    icon: Compass,
    title: "Discover Africa Differently",
    description: "Voyager is a luxury digital magazine exploring the continent's most compelling stories.",
  },
  {
    icon: BookOpen,
    title: "Curated Stories",
    description: "From Saharan dunes to Lagos runways, our editors handpick every article for depth and beauty.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Archive",
    description: "Chat with our Editor AI. It has read every article and can answer any question about our stories.",
  },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const CurrentIcon = steps[step].icon;

  return (
    <main className="min-h-screen bg-voyager-dark flex flex-col items-center justify-center px-6">
      <div className="max-w-sm w-full text-center">
        <div className="w-20 h-20 rounded-full bg-voyager-gold/20 flex items-center justify-center mx-auto mb-6">
          <CurrentIcon className="w-10 h-10 text-voyager-gold" />
        </div>

        <h1 className="font-serif text-2xl text-voyager-cream mb-3">{steps[step].title}</h1>
        <p className="text-voyager-text-secondary text-sm leading-relaxed mb-8">
          {steps[step].description}
        </p>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === step ? "bg-voyager-gold" : "bg-voyager-text-muted/30"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => {
            if (step < steps.length - 1) {
              setStep(step + 1);
            } else {
              localStorage.setItem("voyager_onboarded", "true");
              router.push("/");
            }
          }}
          className="w-full rounded-full bg-voyager-gold py-3.5 text-sm font-semibold text-voyager-dark flex items-center justify-center gap-2 hover:bg-voyager-gold-light transition-colors active:scale-95"
        >
          {step < steps.length - 1 ? "Next" : "Start Reading"}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </main>
  );
}
