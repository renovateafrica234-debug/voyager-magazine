import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { 
  ArrowLeft, 
  Bookmark, 
  Share2,
  Play,
  ChevronRight
} from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Fallback image for broken loads
const FALLBACK_IMG = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop';

// Hardcoded fallback articles for demo slugs
const fallbackArticles: Record<string, any> = {
  'obi-cubana-legacy-of-influence': {
    title: 'Obi Cubana: A Legacy of Influence in Nigerian Business',
    category: 'Culture',
    author: 'Voyager Editorial',
    read_time: 10,
    issue: '01',
    video_url: 'https://www.youtube.com/embed/6p5XX-b3Ay4',
    images: [
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop',
    ],
    content: [
      { type: 'text', text: 'In the bustling streets of Abuja and the vibrant markets of Lagos, the name Obi Cubana resonates with a particular frequency. It is not merely a name but a brand — a symbol of what happens when cultural authenticity meets entrepreneurial vision.' },
      { type: 'heading', text: 'The Rise of a Titan' },
      { type: 'text', text: 'From humble beginnings in Oba, Anambra State, to the pinnacle of Nigerian nightlife and hospitality, Obi Cubana\'s journey is a masterclass in cultural leverage. His business empire spans nightclubs, real estate, and entertainment.' },
      { type: 'quote', text: 'Every business I build is a love letter to the culture that raised me.', author: 'Obi Cubana' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop', caption: 'Inside the Cubana Group headquarters in Abuja' },
      { type: 'heading', text: 'Philanthropy as Strategy' },
      { type: 'text', text: 'What sets Cubana apart is not just his business acumen but his deliberate weaving of philanthropy into his brand narrative. From youth empowerment programs to community development projects, his giving is calculated and deeply resonant.' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800&auto=format&fit=crop', caption: 'The annual Cubana Youth Empowerment Summit' },
      { type: 'heading', text: 'The Abuja Connection' },
      { type: 'text', text: 'While Lagos claims the nightlife crown, Abuja has become Cubana\'s strategic stronghold. The city\'s government officials, diplomats, and expats provide a clientele that appreciates luxury with discretion.' }
    ]
  },
  'weavers-of-kano': {
    title: 'The Weavers of Kano: A Century of Silk and Story',
    category: 'Culture',
    author: 'Ibrahim Suleiman',
    read_time: 12,
    issue: '02',
    images: ['https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=800&auto=format&fit=crop'],
    content: [
      { type: 'text', text: 'In the ancient city of Kano, the loom is not merely a tool — it is a time machine. Every thread carries the weight of centuries, every pattern a story passed from father to son.' },
      { type: 'heading', text: 'The Silk Road of West Africa' },
      { type: 'text', text: 'Long before European traders arrived, Kano was the terminus of trans-Saharan trade routes. Silk, gold, and ideas flowed through its gates, and the weavers were the keepers of its visual language.' },
    ]
  },
  'west-greenland': {
    title: 'Glimmers of Ice and Tomorrow in West Greenland',
    category: 'Travel',
    author: 'Amara Okafor',
    read_time: 8,
    issue: '03',
    images: ['https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop'],
    content: [
      { type: 'text', text: 'West Greenland is experiencing a renaissance of luxury eco-tourism. Private lodges, helicopter skiing, and Arctic cruises are drawing a new class of explorer.' },
      { type: 'heading', text: 'The Last Frontier' },
      { type: 'text', text: 'West Greenland is experiencing a renaissance of luxury eco-tourism. Private lodges, helicopter skiing, and Arctic cruises are drawing a new class of explorer.' },
    ]
  },
  'monaco': {
    title: 'Monaco: Where the Mediterranean Meets Majesty',
    category: 'Travel',
    author: 'Amara Okafor',
    read_time: 8,
    issue: '03',
    images: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop'],
    content: [
      { type: 'text', text: 'Monaco does not invite you. It observes you, decides if you belong, and only then reveals its secrets. This is a principality built on discretion, not display.' },
      { type: 'heading', text: 'The Monte Carlo Code' },
      { type: 'text', text: 'Beyond the casino and the Grand Prix, Monaco offers something rarer: absolute privacy for those who have outgrown the need to be seen.' },
    ]
  },
  'lagos-lagoon-the-city-that-refuses-to-drown': {
    title: 'Lagos Lagoon: The City That Refuses to Drown',
    category: 'Travel',
    author: 'Voyager Editorial',
    read_time: 7,
    images: ['https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop'],
    content: [
      { type: 'text', text: 'Lagos is a city of contradictions. It floods every rainy season, yet builds higher. It suffocates in traffic, yet moves faster than any other African metropolis.' },
      { type: 'heading', text: 'Waterfront Renaissance' },
      { type: 'text', text: 'The Eko Atlantic project and the revitalization of the Lagos Lagoon waterfront represent the most ambitious urban development in West Africa.' },
    ]
  },
  'zipp-republic-when-mr-p-turned-the-stage-into-a-runway': {
    title: 'Zipp Republic: When Mr. P Turned the Stage into a Runway',
    category: 'Fashion',
    author: 'Voyager Editorial',
    read_time: 6,
    images: ['https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop'],
    content: [
      { type: 'text', text: 'Peter Okoye has always understood that performance is fashion and fashion is performance. At Zipp Republic, he proved it.' },
      { type: 'heading', text: 'The Afrobeat Aesthetic' },
      { type: 'text', text: 'From custom Balmain to emerging Nigerian labels, Mr. P\'s stage wardrobe has become a cultural archive of African luxury fashion.' },
    ]
  },
  'lagos-fashion-week-the-new-order': {
    title: 'Lagos Fashion Week: The New Order',
    category: 'Fashion',
    author: 'Voyager Editorial',
    read_time: 9,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=800&auto=format&fit=crop'],
    content: [
      { type: 'text', text: 'Lagos Fashion Week is no longer a regional event. It is the definitive platform for African designers to speak to the world.' },
      { type: 'heading', text: 'Runway to Retail' },
      { type: 'text', text: 'The 2025 season saw record-breaking direct-to-consumer sales, with collections selling out within hours of the final walk.' },
    ]
  },
  'makoko-floating-school-the-architecture-of-necessity': {
    title: 'Makoko Floating School: The Architecture of Necessity',
    category: 'Architecture',
    author: 'Voyager Editorial',
    read_time: 11,
    images: ['https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=800&auto=format&fit=crop'],
    content: [
      { type: 'text', text: 'Before it collapsed, the Makoko Floating School was a symbol of what African architecture could be when it listens to its environment rather than imposing on it.' },
      { type: 'heading', text: 'Adaptive Design' },
      { type: 'text', text: 'Architect Kunlé Adeyemi\'s vision for floating structures has inspired a new generation of climate-resilient building across the Niger Delta.' },
    ]
  },
  'dunes-at-dawn-a-saharan-awakening': {
    title: 'Dunes at Dawn: A Saharan Awakening',
    category: 'Travel',
    author: 'Voyager Editorial',
    read_time: 7,
    images: ['https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=800&auto=format&fit=crop'],
    content: [
      { type: 'text', text: 'The Sahara is not empty. It is full of stories written in sand, waiting for the right light to reveal them.' },
      { type: 'heading', text: 'Desert Luxury' },
      { type: 'text', text: 'From Morocco\'s Erg Chebbi to Niger\'s Ténéré, luxury camps now offer experiences that rival the finest safari lodges.' },
    ]
  },
  'the-rise-of-abuja-tech': {
    title: 'The Rise of Abuja Tech',
    category: 'Business',
    author: 'Voyager Editorial',
    read_time: 8,
    images: ['https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop'],
    content: [
      { type: 'text', text: 'Abuja is quietly becoming Nigeria\'s most sophisticated tech hub. While Lagos grabs headlines, the capital builds infrastructure.' },
      { type: 'heading', text: 'The Policy Advantage' },
      { type: 'text', text: 'Proximity to regulators and government contracts has created a unique ecosystem of enterprise SaaS, fintech, and govtech startups.' },
    ]
  },
  'african-art-renaissance': {
    title: 'African Art Renaissance: The New Collectors',
    category: 'Art',
    author: 'Voyager Editorial',
    read_time: 10,
    images: ['https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=800&auto=format&fit=crop'],
    content: [
      { type: 'text', text: 'A new generation of African collectors is reshaping the global art market. They are not buying for status — they are buying for legacy.' },
      { type: 'heading', text: 'The Lagos-Abuja Axis' },
      { type: 'text', text: 'Between Lagos\'s commercial galleries and Abuja\'s diplomatic collectors, a vibrant market for contemporary African art is emerging.' },
    ]
  }
};

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  // 1. Try Supabase first
  const { data: dbArticle } = await supabase
    .from('articles')
    .select('*, categories(name)')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .maybeSingle();

  // 2. Fallback to hardcoded
  const article = dbArticle || fallbackArticles[params.slug];

  if (!article) {
    notFound();
  }

  const images = article.images || [article.image_url || article.cover_image || FALLBACK_IMG];
  const content = article.content || [
    { type: 'text', text: article.excerpt || article.content || 'Full article content coming soon.' }
  ];

  // Fetch related articles
  const { data: related } = await supabase
    .from('articles')
    .select('slug, title, cover_image, category:categories(name)')
    .eq('status', 'published')
    .neq('slug', params.slug)
    .limit(3);

  const relatedArticles = related?.length ? related : [
    { slug: 'west-greenland', title: 'Glimmers of Ice and Tomorrow in West Greenland', cover_image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=400', category: { name: 'Travel' } },
    { slug: 'african-art-renaissance', title: 'African Art Renaissance: The New Collectors', cover_image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=400', category: { name: 'Art' } },
    { slug: 'the-rise-of-abuja-tech', title: 'The Rise of Abuja Tech', cover_image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=400', category: { name: 'Business' } },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F2EDE4] pb-24">

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-[#C9A96E]/50 transition-colors">
            <ArrowLeft className="w-4 h-4 text-[#F2EDE4]" />
          </Link>
          <div className="flex gap-3">
            <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-[#C9A96E]/50 transition-colors">
              <Bookmark className="w-4 h-4 text-[#F2EDE4]" />
            </button>
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: article.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-[#C9A96E]/50 transition-colors"
            >
              <Share2 className="w-4 h-4 text-[#F2EDE4]" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Image — NO THUMBNAIL STRIP */}
      <div className="relative w-full aspect-[4/5] max-w-md mx-auto">
        <Image
          src={images[0]}
          alt={article.title}
          fill
          className="object-cover"
          priority
          unoptimized
          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />

        {/* Image counter only */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs text-white">
          1 / {images.length}
        </div>

        {/* Play button — scrolls to video */}
        {article.video_url && (
          <a 
            href="#video-embed" 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#C9A96E]/90 flex items-center justify-center backdrop-blur-sm hover:scale-110 transition-transform"
          >
            <Play className="w-6 h-6 text-[#0A0A0A] fill-[#0A0A0A] ml-1" />
          </a>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="inline-block px-3 py-1 rounded-full bg-[#C9A96E]/20 border border-[#C9A96E]/40 text-[#C9A96E] text-[10px] font-medium tracking-wider uppercase mb-3">
            {article.category || article.categories?.name || 'Voyager'}
          </span>
          <h1 className="text-2xl font-semibold leading-tight text-white mb-2">
            {article.title}
          </h1>
          <p className="text-xs text-[#F2EDE4]/60">
            {article.author} · {article.read_time} min {article.issue ? `· Issue ${article.issue}` : ''}
          </p>
        </div>
      </div>

      {/* Article Content */}
      <article className="px-5 py-6 max-w-md mx-auto space-y-6">

        {/* YOUTUBE EMBED */}
        {article.video_url && (
          <div id="video-embed" className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black">
            <iframe
              src={article.video_url}
              title="Article Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        )}

        {content.map((block: any, i: number) => {
          if (block.type === 'text') {
            return <p key={i} className="text-[15px] leading-relaxed text-[#F2EDE4]/90">{block.text}</p>;
          }
          if (block.type === 'heading') {
            return <h2 key={i} className="text-lg font-semibold text-[#C9A96E] mt-8">{block.text}</h2>;
          }
          if (block.type === 'quote') {
            return (
              <blockquote key={i} className="border-l-2 border-[#C9A96E] pl-4 py-2 my-6">
                <p className="text-[15px] italic text-[#F2EDE4]/80">"{block.text}"</p>
                <cite className="text-xs text-[#C9A96E] not-italic mt-2 block">— {block.author}</cite>
              </blockquote>
            );
          }
          if (block.type === 'image') {
            return (
              <figure key={i} className="my-6">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
                  <Image 
                    src={block.src} 
                    alt={block.caption || ''} 
                    fill 
                    className="object-cover" 
                    unoptimized 
                    onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
                  />
                </div>
                <figcaption className="text-[10px] text-[#F2EDE4]/40 mt-2 text-center">{block.caption}</figcaption>
              </figure>
            );
          }
          return null;
        })}
      </article>

      {/* Sponsored Ad */}
      <div className="px-5 max-w-md mx-auto mb-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#C9A96E]/10 to-transparent border border-[#C9A96E]/20 p-5">
          <p className="text-[10px] text-[#C9A96E] uppercase tracking-wider mb-2">Sponsored</p>
          <h3 className="text-sm font-medium text-[#F2EDE4] mb-1">Experience Abuja Like Never Before</h3>
          <p className="text-xs text-[#F2EDE4]/50 mb-3">Exclusive luxury stays and private tours curated by Voyager.</p>
          <button className="px-4 py-2 rounded-full bg-[#C9A96E] text-[#0A0A0A] text-xs font-medium">Learn More</button>
        </div>
      </div>

      {/* Related Articles */}
      <section className="px-5 max-w-md mx-auto pb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-[#F2EDE4]">Read Next</h3>
          <Link href="/explore" className="text-xs text-[#C9A96E] flex items-center gap-1">
            Explore <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="space-y-4">
          {relatedArticles.map((rel: any, i: number) => (
            <Link key={i} href={`/article/${rel.slug}`} className="flex gap-3 group">
              <div className="relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0">
                <Image 
                  src={rel.cover_image || FALLBACK_IMG} 
                  alt={rel.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform" 
                  unoptimized
                  onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-[#C9A96E] uppercase tracking-wider">{rel.category?.name || 'Voyager'}</p>
                <h4 className="text-sm text-[#F2EDE4] leading-snug group-hover:text-[#C9A96E] transition-colors line-clamp-2">{rel.title}</h4>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
    }
       
