// app/ai-editor/route.ts — Admin-gated AI Editor
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

const BR = "\n";

export async function POST(req: NextRequest) {
  try {
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
      .single() as any;

    if (!profile?.is_admin) {
      return NextResponse.json({ error: "Admin access required." }, { status: 403 });
    }

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
        articleContext = "ARTICLE CONTEXT:" + BR + "Title: " + data.title + BR + "Category: " + (data.category?.name || "N/A") + BR + "Excerpt: " + data.excerpt + BR + "Current Content:" + BR + data.content;
      }
    }

    let systemPrompt = "";

    if (mode === "edit") {
      systemPrompt = "You are the Voyager Magazine Editor-in-Chief. You have full editorial authority over the magazine's archive." + BR + BR + articleContext + BR + BR + "YOUR ROLE:" + BR + "1. The user will ask you to make changes to the article above." + BR + "2. You must generate the COMPLETE updated article content in HTML format." + BR + "3. You must also provide a clear CHANGE_SUMMARY listing exactly what was modified." + BR + "4. You must preserve the article's voice, tone, and journalistic quality." + BR + "5. You may add new sections, update facts, change prices, add product cards, or restructure the narrative." + BR + "6. Do NOT change the article slug or title unless explicitly asked." + BR + BR + "RESPONSE FORMAT (STRICT JSON):" + BR + "{" + BR + '  "change_summary": "Bullet list of changes made",' + BR + '  "updated_content": "The full HTML content of the updated article",' + BR + '  "confidence": "high|medium|low",' + BR + '  "notes": "Any editorial notes or concerns"' + BR + "}";
    } else {
      const { data: relatedArticles } = await supabase
        .from("articles")
        .select("title, excerpt, content")
        .textSearch("title", message.split(" ").slice(0, 3).join(" & "), { type: "websearch" })
        .limit(3);

      const archiveContext = (relatedArticles || [])
        .map((a: any) => "ARTICLE: " + a.title + BR + a.excerpt + BR + a.content.slice(0, 800))
        .join(BR + BR);

      systemPrompt = "You are the Voyager Magazine Editor. You have access to the following article archive:" + BR + BR + archiveContext + BR + BR + "Answer based on the archive. If the archive doesn't contain the answer, say so honestly. Be concise, elegant, and knowledgeable.";
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
          } as any);

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
             
