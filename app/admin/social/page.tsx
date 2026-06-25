'use client';

import { useState } from 'react';
import { 
  Twitter, 
  Facebook, 
  Linkedin, 
  Link as LinkIcon, 
  Share2,
  Check,
  Copy
} from 'lucide-react';

const shareTemplates = [
  {
    platform: 'Twitter / X',
    icon: Twitter,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
    getUrl: (url: string, title: string) => 
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
  },
  {
    platform: 'Facebook',
    icon: Facebook,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    getUrl: (url: string) => 
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  },
  {
    platform: 'LinkedIn',
    icon: Linkedin,
    color: 'text-blue-300',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
    getUrl: (url: string, title: string) => 
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  },
];

export default function SocialHub() {
  const [articleUrl, setArticleUrl] = useState('');
  const [articleTitle, setArticleTitle] = useState('');
  const [copied, setCopied] = useState(false);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const generatedCopy = articleTitle 
    ? `${articleTitle}\n\nRead the full story on Voyager Magazine — where African luxury meets editorial excellence.\n\n${articleUrl || baseUrl}`
    : '';

  function copyToClipboard() {
    navigator.clipboard.writeText(generatedCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-8 pb-24">
      
      <div>
        <h2 className="text-2xl font-semibold text-white mb-1">Social Hub</h2>
        <p className="text-sm text-[#F2EDE4]/40">Share articles and manage distribution</p>
      </div>

      {/* Article Input */}
      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-4">
        <h3 className="text-sm font-medium text-white flex items-center gap-2">
          <LinkIcon className="w-4 h-4 text-[#C9A96E]" /> Article to Share
        </h3>
        <input
          value={articleTitle}
          onChange={e => setArticleTitle(e.target.value)}
          placeholder="Article title..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F2EDE4] placeholder:text-[#F2EDE4]/20 focus:outline-none focus:border-[#C9A96E]/50"
        />
        <input
          value={articleUrl}
          onChange={e => setArticleUrl(e.target.value)}
          placeholder="https://your-site.com/article/slug"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F2EDE4] placeholder:text-[#F2EDE4]/20 focus:outline-none focus:border-[#C9A96E]/50"
        />
      </div>

      {/* Generated Copy */}
      {generatedCopy && (
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-white">Generated Copy</h3>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C9A96E]/10 border border-[#C9A96E]/20 text-[#C9A96E] text-[11px] font-medium hover:bg-[#C9A96E]/20 transition-colors"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="p-4 rounded-xl bg-black/20 text-sm text-[#F2EDE4]/70 leading-relaxed whitespace-pre-wrap">
            {generatedCopy}
          </div>
        </div>
      )}

      {/* Share Buttons */}
      <div className="grid gap-3">
        <h3 className="text-sm font-medium text-white mb-1 flex items-center gap-2">
          <Share2 className="w-4 h-4 text-[#C9A96E]" /> Quick Share
        </h3>
        {shareTemplates.map((template) => {
          const Icon = template.icon;
          const shareUrl = template.getUrl(articleUrl || baseUrl, articleTitle);
          
          return (
            <a
              key={template.platform}
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-4 p-4 rounded-2xl ${template.bg} border ${template.border} hover:opacity-80 transition-opacity`}
            >
              <Icon className={`w-5 h-5 ${template.color}`} />
              <div className="flex-1">
                <p className={`text-sm font-medium ${template.color}`}>{template.platform}</p>
                <p className="text-[11px] text-[#F2EDE4]/30">Open share dialog</p>
              </div>
              <Share2 className={`w-4 h-4 ${template.color} opacity-50`} />
            </a>
          );
        })}
      </div>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/?text=${encodeURIComponent(generatedCopy || 'Check out Voyager Magazine')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 hover:opacity-80 transition-opacity"
      >
        <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] text-white font-bold">W</div>
        <div className="flex-1">
          <p className="text-sm font-medium text-emerald-400">WhatsApp</p>
          <p className="text-[11px] text-[#F2EDE4]/30">Share to contacts</p>
        </div>
        <Share2 className="w-4 h-4 text-emerald-400 opacity-50" />
      </a>

      {/* Scheduled Posts Mock */}
      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
        <h3 className="text-sm font-medium text-white mb-4">Scheduled Posts</h3>
        <div className="space-y-3">
          {[
            { platform: 'Twitter', time: 'Today, 6:00 PM', status: 'scheduled', article: 'Obi Cubana: A Legacy of Influence' },
            { platform: 'LinkedIn', time: 'Tomorrow, 9:00 AM', status: 'scheduled', article: 'The Rise of Abuja Tech' },
          ].map((post, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className={`w-2 h-2 rounded-full ${post.status === 'scheduled' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">{post.article}</p>
                <p className="text-[11px] text-[#F2EDE4]/30">{post.platform} · {post.time}</p>
              </div>
              <span className="text-[10px] text-amber-400 uppercase tracking-wider">{post.status}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
              }
        
