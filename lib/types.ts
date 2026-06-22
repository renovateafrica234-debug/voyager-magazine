// lib/types.ts — Voyager Magazine Type Definitions

export type SubscriptionTier = 'free' | 'starter' | 'premium' | 'founder';
export type SubscriptionStatus = 'active' | 'inactive' | 'cancelled' | 'past_due';

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  subscription_tier: SubscriptionTier;
  subscription_status: SubscriptionStatus;
  paystack_customer_code: string | null;
  paystack_subscription_code: string | null;
  reads_count: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  cover_image: string | null;
  article_count: number;
  created_at: string;
}

export interface Article {
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
  paywall_tier: SubscriptionTier;
  is_featured: boolean;
  is_trending: boolean;
  view_count: number;
  like_count: number;
  published_at: string;
  created_at: string;
  updated_at: string;
  // Joined fields
  category?: Category;
  is_bookmarked?: boolean;
}

export interface Issue {
  id: string;
  title: string;
  cover_image: string;
  description: string | null;
  article_ids: string[] | null;
  month: string | null;
  year: number | null;
  is_published: boolean;
  created_at: string;
}

export interface Bookmark {
  id: string;
  user_id: string;
  article_id: string;
  created_at: string;
  article?: Article;
}

export interface Conversation {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface Ad {
  id: string;
  title: string;
  image_url: string;
  link_url: string | null;
  placement: 'hero' | 'inline' | 'sidebar';
  start_date: string;
  end_date: string | null;
  is_active: boolean;
  click_count: number;
  created_at: string;
}

export interface PaystackPlan {
  name: string;
  tier: SubscriptionTier;
  amount: number; // in kobo
  amountNgn: number;
  description: string;
  features: string[];
}

export const PAYSTACK_PLANS: PaystackPlan[] = [
  {
    name: 'Starter',
    tier: 'starter',
    amount: 50000,
    amountNgn: 500,
    description: 'Perfect for curious readers',
    features: ['Access to Starter articles', 'Ad-lite experience', 'Basic bookmarks', 'Monthly newsletter'],
  },
  {
    name: 'Premium',
    tier: 'premium',
    amount: 90000,
    amountNgn: 900,
    description: 'For the devoted voyager',
    features: ['All Starter features', 'Premium article access', 'AI editor chat', 'Offline reading', 'Exclusive events'],
  },
  {
    name: 'Founder',
    tier: 'founder',
    amount: 150000,
    amountNgn: 1500,
    description: 'Support the mission',
    features: ['All Premium features', 'Founder-only content', 'Annual print edition', 'Direct editorial access', 'Name in masthead'],
  },
];

export const TIER_ACCESS: Record<SubscriptionTier, SubscriptionTier[]> = {
  free: ['free'],
  starter: ['free', 'starter'],
  premium: ['free', 'starter', 'premium'],
  founder: ['free', 'starter', 'premium', 'founder'],
};

export function canAccessArticle(userTier: SubscriptionTier, articleTier: SubscriptionTier): boolean {
  return TIER_ACCESS[userTier].includes(articleTier);
}

export const CATEGORIES = [
  { slug: 'travel', name: 'Travel', color: '#C9A96E' },
  { slug: 'culture', name: 'Culture', color: '#8B7355' },
  { slug: 'food', name: 'Food', color: '#D4A574' },
  { slug: 'fashion', name: 'Fashion', color: '#B8A99A' },
  { slug: 'architecture', name: 'Architecture', color: '#A09080' },
  { slug: 'wellness', name: 'Wellness', color: '#9CAF88' },
] as const;
