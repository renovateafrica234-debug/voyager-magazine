// app/article/[slug]/page.tsx — Article Reader with Paywall
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createServerClient } from "@/lib/supabase";
import { Article, canAccessArticle } from "@/lib/types";
import { Clock, ArrowLeft, Bookmark, Share2, Heart, Lock } from "lucide-react";

async function getArticle(slug: string) {
  const supabase = createServerClient();

  const { data: article } = await supabase
    .from("articles")
    .select(`*, category:categories(*)`)
    .eq("slug", slug)
    .single() as any;

  if (!article) return null;

  await (supabase.rpc as any)("increment_article_views", { article_slug: slug });

  return article as Article;
}

async function getRelatedArticles(categoryId: string, currentSlug: string) {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("articles")
    .select(`*, category:categories(*)`)
    .eq("category_id", categoryId)
    .neq("slug", currentSlug)
    .order("published_at", { ascending: false })
    .limit(3) as any;

  return (data || []) as Article[];
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: `${article.title} — Voyager Magazine`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.cover_image],
    },
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);
  if (!article) notFound();

  const related = article.category_id
    ? await getRelatedArticles(article.category_id, article.slug)
    : [];

  const userTier = "free" as const;
  const hasAccess = canAccessArticle(userTier, article.paywall_tier);
  const isPaywalled = article.paywall_tier !== "free" && !hasAccess;

  return (
    <main className="min-h-screen bg-voyager-dark">
      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <Image
          src={article.cover_image}
          alt={article.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-voyager-dark via-voyager-dark/40 to-transparent" />

        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full bg-voyager-dark/60 backdrop-blur-sm px-3 py-2 text-voyager-cream text-sm hover:bg-voyager-dark/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <button className="rounded-full bg-voyager-dark/60 backdrop-blur-sm p2.5 text-voyager-cream hover:bg-voyager-dark/80 transition-colors">
              <Bookmark className="w-4 h-4" />
            </button>
            <button className="rounded-full bg-voyager-dark/60 backdrop-blur-sm p2.5 text-voyager-cream hover:bg-voyager-dark/80 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="text-voyager-gold text-xs font-medium uppercase tracking-wider">
            {article.category?.name}
          </span>
          <h1 className="font-serif text-2xl md:text-4xl text-voyager-cream leading-tight mt-2">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 mt-4 text-voyager-text-muted text-sm">
            <span>{article.author_name}</span>
            <span className="w-1 h-1 rounded-full bg-voyager-text-muted" />
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.read_time} min read
            </span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w2 xl mx-auto px-4 py-8">
        <div
          className={`article-content ${isPaywalled ? "paywall-blur max-h-[600px] overflow-hidden" : ""}`}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Paywall Gate */}
        {isPaywalled && (
          <div className="relative -mt-32 pt-32 pb-8 text-center">
            <div className="absolute inset-0 bg-gradient-to-t from-voyager-dark via-voyager-dark to-transparent" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-full bg-voyager-gold/10 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-5 h-5 text-voyager-gold" />
              </div>
              <h3 className="font-serif text-xl text-voyager-cream mb-2">
                Continue Reading
              </h3>
              <p className="text-voyager-text-secondary text-sm mb-6 max-w-sm mx-auto">
                This article is available to {article.paywall_tier} subscribers. Upgrade to unlock the full story.
              </p>
              <Link
                href="/premium"
                className="inline-flex items-center gap-2 rounded-full bg-voyager-gold px-6 py-3 text-sm font-semibold text-voyager-dark transition-all hover:bg-voyager-gold-light hover:scale-105 active:scale-95"
              >
                Upgrade to {article.paywall_tier}
              </Link>
              <p className="text-voyager-text-muted text-xs mt-4">
                Starting from ₦500/month
              </p>
            </div>
          </div>
        )}

        {/* Engagement Bar */}
        <div className="flex items-center gap-4 mt-10 pt-6 border-t border-voyager-border">
          <button className="flex items-center gap-2 text-voyager-text-muted hover:text-voyager-gold transition-colors">
            <Heart className="w-5 h-5" />
            <span className="text-sm">{article.like_count}</span>
          </button>
          <button className="flex items-center gap-2 text-voyager-text-muted hover:text-voyager-gold transition-colors">
            <Bookmark className="w-5 h-5" />
            <span className="text-sm">Save</span>
          </button>
          <button className="flex items-center gap-2 text-voyager-text-muted hover:text-voyager-gold transition-colors ml-auto">
            <Share2 className="w-5 h-5" />
            <span className="text-sm">Share</span>
          </button>
        </div>
      </div>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="px-4 py-10 border-t border-voyager-border">
          <h2 className="font-serif text-lg text-voyager-cream mb-6">More in {article.category?.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((rel: any) => (
              <Link
                key={rel.id}
                href={`/article/${rel.slug}`}
                className="group block"
              >
                <div className="img-zoom relative aspect-[16/10] rounded-lg overflow-hidden mb-2">
                  <Image
                    src={rel.cover_image}
                    alt={rel.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="text-voyager-cream text-sm font-medium group-hover:text-voyager-gold transition-colors line-clamp-2">
                  {rel.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-voyager-border pb-safe">
        <div className="flex items-center justify-around py-3 max-w-lg mx-auto">
          {[
            { href: "/", label: "Home", icon: ArrowLeft },
            { href: "/explore", label: "Explore", icon: Bookmark },
            { href: "/saved", label: "Saved", icon: Bookmark },
            { href: "/profile", label: "Profile", icon: Heart },
          ].map((item) => (
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
    </main>
  );
    }
