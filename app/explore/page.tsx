import Link from "next/link";
import { createServerClient } from "@/lib/supabase";

const CAT_IMAGES: Record<string, string> = {
  Architecture: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=400',
  Culture: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=400',
  Fashion: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=400',
  Food: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400',
  Travel: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=400',
  Art: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=400',
  Business: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=400',
  Wellness: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=400',
};

const FALLBACKS = [
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=400',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400',
  'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=400',
  'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=400',
  'https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?q=80&w=400',
  'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=400',
];

async function getData() {
  const sb = createServerClient();
  const { data: cats } = await sb.from('categories').select('*').order('name');
  const { data: trend } = await sb.from('articles')
    .select('*, category:categories(*)')
    .eq('is_trending', true)
    .order('view_count', { ascending: false })
    .limit(6);
  return { cats: cats || [], trend: trend || [] };
}

const FB_TREND = [
  { id: '1', slug: 'lagos-lagoon-the-city-that-refuses-to-drown', title: 'Lagos Lagoon: The City That Refuses to Drown', cover_image: 'https://images.unsplash.com/photo-1503327776731-4970f83d0f2e?q=80&w=400', category: { name: 'Travel' } },
  { id: '2', slug: 'zipp-republic-when-mr-p-turned-the-stage-into-a-runway', title: 'Zipp Republic: When Mr. P Turned the Stage into a Runway', cover_image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=400', category: { name: 'Fashion' } },
  { id: '3', slug: 'lagos-fashion-week-the-new-order', title: 'Lagos Fashion Week: The New Order', cover_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=400', category: { name: 'Fashion' } },
  { id: '4', slug: 'makoko-floating-school-the-architecture-of-necessity', title: 'Makoko Floating School: The Architecture of Necessity', cover_image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=400', category: { name: 'Architecture' } },
  { id: '5', slug: 'dunes-at-dawn-a-saharan-awakening', title: 'Dunes at Dawn: A Saharan Awakening', cover_image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=400', category: { name: 'Travel' } },
  { id: '6', slug: 'forest-bathing-in-the-atewa-range', title: 'Forest Bathing in the Atewa Range', cover_image: 'https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?q=80&w=400', category: { name: 'Wellness' } },
];

export default async function ExplorePage() {
  const { cats, trend } = await getData();

  // FORCE fallback images — never trust empty Supabase cover_image
  const display = trend.length ? trend.map((a: any, idx: number) => {
    const fallback = FB_TREND[idx % FB_TREND.length];
    return {
      id: a.id ?? fallback.id,
      slug: a.slug ?? a.id ?? fallback.slug,
      title: a.title ?? fallback.title,
      cover_image: fallback.cover_image,
      category: a.category ?? fallback.category,
    };
  }) : FB_TREND;

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F2EDE4] pb-24">
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0A0A0A]/80 backdrop-blur-md">
        <div className="max-w-md mx-auto px-5 h-14 flex items-center justify-center">
          <span className="text-[#C9A96E] font-serif text-xl tracking-[0.25em]">VOYAGER</span>
        </div>
      </header>

      <div className="pt-14 max-w-md mx-auto px-5">
        <h1 className="text-2xl font-serif mt-6 mb-2">Explore</h1>
        <p className="text-sm text-[#F2EDE4]/50 mb-6">Search articles, topics, places...</p>

        <h2 className="text-[11px] tracking-[0.25em] uppercase text-[#F2EDE4]/70 font-medium mb-4">Categories</h2>
        <div className="grid grid-cols-2 gap-3">
          {cats.map((cat: any) => (
            <Link key={cat.id} href={`/category/${cat.slug}`} className="relative h-[100px] rounded-xl overflow-hidden group">
              <img
                src={CAT_IMAGES[cat.name] || FALLBACKS[0]}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <p className="text-sm font-medium">{cat.name}</p>
                <p className="text-[10px] text-[#F2EDE4]/50">{cat.article_count || 0} articles</p>
              </div>
            </Link>
          ))}
        </div>

        <h2 className="text-[11px] tracking-[0.25em] uppercase text-[#F2EDE4]/70 font-medium mt-8 mb-4">Trending</h2>
        <div className="space-y-4">
          {display.map((a: any) => (
            <Link key={a.id} href={`/article/${a.slug || a.id}`} className="flex gap-4 group">
              <div className="relative w-[80px] h-[80px] flex-shrink-0 rounded-lg overflow-hidden">
                <img
                  src={a.cover_image}
                  alt={a.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 py-1">
                <span className="text-[#C9A96E] text-[10px] tracking-wider uppercase">
                  {typeof a.category === 'string' ? a.category : a.category?.name || 'Voyager'}
                </span>
                <h3 className="text-sm font-serif leading-snug mt-1 group-hover:text-[#C9A96E] transition-colors">{a.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
                  }
                    
