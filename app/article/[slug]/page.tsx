import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Bookmark, Share2 } from 'lucide-react';

const articles: Record<string, any> = {
  'obi-cubana-legacy-of-influence': {
    title: 'Obi Cubana: A Legacy of Influence in Nigerian Business',
    category: 'Culture',
    author: 'Voyager Editorial',
    read_time: 10,
    issue: '01',
    video_url: 'https://www.youtube.com/embed/6p5XX-b3Ay4',
    images: [
      '/obi-cubana.jpg',
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop',
    ],
    content: [
      {
        type: 'text',
        text: 'In the bustling streets of Abuja and the vibrant markets of Lagos, the name Obi Cubana resonates with a particular frequency. It is not merely a name but a brand — a symbol of what happens when cultural authenticity meets entrepreneurial vision.'
      },
      {
        type: 'heading',
        text: 'The Rise of a Titan'
      },
      {
        type: 'text',
        text: 'From humble beginnings in Oba, Anambra State, to the pinnacle of Nigerian nightlife and hospitality, Obi Cubana\'s journey is a masterclass in cultural leverage. His business empire spans nightclubs, real estate, and entertainment.'
      },
      {
        type: 'quote',
        text: 'Every business I build is a love letter to the culture that raised me.',
        author: 'Obi Cubana'
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop',
        caption: 'Inside the Cubana Group headquarters in Abuja'
      },
      {
        type: 'heading',
        text: 'Philanthropy as Strategy'
      },
      {
        type: 'text',
        text: 'What sets Cubana apart is not just his business acumen but his deliberate weaving of philanthropy into his brand narrative. From youth empowerment programs to community development projects, his giving is calculated and deeply resonant.'
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800&auto=format&fit=crop',
        caption: 'The annual Cubana Youth Empowerment Summit'
      },
      {
        type: 'heading',
        text: 'The Abuja Connection'
      },
      {
        type: 'text',
        text: 'While Lagos claims the nightlife crown, Abuja has become Cubana\'s strategic stronghold. The city\'s government officials, diplomats, and expats provide a clientele that appreciates luxury with discretion.'
      }
    ]
  }
};

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles[params.slug];
  if (!article) notFound();

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
            <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-[#C9A96E]/50 transition-colors">
              <Share2 className="w-4 h-4 text-[#F2EDE4]" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative w-full aspect-[4/5] max-w-md mx-auto">
        <Image
          src={article.images[0]}
          alt={article.title}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
        
        {/* Image counter */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs text-white">
          1 / {article.images.length}
        </div>

        {/* Thumbnail strip */}
        <div className="absolute bottom-20 left-4 right-4 flex gap-2 overflow-x-auto scrollbar-hide">
          {article.images.map((img: string, i: number) => (
            <div key={i} className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 shrink-0 ${i === 0 ? 'border-[#C9A96E]' : 'border-white/20'}`}>
              <Image src={img} alt={`Image ${i + 1}`} fill className="object-cover" unoptimized />
            </div>
          ))}
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="inline-block px-3 py-1 rounded-full bg-[#C9A96E]/20 border border-[#C9A96E]/40 text-[#C9A96E] text-[10px] font-medium tracking-wider uppercase mb-3">
            {article.category}
          </span>
          <h1 className="text-2xl font-semibold leading-tight text-white mb-2">
            {article.title}
          </h1>
          <p className="text-xs text-[#F2EDE4]/60">
            {article.author} · {article.read_time} min · Issue {article.issue}
          </p>
        </div>
      </div>

      {/* Article Content */}
      <article className="px-5 py-6 max-w-md mx-auto space-y-6">
        
        {/* YOUTUBE EMBED */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black">
          <iframe
            src={article.video_url}
            title="Obi Cubana Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {article.content.map((block: any, i: number) => {
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
                  <Image src={block.src} alt={block.caption || ''} fill className="object-cover" unoptimized />
                </div>
                <figcaption className="text-[10px] text-[#F2EDE4]/40 mt-2 text-center">{block.caption}</figcaption>
              </figure>
            );
          }
          return null;
        })}
      </article>

      {/* Paywall */}
      <div className="px-5 max-w-md mx-auto mt-8 mb-8">
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
          <div className="w-12 h-0.5 bg-[#C9A96E]/30 mx-auto mb-4 rounded-full" />
          <h3 className="text-lg font-semibold text-white mb-1">Continue Reading</h3>
          <p className="text-xs text-[#F2EDE4]/50 mb-4">Subscribe to unlock the full story and our AI concierge.</p>
          <div className="space-y-2 mb-4">
            {[
              { name: 'Starter', desc: '3 articles/week', price: '$5/mo' },
              { name: 'Premium', desc: 'Unlimited + AI', price: '$12/mo' },
              { name: 'Founder', desc: 'All access + events', price: '$15/mo' },
            ].map((plan) => (
              <div key={plan.name} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-left">
                  <p className="text-sm font-medium text-white">{plan.name}</p>
                  <p className="text-[10px] text-[#F2EDE4]/40">{plan.desc}</p>
                </div>
                <span className="text-sm font-semibold text-[#C9A96E]">{plan.price}</span>
              </div>
            ))}
          </div>
          <button className="w-full py-3 rounded-xl bg-[#C9A96E] text-[#0A0A0A] text-sm font-medium mb-2">Subscribe Now</button>
          <button className="text-xs text-[#F2EDE4]/40">Maybe later</button>
        </div>
      </div>

    </div>
  );
        }
          
