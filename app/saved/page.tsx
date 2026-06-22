// app/saved/page.tsx — Bookmarks (requires auth)
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Article } from "@/lib/types";
import { Bookmark, ArrowLeft, Clock } from "lucide-react";

export default function SavedPage() {
  const [bookmarks, setBookmarks] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBookmarks() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("bookmarks")
        .select("article:articles(*, category:categories(*))")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      const articles = (data || []).map((b: any) => b.article).filter(Boolean);
      setBookmarks(articles as Article[]);
      setLoading(false);
    }
    loadBookmarks();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-voyager-dark flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-voyager-gold border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-voyager-dark pb-28">
      <div className="p-4 pt-6">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/" className="text-voyager-text-muted hover:text-voyager-cream">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-serif text-2xl text-voyager-cream">Saved</h1>
        </div>

        {bookmarks.length === 0 ? (
          <div className="text-center py-16">
            <Bookmark className="w-12 h-12 text-voyager-text-muted mx-auto mb-4" />
            <p className="text-voyager-text-secondary text-sm">No saved articles yet.</p>
            <Link href="/explore" className="text-voyager-gold text-sm mt-2 inline-block hover:underline">
              Explore stories
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookmarks.map((article) => (
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
             
