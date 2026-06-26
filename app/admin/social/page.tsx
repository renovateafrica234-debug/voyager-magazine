'use client'

import { useState } from 'react'
import { Twitter, Facebook, Linkedin, MessageCircle, Share2 } from 'lucide-react'

export default function SocialPage() {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const share = (platform: string) => {
    const u = url || 'https://voyager-magazine.vercel.app'
    const t = title || 'Voyager Magazine'
    const links: Record<string, string> = {
      twitter: 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(t) + '&url=' + encodeURIComponent(u),
      facebook: 'https://facebook.com/sharer/sharer.php?u=' + encodeURIComponent(u),
      linkedin: 'https://linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(u),
      whatsapp: 'https://wa.me/?text=' + encodeURIComponent(t + ' - ' + u),
    }
    window.open(links[platform], '_blank', 'width=600,height=400')
  }

  return (
    <div className='min-h-screen bg-[#0A0A0A] text-[#F2EDE4] p-6'>
      <h1 className='text-2xl font-medium mb-2'>Social Hub</h1>
      <p className='text-sm text-[#F2EDE4]/40 mb-6'>Share articles and manage distribution</p>
      <div className='rounded-2xl bg-white/5 border border-white/10 p-5 mb-6'>
        <p className='text-sm font-medium mb-3'>Article to Share</p>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Article title...' className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm mb-3 text-[#F2EDE4] placeholder:text-[#F2EDE4]/20' />
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder='https://your-site.com/article/slug' className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F2EDE4] placeholder:text-[#F2EDE4]/20' />
      </div>
      <p className='text-sm font-medium mb-3'>Quick Share</p>
      <div className='space-y-3'>
        <button onClick={() => share('twitter')} className='w-full flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#1DA1F2]/30 transition-colors'>
          <Twitter className='w-5 h-5 text-[#1DA1F2]' />
          <div className='text-left'><p className='text-sm'>Twitter / X</p><p className='text-xs text-[#F2EDE4]/40'>Open share dialog</p></div>
          <Share2 className='w-4 h-4 ml-auto text-[#F2EDE4]/20' />
        </button>
        <button onClick={() => share('facebook')} className='w-full flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#1877F2]/30 transition-colors'>
          <Facebook className='w-5 h-5 text-[#1877F2]' />
          <div className='text-left'><p className='text-sm'>Facebook</p><p className='text-xs text-[#F2EDE4]/40'>Open share dialog</p></div>
          <Share2 className='w-4 h-4 ml-auto text-[#F2EDE4]/20' />
        </button>
        <button onClick={() => share('linkedin')} className='w-full flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#0A66C2]/30 transition-colors'>
          <Linkedin className='w-5 h-5 text-[#0A66C2]' />
          <div className='text-left'><p className='text-sm'>LinkedIn</p><p className='text-xs text-[#F2EDE4]/40'>Open share dialog</p></div>
          <Share2 className='w-4 h-4 ml-auto text-[#F2EDE4]/20' />
        </button>
        <button onClick={() => share('whatsapp')} className='w-full flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#25D366]/30 transition-colors'>
          <MessageCircle className='w-5 h-5 text-[#25D366]' />
          <div className='text-left'><p className='text-sm'>WhatsApp</p><p className='text-xs text-[#F2EDE4]/40'>Share to contacts</p></div>
          <Share2 className='w-4 h-4 ml-auto text-[#F2EDE4]/20' />
        </button>
      </div>
    </div>
  )
}
