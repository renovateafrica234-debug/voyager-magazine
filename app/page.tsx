import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';
import { 
  Compass, 
  Plane, 
  Briefcase, 
  UtensilsCrossed, 
  TrendingUp, 
  MessageCircle, 
  Bookmark, 
  User, 
  ChevronRight,
  Clock
} from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const categoryIcons: Record<string, React.ReactNode> = {
  culture: <Compass className="w-5 h-5" />,
  travel: <Plane className="w-5 h-5" />,
  business: <Briefcase className="w-5 h-5" />,
  food: <UtensilsCrossed className="w-5 h-5" />,
  lifestyle: <TrendingUp className="w-5 h-5" />,
};

export default async function HomePage() {
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  const { data: articles } = await supabase
    .from('articles')
    .select('*, categories(name, slug)')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(12);

  let { data: heroArticle } = await supabase
    .from('articles')
    .select('*, categories(name, slug)')
    .eq('featured', true)
    .maybeSingle();

  // HARDCODED FALLBACK: Obi Cubana hero with real Facebook image
  if (!heroArticle) {
    heroArticle = {
      id: 'obi-cubana-hero',
      title: 'The King of Abuja Nights',
      slug: 'obi-cubana-abuja-nights',
      excerpt: 'Inside the empire of Nigeria\'s most celebrated nightlife entrepreneur and his vision for luxury hospitality across Africa.',
      content: '',
      image_url: 'https://scontent-los4-1.xx.fbcdn.net/v/t39.30808-1/365699413_773596821232007_8128357802223160569_n.jpg?stp=dst-jpg_tt6&cstp=mx960x960&ctp=s480x480&_nc_cat=1&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=epj4KBXnrwIQ7kNvwGhGRaZ&_nc_oc=AdqkpjjXtSHtmfwIwVSiqRdDYld0l1WEbkSSnoLDflzCJEIEX6lkO_k-axblk2DWXl8&_nc_zt=24&_nc_ht=scontent-los4-1.xx&_nc_gid=Q9FT-2iJ5TrENgSw16PJ5Q&_nc_ss=7b2a8&oh=00_Af8nh58bOaR2ozYdGG4NgLdRaH2zprCv3jsXhoR7b0Y8AA&oe=6A3F5DE3',
      cover_image: 'https://scontent-los4-1.xx.fbcdn.net/v/t39.30808-1/365699413_773596821232007_8128357802223160569_n.jpg?stp=dst-jpg_tt6&cstp=mx960x960&ctp=s480x480&_nc_cat=1&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=epj4KBXnrwIQ7kNvwGhGRaZ&_nc_oc=AdqkpjjXtSHtmfwIwVSiqRdDYld0l1WEbkSSnoLDflzCJEIEX6lkO_k-axblk2DWXl8&_nc_zt=24&_nc_ht=scontent-los4-1.xx&_nc_gid=Q9FT-2iJ5TrENgSw16PJ5Q&_nc_ss=7b2a8&oh=00_Af8nh58bOaR2ozYdGG4NgLdRaH2zprCv3jsXhoR7b0Y8AA&oe=6A3F5DE3',
      category_id: null,
      categories: { name: 'Culture', slug: 'culture' },
      featured: true,
      published: true,
      read_time: 8,
      created_at: new Date().toISOString(),
    } as any;
  }

  const heroImage = heroArticle.image_url || heroArticle.cover_image;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F2EDE4] pb-24">
      
      {/* HERO */}
      <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
        <Image
          src={heroImage}
          alt={heroArticle.title}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 pb-10">
          <div className="max-w-4xl mx-auto">
            <Link 
              href={`/category/${heroArticle.categories?.slug || 'culture'}`}
              className="inline-flex items-center gap-2 text-[#C9A96E] text-xs font-medium tracking-widest uppercase mb-3"
            >
              {categoryIcons[heroArticle.categories?.slug || 'culture']}
              {heroArticle.categories?.name || 'Culture'}
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-3 text-white">
              {heroArticle.title}
            </h1>
            <p className="text-[#F2EDE4]/70 text-sm md:text-base leading-relaxed max-w-xl mb-4">
              {heroArticle.excerpt}
            </p>
            <div className="flex items-center gap-4 text-xs text-[#F2EDE4]/50">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {heroArticle.read_time} min read
              </span>
              <span>Featured</span>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="px-6 py-8 max-w-4xl mx-auto">
        <h2 className="text-xs font-medium tracking-widest uppercase text-[#C9A96E] mb-4">
          Explore
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories?.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm text-[#F2EDE4] hover:border-[#C9A96E]/50 hover:bg-[#C9A96E]/10 transition-all shrink-0"
            >
              {categoryIcons[cat.slug] || <Compass className="w-4 h-4" />}
              {cat.name}
            </Link>
          ))}
          {!categories?.length && (
            <>
              {['Culture', 'Travel', 'Business', 'Food'].map((name) => (
                <Link
                  key={name}
                  href={`/category/${name.toLowerCase()}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm text-[#F2EDE4] hover:border-[#C9A96E]/50 transition-all shrink-0"
                >
                  <Compass className="w-4 h-4" />
                  {name}
                </Link>
              ))}
            </>
          )}
        </div>
      </section>

      {/* ARTICLES */}
      <section className="px-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs font-medium tracking-widest uppercase text-[#C9A96E]">
            Latest Stories
          </h2>
          <Link href="/articles" className="text-xs text-[#F2EDE4]/50 hover:text-[#C9A96E] flex items-center gap-1">
            View all <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid gap-6">
          {articles?.map((article) => (
            <Link key={article.id} href={`/article/${article.slug}`}>
              <article className="group flex gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#C9A96E]/30 transition-all">
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={article.image_url || article.cover_image || 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=400&auto=format&fit=crop'}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <span className="text-[#C9A96E] text-[10px] font-medium tracking-widest uppercase mb-1">
                    {article.categories?.name || 'Voyager'}
                  </span>
                  <h3 className="text-sm md:text-base font-semibold text-[#F2EDE4] leading-snug mb-2 line-clamp-2 group-hover:text-[#C9A96E] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#F2EDE4]/50 line-clamp-2 mb-2 hidden md:block">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-[10px] text-[#F2EDE4]/40">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.read_time} min
                    </span>
                    <span>{new Date(article.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}

          {!articles?.length && (
            <>
              {[
                { title: 'Kano: Where Ancient Walls Meet Modern Hustle', slug: 'kano-ancient-walls', cat: 'Travel', read: 6, img: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=400&auto=format&fit=crop' },
                { title: 'Lagos After Dark: The New Wave of Underground Dining', slug: 'lagos-underground-dining', cat: 'Food', read: 5, img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400&auto=format&fit=crop' },
                { title: 'The Rise of Abuja Tech: Silicon Savannah North', slug: 'abuja-tech-rise', cat: 'Business', read: 7, img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400&auto=format&fit=crop' },
              ].map((a, i) => (
                <Link key={i} href={`/article/${a.slug}`}>
                  <article className="group flex gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#C9A96E]/30 transition-all">
                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden shrink-0">
                      <Image src={a.img} alt={a.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                    </div>
                    <div className="flex flex-col justify-center min-w-0">
                      <span className="text-[#C9A96E] text-[10px] font-medium tracking-widest uppercase mb-1">{a.cat}</span>
                      <h3 className="text-sm md:text-base font-semibold text-[#F2EDE4] leading-snug mb-2 line-clamp-2 group-hover:text-[#C9A96E] transition-colors">{a.title}</h3>
                      <div className="flex items-center gap-3 text-[10px] text-[#F2EDE4]/40">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{a.read} min</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </>
          )}
        </div>
      </section>

      {/* BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-xl border-t border-[#C9A96E]/10">
        <div className="max-w-md mx-auto flex items-center justify-around px-4 py-2">
          <Link href="/" className="flex flex-col items-center gap-1 p-2 text-[#C9A96E]">
            <Compass className="w-5 h-5" />
            <span className="text-[10px] font-medium">Discover</span>
          </Link>
          <Link href="/bookmarks" className="flex flex-col items-center gap-1 p-2 text-[#F2EDE4]/40 hover:text-[#F2EDE4] transition-colors">
            <Bookmark className="w-5 h-5" />
            <span className="text-[10px] font-medium">Saved</span>
          </Link>
          
          <Link href="/chat" className="relative -top-5">
            <div className="w-14 h-14 rounded-full bg-[#C9A96E] flex items-center justify-center shadow-lg shadow-[#C9A96E]/20 hover:scale-105 transition-transform">
              <MessageCircle className="w-6 h-6 text-[#0A0A0A]" />
            </div>
          </Link>

          <Link href="/profile" className="flex flex-col items-center gap-1 p-2 text-[#F2EDE4]/40 hover:text-[#F2EDE4] transition-colors">
            <User className="w-5 h-5" />
            <span className="text-[10px] font-medium">Profile</span>
          </Link>
        </div>
      </nav>

    </div>
  );
      }
                
