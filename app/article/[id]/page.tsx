"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { articles } from "@/lib/data";

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const [showPaywall, setShowPaywall] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const article = articles.find((a) => a.id === params.id);
  const related = articles.filter((a) => a.id !== params.id && a.category === article?.category).slice(0, 2);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-[#F2EDE4] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-serif mb-2">Article not found</h1>
          <button onClick={() => router.push("/")} className="text-[#C9A96E] text-sm">Back to Home</button>
        </div>
      </div>
    );
  }

  const paragraphs = article.content.split("\n\n");
  const freeParagraphs = article.premium ? paragraphs.slice(0, 2) : paragraphs;
  const lockedParagraphs = article.premium ? paragraphs.slice(2) : [];

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F2EDE4] pb-24">
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0A0A0A]/80 backdrop-blur-md">
        <div className="max-w-md mx-auto px-5 h-14 flex items-center justify-between">
          <button onClick={() => router.back()} className="text-[#F2EDE4]/70">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <span className="text-[#C9A96E] font-serif text-lg tracking-[0.2em]">VOYAGER</span>
          <button onClick={() => setBookmarked(!bookmarked)} className={bookmarked ? "text-[#C9A96E]" : "text-[#F2EDE4]/40"}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill={bookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
          </button>
        </div>
      </header>

      <div className="pt-14 max-w-md mx-auto">
        <section className="relative h-[55vh] w-full overflow-hidden">
          <Image src={article.image} alt={article.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent" />
          <div className="absolute top-6 left-5">
            {article.video && (
              <span className="inline-flex items-center gap-1.5 bg-[#C9A96E] text-[#0A0A0A] text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full mb-2">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                Video Story
              </span>
            )}
          </div>
          {article.video && (
            <button onClick={() => setShowVideo(true)} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#C9A96E] flex items-center justify-center shadow-lg shadow-[#C9A96E]/30 hover:scale-105 transition-transform">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#0A0A0A"><path d="M8 5v14l11-7z"/></svg>
            </button>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <span className="inline-block bg-[#C9A96E]/20 text-[#C9A96E] text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-3 backdrop-blur-sm">
              {article.category}
            </span>
            <h1 className="text-[24px] font-serif leading-[1.2] mb-3">{article.title}</h1>
            <div className="flex items-center gap-3 text-xs text-[#F2EDE4]/60">
              <span>{article.author}</span>
              <span className="w-1 h-1 rounded-full bg-[#F2EDE4]/40" />
              <span>{article.date}</span>
              <span className="w-1 h-1 rounded-full bg-[#F2EDE4]/40" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </section>

        <section className="px-5 mt-6">
          <div className="space-y-4">
            {freeParagraphs.map((p, i) => (
              <p key={i} className="text-[15px] leading-[1.7] text-[#F2EDE4]/80">{p}</p>
            ))}
          </div>

          {article.gallery.length > 0 && (
            <div className="mt-8">
              <h3 className="text-[11px] tracking-[0.25em] uppercase text-[#F2EDE4]/70 mb-4">In Pictures</h3>
              <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-5 px-5">
                {article.gallery.map((src, i) => (
                  <button key={i} onClick={() => { setGalleryIndex(i); setShowGallery(true); }} className="snap-start flex-shrink-0 w-[280px] h-[180px] relative rounded-xl overflow-hidden">
                    <Image src={src} alt={`Gallery ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {article.premium && lockedParagraphs.length > 0 && showPaywall && (
            <div className="mt-8 relative">
              <div className="absolute inset-x-0 -top-12 h-12 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
              <div className="bg-[#F2EDE4]/5 border border-[#C9A96E]/20 rounded-xl p-6 text-center">
                <div className="w-10 h-10 rounded-full bg-[#C9A96E]/20 flex items-center justify-center mx-auto mb-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                </div>
                <h3 className="text-lg font-serif mb-2">Premium Content</h3>
                <p className="text-sm text-[#F2EDE4]/60 mb-4">Subscribe to read the full story and access our complete archive.</p>
                <button className="w-full bg-[#C9A96E] text-[#0A0A0A] text-xs font-bold tracking-wider uppercase py-3 rounded-full mb-3">
                  Subscribe — ₦5,000/month
                </button>
                <button onClick={() => setShowPaywall(false)} className="text-[11px] text-[#F2EDE4]/40 underline">
                  Continue reading (preview)
                </button>
              </div>
            </div>
          )}

          {(!showPaywall || !article.premium) && lockedParagraphs.length > 0 && (
            <div className="mt-6 space-y-4">
              {lockedParagraphs.map((p, i) => (
                <p key={i} className="text-[15px] leading-[1.7] text-[#F2EDE4]/80">{p}</p>
              ))}
            </div>
          )}

          <div className="mt-10 flex items-center gap-4 p-4 bg-[#F2EDE4]/5 rounded-xl border border-[#F2EDE4]/10">
            <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <Image src={article.authorImage} alt={article.author} fill className="object-cover" />
            </div>
            <div>
              <p className="text-sm font-medium">{article.author}</p>
              <p className="text-xs text-[#F2EDE4]/50">{article.authorRole}</p>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-10">
              <h3 className="text-[11px] tracking-[0.25em] uppercase text-[#F2EDE4]/70 mb-4">More in {article.category}</h3>
              <div className="space-y-4">
                {related.map((a) => (
                  <Link key={a.id} href={`/article/${a.id}`} className="flex gap-4 group">
                    <div className="relative w-[80px] h-[80px] flex-shrink-0 rounded-lg overflow-hidden">
                      <Image src={a.image} alt={a.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 py-1">
                      <h4 className="text-sm font-serif leading-snug group-hover:text-[#C9A96E] transition-colors">{a.title}</h4>
                      <p className="text-[10px] text-[#F2EDE4]/40 mt-1">{a.readTime}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      {showGallery && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A]/98 flex items-center justify-center" onClick={() => setShowGallery(false)}>
          <div className="relative w-full h-full max-w-md mx-auto flex items-center justify-center p-5">
            <Image src={article.gallery[galleryIndex]} alt="Gallery" fill className="object-contain" />
            <button onClick={() => setShowGallery(false)} className="absolute top-6 right-5 w-10 h-10 rounded-full bg-[#0A0A0A]/60 flex items-center justify-center text-[#F2EDE4]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
        </div>
      )}

      {showVideo && article.videoUrl && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A]/95 flex items-center justify-center p-5" onClick={() => setShowVideo(false)}>
          <div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="relative pt-[56.25%] rounded-xl overflow-hidden">
              <iframe
                src={article.videoUrl}
                title="Video"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-center text-xs text-[#F2EDE4]/40 mt-3">Tap outside to close</p>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-t border-[#F2EDE4]/5">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => router.push("/")} className="flex flex-col items-center gap-1 text-[#F2EDE4]/40">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span className="text-[9px] tracking-wider">Home</span>
          </button>
          <button onClick={() => router.push("/explore")} className="flex flex-col items-center gap-1 text-[#F2EDE4]/40">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
            <span className="text-[9px] tracking-wider">Explore</span>
          </button>
          <button onClick={() => router.push("/chat")} className="flex flex-col items-center justify-center -mt-6 w-14 h-14 rounded-full bg-[#C9A96E] text-[#0A0A0A] shadow-lg shadow-[#C9A96E]/30">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          </button>
          <button onClick={() => router.push("/bookmarks")} className="flex flex-col items-center gap-1 text-[#F2EDE4]/40">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
            <span className="text-[9px] tracking-wider">Saved</span>
          </button>
          <button onClick={() => router.push("/profile")} className="flex flex-col items-center gap-1 text-[#F2EDE4]/40">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span className="text-[9px] tracking-wider">Profile</span>
          </button>
        </div>
      </nav>
    </main>
  );
          }
          
