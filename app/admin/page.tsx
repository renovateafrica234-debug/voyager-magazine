'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ADMIN_PASS = 'voyager2026';

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [stats, setStats] = useState({ total: 0, published: 0, pending: 0, drafts: 0 });
  const [recentArticles, setRecentArticles] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    title: '', slug: '', content: '', cover_image: '',
    category_id: '', video_url: '', is_premium: false,
    is_trending: false, status: 'draft',
  });

  useEffect(() => {
    try {
      if (localStorage.getItem('voyager_admin') === 'ok') setUnlocked(true);
    } catch {}
  }, []);

  useEffect(() => {
    if (!unlocked) return;
    fetchStats();
    fetchCategories();
  }, [unlocked]);

  function login() {
    const clean = password.trim().toLowerCase();
    if (clean === ADMIN_PASS) {
      try { localStorage.setItem('voyager_admin', 'ok'); } catch {}
      setUnlocked(true);
      setLoginError('');
    } else {
      setLoginError(`Wrong password. You typed: "${password}" (expected: ${ADMIN_PASS})`);
    }
  }

  async function fetchStats() {
    const { data: all } = await supabase.from('articles').select('status');
    const { data: recent } = await supabase
      .from('articles').select('*, categories(name)')
      .order('created_at', { ascending: false }).limit(5);

    const counts = all?.reduce((acc: any, curr: any) => {
      acc[curr.status] = (acc[curr.status] || 0) + 1;
      return acc;
    }, {});

    setStats({
      total: all?.length || 0,
      published: counts?.published || 0,
      pending: counts?.pending || 0,
      drafts: counts?.draft || 0,
    });
    setRecentArticles(recent || []);
  }

  async function fetchCategories() {
    const { data } = await supabase.from('categories').select('*').order('name');
    setCategories(data || []);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    const { error } = await supabase.from('articles').insert({
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
    });

    setSaving(false);
    if (error) { setMessage('Error: ' + error.message); return; }

    setMessage('Article published successfully.');
    setForm({ title: '', slug: '', content: '', cover_image: '',
      category_id: '', video_url: '', is_premium: false,
      is_trending: false, status: 'draft' });
    fetchStats();
  }

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-[#F2EDE4] flex items-center justify-center px-5">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-serif text-[#C9A96E] text-center mb-2">VOYAGER</h1>
          <p className="text-center text-xs tracking-[0.3em] uppercase text-[#F2EDE4]/50 mb-8">Admin</p>

          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect="off"
              className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 text-sm pr-20 focus:outline-none focus:border-[#C9A96E]"
              onKeyDown={(e) => e.key === 'Enter' && login()}
            />
            <button
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#F2EDE4]/40 uppercase"
            >
              {showPw ? 'Hide' : 'Show'}
            </button>
          </div>

          {loginError && <p className="text-red-400 text-xs mt-3">{loginError}</p>}

          <button
            onClick={login}
            className="w-full bg-[#C9A96E] text-[#0A0A0A] font-bold py-3 rounded-lg text-sm tracking-wider uppercase mt-4"
          >
            Enter
          </button>

          <p className="text-center text-[10px] text-[#F2EDE4]/20 mt-4">
            Password: voyager2026 (all lowercase)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F2EDE4] p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white mb-1">Dashboard</h2>
          <p className="text-sm text-[#F2EDE4]/40">Editorial pipeline</p>
        </div>
        <button
          onClick={() => { try { localStorage.removeItem('voyager_admin'); } catch {} setUnlocked(false); }}
          className="text-xs text-[#F2EDE4]/40 hover:text-white"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total', value: stats.total },
          { label: 'Published', value: stats.published },
          { label: 'Pending', value: stats.pending },
          { label: 'Drafts', value: stats.drafts },
        ].map((s) => (
          <div key={s.label} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
            <p className="text-2xl font-semibold text-white">{s.value}</p>
            <p className="text-[11px] text-[#F2EDE4]/40 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-white">Editor</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-lg bg-[#C9A96E]/10 border border-[#C9A96E]/20 text-[#C9A96E] text-[11px] font-medium"
        >
          {showForm ? 'Close' : 'New Article'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-2xl bg-white/[0.03] border border-white/5 p-6 space-y-4">
          {message && (
            <div className={`text-sm px-4 py-3 rounded-lg ${message.includes('Error') ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-[#F2EDE4]/20 focus:outline-none focus:border-[#C9A96E]/50" />
            <input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="Slug" className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-[#F2EDE4]/20 focus:outline-none focus:border-[#C9A96E]/50" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select required value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })} className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C9A96E]/50">
              <option value="" className="bg-[#0A0A0A]">Category</option>
              {categories.map((c) => <option key={c.id} value={c.id} className="bg-[#0A0A0A]">{c.name}</option>)}
            </select>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C9A96E]/50">
              <option value="draft" className="bg-[#0A0A0A]">Draft</option>
              <option value="published" className="bg-[#0A0A0A]">Published</option>
              <option value="pending" className="bg-[#0A0A0A]">Pending</option>
            </select>
          </div>

          <input value={form.cover_image} onChange={(e) => setForm({ ...form, cover_image: e.target.value })} placeholder="Cover image URL (Unsplash)" className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-[#F2EDE4]/20 focus:outline-none focus:border-[#C9A96E]/50" />
          <input value={form.video_url} onChange={(e) => setForm({ ...form, video_url: e.target.value })} placeholder="Video URL (optional)" className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-[#F2EDE4]/20 focus:outline-none focus:border-[#C9A96E]/50" />
          <textarea required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Article content" rows={6} className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-[#F2EDE4]/20 focus:outline-none focus:border-[#C9A96E]/50" />

          <div className="flex gap-6 text-sm">
            <label className="flex items-center gap-2 text-[#F2EDE4]/60">
              <input type="checkbox" checked={form.is_premium} onChange={(e) => setForm({ ...form, is_premium: e.target.checked })} className="accent-[#C9A96E]" />
              Premium
            </label>
            <label className="flex items-center gap-2 text-[#F2EDE4]/60">
              <input type="checkbox" checked={form.is_trending} onChange={(e) => setForm({ ...form, is_trending: e.target.checked })} className="accent-[#C9A96E]" />
              Trending
            </label>
          </div>

          <button type="submit" disabled={saving} className="w-full bg-[#C9A96E] text-[#0A0A0A] font-bold py-3 rounded-lg text-sm tracking-wider uppercase disabled:opacity-50">
            {saving ? 'Publishing...' : 'Publish Article'}
          </button>
        </form>
      )}

      <div className="rounded-2xl bg-white/[0.03] border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5">
          <h3 className="text-sm font-medium text-white">Recent Articles</h3>
        </div>
        <div className="divide-y divide-white/5">
          {recentArticles.length === 0 && <div className="p-8 text-center text-sm text-[#F2EDE4]/30">No articles yet.</div>}
          {recentArticles.map((a) => (
            <div key={a.id} className="p-4 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-white">{a.title}</h4>
                <p className="text-[11px] text-[#F2EDE4]/40 capitalize">{a.status} · {a.categories?.name}</p>
              </div>
              <span className="text-[11px] text-[#F2EDE4]/30">{new Date(a.created_at).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
