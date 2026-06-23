import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';
import { 
  Home, 
  Compass, 
  Bookmark, 
  User, 
  ChevronRight,
  Clock,
  MessageCircle,
  Play
} from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function HomePage() {
  const { data: articles } = await supabase
    .from('articles')
    .select('*, categories(name, slug)')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(12);

  // HERO: Obi Cubana — uses local file /obi-cubana.jpg
  const heroArticle = {
    id: 'obi-cubana-hero',
    title: 'Obi Cubana: A Legacy of Influence in Nigerian Business',
    slug: 'obi-cubana-legacy-of-influence',
    excerpt: 'In the bustling streets of Abuja and the vibrant markets of Lagos, the name Obi Cubana resonates with a particular frequency. It is not merely a name but a brand — a symbol of what happens when cultural authenticity meets entrepreneurial vision.',
    image_url: '/obi-cubana.jpg',
    video_url: 'https://www.youtube.com/embed/6p5XX-b3Ay4',
    category: 'Culture',
    author: 'Voyager Editorial',
    read_time: 10,
    issue: '01',
  };

  const trendingArticles = [
    { title: 'Glimmers of Ice and Tomorrow in West Greenland', slug: 'west-greenland', category: 'Travel', author: 'Amara Okafor', read_time: 8, img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600&auto=format&fit=crop' },
    { title: 'Monaco: Where the Mediterranean Meets Majesty', slug: 'monaco-mediterranean', category: 'Travel', author: 'Amara Okafor', read_time: 8, img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop' },
  ];

  const latestArticles = articles?.length ? articles : [
    { title: 'The Weavers of Kano: A Century of Silk and Story', slug: 'weavers-of-kano', category: 'Culture', author: 'Ibrahim Suleiman', read_time: 12, img: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=400&auto=format&fit=crop' },
    { title: 'Glimmers of Ice and Tomorrow in West Greenland', slug: 'west-greenland', category: 'Travel', author: 'Amara Okafor', read_time: 8, img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=400&auto=format&fit=crop' },
    { title: 'Monaco: Where the Mediterranean Meets Majesty', slug: 'monaco', category: 'Travel', author: 'Amara Okafor', read_time: 8, img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=400&auto=format&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F2EDE4] pb-24">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-center relative">
          <h1 className="text-xl font-light tracking-[0.3em] text-[#C9A96E] uppercase font-serif">Voyager</h1>
          <button className="absolute right-4 w-8 h-8 rounded-full border border-[#C9A96E]/30 flex items-center justify-center text-[#C9A96E] text-sm">☀</button>
        </div>
      </header>

      {/* HERO */}
      <section className="px-4 pt-4 max-w-md mx-auto">
        <Link href={`/article/${heroArticle.slug}`}>
          <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden group">
            <Image
              src={heroArticle.image_url}
              alt={heroArticle.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent" />
            
            {/* Play button overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#C9A96E]/90 flex items-center justify-center backdrop-blur-sm pointer-events-none">
              <Play className="w-6 h-6 text-[#0A0A0A] ml-1" fill="#0A0A0A" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <span className="inline-block px-3 py-1 rounded-full bg-[#C9A96E]/20 border border-[#C9A96E]/40 text-[#C9A96E] text-[10px] font-medium tracking-wider uppercase mb-3">
                {heroArticle.category}
              </span>
              <h2 className="text-2xl font-semibold leading-tight mb-2 text-white">
                {heroArticle.title}
              </h2>
              <p className="text-xs text-[#F2EDE4]/60">
                {heroArticle.author} · {heroArticle.read_time} min · Issue {heroArticle.issue}
              </p>
            </div>
          </div>
        </Link>
      </section>

      {/* TRENDING */}
      <section className="px-4 mt-8 max-w-md mx-auto">
        <h3 className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#F2EDE4]/40 mb-4">Trending Now</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {trendingArticles.map((article, i) => (
            <Link key={i} href={`/article/${article.slug}`} className="shrink-0 w-40">
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-2">
                <Image src={article.img} alt={article.title} fill className="object-cover" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[9px] text-[#C9A96E] uppercase tracking-wider">{article.category}</span>
                </div>
              </div>
              <h4 className="text-xs font-medium text-[#F2EDE4] leading-snug line-clamp-2">{article.title}</h4>
              <p className="text-[10px] text-[#F2EDE4]/40 mt-1">{article.read_time} min read</p>
            </Link>
          ))}
        </div>
      </section>

      {/* LATEST STORIES */}
      <section className="px-4 mt-8 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#F2EDE4]/40">Latest Stories</h3>
          <Link href="/articles" className="text-[10px] text-[#C9A96E] flex items-center gap-1">View all <ChevronRight className="w-3 h-3" /></Link>
        </div>
        <div className="space-y-3">
          {latestArticles.slice(0, 4).map((article: any, i: number) => (
            <Link key={i} href={`/article/${article.slug}`}>
              <article className="flex gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#C9A96E]/20 transition-all">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                  <Image src={article.img || article.image_url || article.cover_image || 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=400'} alt={article.title} fill className="object-cover" unoptimized />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <span className="text-[9px] text-[#C9A96E] uppercase tracking-wider mb-1">{article.category || article.categories?.name}</span>
                  <h4 className="text-sm font-medium text-[#F2EDE4] leading-snug line-clamp-2">{article.title}</h4>
                  <p className="text-[10px] text-[#F2EDE4]/40 mt-1">{article.author || 'Voyager'} · {article.read_time} min</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-white/5">
        <div className="max-w-md mx-auto flex items-center justify-around px-2 py-2">
          <Link href="/" className="flex flex-col items-center gap-1 p-2 text-[#C9A96E]">
            <Home className="w-5 h-5" /><span className="text-[10px] font-medium">Home</span>
          </Link>
          <Link href="/explore" className="flex flex-col items-center gap-1 p-2 text-[#F2EDE4]/40 hover:text-[#F2EDE4] transition-colors">
            <Compass className="w-5 h-5" /><span className="text-[10px] font-medium">Explore</span>
          </Link>
          <Link href="/chat" className="relative -top-4">
            <div className="w-14 h-14 rounded-full bg-[#C9A96E] flex items-center justify-center shadow-lg shadow-[#C9A96E]/20 hover:scale-105 transition-transform">
              <MessageCircle className="w-6 h-6 text-[#0A0A0A]" />
            </div>
          </Link>
          <Link href="/saved" className="flex flex-col items-center gap-1 p-2 text-[#F2EDE4]/40 hover:text-[#F2EDE4] transition-colors">
            <Bookmark className="w-5 h-5" /><span className="text-[10px] font-medium">Saved</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center gap-1 p-2 text-[#F2EDE4]/40 hover:text-[#F2EDE4] transition-colors">
            <User className="w-5 h-5" /><span className="text-[10px] font-medium">Profile</span>
          </Link>
        </div>
      </nav>

    </div>
  );
          }
              
