// app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Profile, PAYSTACK_PLANS } from "@/lib/types";
import { User, Settings, CreditCard, LogOut, ChevronRight } from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      setProfile(data as Profile);
      setLoading(false);
    }
    loadProfile();
  }, []);

  const plan = PAYSTACK_PLANS.find((p) => p.tier === profile?.subscription_tier);

  if (loading) {
    return (
      <main className="min-h-screen bg-voyager-dark flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-voyager-gold border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-voyager-dark pb-28">
      <div className="p-4 pt-6 max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-voyager-gold/20 flex items-center justify-center">
            <User className="w-8 h-8 text-voyager-gold" />
          </div>
          <div>
            <h1 className="text-voyager-cream font-semibold text-lg">
              {profile?.full_name || "Voyager Reader"}
            </h1>
            <p className="text-voyager-text-muted text-sm">
              {plan?.name || "Free"} Plan
            </p>
          </div>
        </div>

        {/* Subscription Card */}
        <div className="rounded-2xl bg-gradient-to-br from-voyager-gold/20 to-voyager-gold/5 border border-voyager-gold/20 p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-voyager-gold font-semibold text-sm">Current Plan</span>
            <span className="text-xs text-voyager-cream bg-voyager-gold/20 px-2 py-1 rounded-full">
              {profile?.subscription_status || "inactive"}
            </span>
          </div>
          <p className="text-voyager-cream text-2xl font-bold mb-1">
            {plan ? `₦${plan.amountNgn}/mo` : "Free"}
          </p>
          <p className="text-voyager-text-secondary text-xs mb-4">
            {plan?.description || "Basic access to free articles"}
          </p>
          <Link
            href="/premium"
            className="block w-full text-center rounded-full bg-voyager-gold py-2.5 text-sm font-semibold text-voyager-dark hover:bg-voyager-gold-light transition-colors"
          >
            {profile?.subscription_tier === "free" ? "Upgrade Plan" : "Manage Subscription"}
          </Link>
        </div>

        {/* Menu */}
        <div className="space-y-2">
          {[
            { label: "Reading History", icon: User, href: "#" },
            { label: "Payment Methods", icon: CreditCard, href: "#" },
            { label: "Settings", icon: Settings, href: "#" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center justify-between p-4 rounded-xl bg-voyager-dark-elevated border border-voyager-border text-voyager-cream hover:border-voyager-gold/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-voyager-text-muted" />
                <span className="text-sm">{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-voyager-text-muted" />
            </Link>
          ))}

          <button
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/";
            }}
            className="w-full flex items-center gap-3 p-4 rounded-xl text-red-400 hover:bg-red-400/10 transition-colors mt-4"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-voyager-border pb-safe">
        <div className="flex items-center justify-around py-3 max-w-lg mx-auto">
          {[
            { href: "/", label: "Home" },
            { href: "/explore", label: "Explore" },
            { href: "/saved", label: "Saved" },
            { href: "/profile", label: "Profile" },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="text-voyager-text-muted hover:text-voyager-gold text-[10px]">
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </main>
  );
            }
                
