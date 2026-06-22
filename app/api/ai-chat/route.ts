// app/api/ai-chat/route.ts — DeepSeek RAG API
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    // 1. Generate embedding for the query (simplified — in production use OpenAI/Google embedding)
    // For now, we'll do a text search fallback since DeepSeek doesn't have embeddings API
    const supabase = createServerClient();

    // 2. Search articles via full-text search
    const { data: articles } = await supabase
      .from("articles")
      .select("title, excerpt, content")
      .textSearch("title", message.split(" ").join(" & "), { type: "websearch" })
      .limit(3);

    // 3. Build context
    const context = (articles || [])
      .map((a) => `ARTICLE: ${a.title}\n${a.excerpt}\n${a.content.slice(0, 1000)}`)
      .join("\n\n");

    // 4. Call DeepSeek
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: `You are the Voyager Magazine Editor. You have access to the following article archive:\n\n${context}\n\nAnswer the user's question based on the archive. If the archive doesn't contain the answer, say so honestly. Be concise, elegant, and knowledgeable. Cite article titles when relevant.`,
          },
          ...history.slice(-6).map((h: any) => ({ role: h.role, content: h.content })),
          { role: "user", content: message },
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "I'm unable to respond at the moment.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("AI chat error:", error);
    return NextResponse.json({ reply: "An error occurred. Please try again." }, { status: 500 });
  }
}
