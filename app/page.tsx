"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const articles = [
  {
    id: "obi-cubana",
    title: "Obi Cubana: A Legacy of Influence in Nigerian Business",
    category: "Culture",
    image: "/images/obi-cubana.jpg",
    author: "Voyager Editorial",
    date: "June 26, 2026",
    readTime: "10 min",
    premium: true,
    video: true,
    videoUrl: "https://youtu.be/6p5XX-b3Ay4?si=FINkNSVCcJBJhXS7",
  },
  {
    id: "abuja-luxury",
    title: "Abuja's Hidden Luxury: The New Gold Standard",
    category: "Travel",
    image: "/images/abuja-luxury.jpg",
    author: "Amina Bello",
    date: "June 24, 2026",
    readTime: "6 min",
    premium: false,
    video: false,
  },
  {
    id: "monaco",
    title: "Monaco: Where the Mediterranean Meets Majesty",
    category: "Travel",
    image: "/images/monaco.jpg",
    author: "Tara Obi",
    date: "June 22, 2026",
    readTime: "5 min",
    premium: true,
    video: true,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "greenland",
    title: "Glimmers of Ice: Greenland",
    category: "Travel",
    image: "/images/greenland.jpg",
    author: "Zara Adeyemi",
    date: "June 20, 2026",
    readTime: "7 min",
    premium: false,
    video: false,
  },
  {
    id: "fashion-week",
    title: "Lagos Fashion Week 2026: The Designers Who Stole the Show",
    category: "Fashion",
    image: "/images/fashion-week.jpg",
    author: "Zara Adeyemi",
    date: "June 18, 2026",
    readTime: "4 min",
    premium: true,
    video: false,
  },
  {
    id: "kano-culture",
    title: "Kano's Ancient Walls: A 700-Year Legacy Under Threat",
    category: "Culture",
    image: "/images/kano-walls.jpg",
    author: "Ibrahim Musa",
    date: "June 15, 2026",
    readTime: "7 min",
    premium: false,
    video: false,
  },
];

const ads = [
  { id: "ad1", title: "Emirates First Class", subtitle: "Abuja ↔ Dubai from ₦2.4M", image: "/images/ad-emirates.jpg", cta: "Book Now" },
  { id: "ad2", title: "WhiteLion Voyage", subtitle: "Luxury African Expeditions", image: "/images/ad-whitelion.jpg", cta: "Explore" },
];

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true), 100);
    const t2 = setTimeout(() => setShowSplash(false), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const hero = articles[0];
  const trending = articles.slice(1, 4);
  const latest = articles.slice(2, 6);

  if (showSplash) {
    return (
      <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0A0A] transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}>
        <div className="text-[#C9A96E] text-4xl font-serif tracking-[0.3em] mb-4">VOYAGER</div>
        <div className="text-[#F2EDE4]/60 text-xs tracking-[0.5em] uppercase">Magazine</div>
        <div className="mt-8 w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent animate-pulse" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F2EDE4] pb-24">
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0A0A0A]/80 backdrop-blur-md">
        <div className="max-w-md mx-auto px-5 h-14 flex items-center justify-between">
          <span className="text-[#C9A96E] font-serif text-xl tracking-[0.25em]">VOYAGER</span>
          <div className="flex items-center gap-3">
            <Link href="/chat" className="w-8 h-8 rounded-full border border-[#C9A96E]/30 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5">
                <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
            </Link>
          </div>
        </div>
      </header>

      <div className="pt-14 max-w-md mx-auto">
        {/* Hero — now clickable */}
        <section className="relative h-[75vh] w-full overflow-hidden cursor-pointer" onClick={() => router.push(`/article/${hero.id}`)}>
          <Image src={hero.image} alt={hero.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-[#0A0A0A]/10" />
          <div className="absolute top-6 left-5 flex flex-col gap-2">
            {hero.video && (
              <span className="inline-flex items-center gap-1.5 bg-[#C9A96E] text-[#0A0A0A] text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                Video Story
              </span>
            )}
          </div>
          {hero.video && (
            <button 
              onClick={(e) => { e.stopPropagation(); setShowVideoModal(true); }} 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#C9A96E] flex items-center justify-center shadow-lg shadow-[#C9A96E]/30 hover:scale-105 transition-transform"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#0A0A0A"><path d="M8 5v14l11-7z"/></svg>
            </button>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <span className="inline-block bg-[#C9A96E]/20 text-[#C9A96E] text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-3 backdrop-blur-sm">
              {hero.category}
            </span>
            <h1 className="text-[26px] font-serif leading-[1.15] mb-3">{hero.title}</h1>
            <div className="flex items-center gap-2 text-xs text-[#F2EDE4]/60">
              <span>{hero.author}</span>
              <span className="w-1 h-1 rounded-full bg-[#F2EDE4]/40" />
              <span>{hero.readTime}</span>
            </div>
          </div>
        </section>

        {/* Trending Now */}
        <section className="px-5 mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[11px] tracking-[0.25em] uppercase text-[#F2EDE4]/70 font-medium">Trending Now</h2>
            <Link href="/explore" className="text-[10px] text-[#C9A96E] tracking-wider">See All</Link>
          </div>
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 scrollbar-hide">
            {trending.map((a) => (
              <Link key={a.id} href={`/article/${a.id}`} className="snap-start flex-shrink-0 w-[260px] group">
                <div className="relative h-[160px] rounded-xl overflow-hidden mb-3">
                  <Image src={a.image} alt={a.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  {a.video && (
                    <span className="absolute top-2 left-2 inline-flex items-center gap-1 bg-[#0A0A0A]/60 text-[#C9A96E] text-[9px] font-bold tracking-wider uppercase px-2 py-1 rounded backdrop-blur-sm">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                      Video
                    </span>
                  )}
                  {a.premium && (
                    <span className="absolute top-2 right-2 text-[9px] tracking-wider uppercase bg-[#C9A96E]/20 text-[#C9A96E] px-2 py-1 rounded backdrop-blur-sm border border-[#C9A96E]/20">Premium</span>
                  )}
                </div>
                <span className="text-[#C9A96E] text-[10px] tracking-[0.2em] uppercase font-medium">{a.category}</span>
                <h3 className="text-[15px] font-serif leading-snug mt-1 group-hover:text-[#C9A96E] transition-colors">{a.title}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* Sponsored / Ads */}
        <section className="px-5 mt-6">
          <h2 className="text-[11px] tracking-[0.25em] uppercase text-[#F2EDE4]/70 font-medium mb-4">Sponsored</h2>
          <div className="space-y-4">
            {ads.map((ad) => (
              <div key={ad.id} className="relative h-[140px] rounded-xl overflow-hidden">
                <Image src={ad.image} alt={ad.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-[10px] text-[#C9A96E] tracking-wider uppercase mb-1">Sponsored</p>
                  <h3 className="text-base font-serif">{ad.title}</h3>
                  <p className="text-xs text-[#F2EDE4]/70 mt-0.5">{ad.subtitle}</p>
                </div>
                <button className="absolute bottom-4 right-4 bg-[#C9A96E] text-[#0A0A0A] text-[10px] font-bold tracking-wider uppercase px-4 py-2 rounded-full">
                  {ad.cta}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Stories */}
        <section className="px-5 mt-10">
          <h2 className="text-[11px] tracking-[0.25em] uppercase text-[#F2EDE4]/70 font-medium mb-4">Latest Stories</h2>
          <div className="space-y-6">
            {latest.map((a) => (
              <Link key={a.id} href={`/article/${a.id}`} className="flex gap-4 group">
                <div className="relative w-[100px] h-[100px] flex-shrink-0 rounded-lg overflow-hidden">
                  <Image src={a.image} alt={a.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex-1 py-1">
                  <span className="text-[#C9A96E] text-[10px] tracking-[0.2em] uppercase">{a.category}</span>
                  <h3 className="text-[15px] font-serif leading-snug mt-1 mb-2 group-hover:text-[#C9A96E] transition-colors">{a.title}</h3>
                  <div className="flex items-center gap-2 text-[10px] text-[#F2EDE4]/40">
                    <span>{a.date}</span>
                    <span>•</span>
                    <span>{a.readTime}</span>
                    {a.premium && <span className="text-[#C9A96E]">• Premium</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Art Gallery — Linked to /art */}
        <section className="px-5 mt-10">
          <Link href="/art" className="block relative h-[200px] rounded-xl overflow-hidden group">
            <Image src="/images/art-gallery.jpg" alt="Art Gallery" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] text-[#C9A96E] tracking-wider uppercase">The Collection</span>
              <h3 className="text-lg font-serif mt-1">African Contemporary Art</h3>
              <p className="text-xs text-[#F2EDE4]/60 mt-1">Curated works from Lagos, Accra, and Nairobi</p>
            </div>
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0A0A0A]/40 backdrop-blur-sm flex items-center justify-center border border-[#F2EDE4]/20 group-hover:bg-[#C9A96E]/20 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
            </div>
          </Link>
        </section>
      </div>

      {/* YouTube Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A]/95 flex items-center justify-center p-5" onClick={() => setShowVideoModal(false)}>
          <div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="relative pt-[56.25%] rounded-xl overflow-hidden">
              <iframe
                src={hero.videoUrl}
                title="Video Story"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-center text-xs text-[#F2EDE4]/40 mt-3">Tap outside to close</p>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-t border-[#F2EDE4]/5">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => router.push("/")} className="flex flex-col items-center gap-1 text-[#C9A96E]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span className="text-[9px] tracking-wider">Home</span>
          </button>
          <button onClick={() => router.push("/explore")} className="flex flex-col items-center gap-1 text-[#F2EDE4]/40 hover:text-[#F2EDE4] transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
            <span className="text-[9px] tracking-wider">Explore</span>
          </button>
          <button onClick={() => router.push("/chat")} className="flex flex-col items-center justify-center -mt-6 w-14 h-14 rounded-full bg-[#C9A96E] text-[#0A0A0A] shadow-lg shadow-[#C9A96E]/30">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          </button>
          <button onClick={() => router.push("/bookmarks")} className="flex flex-col items-center gap-1 text-[#F2EDE4]/40 hover:text-[#F2EDE4] transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
            <span className="text-[9px] tracking-wider">Saved</span>
          </button>
          <button onClick={() => router.push("/profile")} className="flex flex-col items-center gap-1 text-[#F2EDE4]/40 hover:text-[#F2EDE4] transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span className="text-[9px] tracking-wider">Profile</span>
          </button>
        </div>
      </nav>
    </main>
  );
        }
      
