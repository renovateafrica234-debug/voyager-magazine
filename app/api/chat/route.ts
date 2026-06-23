import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    // RAG: fetch relevant articles from Supabase
    const { data: articles } = await supabase
      .from('articles')
      .select('title, excerpt, content')
      .textSearch('content', message.split(' ').slice(0, 5).join(' & '), { type: 'websearch', config: 'english' })
      .limit(3);

    const context = articles?.length
      ? articles.map(a => `Title: ${a.title}\n${a.excerpt || a.content?.slice(0, 300)}`).join('\n\n')
      : 'No relevant articles found. Answer generally about travel, culture, and luxury lifestyle.';

    const systemPrompt = `You are Voyager AI, a sophisticated travel and culture concierge for an African luxury digital publication. Use the following article context to answer. If no context matches, answer generally but elegantly.\n\nContext:\n${context}`;

    const deepseekRes = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          ...history.slice(-4).map((m: any) => ({ role: m.role, content: m.content })),
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    const data = await deepseekRes.json();
    const reply = data.choices?.[0]?.message?.content || 'I am unable to answer at the moment.';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ reply: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
