import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

const SEED_ARTICLES = [
  {
    id: 'obi-cubana', slug: 'obi-cubana',
    title: 'Obi Cubana: A Legacy of Influence in Nigerian Business',
    excerpt: "From Oba town in Anambra to the gleaming halls of Abuja's elite, Obi Cubana's story is one of calculated audacity and unbreakable cultural pride.",
    category: 'Culture', author_name: 'Voyager Editorial',
    cover_image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=400',
    read_time: 10, paywall_tier: 'premium', published_at: '2026-06-26',
  },
  {
    id: 'abuja-luxury', slug: 'abuja-luxury',
    title: "Abuja's Hidden Luxury: The New Gold Standard",
    excerpt: "Beyond the diplomatic corridors and gated estates, a new class of discreet luxury is taking root in Nigeria's capital.",
    category: 'Travel', author_name: 'Amina Bello',
    cover_image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400',
    read_time: 6, paywall_tier: 'free', published_at: '2026-06-24',
  },
  {
    id: 'monaco', slug: 'monaco',
    title: 'Monaco: Where the Mediterranean Meets Majesty',
    excerpt: 'Two square kilometres. Forty thousand residents. The highest concentration of wealth per capita on Earth.',
    category: 'Travel', author_name: 'Tara Obi',
    cover_image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=400',
    read_time: 5, paywall_tier: 'premium', published_at: '2026-06-22',
  },
  {
    id: 'greenland', slug: 'greenland',
    title: 'Glimmers of Ice: Greenland',
    excerpt: "The world's largest island holds 80% of its surface under ice and a silence so complete it changes the person who hears it.",
    category: 'Travel', author_name: 'Zara Adeyemi',
    cover_image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=400',
    read_time: 7, paywall_tier: 'free', published_at: '2026-06-20',
  },
  {
    id: 'fashion-week', slug: 'fashion-week',
    title: 'Lagos Fashion Week 2026: The Designers Who Stole the Show',
    excerpt: 'Six collections. Twelve designers. One unmistakable message: the global fashion conversation is being rewritten from Lagos.',
    category: 'Fashion', author_name: 'Zara Adeyemi',
    cover_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=400',
    read_time: 4, paywall_tier: 'premium', published_at: '2026-06-18',
  },
  {
    id: 'kano-culture', slug: 'kano-culture',
    title: "Kano's Ancient Walls: A 700-Year Legacy Under Threat",
    excerpt: 'The ancient city walls of Kano — once fourteen metres high and stretching over fifty kilometres — are disappearing.',
    category: 'Culture', author_name: 'Ibrahim Musa',
    cover_image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=400',
    read_time: 7, paywall_tier: 'free', published_at: '2026-06-15',
  },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q')?.trim().toLowerCase() || '';
  const category = searchParams.get('category') || '';
  const tier = searchParams.get('tier') || '';

  if (!q && !category && !tier) {
    return NextResponse.json({ results: [], total: 0 });
  }

  try {
    const supabase = createServerClient();
    let query = supabase
      .from('articles')
      .select('id, slug, title, excerpt, category_id, cover_image, author_name, read_time, paywall_tier, published_at, categories(name)')
      .order('published_at', { ascending: false })
      .limit(20);

    if (q) {
      query = query.or(`title.ilike.%${q}%,excerpt.ilike.%${q}%,content.ilike.%${q}%`);
    }
    if (category) {
      query = query.eq('categories.slug', category);
    }
    if (tier) {
      query = query.eq('paywall_tier', tier);
    }

    const { data, error } = await query;

    if (!error && data && data.length > 0) {
      return NextResponse.json({ results: data, total: data.length, source: 'supabase' });
    }
  } catch (_) {
    // fall through to seed data
  }

  let results = SEED_ARTICLES;

  if (q) {
    results = results.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.author_name.toLowerCase().includes(q)
    );
  }
  if (category) {
    results = results.filter(a => a.category.toLowerCase() === category.toLowerCase());
  }
  if (tier) {
    results = results.filter(a => a.paywall_tier === tier);
  }

  return NextResponse.json({ results, total: results.length, source: 'seed' });
      }
