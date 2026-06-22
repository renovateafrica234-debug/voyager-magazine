// app/api/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  if (!q || q.length < 2) {
    return NextResponse.json({ articles: [] });
  }

  const supabase = createServerClient();

  const { data } = await supabase
    .from("articles")
    .select("*, category:categories(*)")
    .or(`title.ilike.%${q}%,excerpt.ilike.%${q}%,content.ilike.%${q}%`)
    .order("published_at", { ascending: false })
    .limit(20);

  return NextResponse.json({ articles: data || [] });
}
