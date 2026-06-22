// app/ai-editor/route.ts — Admin-gated AI Editor
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    // ADMIN GATE
    const supabase = createServerClient();
    const authHeader = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { data: { user } } = await supabase.auth.getUser(authHeader);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single();

    if (!profile?.is_admin) {
      return NextResponse.json({ error: "Admin access required." }, { status: 403 });
    }
    // END ADMIN GATE

    const { mode, message, articleId, articleSlug, history } = await req.json();

    let articleContext = "";
    let articleData = null;

    if (articleId || articleSlug) {
      const { data } = await supabase
        .from("articles")
        .select("id, slug, title, content, excerpt, category:categories(name)")
        .or(`id.eq.${articleId},slug.eq.${articleSlug}`)
        .single();

      if (data) {
        articleData = data;
        articleContext = `ARTICLE CONTEXT:
Title: ${data.title}
Category: ${data.category?.name || 'N/A'}
Excerpt: ${data.excerpt}
Current Content:
${data.content}`;
      }
    }

    let systemPrompt = "";

    if (mode === "edit") {
      systemPrompt = `You are the Voyager Magazine Editor-in-Chief. You have full editorial authority over the magazine's archive.

${articleContext}

YOUR ROLE:
1. The user will ask you to make changes to the article above.
2. You must generate the COMPLETE updated article content in HTML format.
3. You must also provide a clear CHANGE_SUMMARY listing exactly what was modified.
4. You must preserve the article's voice, tone, and journalistic quality.
5. You may add new sections, update facts, change prices, add product cards, or restructure the narrative.
6. Do NOT change the article slug or title unless explicitly asked.

RESPONSE FORMAT (STRICT JSON):
{
  "change_summary": "Bullet list of changes made",
  "updated_content": "The full HTML content of the updated article",
  "confidence": "high|medium|low",
  "notes": "Any editorial notes or concerns"
}`;
    } else {
      const { data: relatedArticles } = await supabase
        .from("articles")
        .select("title, excerpt, content")
        .textSearch("title", message.split(" ").slice(0, 3).join(" & "), { type: "websearch" })
        .limit(3);

      const archiveContext = (relatedArticles || [])
        .map((a) => `ARTICLE: ${a.title}
${a.excerpt}
${a.content.slice(0, 800)}`)
        .join("

");

      systemPrompt = `You are the Voyager Magazine Editor. You have access to the following article archive:

${archiveContext}

Answer based on the archive. If the archive doesn't contain the answer, say so honestly. Be concise, elegant, and knowledgeable.`;
    }

    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          ...(history || []).slice(-4).map((h: any) => ({ role: h.role, content: h.content })),
          { role: "user", content: message },
        ],
        temperature: mode === "edit" ? 0.5 : 0.7,
        max_tokens: 4000,
      }),
    });

    const data = await response.json();
    const aiReply = data.choices?.[0]?.message?.content || "I'm unable to respond.";

    if (mode === "edit" && articleData) {
      try {
        const jsonMatch = aiReply.match(/\{[\s\S]*\}/);
        const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

        if (parsed?.updated_content) {
          await supabase.from("article_edits").insert({
            article_id: articleData.id,
            editor_id: user.id,
            edit_type: "ai_suggested",
            original_content: articleData.content,
            suggested_content: parsed.updated_content,
            change_summary: parsed.change_summary,
            status: "pending",
          });

          return NextResponse.json({
            mode: "edit",
            change_summary: parsed.change_summary,
            updated_content: parsed.updated_content,
            confidence: parsed.confidence,
            notes: parsed.notes,
            article_id: articleData.id,
            article_title: articleData.title,
          });
        }
      } catch (parseErr) {
        console.error("Failed to parse AI edit response:", parseErr);
        return NextResponse.json({
          mode: "edit",
          raw_response: aiReply,
          error: "Could not parse structured edit. Please review manually.",
        });
      }
    }

    return NextResponse.json({ mode: "chat", reply: aiReply });

  } catch (error) {
    console.error("AI Editor error:", error);
    return NextResponse.json(
      { error: "Editor service unavailable." },
      { status: 500 }
    );
  }
}
  
