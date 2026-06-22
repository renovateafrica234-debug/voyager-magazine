// lib/admin.ts — Admin Check Utility
import { createServerClient } from "./supabase";

export async function checkAdmin(userId: string | undefined): Promise<boolean> {
  if (!userId) return false;
  const supabase = createServerClient();
  const { data } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", userId)
    .single();
  return data?.is_admin === true;
}
