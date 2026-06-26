"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  premium?: boolean;
};

const articles: Article[] = [
  {
    id: "obi-cubana",
    title: "The King of Nightlife: How Obi Cubana Built a Billion-Naira Hospitality Empire",
    excerpt: "From a humble lounge in Oba to a nationwide luxury brand — the inside story of Nigeria's most celebrated hospitality mogul.",
    category: "Power & Influence",
    image: "https://scontent-los4-1.xx.fbcdn.net/v/t39.99422-6/728453851_36684042361240550_6147330443937901213_n.png",
    author: "Voyager Editorial",
    date: "June 26, 2026",
    readTime: "8 min",
    premium: true,
  },
  {
    id: "abuja-luxury",
    title: "Abuja's Hidden Luxury: The New Gold Standard for Nigerian Real Estate",
    excerpt: "Inside the gated communities, penthouses, and waterfront estates redefining premium living in the capital.",
    category: "Real Estate",
    image: "https://images.unsplash.com/photo-1600596542815-27bfefd0c3c6?w=800&q=80",
    author: "Amina Bello",
    date: "June 24, 2026",
    readTime: "6 min",
  },
  {
    id: "tech-africa",
    title: "The African Tech Exodus: Why Founders Are Choosing Lagos Over London",
    excerpt: "A new wave of venture-backed startups is proving that the future of African innovation is being built at home.",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    author: "Chidi Okonkwo",
    date: "June 22, 2026",
    readTime: "5 min",
  },
  {
    id: "fashion-week",
    title: "Lagos Fashion Week 2026: The Designers Who Stole the Show",
    excerpt: "From avant-garde runway pieces to wearable art, here are the collections everyone is talking about.",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    author: "Zara Adeyemi",
    date: "June 20, 2026",
    readTime: "4 min",
    premium: true,
  },
  {
    id: "kano-culture",
    title: "Kano's Ancient Walls: A 700-Year Legacy Under Threat",
    excerpt: "As modern development encroaches, conservationists race to preserve one of Africa's most significant historical landmarks.",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&q=80",
    author: "Ibrahim Musa",
    date: "June 18, 2026",
    readTime: "7 min",
  },
  {
    id: "wine-dine",
    title: "Nigeria's Wine Revolution: Sommeliers Changing the Palate",
    excerpt: "From Nkem to Ngozi, a new generation of certified sommeliers is elevating Nigeria's dining culture.",
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
    author: "Tara Obi",
    date: "June 15, 2026",
    readTime: "5 min",
  },
];

const galleryImages = [
  "https://scontent-los4-1.xx.fbcdn.net/v/t39.99422-6/728453851_36684042361240550_6147330443937901213_n.png",
  "https://scontent-los4-1.xx.fbcdn.net/v/t39.99422-6/727773623_1687747355705523_6174302628346939301_n.png",
  "https://scontent-los4-1.xx.fbcdn.net/v/t39.30808-6/365699413_773596821232007_8128357802223160569_n.jpg",
];

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true), 100);
    const t2 = setTimeout(() => setShowSplash(false), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const hero = articles[0];

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
    <main className="min-h-screen bg-[#0A0A0A] text-[#F2EDE4]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#C9A96E]/10">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          <span className="text-[#C9A96E] font-serif text-lg tracking-[0.2em]">VOYAGER</span>
          <Link href="/chat" className="text-[10px] tracking-widest uppercase text-[#C9A96E] border border-[#C9A96E]/30 px-3 py-1 rounded-full">AI Brain</Link>
        </div>
      </header>

      <div className="pt-14 pb-24 max-w-md mx-auto">
        {/* Hero */}
        <section className="relative h-[70vh] w-full overflow-hidden">
          <Image src={hero.image} alt={hero.title} fill className="object-cover" priority unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="text-[#C9A96E] text-[10px] tracking-[0.3em] uppercase">{hero.category}</span>
            <h1 className="text-2xl font-serif leading-tight mt-2 mb-3">{hero.title}</h1>
            <p className="text-sm text-[#F2EDE4]/70 leading-relaxed mb-4">{hero.excerpt}</p>
            <div className="flex items-center gap-3 text-[10px] text-[#F2EDE4]/50">
              <span>{hero.author}</span><span>•</span><span>{hero.date}</span><span>•</span><span>{hero.readTime}</span>
            </div>
            {hero.premium && <span className="inline-block mt-3 text-[9px] tracking-widest uppercase bg-[#C9A96E]/20 text-[#C9A96E] px-2 py-1 rounded">Premium</span>}
            <Link href={`/article/${hero.id}`} className="block mt-4 text-center bg-[#C9A96E] text-[#0A0A0A] text-xs font-semibold tracking-widest uppercase py-3 rounded-sm">Read Article</Link>
          </div>
        </section>

        {/* Gallery */}
        <section className="px-4 py-6">
          <h2 className="text-[10px] tracking-[0.3em] uppercase text-[#C9A96E] mb-4">In Focus</h2>
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2">
            {galleryImages.map((src, i) => (
              <div key={i} className="snap-start flex-shrink-0 w-[280px] h-[180px] relative rounded overflow-hidden">
                <Image src={src} alt={`Gallery ${i + 1}`} fill className="object-cover" unoptimized />
              </div>
            ))}
          </div>
        </section>

        {/* Feed */}
        <section className="px-4">
          <h2 className="text-[10px] tracking-[0.3em] uppercase text-[#C9A96E] mb-4">Latest Stories</h2>
          <div className="space-y-6">
            {articles.slice(1).map((a) => (
              <Link key={a.id} href={`/article/${a.id}`} className="block group">
                <div className="relative h-[200px] w-full rounded overflow-hidden mb-3">
                  <Image src={a.image} alt={a.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
                  {a.premium && <span className="absolute top-2 right-2 text-[9px] tracking-widest uppercase bg-[#C9A96E]/20 text-[#C9A96E] px-2 py-1 rounded backdrop-blur-sm">Premium</span>}
                </div>
                <span className="text-[#C9A96E] text-[10px] tracking-[0.3em] uppercase">{a.category}</span>
                <h3 className="text-base font-serif leading-snug mt-1 mb-2 group-hover:text-[#C9A96E] transition-colors">{a.title}</h3>
                <p className="text-sm text-[#F2EDE4]/60 leading-relaxed mb-2 line-clamp-2">{a.excerpt}</p>
                <div className="flex items-center gap-3 text-[10px] text-[#F2EDE4]/40">
                  <span>{a.author}</span><span>•</span><span>{a.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-t border-[#C9A96E]/10">
        <div className="max-w-md mx-auto px-6 h-14 flex items-center justify-around">
          <button onClick={() => router.push("/")} className="flex flex-col items-center gap-1 text-[#C9A96E]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span className="text-[9px] tracking-wider">Home</span>
          </button>
          <button onClick={() => router.push("/bookmarks")} className="flex flex-col items-center gap-1 text-[#F2EDE4]/40">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
            <span className="text-[9px] tracking-wider">Saved</span>
          </button>
          <button onClick={() => router.push("/chat")} className="flex flex-col items-center gap-1 text-[#F2EDE4]/40">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
            <span className="text-[9px] tracking-wider">Chat</span>
          </button>
          <button onClick={() => router.push("/profile")} className="flex flex-col items-center gap-1 text-[#F2EDE4]/40">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span className="text-[9px] tracking-wider">Me</span>
          </button>
        </div>
      </nav>
    </main>
  );
        }
        
