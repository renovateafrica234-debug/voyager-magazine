import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

// ── VOYAGER EDITORIAL BRAIN ────────────────────────────────────────────────
// POST /api/generate
// Body: { topic: string, category: string, tone?: string, length?: 'short'|'long' }
// Generates a full magazine article via DeepSeek and stores it in Supabase.
// Protected: requires GENERATE_SECRET header matching env var.

const CATEGORIES = ['Travel', 'Culture', 'Fashion', 'Food', 'Architecture', 'Wellness', 'Business', 'Art'];

const EDITORIAL_TONES: Record<string, string> = {
  Travel: 'immersive, first-person, sensory-rich travel writing with a luxury angle',
  Culture: 'analytical yet warm, celebrating African and global cultural movements',
  Fashion: 'sharp, discerning, with insider knowledge of African fashion ecology',
  Food: 'sensuous and precise, honouring both technique and cultural origin',
  Architecture: 'architectural criticism meets human story — how spaces shape lives',
  Wellness: 'thoughtful, evidence-aware, drawing on both ancient and modern practice',
  Business: 'rigorous but narrative — business profiles with cultural intelligence',
  Art: 'reflective and contextual, treating art as cultural argument',
};

function buildSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(2, Math.round(words / 220));
}

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-generate-secret');
  if (secret !== process.env.GENERATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      topic,
      category = 'Culture',
      tone,
      length = 'long',
      paywall_tier = 'free',
    } = body as {
      topic: string;
      category: string;
      tone?: string;
      length?: 'short' | 'long';
      paywall_tier?: 'free' | 'starter' | 'premium' | 'founder';
    };

    if (!topic) {
      return NextResponse.json({ error: 'topic is required' }, { status: 400 });
    }
    if (!CATEGORIES.includes(category)) {
      return NextResponse.json({ error: `category must be one of: ${CATEGORIES.join(', ')}` }, { status: 400 });
    }

    const editorialTone = tone || EDITORIAL_TONES[category] || 'sophisticated, culturally intelligent, literary';
    const wordCount = length === 'short' ? '500–700' : '900–1200';

    const systemPrompt = `You are the Editorial AI for Voyager — an African luxury digital magazine covering travel, culture, fashion, food, architecture, and wellness for a sophisticated global readership with deep roots in Nigeria and Pan-African culture.

Your writing style: ${editorialTone}

CRITICAL FORMATTING RULES — follow exactly:
1. Return ONLY valid JSON, no markdown fences, no preamble.
2. JSON structure:
{
  "title": "Compelling headline, 6–12 words",
  "excerpt": "One elegant sentence teasing the piece, 20–30 words",
  "content": "Full article body in Markdown. Use ## for section headers. Use > for pull quotes. Use *italic* for emphasis. Use --- for section breaks. NO HTML tags.",
  "cover_image_query": "3–5 word search query for a stock photo that represents this article visually",
  "author_name": "Realistic Nigerian or African journalist full name"
}`;

    const userPrompt = `Write a ${wordCount}-word magazine article for Voyager about: "${topic}"
Category: ${category}
Tone: ${editorialTone}

The article must:
- Open with a specific, vivid, concrete scene or detail (not a generalisation)
- Include at least two section headers (##)
- Include one pull quote (> )
- Have an ending that opens outward rather than closing down
- Feel reported, not generated — include specific details, names, and place descriptions
- Honour African and specifically Nigerian perspectives where relevant`;
const deepseekRes = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.85,
        max_tokens: 2000,
        response_format: { type: 'json_object' },
      }),
    });

    if (!deepseekRes.ok) {
      const err = await deepseekRes.text();
      console.error('DeepSeek error:', err);
      return NextResponse.json({ error: 'DeepSeek API failed', detail: err }, { status: 502 });
    }

    const dsData = await deepseekRes.json();
    const rawContent = dsData.choices?.[0]?.message?.content || '';

    let generated: {
      title: string;
      excerpt: string;
      content: string;
      cover_image_query: string;
      author_name: string;
    };

    try {
      generated = JSON.parse(rawContent);
    } catch {
      return NextResponse.json({ error: 'Failed to parse DeepSeek JSON response', raw: rawContent }, { status: 500 });
    }

    const slug = buildSlug(generated.title);
    const read_time = estimateReadTime(generated.content);
    const coverImage = `https://source.unsplash.com/featured/1200x800/?${encodeURIComponent(generated.cover_image_query)}`;

    const articleRecord = {
      slug,
      title: generated.title,
      excerpt: generated.excerpt,
      content: generated.content,
      cover_image: coverImage,
      author_name: generated.author_name,
      read_time,
      paywall_tier,
      is_featured: false,
      is_trending: false,
      view_count: 0,
      like_count: 0,
      published_at: new Date().toISOString(),
    };

    const supabase = createServerClient();
    const { data: inserted, error: dbError } = await supabase
      .from('articles')
      .upsert(articleRecord, { onConflict: 'slug' })
      .select()
      .single();

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return NextResponse.json({
        success: true,
        article: articleRecord,
        db_error: dbError.message,
        message: 'Article generated but not saved to Supabase. Check DB schema.',
      });
    }

    return NextResponse.json({
      success: true,
      article: inserted,
      message: `Article "${generated.title}" generated and saved.`,
    });

  } catch (error) {
    console.error('Generate error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ── Batch generation endpoint (GET with ?count=N&categories=Travel,Culture) ──
export async function GET(req: NextRequest) {
  const secret = req.headers.get('x-generate-secret');
  if (secret !== process.env.GENERATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const count = Math.min(parseInt(searchParams.get('count') || '3'), 10);
  const cats = searchParams.get('categories')?.split(',') || ['Travel', 'Culture', 'Fashion'];

  const SEED_TOPICS: Record<string, string[]> = {
    Travel: ['The hidden luxury resorts of the Seychelles', "Eko Atlantic: Lagos's ambitious waterfront city", 'First class on Ethiopian Airlines'],
    Culture: ['Nollywood at 60: the economics of African cinema', 'The Afrobeats generation gap', 'Ife bronzes and the British Museum standoff'],
    Fashion: ['The rise of Ghanaian kente in haute couture', "Abuja's emerging fashion district", 'African luxury leather goods'],
    Food: ["Palm oil: Africa's misunderstood superfood", 'The jollof rice diplomacy of West Africa', 'Michelin-starred African chefs in Europe'],
    Architecture: ['Earthen architecture revival in Sahel', 'Lagos tower boom and what it means', 'Diébédo Francis Kéré and the vernacular future'],
    Wellness: ['Shea butter: from Sokoto to global skincare', 'Sound healing in Yoruba tradition', 'Fitness culture in Abuja'],
    Business: ['The Lagos tech startup ecosystem in 2026', 'Nigerian fintech goes global', 'African sovereign wealth funds'],
    Art: ['El Anatsui and the meaning of scale', "Yinka Shonibare's new Lagos commission", 'The NFT wave hits West Africa'],
  };

  const results = [];
  for (let i = 0; i < count; i++) {
    const category = cats[i % cats.length];
    const topics = SEED_TOPICS[category] || SEED_TOPICS['Culture'];
    const topic = topics[Math.floor(Math.random() * topics.length)];

    const res = await fetch(`${req.nextUrl.origin}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-generate-secret': process.env.GENERATE_SECRET || '',
      },
      body: JSON.stringify({ topic, category, paywall_tier: i % 3 === 0 ? 'premium' : 'free' }),
    });

    const data = await res.json();
    results.push({ topic, category, success: data.success, slug: data.article?.slug });

    await new Promise(r => setTimeout(r, 1000));
  }

  return NextResponse.json({ generated: results.length, results });
      }
