import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { mode, message, articleId, history } = await req.json();

    const systemPrompt = `You are Voyager AI Editor, a senior editorial assistant for a luxury African digital publication. You edit articles for clarity, tone, and style. You return structured JSON with: change_summary, updated_content, confidence, notes, article_id, article_title.`;

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
          { role: 'user', content: `Article ID: ${articleId}\n\nInstruction: ${message}\n\nReturn valid JSON with keys: change_summary, updated_content, confidence, notes, article_id, article_title` }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    const data = await deepseekRes.json();
    const raw = data.choices?.[0]?.message?.content || '{}';

    // Try to parse JSON from the response
    let parsed: any = {};
    try {
      parsed = JSON.parse(raw);
    } catch {
      // If not valid JSON, wrap the raw text
      parsed = {
        change_summary: 'AI suggested edits',
        updated_content: raw,
        confidence: 'medium',
        notes: 'Response was not structured JSON. Review carefully.',
        article_id: articleId,
        article_title: 'Unknown'
      };
    }

    return NextResponse.json({ mode: 'edit', ...parsed });
  } catch (error) {
    console.error('AI Editor error:', error);
    return NextResponse.json({ error: 'Editor service error. Please try again.' }, { status: 500 });
  }
}

