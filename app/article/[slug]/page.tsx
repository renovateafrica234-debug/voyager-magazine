import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Bookmark, Share2, Play } from 'lucide-react'

const FB = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800'

const ARTICLES: Record<string, any> = {
  'obi-cubana-legacy-of-influence': {
    title: 'Obi Cubana: A Legacy of Influence in Nigerian Business',
    cat: 'Culture', author: 'Voyager Editorial', time: 10, issue: '01',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800',
    video: 'https://www.youtube.com/embed/6p5XX-b3Ay4',
    body: [
      {t:'text', txt:'In the bustling streets of Abuja and Lagos, the name Obi Cubana resonates with a particular frequency. It is not merely a name but a brand.'},
      {t:'heading', txt:'The Rise of a Titan'},
      {t:'text', txt:'From humble beginnings in Oba, Anambra State, to the pinnacle of Nigerian nightlife and hospitality, his journey is a masterclass in cultural leverage.'},
      {t:'quote', txt:'Every business I build is a love letter to the culture that raised me.', auth:'Obi Cubana'},
      {t:'image', src:'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800', cap:'Inside the Cubana Group headquarters'},
      {t:'heading', txt:'Philanthropy as Strategy'},
      {t:'text', txt:'What sets Cubana apart is not just his business acumen but his deliberate weaving of philanthropy into his brand narrative.'},
    ]
  },
  'west-greenland': { title: 'Glimmers of Ice in West Greenland', cat: 'Travel', author: 'Amara Okafor', time: 8, img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800', body: [{t:'text', txt:'West Greenland is experiencing a renaissance of luxury eco-tourism.'}] },
  'monaco': { title: 'Monaco: Mediterranean Majesty', cat: 'Travel', author: 'Amara Okafor', time: 8, img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800', body: [{t:'text', txt:'Monaco does not invite you. It observes you, decides if you belong.'}] },
  'zipp-republic-when-mr-p-turned-the-stage-into-a-runway': { title: 'Zipp Republic: When Mr. P Turned the Stage into a Runway', cat: 'Fashion', author: 'Voyager Editorial', time: 6, img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800', body: [{t:'text', txt:'Peter Okoye has always understood that performance is fashion.'}] },
  'lagos-fashion-week-the-new-order': { title: 'Lagos Fashion Week: The New Order', cat: 'Fashion', author: 'Voyager Editorial', time: 9, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=800', body: [{t:'text', txt:'Lagos Fashion Week is no longer a regional event.'}] },
  'makoko-floating-school-the-architecture-of-necessity': { title: 'Makoko Floating School', cat: 'Architecture', author: 'Voyager Editorial', time: 11, img: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=800', body: [{t:'text', txt:'Before it collapsed, the Makoko Floating School was a symbol of adaptive African architecture.'}] },
  'lagos-lagoon-the-city-that-refuses-to-drown': { title: 'Lagos Lagoon: The City That Refuses to Drown', cat: 'Travel', author: 'Voyager Editorial', time: 7, img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800', body: [{t:'text', txt:'Lagos is a city of contradictions. It floods every rainy season, yet builds higher.'}] },
  'dunes-at-dawn-a-saharan-awakening': { title: 'Dunes at Dawn: A Saharan Awakening', cat: 'Travel', author: 'Voyager Editorial', time: 7, img: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=800', body: [{t:'text', txt:'The Sahara is not empty. It is full of stories written in sand.'}] },
  'the-rise-of-abuja-tech': { title: 'The Rise of Abuja Tech', cat: 'Business', author: 'Voyager Editorial', time: 8, img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800', body: [{t:'text', txt:'Abuja is quietly becoming Nigerias most sophisticated tech hub.'}] },
  'african-art-renaissance': { title: 'African Art Renaissance', cat: 'Art', author: 'Voyager Editorial', time: 10, img: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=800', body: [{t:'text', txt:'A new generation of African collectors is reshaping the global art market.'}] },
  'weavers-of-kano': { title: 'The Weavers of Kano', cat: 'Culture', author: 'Ibrahim Suleiman', time: 12, img: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=800', body: [{t:'text', txt:'In the ancient city of Kano, the loom is not merely a tool.'}] },
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const a = ARTICLES[params.slug]
  if (!a) return <div className='min-h-screen bg-[#0A0A0A] text-[#F2EDE4] flex items-center justify-center'><p>Article not found</p></div>
  const imgs = a.images || [a.img || FB]
  const body = a.body || a.content || [{t:'text', txt:'Content coming soon.'}]

  return (
    <div className='min-h-screen bg-[#0A0A0A] text-[#F2EDE4] pb-24'>
      <header className='sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur border-b border-white/5'>
        <div className='max-w-md mx-auto px-4 py-3 flex justify-between'>
          <Link href='/' className='w-8 h-8 rounded-full border border-white/10 flex items-center justify-center'><ArrowLeft className='w-4 h-4' /></Link>
          <div className='flex gap-3'>
            <button className='w-8 h-8 rounded-full border border-white/10 flex items-center justify-center'><Bookmark className='w-4 h-4' /></button>
            <button className='w-8 h-8 rounded-full border border-white/10 flex items-center justify-center'><Share2 className='w-4 h-4' /></button>
          </div>
        </div>
      </header>
      <div className='relative w-full aspect-[4/5] max-w-md mx-auto'>
        <Image src={imgs[0]} alt={a.title} fill className='object-cover' priority unoptimized />
        <div className='absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent' />
        <div className='absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 text-xs text-white'>1 / {imgs.length}</div>
        {a.video && (
          <a href='#video' className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#C9A96E]/90 flex items-center justify-center'>
            <Play className='w-6 h-6 text-[#0A0A0A] fill-[#0A0A0A] ml-1' />
          </a>
        )}
        <div className='absolute bottom-0 left-0 right-0 p-5'>
          <span className='inline-block px-3 py-1 rounded-full bg-[#C9A96E]/20 border border-[#C9A96E]/40 text-[#C9A96E] text-[10px] uppercase tracking-wider mb-3'>{a.cat}</span>
          <h1 className='text-2xl font-semibold text-white mb-2'>{a.title}</h1>
          <p className='text-xs text-[#F2EDE4]/60'>{a.author} &middot; {a.time} min{a.issue ? ` &middot; Issue ${a.issue}` : ''}</p>
        </div>
      </div>
      <article className='px-5 py-6 max-w-md mx-auto space-y-6'>
        {a.video && (
          <div id='video' className='relative w-full aspect-video rounded-2xl overflow-hidden bg-black'>
            <iframe src={a.video} title='Video' allowFullScreen className='absolute inset-0 w-full h-full' />
          </div>
        )}
        {body.map((b: any, i: number) => {
          if (b.t === 'text' || b.type === 'text') return <p key={i} className='text-[15px] leading-relaxed text-[#F2EDE4]/90'>{b.txt || b.text}</p>
          if (b.t === 'heading' || b.type === 'heading') return <h2 key={i} className='text-lg font-semibold text-[#C9A96E] mt-8'>{b.txt || b.text}</h2>
          if (b.t === 'quote' || b.type === 'quote') return <blockquote key={i} className='border-l-2 border-[#C9A96E] pl-4 py-2 my-6'><p className='text-[15px] italic text-[#F2EDE4]/80'>"{b.txt || b.text}"</p><cite className='text-xs text-[#C9A96E] not-italic mt-2 block'>&mdash; {b.auth || b.author}</cite></blockquote>
          if (b.t === 'image' || b.type === 'image') return <figure key={i} className='my-6'><div className='relative w-full aspect-video rounded-2xl overflow-hidden'><Image src={b.src || b.src} alt='' fill className='object-cover' unoptimized /></div><figcaption className='text-[10px] text-[#F2EDE4]/40 mt-2 text-center'>{b.cap || b.caption}</figcaption></figure>
          return null
        })}
      </article>
      <div className='px-5 max-w-md mx-auto mb-8'>
        <div className='rounded-2xl bg-gradient-to-r from-[#C9A96E]/10 to-transparent border border-[#C9A96E]/20 p-5'>
          <p className='text-[10px] text-[#C9A96E] uppercase tracking-wider mb-2'>Sponsored</p>
          <h3 className='text-sm font-medium mb-1'>Experience Abuja Like Never Before</h3>
          <p className='text-xs text-[#F2EDE4]/50 mb-3'>Exclusive luxury stays and private tours curated by Voyager.</p>
          <button className='px-4 py-2 rounded-full bg-[#C9A96E] text-[#0A0A0A] text-xs font-medium'>Learn More</button>
        </div>
      </div>
    </div>
  )
    }
            
