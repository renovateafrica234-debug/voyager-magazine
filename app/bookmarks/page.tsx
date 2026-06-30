'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bookmark, Clock, Trash2, Crown } from 'lucide-react';

interface SavedArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  readTime: string;
  date: string;
  paywall_tier: 'free' | 'premium';
  savedAt: string;
}

function EmptyBookmarks() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
      <div className="w-16 h-16 rounded-full bg-[#C9A96E]/10 flex items-center justify-center mb-6">
        <Bookmark className="w-7 h-7 text-[#C9A96E]/50" />
      </div>
      <h3 className="font-serif text-[20px] text-[#1A1A1A] mb-2">Nothing saved yet</h3>
      <p className="text-[13px] text-[#1A1A1A]/40 leading-relaxed max-w-[220px] mb-8">
        Tap the bookmark icon on any story to save it here for later.
      </p>
      <Link href="/"
        className="inline-flex items-center gap-2 bg-[#1A1A1A] text-[#F2EDE4] text-[11px] font-semibold tracking-[0.1em] uppercase px-5 py-3 rounded-full">
        Browse Stories
      </Link>
    </div>
  );
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<SavedArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('voyager_bookmarks');
      if (stored) {
        setBookmarks(JSON.parse(stored));
      }
    } catch (_) {}
    setTimeout(() => setLoading(false), 300);
  }, []);

  const removeBookmark = (id: string) => {
    setRemoving(id);
    setTimeout(() => {
      const updated = bookmarks.filter(b => b.id !== id);
      setBookmarks(updated);
      try {
        localStorage.setItem('voyager_bookmarks', JSON.stringify(updated));
      } catch (_) {}
      setRemoving(null);
    }, 400);
  };

  const groupByDate = (items: SavedArticle[]) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const groups: { label: string; items: SavedArticle[] }[] = [];
    const groupMap: Record<string, SavedArticle[]> = {};

    items.forEach(item => {
      const saved = new Date(item.savedAt);
      let label = 'Earlier';
      if (saved.toDateString() === today.toDateString()) label = 'Today';
      else if (saved.toDateString() === yesterday.toDateString()) label = 'Yesterday';

      if (!groupMap[label]) groupMap[label] = [];
      groupMap[label].push(item);
    });

    ['Today', 'Yesterday', 'Earlier'].forEach(label => {
      if (groupMap[label]) groups.push({ label, items: groupMap[label] });
    });

    return groups;
  };

  const groups = groupByDate(bookmarks);

  return (
    <main className="min-h-screen bg-[#F0EEE9] text-[#1A1A1A]">
      <header className="sticky top-0 z-40 bg-[#F0EEE9]/95 backdrop-blur-md border-b border-[#1A1A1A]/8">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          <span className="text-[#C9A96E] font-serif text-xl tracking-[0.25em]">VOYAGER</span>
          <h1 className="text-[12px] tracking-[0.2em] uppercase text-[#1A1A1A]/40 font-medium">
            Saved Stories
          </h1>
          <div className="w-9" />
        </div>
      </header>

      <div className="max-w-md mx-auto pb-28">
        {loading ? (
          <div className="p-5 space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-3 animate-pulse">
                <div className="w-[90px] h-[90px] rounded-xl bg-[#1A1A1A]/8 flex-shrink-0" />
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-3 bg-[#1A1A1A]/8 rounded w-1/4" />
                  <div className="h-4 bg-[#1A1A1A]/8 rounded w-full" />
                  <div className="h-4 bg-[#1A1A1A]/8 rounded w-3/4" />
                  <div className="h-3 bg-[#1A1A1A]/8 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : bookmarks.length === 0 ? (
          <EmptyBookmarks />
        ) : (
          <div className="p-5">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[11px] text-[#1A1A1A]/40 font-medium">
                {bookmarks.length} {bookmarks.length === 1 ? 'story' : 'stories'} saved
              </span>
              <button
                onClick={() => {
                  if (confirm('Clear all saved stories?')) {
                    setBookmarks([]);
                    try { localStorage.removeItem('voyager_bookmarks'); } catch (_) {}
                  }
                }}
                className="text-[11px] text-[#1A1A1A]/30 hover:text-red-400 transition-colors">
                Clear all
              </button>
            </div>

            {groups.map(group => (
              <div key={group.label} className="mb-8">
                <h2 className="text-[10px] tracking-[0.25em] uppercase text-[#1A1A1A]/30 font-medium mb-4">
                  {group.label}
                </h2>
                <div className="space-y-3">
                  {group.items.map(article => (
                    <div
                      key={article.id}
                      className={`flex gap-3 transition-all duration-400 ${
                        removing === article.id ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
                      }`}
                    >
                      <Link href={`/article/${article.slug}`} className="flex gap-3 flex-1 group">
                        <div className="relative w-[90px] h-[90px] rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {article.paywall_tier === 'premium' && (
                            <div className="absolute top-1.5 left-1.5">
                              <span className="w-5 h-5 rounded-full bg-[#C9A96E] flex items-center justify-center">
                                <Crown className="w-2.5 h-2.5 text-[#0A0A0A]" />
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 py-1 min-w-0">
                          <span className="text-[#C9A96E] text-[10px] tracking-[0.15em] uppercase font-medium">
                            {article.category}
                          </span>
                          <h3 className="text-[14px] font-serif leading-snug mt-1 mb-2 text-[#1A1A1A] group-hover:text-[#C9A96E] transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          <div className="flex items-center gap-2 text-[10px] text-[#1A1A1A]/30">
                            <Clock className="w-3 h-3" />
                            <span>{article.readTime}</span>
                            <span>·</span>
                            <span>{article.date}</span>
                          </div>
                        </div>
                      </Link>

                      <button
                        onClick={() => removeBookmark(article.id)}
                        className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1A1A1A]/5 hover:bg-red-50 hover:text-red-400 flex items-center justify-center transition-colors self-center">
                        <Trash2 className="w-3.5 h-3.5 text-[#1A1A1A]/30" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-4 rounded-2xl bg-[#1A1A1A] p-5 text-center">
              <Crown className="w-5 h-5 text-[#C9A96E] mx-auto mb-3" />
              <p className="text-[13px] text-[#F2EDE4] font-serif mb-1">Unlock offline reading</p>
              <p className="text-[11px] text-[#F2EDE4]/40 mb-4">Premium members can read saved stories without connection.</p>
              <Link href="/premium"
                className="inline-block bg-[#C9A96E] text-[#0A0A0A] text-[10px] font-bold tracking-[0.12em] uppercase px-5 py-2.5 rounded-full hover:bg-[#B8985A] transition-colors">
                Upgrade Plan
              </Link>
            </div>
          </div>
        )}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#F0EEE9]/95 backdrop-blur-md border-t border-[#1A1A1A]/8">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex flex-col items-center gap-1 text-[#1A1A1A]/30 hover:text-[#1A1A1A]/60 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span className="text-[9px] tracking-wider">Home</span>
          </Link>
          <Link href="/explore" className="flex flex-col items-center gap-1 text-[#1A1A1A]/30 hover:text-[#1A1A1A]/60 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
            </svg>
            <span className="text-[9px] tracking-wider">Explore</span>
          </Link>
          <Link href="/chat" className="flex flex-col items-center justify-center -mt-6 w-14 h-14 rounded-full bg-[#C9A96E] text-[#0A0A0A] shadow-lg shadow-[#C9A96E]/30">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
          </Link>
          <button className="flex flex-col items-center gap-1 text-[#C9A96E]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
            </svg>
            <span className="text-[9px] tracking-wider">Saved</span>
          </button>
          <Link href="/profile" className="flex flex-col items-center gap-1 text-[#1A1A1A]/30 hover:text-[#1A1A1A]/60 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span className="text-[9px] tracking-wider">Profile</span>
          </Link>
        </div>
      </nav>
    </main>
  );
                }
