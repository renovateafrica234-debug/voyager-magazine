"use client";

import { useState, useEffect } from "react";

interface Article {
  id: string;
  title: string;
  slug: string;
  category?: { name: string };
  category_id?: string;
  created_at: string;
}

interface Category {
  id: string;
  name: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
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
  });

  useEffect(() => {
    const saved = localStorage.getItem("voyager_admin_pw");
    if (saved) {
      setPassword(saved);
      setUnlocked(true);
    }
  }, []);

  useEffect(() => {
    if (!unlocked || !password) return;
    fetchData();
  }, [unlocked, password]);

  const fetchData = async () => {
    const headers = { "x-admin-password": password };
    const [aRes, cRes] = await Promise.all([
      fetch("/api/admin/articles", { headers }),
      fetch("/api/admin/categories", { headers }),
    ]);
    const aData = await aRes.json();
    const cData = await cRes.json();
    if (aData.articles) setArticles(aData.articles);
    if (cData.categories) setCategories(cData.categories);
  };

  const unlock = () => {
    localStorage.setItem("voyager_admin_pw", password);
    setUnlocked(true);
  };

  const logout = () => {
    localStorage.removeItem("voyager_admin_pw");
    setPassword("");
    setUnlocked(false);
    setArticles([]);
    setCategories([]);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/admin/article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify({ ...form, view_count: 0 }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
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
      });
      fetchData();
    } else {
      setMessage(data.error || "Failed to publish.");
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-[#F2EDE4] flex items-center justify-center px-5">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-serif text-[#C9A96E] text-center mb-2">VOYAGER</h1>
          <p className="text-center text-xs tracking-[0.3em] uppercase text-[#F2EDE4]/50 mb-8">Admin Panel</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 text-sm mb-4 focus:outline-none focus:border-[#C9A96E]"
            onKeyDown={(e) => e.key === "Enter" && unlock()}
          />
          <button
            onClick={unlock}
            className="w-full bg-[#C9A96E] text-[#0A0A0A] font-bold py-3 rounded-lg text-sm tracking-wider uppercase"
          >
            Enter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F2EDE4] pb-24">
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#F2EDE4]/5">
        <div className="max-w-md mx-auto px-5 h-14 flex items-center justify-between">
          <span className="text-[#C9A96E] font-serif text-xl tracking-[0.25em]">ADMIN</span>
          <button onClick={logout} className="text-xs text-[#F2EDE4]/50 hover:text-[#F2EDE4]">
            Logout
          </button>
        </div>
      </header>

      <div className="pt-20 max-w-md mx-auto px-5">
        <h2 className="text-lg font-serif mb-4">New Article</h2>

        {message && (
          <p className={`text-sm mb-4 ${message.includes("success") ? "text-[#C9A96E]" : "text-red-400"}`}>
            {message}
          </p>
        )}

        <form onSubmit={submit} className="space-y-4">
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Article title"
            className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E]"
          />

          <input
            required
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            placeholder="Slug (e.g. lagos-lagoon-city)"
            className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E]"
          />

          <select
            required
            value={form.category_id}
            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
            className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E]"
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            value={form.cover_image}
            onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
            placeholder="Cover image URL (Unsplash)"
            className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E]"
          />

          <input
            value={form.video_url}
            onChange={(e) => setForm({ ...form, video_url: e.target.value })}
            placeholder="Video URL (optional)"
            className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E]"
          />

          <textarea
            required
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="Article content (HTML or plain text)"
            rows={8}
            className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E]"
          />

          <div className="flex gap-6 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_premium}
                onChange={(e) => setForm({ ...form, is_premium: e.target.checked })}
                className="accent-[#C9A96E]"
              />
              Premium
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_trending}
                onChange={(e) => setForm({ ...form, is_trending: e.target.checked })}
                className="accent-[#C9A96E]"
              />
              Trending
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C9A96E] text-[#0A0A0A] font-bold py-3 rounded-lg text-sm tracking-wider uppercase disabled:opacity-50"
          >
            {loading ? "Publishing..." : "Publish Article"}
          </button>
        </form>

        <h2 className="text-lg font-serif mt-10 mb-4">Existing Articles</h2>
        <div className="space-y-3">
          {articles.length === 0 && (
            <p className="text-sm text-[#F2EDE4]/40">No articles found.</p>
          )}
          {articles.map((a) => (
            <div key={a.id} className="bg-[#1a1a1a] rounded-lg p-4 border border-[#333]">
              <p className="font-medium text-sm">{a.title}</p>
              <p className="text-xs text-[#F2EDE4]/50 mt-1">
                {a.slug} • {a.category?.name || a.category_id}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
          }
