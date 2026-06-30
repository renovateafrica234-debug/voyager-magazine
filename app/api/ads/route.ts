import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

const SEED_ADS = [
  {
    id: 'ad-emirates',
    title: 'Emirates First Class',
    subtitle: 'Abuja → Dubai from ₦2.4M',
    image_url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800',
    link_url: 'https://emirates.com',
    placement: 'hero',
    cta: 'Book Now',
    brand: 'Emirates',
    is_active: true,
  },
  {
    id: 'ad-whitelion',
    title: 'WhiteLion Voyage',
    subtitle: 'Luxury African Expeditions',
    image_url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=800',
    link_url: '#',
    placement: 'hero',
    cta: 'Explore',
    brand: 'WhiteLion',
    is_active: true,
  },
  {
    id: 'ad-sereniti',
    title: 'Sereniti Wellness',
    subtitle: "Abuja's premier spa experience",
    image_url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800',
    link_url: '#',
    placement: 'inline',
    cta: 'Book Session',
    brand: 'Sereniti',
    is_active: true,
  },
  {
    id: 'ad-nnpc',
    title: 'NNPC Investment Forum',
    subtitle: "Nigeria's Energy Future — Abuja 2026",
    image_url: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800',
    link_url: '#',
    placement: 'inline',
    cta: 'Register',
    brand: 'NNPC',
    is_active: true,
  },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const placement = searchParams.get('placement') || 'hero';
  const limit = Math.min(parseInt(searchParams.get('limit') || '2'), 5);

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('ads')
      .select('*')
      .eq('is_active', true)
      .eq('placement', placement)
      .or(`end_date.is.null,end_date.gte.${new Date().toISOString()}`)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (!error && data && data.length > 0) {
      return NextResponse.json({ ads: data, source: 'supabase' });
    }
  } catch (_) {
    // fall through
  }

  const filtered = SEED_ADS
    .filter(a => a.placement === placement && a.is_active)
    .slice(0, limit);

  return NextResponse.json({ ads: filtered.length ? filtered : SEED_ADS.slice(0, limit), source: 'seed' });
}

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-admin-secret');
  if (secret !== process.env.GENERATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const supabase = createServerClient();
    const { data, error } = await supabase.from('ads').insert(body).select().single();

    if (error) throw error;
    return NextResponse.json({ success: true, ad: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ ok: false });

  try {
    const supabase = createServerClient();
    await supabase.rpc('increment_ad_clicks', { ad_id: id });
  } catch (_) {
    // Non-critical
  }

  return NextResponse.json({ ok: true });
      }
