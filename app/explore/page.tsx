// app/explore/page.tsx
import Link from "next/link";
import Image from "next/image";
import { createServerClient } from "@/lib/supabase";
import { Category, Article } from "@/lib/types";
import { Search, TrendingUp } from "lucide-react";

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop';
const CATEGORY_FALLBACKS: Record<string, string> = {
  'Architecture': 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=400&auto=format&fit=crop',
  'Culture': 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=400&auto=format&fit=crop',
  'Fashion': 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=400&auto=format&fit=crop',
  'Food': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400&auto=format&fit=crop',
  'Travel': 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=400&auto=format&fit=crop',
  'Art': 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=400&auto=format&fit=crop',
  'Business': 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=400&auto=format&fit=crop',
  'Wellness': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=400&auto=format&fit=crop',
};

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

  // Fallback trending if DB empty
  const fallbackTrending = [
    { id: '1', slug: 'lagos-lagoon-the-city-that-refuses-to-drown', title: 'Lagos Lagoon: The City That Refuses to Drown', cover_image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=400&auto=format&fit=crop', category: { name: 'Travel' } },
    { id: '2', slug: 'zipp-republic-when-mr-p-turned-the-stage-into-a-runway', title: 'Zipp Republic: When Mr. P Turned the Stage into a Runway', cover_image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=400&auto=format&fit=crop', category: { name: 'Fashion' } },
    { id: '3', slug: 'lagos-fashion-week-the-new-order', title: 'Lagos Fashion Week: The New Order', cover_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=400&auto=format&fit=crop', category: { name: 'Fashion' } },
    { id: '4', slug: 'makoko-floating-school-the-architecture-of-necessity', title: 'Makoko Floating School: The Architecture of Necessity', cover_image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=400&auto=format&fit=crop', category: { name: 'Architecture' } },
    { id: '5', slug: 'dunes-at-dawn-a-saharan-awakening', title: 'Dunes at Dawn: A Saharan Awakening', cover_image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=400&auto=format&fit=crop', category: { name: 'Travel' } },
    { id: '6', slug: 'forest-bathing-in-the-atewa-range', title: 'Forest Bathing in the Atewa Range', cover_image: 'https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?q=80&w=400&auto=format&fit=crop', category: { name: 'Wellness' } },
  ];

  const displayTrending = trending?.length ? trending : fallbackTrending;

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F2EDE4] pb-28">
      <div className="p-4 pt-6">
        <h1 className="font-serif text-2xl text-[#F2EDE4] mb-4">Explore</h1>

        {/* Search Link */}
        <Link
          href="/search"
          className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-4 mb-6"
        >
          <Search className="w-5 h-5 text-[#F2EDE4]/40" />
          <span className="text-[#F2EDE4]/40 text-sm">Search articles, topics, places...</span>
        </Link>

        {/* Categories */}
        <h2 className="text-[#F2EDE4] font-medium text-sm mb-3">Categories</h2>
        <div className="grid grid-cols-2 gap-3 mb-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="relative h-32 rounded-xl overflow-hidden group"
            >
              <Image 
                src={cat.cover_image || CATEGORY_FALLBACKS[cat.name] || FALLBACK_IMG} 
                alt={cat.name} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform" 
                unoptimized
                onError={(e) => { (e.target as HTMLImageElement).src = CATEGORY_FALLBACKS[cat.name] || FALLBACK_IMG; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-[#F2EDE4] font-medium text-sm">{cat.name}</p>
                <p className="text-[#F2EDE4]/50 text-xs">{cat.article_count || 0} articles</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Trending */}
        <h2 className="flex items-center gap-2 text-[#F2EDE4] font-medium text-sm mb-3">
          <TrendingUp className="w-4 h-4 text-[#C9A96E]" />
          Trending
        </h2>
        <div className="space-y-4">
          {displayTrending.map((article: any) => (
            <Link key={article.id} href={`/article/${article.slug}`} className="flex gap-3 group">
              <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image 
                  src={article.cover_image || article.image_url || FALLBACK_IMG} 
                  alt={article.title} 
                  fill 
                  className="object-cover" 
                  unoptimized
                  onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-[#C9A96E] uppercase tracking-wider">{article.category?.name || article.category || 'Voyager'}</p>
                <h4 className="text-sm text-[#F2EDE4] leading-snug group-hover:text-[#C9A96E] transition-colors line-clamp-2">{article.title}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
      }
                
