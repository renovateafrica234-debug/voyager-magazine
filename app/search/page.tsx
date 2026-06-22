// app/search/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowLeft, Clock, X } from "lucide-react";
import { Article } from "@/lib/types";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }
      setLoading(true);
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.articles || []);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <main className="min-h-screen bg-voyager-dark pb-28">
      <div className="p-4 pt-6">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/explore" className="text-voyager-text-muted hover:text-voyager-cream">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-voyager-text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles, places, topics..."
              autoFocus
              className="w-full rounded-full bg-voyager-dark-elevated border border-voyager-border pl-10 pr-10 py-3 text-sm text-voyager-cream placeholder:text-voyager-text-muted focus:outline-none focus:border-voyager-gold/50"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-voyager-text-muted"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="w-24 h-16 rounded-lg shimmer-bg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded shimmer-bg" />
                  <div className="h-3 w-1/2 rounded shimmer-bg" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="space-y-4">
            {results.map((article) => (
              <Link key={article.id} href={`/article/${article.slug}`} className="flex gap-3 group">
                <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={article.cover_image} alt={article.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-voyager-cream text-sm font-medium group-hover:text-voyager-gold transition-colors line-clamp-2">
                    {article.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-voyager-text-muted text-xs">
                    <span>{article.category?.name}</span>
                    <span className="w-1 h-1 rounded-full bg-voyager-text-muted" />
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.read_time} min
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && query.length >= 2 && results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-voyager-text-secondary text-sm">No articles found for "{query}"</p>
          </div>
        )}
      </div>
    </main>
  );
                }
            
