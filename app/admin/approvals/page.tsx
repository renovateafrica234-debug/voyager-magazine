'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  CheckCircle2, 
  XCircle, 
  Eye, 
  MessageSquare,
  Loader2,
  ArrowLeft
} from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ApprovalsPage() {
  const [pending, setPending] = useState<any[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPending();
  }, []);

  async function fetchPending() {
    const { data } = await supabase
      .from('articles')
      .select('*, categories(name)')
      .eq('status', 'pending')
      .order('submitted_at', { ascending: false });
    setPending(data || []);
  }

  async function handleAction(action: 'approved' | 'rejected') {
    if (!selectedArticle) return;
    setLoading(true);

    const { error } = await supabase
      .from('articles')
      .update({
        status: action === 'approved' ? 'published' : 'rejected',
        approval_notes: notes,
        approved_at: new Date().toISOString(),
        published: action === 'approved',
      })
      .eq('id', selectedArticle.id);

    if (!error) {
      await supabase.from('approval_logs').insert({
        article_id: selectedArticle.id,
        action,
        notes,
      });
      
      setSelectedArticle(null);
      setNotes('');
      fetchPending();
    }
    
    setLoading(false);
  }

  if (selectedArticle) {
    return (
      <div className="p-4 md:p-8 max-w-3xl mx-auto pb-24">
        <button 
          onClick={() => setSelectedArticle(null)}
          className="flex items-center gap-2 text-sm text-[#F2EDE4]/40 hover:text-[#F2EDE4] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to queue
        </button>

        <div className="rounded-2xl bg-white/[0.03] border border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-1 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-medium uppercase tracking-wider">
                Pending Review
              </span>
              <span className="text-[11px] text-[#F2EDE4]/30">
                Submitted {new Date(selectedArticle.submitted_at).toLocaleString()}
              </span>
            </div>
            
            <h2 className="text-xl font-semibold text-white mb-2">{selectedArticle.title}</h2>
            <p className="text-sm text-[#F2EDE4]/50 mb-4">
              {selectedArticle.categories?.name} · {selectedArticle.read_time} min read
            </p>
            
            {selectedArticle.image_url && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-4 bg-white/5">
                <img src={selectedArticle.image_url} alt="" className="w-full h-full object-cover" />
              </div>
            )}
            
            <div className="p-4 rounded-xl bg-black/20 text-sm text-[#F2EDE4]/80 leading-relaxed whitespace-pre-wrap">
              {selectedArticle.excerpt}
            </div>
            
            <div className="mt-4 p-4 rounded-xl bg-black/20 text-sm text-[#F2EDE4]/60 leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
              {selectedArticle.content}
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="flex items-center gap-2 text-xs text-[#F2EDE4]/40 uppercase tracking-wider mb-2">
                <MessageSquare className="w-3 h-3" /> Review Notes
              </label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Feedback for the editor (optional)..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F2EDE4] placeholder:text-[#F2EDE4]/20 focus:outline-none focus:border-[#C9A96E]/50 min-h-[100px] resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleAction('rejected')}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors disabled:opacity-30"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
                Reject
              </button>
              <button
                onClick={() => handleAction('approved')}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-colors disabled:opacity-30"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                Approve & Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto pb-24">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white mb-1">Approval Gate</h2>
        <p className="text-sm text-[#F2EDE4]/40">Human-in-the-loop review queue</p>
      </div>

      {pending.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
          <CheckCircle2 className="w-12 h-12 text-emerald-500/20 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-white mb-1">Queue Clear</h3>
          <p className="text-sm text-[#F2EDE4]/30">No articles awaiting approval.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {pending.map((article) => (
            <div 
              key={article.id} 
              onClick={() => setSelectedArticle(article)}
              className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#C9A96E]/30 cursor-pointer transition-all group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-white group-hover:text-[#C9A96E] transition-colors truncate">
                    {article.title}
                  </h3>
                  <p className="text-[11px] text-[#F2EDE4]/40 mt-1">
                    {article.categories?.name} · {article.read_time} min · Submitted {new Date(article.submitted_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#C9A96E]/10 transition-colors">
                  <Eye className="w-4 h-4 text-[#F2EDE4]/40 group-hover:text-[#C9A96E]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
        }
              
