import Link from 'next/link'
import Image from 'next/image'
import { createServerClient } from '@/lib/supabase'
import { Search, TrendingUp } from 'lucide-react'

const FB = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800'
const CAT_FB: Record<string, string> = {
  Architecture: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=400',
  Culture: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=400',
  Fashion: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=400',
  Food: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400',
  Travel: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=400',
  Art: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=400',
  Business: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=400',
  Wellness: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=400',
}

async function getData() {
  const sb = createServerClient()
  const { data: cats } = await sb.from('categories').select('*').order('name')
  const { data: trend } = await sb.from('articles').select('*, category:categories(*)').eq('is_trending', true).order('view_count', { ascending: false }).limit(6)
  return { cats: cats || [], trend: trend || [] }
}

const FB_TREND = [
  { id: '1', slug: 'lagos-lagoon-the-city-that-refuses-to-drown', title: 'Lagos Lagoon', cover_image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=400', category: { name: 'Travel' } },
  { id: '2', slug: 'zipp-republic-when-mr-p-turned-the-stage-into-a-runway', title: 'Zipp Republic', cover_image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=400', category: { name: 'Fashion' } },
  { id: '3', slug: 'lagos-fashion-week-the-new-order', title: 'Lagos Fashion Week', cover_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=400', category: { name: 'Fashion' } },
  { id: '4', slug: 'makoko-floating-school-the-architecture-of-necessity', title: 'Makoko Floating School', cover_image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=400', category: { name: 'Architecture' } },
  { id: '5', slug: 'dunes-at-dawn-a-saharan-awakening', title: 'Dunes at Dawn', cover_image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=400', category: { name: 'Travel' } },
  { id: '6', slug: 'forest-bathing-in-the-atewa-range', title: 'Forest Bathing', cover_image: 'https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?q=80&w=400', category: { name: 'Wellness' } },
]

export default async function ExplorePage() {
  const { cats, trend } = await getData()
  const display = trend.length ? trend : FB_TREND

  return (
    <main className='min-h-screen bg-[#0A0A0A] text-[#F2EDE4] pb-28'>
      <div className='p-4 pt-6'>
        <h1 className='font-serif text-2xl mb-4'>Explore</h1>
        <Link href='/search' className='flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-4 mb-6'>
          <Search className='w-5 h-5 text-[#F2EDE4]/40' />
          <span className='text-[#F2EDE4]/40 text-sm'>Search articles, topics, places...</span>
        </Link>
        <h2 className='font-medium text-sm mb-3'>Categories</h2>
        <div className='grid grid-cols-2 gap-3 mb-8'>
          {cats.map((cat: any) => (
            <Link key={cat.id} href={'/category/' + cat.slug} className='relative h-32 rounded-xl overflow-hidden group'>
              <Image src={cat.cover_image || CAT_FB[cat.name] || FB} alt={cat.name} fill className='object-cover group-hover:scale-105 transition-transform' unoptimized />
              <div className='absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 to-transparent' />
              <div className='absolute bottom-0 left-0 right-0 p-3'>
                <p className='font-medium text-sm'>{cat.name}</p>
                <p className='text-[#F2EDE4]/50 text-xs'>{cat.article_count || 0} articles</p>
              </div>
            </Link>
          ))}
        </div>
        <h2 className='flex items-center gap-2 font-medium text-sm mb-3'>
          <TrendingUp className='w-4 h-4 text-[#C9A96E]' />Trending
        </h2>
        <div className='space-y-4'>
          {display.map((a: any) => (
            <Link key={a.id} href={'/article/' + a.slug} className='flex gap-3 group'>
              <div className='relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0'>
                <Image src={a.cover_image || a.image_url || FB} alt={a.title} fill className='object-cover' unoptimized />
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-[10px] text-[#C9A96E] uppercase tracking-wider'>{a.category?.name || a.category || 'Voyager'}</p>
                <h4 className='text-sm leading-snug group-hover:text-[#C9A96E] transition-colors line-clamp-2'>{a.title}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
                }
              
