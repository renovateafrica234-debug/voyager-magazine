// app/page.tsx — Voyager Magazine Home Page (Server Component)
import Link from "next/link";
import Image from "next/image";
import { createServerClient } from "@/lib/supabase";
import { Article, Category, Ad } from "@/lib/types";
import { TrendingUp, Clock, Bookmark, ArrowRight, Compass, BookOpen, Sparkles } from "lucide-react";

async function getHomeData() {
  const supabase = createServerClient();

  // Featured article
  const { data: featured } = await supabase
    .from("articles")
    .select(`*, category:categories(*)`)
    .eq("is_featured", true)
    .order("published_at", { ascending: false })
    .limit(1)
    .single();

  // Trending articles
  const { data: trending } = await supabase
    .from("articles")
    .select(`*, category:categories(*)`)
    .eq("is_trending", true)
    .order("view_count", { ascending: false })
    .limit(5);

  // Latest articles
  const { data: latest } = await supabase
    .from("articles")
    .select(`*, category:categories(*)`)
    .order("published_at", { ascending: false })
    .limit(8);

  // Categories
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  // Active inline ads
  const { data: ads } = await supabase
    .from("ads")
    .select("*")
    .eq("is_active", true)
    .eq("placement", "inline")
    .order("created_at", { ascending: false })
    .limit(2);

  return {
    featured: featured as Article | null,
    trending: (trending || []) as Article[],
    latest: (latest || []) as Article[],
    categories: (categories || []) as Category[],
    ads: (ads || []) as Ad[],
  };
}

export default async function HomePage() {
  const { featured, trending, latest, categories, ads } = await getHomeData();

  return (
    <main className="min-h-screen bg-voyager-dark">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
        {featured ? (
          <>
            <Image
              src={featured.cover_image}
              alt={featured.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-voyager-dark via-voyager-dark/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-voyager-dark/80 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 pb-24 md:p-12 md:pb-16">
              <div className="max-w-4xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-voyager-gold/20 px-3 py-1 text-xs font-medium text-voyager-gold backdrop-blur-sm mb-4">
                  <Sparkles className="w-3 h-3" />
                  Featured
                </span>
                <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-normal text-voyager-cream leading-tight mb-4">
                  {featured.title}
                </h1>
                <p className="text-voyager-text-secondary text-base md:text-lg max-w-xl mb-6 line-clamp-3">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-voyager-gold text-sm font-medium">
                    {featured.category?.name}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-voyager-text-muted" />
                  <span className="flex items-center gap-1 text-voyager-text-muted text-sm">
                    <Clock className="w-3.5 h-3.5" />
                    {featured.read_time} min read
                  </span>
                </div>
                <Link
                  href={`/article/${featured.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-voyager-gold px-6 py-3 text-sm font-semibold text-voyager-dark transition-all hover:bg-voyager-gold-light hover:scale-105 active:scale-95"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <h1 className="font-serif text-4xl text-voyager-cream mb-2">Voyager</h1>
              <p className="text-voyager-text-secondary">The art of journey</p>
            </div>
          </div>
        )}
      </section>

      {/* Trending Section */}
      {trending.length > 0 && (
        <section className="px-4 py-10 md:px-8 lg:px-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-voyager-gold" />
            <h2 className="font-serif text-xl text-voyager-cream">Trending Now</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4 md:mx-0 md:px-0">
            {trending.map((article) => (
              <Link
                key={article.id}
                href={`/article/${article.slug}`}
                className="flex-shrink-0 w-72 group"
              >
                <div className="img-zoom relative aspect-[4/3] rounded-xl overflow-hidden mb-3">
                  <Image
                    src={article.cover_image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="288px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-voyager-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-voyager-gold text-xs font-medium uppercase tracking-wider">
                  {article.category?.name}
                </span>
                <h3 className="text-voyager-cream text-sm font-medium leading-snug mt-1 group-hover:text-voyager-gold transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <div className="flex items-center gap-2 mt-2 text-voyager-text-muted text-xs">
                  <Clock className="w-3 h-3" />
                  {article.read_time} min
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Categories Grid */}
      <section className="px-4 py-8 md:px-8 lg:px-12">
        <div className="flex items-center gap-2 mb-6">
          <Compass className="w-5 h-5 text-voyager-gold" />
          <h2 className="font-serif text-xl text-voyager-cream">Explore</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden"
            >
              {cat.cover_image && (
                <Image
                  src={cat.cover_image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 16vw"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-voyager-dark/90 via-voyager-dark/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-voyager-cream font-medium text-sm">{cat.name}</h3>
                <p className="text-voyager-text-muted text-xs mt-0.5">
                  {cat.article_count} articles
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Articles + Inline Ads */}
      <section className="px-4 py-8 md:px-8 lg:px-12 pb-28">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="w-5 h-5 text-voyager-gold" />
          <h2 className="font-serif text-xl text-voyager-cream">Latest Stories</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latest.map((article, idx) => (
            <>
              <Link
                key={article.id}
                href={`/article/${article.slug}`}
                className="group block"
              >
                <div className="img-zoom relative aspect-[16/10] rounded-xl overflow-hidden mb-3">
                  <Image
                    src={article.cover_image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {article.paywall_tier !== 'free' && (
                    <div className="absolute top-3 right-3 rounded-full bg-voyager-dark/80 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-voyager-gold border border-voyager-gold/20">
                      {article.paywall_tier}
                    </div>
                  )}
                </div>
                <span className="text-voyager-gold text-xs font-medium uppercase tracking-wider">
                  {article.category?.name}
                </span>
                <h3 className="text-voyager-cream text-base font-medium leading-snug mt-1 group-hover:text-voyager-gold transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-voyager-text-secondary text-sm mt-2 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-3 mt-3 text-voyager-text-muted text-xs">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.read_time} min
                  </span>
                  <span>{article.view_count.toLocaleString()} views</span>
                </div>
              </Link>

              {/* Inline Ad after every 4th article */}
              {ads.length > 0 && (idx + 1) % 4 === 0 && ads[Math.floor((idx + 1) / 4) % ads.length] && (
                <div className="md:col-span-2 lg:col-span-1">
                  <AdCard ad={ads[Math.floor((idx + 1) / 4) % ads.length]} />
                </div>
              )}
            </>
          ))}
        </div>
      </section>

      {/* Bottom Navigation */}
      <BottomNav />
    </main>
  );
}

function AdCard({ ad }: { ad: Ad }) {
  return (
    <a
      href={ad.link_url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl overflow-hidden border border-voyager-border bg-voyager-dark-elevated"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={ad.image_url}
          alt={ad.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute top-2 left-2 rounded bg-voyager-dark/70 backdrop-blur-sm px-2 py-0.5 text-[10px] font-medium text-voyager-text-muted uppercase tracking-wider">
          Sponsored
        </div>
      </div>
      <div className="p-3">
        <p className="text-voyager-cream text-sm font-medium">{ad.title}</p>
      </div>
    </a>
  );
}

function BottomNav() {
  const navItems = [
    { href: "/", label: "Home", icon: Compass },
    { href: "/explore", label: "Explore", icon: BookOpen },
    { href: "/saved", label: "Saved", icon: Bookmark },
    { href: "/profile", label: "Profile", icon: Sparkles },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-voyager-border pb-safe">
      <div className="flex items-center justify-around py-3 max-w-lg mx-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center gap-1 px-4 py-1 text-voyager-text-muted transition-colors hover:text-voyager-gold"
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
