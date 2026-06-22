// lib/database.types.ts — Minimal Supabase types for Voyager Magazine
// Replace with full generated types via `supabase gen types typescript` when you have CLI access

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          subscription_tier: string;
          subscription_status: string;
          paystack_customer_code: string | null;
          paystack_subscription_code: string | null;
          reads_count: number;
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          subscription_tier?: string;
          subscription_status?: string;
          paystack_customer_code?: string | null;
          paystack_subscription_code?: string | null;
          reads_count?: number;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          subscription_tier?: string;
          subscription_status?: string;
          paystack_customer_code?: string | null;
          paystack_subscription_code?: string | null;
          reads_count?: number;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          cover_image: string | null;
          article_count: number;
          created_at: string;
        };
      };
      articles: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string;
          content: string;
          category_id: string | null;
          cover_image: string;
          hero_images: string[] | null;
          author_name: string;
          author_avatar: string | null;
          read_time: number;
          paywall_tier: string;
          is_featured: boolean;
          is_trending: boolean;
          view_count: number;
          like_count: number;
          published_at: string;
          created_at: string;
          updated_at: string;
        };
      };
      bookmarks: {
        Row: {
          id: string;
          user_id: string;
          article_id: string;
          created_at: string;
        };
      };
      conversations: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          created_at: string;
          updated_at: string;
        };
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          role: string;
          content: string;
          created_at: string;
        };
      };
      ads: {
        Row: {
          id: string;
          title: string;
          image_url: string;
          link_url: string | null;
          placement: string;
          start_date: string;
          end_date: string | null;
          is_active: boolean;
          click_count: number;
          created_at: string;
        };
      };
      issues: {
        Row: {
          id: string;
          title: string;
          cover_image: string;
          description: string | null;
          article_ids: string[] | null;
          month: string | null;
          year: number | null;
          is_published: boolean;
          created_at: string;
        };
      };
      article_edits: {
        Row: {
          id: string;
          article_id: string;
          editor_id: string | null;
          edit_type: string;
          original_content: string | null;
          suggested_content: string | null;
          applied_content: string | null;
          change_summary: string | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
      };
    };
    Views: {};
    Functions: {
      increment_article_views: { Args: { article_slug: string }; Returns: void };
      increment_article_likes: { Args: { article_slug: string }; Returns: void };
      apply_article_edit: { Args: { edit_id: string }; Returns: void };
      is_user_admin: { Args: { user_uuid: string }; Returns: boolean };
    };
  };
}
