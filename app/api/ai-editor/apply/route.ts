// app/api/ai-editor/apply/route.ts — Admin-gated Apply
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

    const { editId, articleId, content, action } = await req.json();

    if (action === "apply_direct" && articleId && content) {
      const { error } = await supabase
        .from("articles")
        .update({ content, updated_at: new Date().toISOString() })
        .eq("id", articleId);

      if (error) throw error;
      return NextResponse.json({ success: true, message: "Article updated directly." });
    }

    if (action === "approve" && editId) {
      const { error } = await supabase.rpc("apply_article_edit", { edit_id: editId });
      if (error) throw error;
      return NextResponse.json({ success: true, message: "Edit approved and applied." });
    }

    if (action === "reject" && editId) {
      const { error } = await supabase
        .from("article_edits")
        .update({ status: "rejected", updated_at: new Date().toISOString() })
        .eq("id", editId);

      if (error) throw error;
      return NextResponse.json({ success: true, message: "Edit rejected." });
    }

    return NextResponse.json({ error: "Invalid action or missing parameters." }, { status: 400 });

  } catch (error: any) {
    console.error("Apply edit error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to apply edit." },
      { status: 500 }
    );
  }
}
  
