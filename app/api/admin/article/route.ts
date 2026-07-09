import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const password = req.headers.get("x-admin-password");
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const sb = createServerClient();

  const { data, error } = await sb
    .from("articles")
    .insert({
      title: body.title,
      slug: body.slug,
      content: body.content,
      cover_image: body.cover_image,
      category_id: body.category_id,
      is_premium: body.is_premium,
      is_trending: body.is_trending,
      video_url: body.video_url,
      view_count: body.view_count || 0,
    })
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, article: data?.[0] });
}
