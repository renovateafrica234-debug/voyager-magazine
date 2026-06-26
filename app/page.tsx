import Link from 'next/link'
import Image from 'next/image'
import { Home, Compass, Bookmark, User, MessageCircle, Play } from 'lucide-react'

export default function HomePage() {
  const hero = {
    title: 'Obi Cubana: A Legacy of Influence in Nigerian Business',
    slug: 'obi-cubana-legacy-of-influence',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800',
    cat: 'Culture', author: 'Voyager Editorial', time: 10, issue: '01'
  }

  const trending = [
    { title: 'Glimmers of Ice in West Greenland', slug: 'west-greenland', cat: 'Travel', time: 8, img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=400' },
    { title: 'Monaco: Mediterranean Majesty', slug: 'monaco', cat: 'Travel', time: 8, img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=400' },
    { title: 'African Art Renaissance', slug: 'african-art-renaissance', cat: 'Art', time: 10, img: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=400' },
    { title: 'The Rise of Abuja Tech', slug: 'the-rise-of-abuja-tech', cat: 'Business', time: 8, img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=400' },
    { title: 'Zipp Republic: Mr. P on Stage', slug: 'zipp-republic-when-mr-p-turned-the-stage-into-a-runway', cat: 'Fashion', time: 6, img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=400' },
    { title: 'Makoko Floating School', slug: 'makoko-floating-school-the-architecture-of-necessity', cat: 'Architecture', time: 11, img: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=400' },
  ]

  const latest = [
    { title: 'The Weavers of Kano', slug: 'weavers-of-kano', cat: 'Culture', img: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=400' },
    { title: 'Lagos Lagoon: City That Refuses to Drown', slug: 'lagos-lagoon-the-city-that-refuses-to-drown', cat: 'Travel', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=400' },
    { title: 'Dunes at Dawn: Saharan Awakening', slug: 'dunes-at-dawn-a-saharan-awakening', cat: 'Travel', img: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=400' },
    { title: 'Lagos Fashion Week: The New Order', slug: 'lagos-fashion-week-the-new-order', cat: 'Fashion', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=400' },
  ]

  return (
    <div className='min-h-screen bg-[#0A0A0A] text-[#F2EDE4] pb-24'>

      <header className='sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur border-b border-white/5'>
        <div className='max-w-md mx-auto px-4 py-4 text-center'>
          <h1 className='text-xl font-light tracking-[0.3em] text-[#C9A96E] uppercase'>Voyager</h1>
        </div>
      </header>

      <section className='px-4 pt-4 max-w-md mx-auto'>
        <Link href={'/article/' + hero.slug}>
          <div className='relative w-full aspect-[4/5] rounded-3xl overflow-hidden'>
            <Image src={hero.img} alt={hero.title} fill className='object-cover' priority unoptimized />
            <div className='absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent' />
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#C9A96E]/90 flex items-center justify-center'>
              <Play className='w-6 h-6 text-[#0A0A0A] fill-[#0A0A0A] ml-1' />
            </div>
            <div className='absolute top-4 left-4 px-3 py-1 rounded-full bg-[#C9A96E]/20 border border-[#C9A96E]/40 text-[#C9A96E] text-[10px] uppercase tracking-wider'>
              {hero.cat}
            </div>
            <div className='absolute bottom-0 left-0 right-0 p-5'>
              <h2 className='text-xl font-semibold text-white mb-2'>{hero.title}</h2>
              <p className='text-xs text-[#F2EDE4]/60'>{hero.author} &middot; {hero.time} min &middot; Issue {hero.issue}</p>
            </div>
          </div>
        </Link>
      </section>

      <section className='mt-8 max-w-md mx-auto'>
        <div className='px-4 flex justify-between mb-4'>
          <h3 className='text-sm font-medium'>Trending Now</h3>
          <Link href='/explore' className='text-xs text-[#C9A96E]'>View all &rarr;</Link>
        </div>
        <div className='flex gap-4 overflow-x-auto px-4 pb-4 snap-x'>
          {trending.map((a, i) => (
            <Link key={i} href={'/article/' + a.slug} className='flex-shrink-0 w-40 snap-start'>
              <div className='relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-2'>
                <Image src={a.img} alt={a.title} fill className='object-cover' unoptimized />
                <div className='absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 to-transparent' />
                <span className='absolute bottom-2 left-2 text-[9px] text-[#C9A96E] uppercase'>{a.cat}</span>
              </div>
              <h4 className='text-xs text-[#F2EDE4] leading-snug line-clamp-2 font-medium'>{a.title}</h4>
              <p className='text-[10px] text-[#F2EDE4]/40 mt-1'>{a.time} min read</p>
            </Link>
          ))}
        </div>
      </section>

      <section className='mt-8 px-4 max-w-md mx-auto'>
        <div className='flex justify-between mb-4'>
          <h3 className='text-sm font-medium'>Latest Stories</h3>
          <Link href='/explore' className='text-xs text-[#C9A96E]'>View all &rarr;</Link>
        </div>
        <div className='space-y-4'>
          {latest.map((a, i) => (
            <Link key={i} href={'/article/' + a.slug} className='flex gap-3 group'>
              <div className='relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0'>
                <Image src={a.img} alt={a.title} fill className='object-cover' unoptimized />
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-[10px] text-[#C9A96E] uppercase'>{a.cat}</p>
                <h4 className='text-sm text-[#F2EDE4] leading-snug line-clamp-2 group-hover:text-[#C9A96E]'>{a.title}</h4>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <nav className='fixed bottom-0 left-0 right-0 bg-[#0A0A0A]/95 backdrop-blur border-t border-white/5 z-50'>
        <div className='max-w-md mx-auto px-6 py-3 flex justify-between'>
          <Link href='/' className='flex flex-col items-center gap-1 text-[#C9A96E]'>
            <Home className='w-5 h-5' /><span className='text-[10px]'>Home</span>
          </Link>
          <Link href='/explore' className='flex flex-col items-center gap-1 text-[#F2EDE4]/40'>
            <Compass className='w-5 h-5' /><span className='text-[10px]'>Explore</span>
          </Link>
          <Link href='/chat' className='flex flex-col items-center gap-1 text-[#F2EDE4]/40'>
            <div className='w-10 h-10 rounded-full bg-[#C9A96E] flex items-center justify-center -mt-2'>
              <MessageCircle className='w-5 h-5 text-[#0A0A0A]' />
            </div>
          </Link>
          <Link href='/saved' className='flex flex-col items-center gap-1 text-[#F2EDE4]/40'>
            <Bookmark className='w-5 h-5' /><span className='text-[10px]'>Saved</span>
          </Link>
          <Link href='/profile' className='flex flex-col items-center gap-1 text-[#F2EDE4]/40'>
            <User className='w-5 h-5' /><span className='text-[10px]'>Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  )
          }
      
