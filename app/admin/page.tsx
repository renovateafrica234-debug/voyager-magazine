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
  ArrowUpRight
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

  useEffect(() => {
    fetchStats();
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
          <Link href="/editor" className="text-[11px] text-[#C9A96E] flex items-center gap-1">
            New Article <ArrowUpRight className="w-3 h-3" />
          </Link>
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
        
