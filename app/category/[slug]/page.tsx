// app/category/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createServerClient } from "@/lib/supabase";
import { Article, Category } from "@/lib/types";
import { ArrowLeft, Clock } from "lucide-react";

async function getCategoryData(slug: string) {
  const supabase = createServerClient();
  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!category) return null;

  const { data: articles } = await supabase
    .from("articles")
    .select(`*, category:categories(*)`)
    .eq("category_id", category.id)
    .order("published_at", { ascending: false });

  return {
    category: category as Category,
    articles: (articles || []) as Article[],
  };
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const data = await getCategoryData(params.slug);
  return {
    title: `${data?.category?.name || "Category"} — Voyager Magazine`,
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const data = await getCategoryData(params.slug);
  if (!data) notFound();

  const { category, articles } = data;

  return (
    <main className="min-h-screen bg-voyager-dark pb-28">
      {/* Category Header */}
      <div className="relative h-64 w-full overflow-hidden">
        {category.cover_image && (
          <Image src={category.cover_image} alt={category.name} fill className="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-voyager-dark via-voyager-dark/70 to-transparent" />
        <div className="absolute top-0 left-0 right-0 p-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-voyager-dark/60 backdrop-blur-sm px-3 py-2 text-voyager-cream text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="font-serif text-3xl text-voyager-cream">{category.name}</h1>
          <p className="text-voyager-text-secondary text-sm mt-1">{category.description}</p>
          <p className="text-voyager-gold text-xs mt-2">{articles.length} articles</p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="px-4 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link key={article.id} href={`/article/${article.slug}`} className="group block">
            <div className="img-zoom relative aspect-[16/10] rounded-xl overflow-hidden mb-3">
              <Image
                src={article.cover_image}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {article.paywall_tier !== "free" && (
                <div className="absolute top-3 right-3 rounded-full bg-voyager-dark/80 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-voyager-gold border border-voyager-gold/20">
                  {article.paywall_tier}
                </div>
              )}
            </div>
            <h3 className="text-voyager-cream text-base font-medium group-hover:text-voyager-gold transition-colors line-clamp-2">
              {article.title}
            </h3>
            <p className="text-voyager-text-secondary text-sm mt-1 line-clamp-2">{article.excerpt}</p>
            <div className="flex items-center gap-2 mt-2 text-voyager-text-muted text-xs">
              <Clock className="w-3 h-3" />
              {article.read_time} min
            </div>
          </Link>
        ))}
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
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 px-4 py-1 text-voyager-text-muted hover:text-voyager-gold text-[10px]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </main>
  );
              }
                
