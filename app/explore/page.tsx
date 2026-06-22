// app/explore/page.tsx
import Link from "next/link";
import Image from "next/image";
import { createServerClient } from "@/lib/supabase";
import { Category, Article } from "@/lib/types";
import { Search, TrendingUp } from "lucide-react";

async function getExploreData() {
  const supabase = createServerClient();
  const { data: categories } = await supabase.from("categories").select("*").order("name");
  const { data: trending } = await supabase
    .from("articles")
    .select("*, category:categories(*)")
    .eq("is_trending", true)
    .order("view_count", { ascending: false })
    .limit(6);
  return {
    categories: (categories || []) as Category[],
    trending: (trending || []) as Article[],
  };
}

export default async function ExplorePage() {
  const { categories, trending } = await getExploreData();

  return (
    <main className="min-h-screen bg-voyager-dark pb-28">
      <div className="p-4 pt-6">
        <h1 className="font-serif text-2xl text-voyager-cream mb-4">Explore</h1>

        {/* Search Link */}
        <Link
          href="/search"
          className="flex items-center gap-3 rounded-xl bg-voyager-dark-elevated border border-voyager-border p-4 mb-6"
        >
          <Search className="w-5 h-5 text-voyager-text-muted" />
          <span className="text-voyager-text-muted text-sm">Search articles, topics, places...</span>
        </Link>

        {/* Categories */}
        <h2 className="text-voyager-cream font-medium text-sm mb-3">Categories</h2>
        <div className="grid grid-cols-2 gap-3 mb-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="relative h-32 rounded-xl overflow-hidden group"
            >
              {cat.cover_image && (
                <Image src={cat.cover_image} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-voyager-dark/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-voyager-cream font-medium text-sm">{cat.name}</p>
                <p className="text-voyager-text-muted text-xs">{cat.article_count} articles</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Trending */}
        <h2 className="flex items-center gap-2 text-voyager-cream font-medium text-sm mb-3">
          <TrendingUp className="w-4 h-4 text-voyager-gold" />
          Trending
        </h2>
        <div className="space-y-4">
          {trending.map((article) => (
            <Link key={article.id} href={`/article/${article.slug}`} className="flex gap-3 group">
              <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image src={article.cover_image} alt={article.title} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-voyager-cream text-sm font-medium group-hover:text-voyager-gold transition-colors line-clamp-2">
                  {article.title}
                </p>
                <p className="text-voyager-text-muted text-xs mt-1">{article.category?.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
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
        
