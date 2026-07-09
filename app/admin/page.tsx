'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { 
  FileText, 
  Eye, 
  Clock, 
  CheckCircle2, 
  TrendingUp,
  AlertCircle,
  ArrowUpRight,
  Plus,
  X,
  Save,
  Loader2
} from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    pending: 0,
    drafts: 0,
    views: 1247
  });
  const [recentArticles, setRecentArticles] = useState<any[]>([]);
  const [pendingApprovals, setPendingApprovals] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    cover_image: "",
    category_id: "",
    video_url: "",
    is_premium: false,
    is_trending: false,
    status: "draft",
  });

  useEffect(() => {
    fetchStats();
    fetchCategories();
  }, []);

  async function fetchStats() {
    const { data: all } = await supabase.from('articles').select('status');
    const { data: pending } = await supabase
      .from('articles')
      .select('*, categories(name)')
      .eq('status', 'pending')
      .order('submitted_at', { ascending: false })
      .limit(5);
    const { data: recent } = await supabase
      .from('articles')
      .select('*, categories(name)')
      .order('created_at', { ascending: false })
      .limit(5);

    const counts = all?.reduce((acc: any, curr: any) => {
      acc[curr.status] = (acc[curr.status] || 0) + 1;
      return acc;
    }, {});

    setStats({
      total: all?.length || 0,
      published: counts?.published || 0,
      pending: counts?.pending || 0,
      drafts: counts?.draft || 0,
      views: 1247
    });
    setPendingApprovals(pending || []);
    setRecentArticles(recent || []);
  }

  async function fetchCategories() {
    const { data } = await supabase.from('categories').select('*').order('name');
    setCategories(data || []);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const { data, error } = await supabase.from('articles').insert({
      title: form.title,
      slug: form.slug,
      content: form.content,
      cover_image: form.cover_image,
      category_id: form.category_id,
      video_url: form.video_url,
      is_premium: form.is_premium,
      is_trending: form.is_trending,
      status: form.status,
      view_count: 0,
    }).select();

    setSaving(false);

    if (error) {
      setMessage("Error: " + error.message);
      return;
    }

    setMessage("Article published successfully.");
    setForm({
      title: "",
      slug: "",
      content: "",
      cover_image: "",
      category_id: "",
      video_url: "",
      is_premium: false,
      is_trending: false,
      status: "draft",
    });
    fetchStats();
  }

  const statCards = [
    { label: 'Total Articles', value: stats.total, icon: FileText, color: 'text-[#C9A96E]' },
    { label: 'Published', value: stats.published, icon: CheckCircle2, color: 'text-emerald-400' },
    { label: 'Pending Review', value: stats.pending, icon: Clock, color: 'text-amber-400' },
    { label: 'Total Views', value: stats.views, icon: Eye, color: 'text-blue-400' },
  ];

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      
      <div>
        <h2 className="text-2xl font-semibold text-white mb-1">Dashboard</h2>
        <p className="text-sm text-[#F2EDE4]/40">Overview of your editorial pipeline</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <Icon className={`w-5 h-5 ${stat.color}`} />
                <TrendingUp className="w-3 h-3 text-[#F2EDE4]/20" />
              </div>
              <p className="text-2xl font-semibold text-white">{stat.value}</p>
              <p className="text-[11px] text-[#F2EDE4]/40 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* New Article Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-white">Editor</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C9A96E]/10 border border-[#C9A96E]/20 text-[#C9A96E] text-[11px] font-medium hover:bg-[#C9A96E]/20 transition-colors"
        >
          {showForm ? <X className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
          {showForm ? 'Close' : 'New Article'}
        </button>
      </div>

      {/* New Article Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-2xl bg-white/[0.03] border border-white/5 p-6 space-y-4">
          {message && (
            <div className={`text-sm px-4 py-3 rounded-lg ${message.includes('Error') ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] text-[#F2EDE4]/40 uppercase tracking-wider">Title</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Article title"
                className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-[#F2EDE4]/20 focus:outline-none focus:border-[#C9A96E]/50"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-[#F2EDE4]/40 uppercase tracking-wider">Slug</label>
              <input
                required
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="lagos-lagoon-city"
                className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-[#F2EDE4]/20 focus:outline-none focus:border-[#C9A96E]/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] text-[#F2EDE4]/40 uppercase tracking-wider">Category</label>
              <select
                required
                value={form.category_id}
                onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C9A96E]/50"
              >
                <option value="" className="bg-[#0A0A0A]">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#0A0A0A]">{c.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-[#F2EDE4]/40 uppercase tracking-wider">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C9A96E]/50"
              >
                <option value="draft" className="bg-[#0A0A0A]">Draft</option>
                <option value="published" className="bg-[#0A0A0A]">Published</option>
                <option value="pending" className="bg-[#0A0A0A]">Pending Review</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] text-[#F2EDE4]/40 uppercase tracking-wider">Cover Image URL</label>
            <input
              value={form.cover_image}
              onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-[#F2EDE4]/20 focus:outline-none focus:border-[#C9A96E]/50"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] text-[#F2EDE4]/40 uppercase tracking-wider">Video URL (optional)</label>
            <input
              value={form.video_url}
              onChange={(e) => setForm({ ...form, video_url: e.target.value })}
              placeholder="https://youtube.com/..."
              className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-[#F2EDE4]/20 focus:outline-none focus:border-[#C9A96E]/50"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] text-[#F2EDE4]/40 uppercase tracking-wider">Content</label>
            <textarea
              required
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="Article body..."
              rows={8}
              className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-[#F2EDE4]/20 focus:outline-none focus:border-[#C9A96E]/50"
            />
          </div>

          <div className="flex gap-6 text-sm">
            <label className="flex items-center gap-2 cursor-pointer text-[#F2EDE4]/60">
              <input
                type="checkbox"
                checked={form.is_premium}
                onChange={(e) => setForm({ ...form, is_premium: e.target.checked })}
                className="accent-[#C9A96E] w-4 h-4"
              />
              Premium
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-[#F2EDE4]/60">
              <input
                type="checkbox"
                checked={form.is_trending}
                onChange={(e) => setForm({ ...form, is_trending: e.target.checked })}
                className="accent-[#C9A96E] w-4 h-4"
              />
              Trending
            </label>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center gap-2 w-full bg-[#C9A96E] text-[#0A0A0A] font-bold py-3 rounded-lg text-sm tracking-wider uppercase disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Publishing...' : 'Publish Article'}
          </button>
        </form>
      )}

      {/* Pending Approvals */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-medium text-white">Pending Approvals</h3>
            {stats.pending > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-medium">
                {stats.pending}
              </span>
            )}
          </div>
          <Link href="/admin/approvals" className="text-[11px] text-[#C9A96E] flex items-center gap-1">
            View all <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
        
        {pendingApprovals.length === 0 ? (
          <div className="p-8 text-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-500/30 mx-auto mb-2" />
            <p className="text-sm text-[#F2EDE4]/30">All caught up. No pending approvals.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {pendingApprovals.map((article) => (
              <div key={article.id} className="p-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-white truncate">{article.title}</h4>
                  <p className="text-[11px] text-[#F2EDE4]/40">
                    {article.categories?.name} · Submitted {new Date(article.submitted_at).toLocaleDateString()}
                  </p>
                </div>
                <Link 
                  href={`/admin/approvals?id=${article.id}`}
                  className="px-3 py-1.5 rounded-lg bg-[#C9A96E]/10 border border-[#C9A96E]/20 text-[#C9A96E] text-[11px] font-medium hover:bg-[#C9A96E]/20 transition-colors"
                >
                  Review
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Articles */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-sm font-medium text-white">Recent Articles</h3>
          <button 
            onClick={() => setShowForm(true)}
            className="text-[11px] text-[#C9A96E] flex items-center gap-1"
          >
            New Article <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
        <div className="divide-y divide-white/5">
          {recentArticles.map((article) => (
            <div key={article.id} className="p-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors">
              <div className={`w-2 h-2 rounded-full shrink-0 ${
                article.status === 'published' ? 'bg-emerald-500' :
                article.status === 'pending' ? 'bg-amber-500' :
                'bg-[#F2EDE4]/20'
              }`} />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-white truncate">{article.title}</h4>
                <p className="text-[11px] text-[#F2EDE4]/40 capitalize">{article.status} · {article.categories?.name}</p>
              </div>
              <span className="text-[11px] text-[#F2EDE4]/30">
                {new Date(article.created_at).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
      }
      
