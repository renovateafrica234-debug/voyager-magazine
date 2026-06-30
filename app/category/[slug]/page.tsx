import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const CATEGORY_ARTICLES: Record<string, any[]> = {
  travel: [
    { id: 'abuja-luxury', slug: 'abuja-luxury', title: "Abuja's Hidden Luxury: The New Gold Standard", excerpt: 'Beyond the diplomatic corridors, a new class of discreet luxury is taking root.', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600', readTime: '6 min', date: 'June 24, 2026', paywall_tier: 'free' },
    { id: 'monaco', slug: 'monaco', title: 'Monaco: Where the Mediterranean Meets Majesty', excerpt: 'Two square kilometres. The highest concentration of wealth per capita on Earth.', image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=600', readTime: '5 min', date: 'June 22, 2026', paywall_tier: 'premium' },
    { id: 'greenland', slug: 'greenland', title: 'Glimmers of Ice: Greenland', excerpt: 'A silence so complete it changes the person who hears it.', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=600', readTime: '7 min', date: 'June 20, 2026', paywall_tier: 'free' },
  ],
  culture: [
    { id: 'obi-cubana', slug: 'obi-cubana', title: 'Obi Cubana: A Legacy of Influence in Nigerian Business', excerpt: "From Oba town in Anambra to the gleaming halls of Abuja's elite.", image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=600', readTime: '10 min', date: 'June 26, 2026', paywall_tier: 'premium' },
    { id: 'kano-culture', slug: 'kano-culture', title: "Kano's Ancient Walls: A 700-Year Legacy Under Threat", excerpt: 'The ancient walls of Kano are disappearing. What is being lost is not just mud brick, but memory.', image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=600', readTime: '7 min', date: 'June 15, 2026', paywall_tier: 'free' },
  ],
  fashion: [
    { id: 'fashion-week', slug: 'fashion-week', title: 'Lagos Fashion Week 2026: The Designers Who Stole the Show', excerpt: 'Six collections. Twelve designers. One unmistakable message.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=600', readTime: '4 min', date: 'June 18, 2026', paywall_tier: 'premium' },
  ],
};

const CATEGORY_META: Record<string, { name: string; description: string; heroImage: string }> = {
  travel:       { name: 'Travel',        description: 'Journeys that change perspective — near and far, luxury and raw.',   heroImage: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1200' },
  culture:      { name: 'Culture',       description: 'The stories, movements, and people shaping African cultural life.',   heroImage: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=1200' },
  fashion:      { name: 'Fashion',       description: "A continent's sartorial identity — tradition, disruption, and luxury.", heroImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200' },
  food:         { name: 'Food',          description: 'The politics, pleasure, and poetry of what we eat.',                  heroImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200' },
  architecture: { name: 'Architecture', description: 'How spaces shape identity, from ancient to speculative.',              heroImage: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1200' },
  wellness:     { name: 'Wellness',      description: 'Ancient practices, modern science — the whole body considered.',      heroImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200' },
  business:     { name: 'Business',      description: "Africa's new economy — entrepreneurs, capital, and ambition.",        heroImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200' },
  art:          { name: 'Art',           description: 'Contemporary African art and the galleries shaping global conversation.', heroImage: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1200' },
};

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const slug = params.slug.toLowerCase();
  const meta = CATEGORY_META[slug] || { name: slug.charAt(0).toUpperCase() + slug.slice(1), description: '', heroImage: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1200' };
  const articles = CATEGORY_ARTICLES[slug] || [];

  return (
    <main className="min-h-screen bg-[#F0EEE9] text-[#1A1A1A]">
      <div className="relative h-[45vh] w-full overflow-hidden">
        <Image src={meta.heroImage} alt={meta.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F0EEE9] via-[#F0EEE9]/20 to-transparent" />
        <Link href="/explore"
          className="absolute top-14 left-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
          <ArrowLeft className="w-4 h-4 text-[#1A1A1A]" />
        </Link>
      </div>

      <div className="max-w-md mx-auto px-5 -mt-6 relative z-10">
        <div className="mb-6">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#1A1A1A]/30 font-medium">Category</span>
          <h1 className="font-serif text-[28px] text-[#1A1A1A] leading-tight mt-1 mb-2">{meta.name}</h1>
          {meta.description && (
            <p className="text-[13px] text-[#1A1A1A]/50 leading-relaxed">{meta.description}</p>
          )}
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="h-[1px] flex-1 bg-[#1A1A1A]/10" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#1A1A1A]/25">
            {articles.length || 'Latest'} {articles.length === 1 ? 'story' : 'stories'}
          </span>
          <div className="h-[1px] flex-1 bg-[#1A1A1A]/10" />
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[13px] text-[#1A1A1A]/30 font-serif mb-4">More {meta.name} stories coming soon.</p>
            <Link href="/" className="text-[11px] text-[#C9A96E] tracking-wider uppercase underline underline-offset-4">
              Back to Magazine
            </Link>
          </div>
        ) : (
          <div className="space-y-8 pb-32">
            <Link href={`/article/${articles[0].slug}`} className="block group">
              <div className="relative h-[240px] rounded-2xl overflow-hidden mb-4">
                <Image src={articles[0].image} alt={articles[0].title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent" />
                {articles[0].paywall_tier === 'premium' && (
                  <span className="absolute top-3 right-3 bg-[#C9A96E] text-[#0A0A0A] text-[9px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full">
                    Premium
                  </span>
                )}
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="font-serif text-[20px] text-white leading-tight group-hover:text-[#C9A96E] transition-colors">
                    {articles[0].title}
                  </h2>
                </div>
              </div>
              <p className="text-[13px] text-[#1A1A1A]/50 leading-relaxed mb-2 line-clamp-2">{articles[0].excerpt}</p>
              <span className="text-[10px] text-[#1A1A1A]/30">{articles[0].date} · {articles[0].readTime}</span>
            </Link>

            {articles.slice(1).map((article: any) => (
              <Link key={article.id} href={`/article/${article.slug}`} className="flex gap-4 group">
                <div className="relative w-[100px] h-[100px] rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex-1 py-1">
                  <h3 className="text-[15px] font-serif leading-snug text-[#1A1A1A] group-hover:text-[#C9A96E] transition-colors mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] text-[#1A1A1A]/30">
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                    {article.paywall_tier === 'premium' && (
                      <span className="text-[#C9A96E]">· Premium</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#F0EEE9]/95 backdrop-blur-md border-t border-[#1A1A1A]/8">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex flex-col items-center gap-1 text-[#1A1A1A]/30 hover:text-[#1A1A1A]/60 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span className="text-[9px] tracking-wider">Home</span>
          </Link>
          <Link href="/explore" className="flex flex-col items-center gap-1 text-[#C9A96E]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
            <span className="text-[9px] tracking-wider">Explore</span>
          </Link>
          <Link href="/chat" className="flex flex-col items-center justify-center -mt-6 w-14 h-14 rounded-full bg-[#C9A96E] text-[#0A0A0A] shadow-lg shadow-[#C9A96E]/30">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          </Link>
          <Link href="/bookmarks" className="flex flex-col items-center gap-1 text-[#1A1A1A]/30 hover:text-[#1A1A1A]/60 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
            <span className="text-[9px] tracking-wider">Saved</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center gap-1 text-[#1A1A1A]/30 hover:text-[#1A1A1A]/60 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span className="text-[9px] tracking-wider">Profile</span>
          </Link>
        </div>
      </nav>
    </main>
  );
        }
