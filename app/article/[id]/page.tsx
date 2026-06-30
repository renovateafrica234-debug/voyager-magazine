'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Bookmark, Share2, Lock, Crown } from 'lucide-react';

const ARTICLES: Record<string, {
  id: string; slug: string; title: string; category: string; author: string;
  authorAvatar: string; date: string; readTime: string; image: string;
  paywall_tier: 'free' | 'premium'; excerpt: string; content: string;
}> = {
  'obi-cubana': {
    id: 'obi-cubana', slug: 'obi-cubana',
    title: 'Obi Cubana: A Legacy of Influence in Nigerian Business',
    category: 'Culture', author: 'Voyager Editorial',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
    date: 'June 26, 2026', readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=1200',
    paywall_tier: 'premium',
    excerpt: "From Oba town in Anambra to the gleaming halls of Abuja's elite, Obi Cubana's story is one of calculated audacity and unbreakable cultural pride.",
    content: `From a modest upbringing in Oba, Anambra State, Obi Iyiegbu — known across Nigeria as Obi Cubana — has built one of the most recognisable personal brands on the continent. His journey from student entrepreneur to hospitality mogul is not simply a rags-to-riches tale. It is a masterclass in understanding that in Nigeria, *visibility is currency*.

## The Abuja Blueprint

Obi Cubana's Cubana Group operates across fourteen states in Nigeria, anchored by a collection of clubs, hotels, and hospitality venues that have become synonymous with high-life culture. The flagship, Club Cubana, redefined what a nightlife venue could mean in post-recession Nigeria — not merely a place to drink, but a stage for cultural performance.

> "I never built a club. I built a throne room. Every person who walks in must feel like royalty." — Obi Cubana, 2022

The Abuja properties, in particular, reflect a design philosophy that blends Pan-African luxury with the unapologetic confidence of the new Nigerian elite. Marble counters sit alongside handwoven Yoruba textiles. Playlists move seamlessly from Afrobeats to R&B. The result is an atmosphere that feels both global and irreducibly Nigerian.

## The Oba Burial That Shook Nigeria

In July 2021, the burial ceremony for Obi Cubana's mother became a cultural watershed moment. Over three billion naira in cash sprays, private jets circling Oba airport, and a procession of Nigeria's business and entertainment elite transformed a private grief into a public spectacle of generosity.

The moment divided commentators — some decrying the excess, others seeing in it a pure expression of Igbo burial tradition scaled to modern wealth. What was undeniable was the signal it sent: a new class of self-made Nigerian entrepreneurs had arrived, and they intended to be seen.

## What the Legacy Actually Teaches

Behind the theatrics is a business mind that understands leverage. Obi Cubana does not simply own venues — he cultivates ecosystems. His Ambassador programme turns loyal patrons into brand advocates. His social media presence converts personal milestones into marketing moments. His philanthropy, from scholarships in Anambra to public infrastructure donations, builds goodwill that no advertising budget could buy.

For the next generation of Nigerian entrepreneurs, the Cubana model offers a lesson that business schools rarely teach: *in markets where trust is scarce, cultural authority is the strongest moat*.

---

The Voyager editorial team visited three Cubana Group properties across Abuja and Lagos for this piece. All opinions are those of the editorial team.`
  },
  'abuja-luxury': {
    id: 'abuja-luxury', slug: 'abuja-luxury',
    title: "Abuja's Hidden Luxury: The New Gold Standard",
    category: 'Travel', author: 'Amina Bello',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
    date: 'June 24, 2026', readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200',
    paywall_tier: 'free',
    excerpt: "Beyond the diplomatic corridors and gated estates, a new class of discreet luxury is taking root in Nigeria's capital city.",
    content: `Abuja was designed as a city of order — clean grids, deliberate green zones, and government ministries set back from wide boulevards. For much of its existence, it was a city of function rather than feeling. That is changing.

## Maitama After Dark

The neighbourhood of Maitama has always housed ambassadors, ministers, and the quietly wealthy. But in the past three years, a different kind of establishment has taken root: intimate restaurants with no signage, speakeasy-style bars accessed through unmarked doors, and boutique guesthouses with fewer than twelve rooms and waiting lists measured in weeks.

Chef Tunde Wey's influence, even in absentia, looms large over this transformation. A generation of Abuja chefs trained in Lagos, London, and New York have returned to the capital with a clear mandate: cook Nigerian, think global, charge accordingly.

## The Spa Emergence

Abuja's wellness economy has quietly exploded. Centres like Sereniti on Gana Street and The House of Tranquility near Wuse 2 offer experiences that rival those found in Nairobi and Cape Town — full-body treatments using shea butter from Sokoto, volcanic stone sourced from Jos, and botanical oils pressed from Igbo forest herbs.

> "Our clients aren't looking for a Swedish massage. They want something that feels like it came from here — but executed with world-class precision." — Lead therapist, Sereniti Wellness

## Where to Stay

Three properties have emerged as the discreet choice for high-net-worth visitors who want to avoid the impersonal scale of the conventional five-star hotels.

**Nicon Luxury Hotel** remains the classic anchoring choice, its lakeside position and renovated rooms offering genuine calm in a city that hums constantly. For something more intimate, **The Envoy Residences** near Maitama offer serviced apartments with the privacy of a private home. And for the architecturally curious, a new unnamed guesthouse in Asokoro — identifiable only by a copper lantern above its gate — has become the whispered recommendation of Abuja insiders.

Abuja's luxury is not announcing itself. It is, for now, earned through knowing where to look.`
  },'monaco': {
    id: 'monaco', slug: 'monaco',
    title: 'Monaco: Where the Mediterranean Meets Majesty',
    category: 'Travel', author: 'Tara Obi',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop',
    date: 'June 22, 2026', readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1200',
    paywall_tier: 'premium',
    excerpt: 'Two square kilometres. Forty thousand residents. The highest concentration of wealth per capita on Earth. Monaco is not a country — it is a performance.',
    content: `The train from Nice takes twenty-two minutes. You step onto the platform and the air is different immediately — salt and money, the specific combination that Monaco has refined over two centuries into something approaching perfection.

## The Architecture of Excess

Monaco's built environment is a study in what happens when land is so scarce that wealth has nowhere to go but upward. The principality's skyline has become its most contested terrain: each new tower approved by the palace triggers debates about the soul of a place that has, arguably, already sold it.

And yet Monaco works. Its streets are immaculate. Its service culture is almost Swiss in its precision. The police outnumber the residents in a ratio that would be alarming anywhere else but here feels oddly reassuring.

## Casino Square at Dawn

The serious Monaco — the one that exists before the tourist coaches arrive — is worth setting an alarm for. Casino Square at 6am holds a different quality of silence. The ornate Beaux-Arts facade of the Grand Casino reflects in the puddles left by overnight cleaning crews. A lone jogger in compression gear navigates the roundabout. A white Ferrari sits in the drop-off bay, engine off, as if it simply materialised there.

> This is the Monaco that residents actually inhabit — not a spectacle, but a village that happens to be extraordinarily rich.

## Where Voyager Recommends

Skip the Hôtel de Paris's main dining room (tourist theatre) and secure a table at Elsa at the Monte-Carlo Beach Hotel instead — an organic Mediterranean menu with the kind of view that makes conversation feel unnecessary. For aperitivo, the terrace bar at the Hermitage Hotel offers the casino view without the casino price.

Monaco does not need your approval. But it rewards those who look carefully.`
  },
  'greenland': {
    id: 'greenland', slug: 'greenland',
    title: 'Glimmers of Ice: Greenland',
    category: 'Travel', author: 'Zara Adeyemi',
    authorAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop',
    date: 'June 20, 2026', readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=1200',
    paywall_tier: 'free',
    excerpt: "The world's largest island holds 80% of its surface under ice and a silence so complete it changes the person who hears it.",
    content: `You do not choose Greenland the way you choose a beach holiday. Greenland chooses you — through a photograph, a documentary, a conversation at altitude with someone whose eyes go distant when they describe it. And then, eventually, you go.

## The Ice Sheet

The Greenland Ice Sheet is the second largest body of ice on Earth after Antarctica. From the air, approaching Kangerlussuaq, it appears as an infinite field of white light — not the soft white of clouds but something harder, more ancient, lit from within. Geologists describe it as containing ice that has not touched the surface in over 100,000 years.

Standing at the edge of Russell Glacier, thirty kilometres from Kangerlussuaq town, that number becomes real. The ice face towers fifteen metres above the ground. It groans and pops with internal pressure. A small stream of meltwater runs from its base — accelerating, in the past decade, at a rate that glaciologists measure with the careful language of grief.

## Ilulissat Icefjord

Three hundred kilometres north of the Arctic Circle, the town of Ilulissat sits at the mouth of Sermeq Kujalleq, one of the most productive glaciers in the world. The icebergs it calves — some the size of city blocks — drift through the fjord with a slow authority that makes everything human feel provisional.

> I watched a berg the height of a six-storey building turn over in the fjord. The sound reached us five seconds later — a low, sustained boom that vibrated in the chest. No one on the zodiac said anything for a long time afterwards.

## On Silence

Greenland's most significant offering is not scenic. It is acoustic. In the interior, at certain hours, there is a silence so complete that you can hear your own heartbeat and the soft percussion of your own breathing. For people whose lives are composed almost entirely of human-generated sound, this is disorienting, then unsettling, then — eventually — clarifying.

Take the time. Sit in it. It gives something back.`
  },
  'fashion-week': {
    id: 'fashion-week', slug: 'fashion-week',
    title: 'Lagos Fashion Week 2026: The Designers Who Stole the Show',
    category: 'Fashion', author: 'Zara Adeyemi',
    authorAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop',
    date: 'June 18, 2026', readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=1200',
    paywall_tier: 'premium',
    excerpt: 'Six collections. Twelve designers. One unmistakable message: the global fashion conversation is being rewritten from Lagos.',
    content: `The 2026 edition of Lagos Fashion Week landed at a moment of genuine international attention. With buyers from Net-a-Porter, Mytheresa, and Dover Street Market in attendance for the first time, the pressure on Nigerian designers was acute — and they responded with work that was, in several cases, the strongest the event has produced.

## Arise in Aso-Oke

The collection that dominated post-show conversation came from Lagos-based designer Fisayo Arowolo, whose label ARISE showed a fourteen-piece capsule built entirely from hand-woven aso-oke sourced from artisans in Iseyin, Oyo State. The silhouettes — deconstructed blazers, asymmetric midi skirts, elongated vests — were contemporary without erasure. The aso-oke remained unmistakably itself.

> "I'm not translating African textiles for a Western eye," Arowolo told Voyager backstage. "I'm building clothes that are fully Nigerian and fully global at the same time. Those aren't contradictions."

## The Quiet Revolution in Menswear

Less visible but arguably more significant was the shift happening in menswear. Three designers — Mofe Duncan, Abisola Kola-Daisi, and newcomer Chike Obi — each presented collections that rejected the expected agbada-silhouette update in favour of something more experimental: utility-forward pieces, deconstructed tailoring, and a colour palette borrowed from the Lagos street rather than European fashion capitals.

## What Buyers Are Taking Home

Our conversations with the visiting buyers suggested three clear areas of appetite: handcraft provenance (the aso-oke sourcing story resonated strongly), inclusive sizing (two collections ran up to size 24 with no compromises in cut), and price accessibility relative to European equivalents.

Lagos Fashion Week 2026 did not just show collections. It made an argument. The response, in the months ahead, will tell us how convincingly it landed.`
  },
  'kano-culture': {
    id: 'kano-culture', slug: 'kano-culture',
    title: "Kano's Ancient Walls: A 700-Year Legacy Under Threat",
    category: 'Culture', author: 'Ibrahim Musa',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop',
    date: 'June 15, 2026', readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1200',
    paywall_tier: 'free',
    excerpt: 'The ancient city walls of Kano — once fourteen metres high and stretching for over fifty kilometres — are disappearing. What is being lost is not just mud brick, but memory.',
    content: `The Kano city walls — Ganuwar Kano in Hausa — were begun in the eleventh century and completed under the reign of Sarkin Muhammadu Rumfa in the fifteenth. At their peak, they stretched for approximately fifty-two kilometres around the old city, rising to fourteen metres in places and punctuated by fifteen gates, each with its own name, its own guardian history, and its own entry ceremony.

Today, less than a third of those walls survive. What remains is mostly unprotected, crumbling into the red laterite soil from which it was built.

## What the Walls Actually Are

To understand what is being lost, it helps to understand what the walls were: not merely military infrastructure but the organising logic of a city. Each gate — Kofar Mata, Kofar Ruwa, Kofar Nassarawa — organised commerce, diplomacy, and social identity. Traders from Timbuktu entered through one gate. Pilgrims departing for Mecca left through another. The walls were the city's grammar.

The mud-brick construction technique used — banco, reinforced with organic binders — is itself a form of indigenous engineering knowledge. It has survived 700 years of Sahelian climate, including temperatures that swing sixty degrees between seasons. It cannot, it seems, survive the pressures of urban expansion.

## The Ongoing Destruction

In the past decade, researchers from Bayero University Kano have documented over seventy separate incidents of wall section destruction — not through neglect alone but through active demolition, as landowners and developers remove mud brick to make way for concrete construction.

> "Every time a section falls, we don't just lose a wall. We lose a chapter of the city's autobiography," — Dr. Aisha Bature, Bayero University Department of History.

## What Preservation Requires

UNESCO's 2004 inscription of the Kano Old City as part of Nigeria's Tentative World Heritage List has not translated into meaningful protection on the ground. The gap between inscription and action is a recurring theme in West African heritage management.

What effective preservation requires — and what remains absent — is a combination of legal protection, community economic incentive, and technical capacity in traditional building methods. All three are achievable. None are currently in place.

The walls of Kano are not just a Kano problem. They are one of the clearest remaining physical archives of pre-colonial West African urban civilization. What happens to them is a decision the entire continent is making, slowly, by default.`
  },
};function formatContent(content: string) {
  const lines = content.split('\n');
  const elements: JSX.Element[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith('## ')) {
      elements.push(<h2 key={i}>{line.slice(3)}</h2>);
    } else if (line.startsWith('> ')) {
      elements.push(<blockquote key={i}>{line.slice(2)}</blockquote>);
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(<p key={i}><strong>{line.slice(2, -2)}</strong></p>);
    } else if (line.startsWith('---')) {
      elements.push(<hr key={i} />);
    } else if (line.trim()) {
      const parts = line.split(/(\*[^*]+\*)/g);
      const rendered = parts.map((p, j) =>
        p.startsWith('*') && p.endsWith('*')
          ? <em key={j}>{p.slice(1, -1)}</em>
          : <span key={j}>{p}</span>
      );
      elements.push(<p key={i}>{rendered}</p>);
    }
    i++;
  }
  return elements;
}

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.id as string;

  const article = ARTICLES[slug];
  const [bookmarked, setBookmarked] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userTier] = useState<'free' | 'premium'>('free');
  const isLocked = article?.paywall_tier === 'premium' && userTier === 'free';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!article) {
    return (
      <main className="min-h-screen bg-[#F0EEE9] flex flex-col items-center justify-center p-8">
        <p className="text-[#1A1A1A]/40 text-sm mb-6 font-serif text-lg">Article not found</p>
        <button onClick={() => router.push('/')}
          className="text-[#C9A96E] text-sm underline underline-offset-4">
          Back to Magazine
        </button>
      </main>
    );
  }

  const content = formatContent(article.content);
  const previewContent = content.slice(0, 4);

  return (
    <main className="min-h-screen bg-[#F0EEE9] text-[#1A1A1A]">

      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F0EEE9]/95 backdrop-blur-md border-b border-[#1A1A1A]/8 shadow-sm'
          : 'bg-transparent'
      }`}>
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          <button onClick={() => router.back()}
            className="w-9 h-9 rounded-full bg-[#1A1A1A]/6 hover:bg-[#1A1A1A]/10 flex items-center justify-center transition-colors">
            <ArrowLeft className="w-4 h-4 text-[#1A1A1A]" />
          </button>
          {scrolled && (
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#1A1A1A]/50 font-medium truncate mx-4 max-w-[160px]">
              {article.category}
            </span>
          )}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setBookmarked(b => !b)}
              className="w-9 h-9 rounded-full bg-[#1A1A1A]/6 hover:bg-[#1A1A1A]/10 flex items-center justify-center transition-colors">
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-[#C9A96E] text-[#C9A96E]' : 'text-[#1A1A1A]'}`} />
            </button>
            <button
              onClick={() => navigator.share?.({ title: article.title, url: window.location.href })}
              className="w-9 h-9 rounded-full bg-[#1A1A1A]/6 hover:bg-[#1A1A1A]/10 flex items-center justify-center transition-colors">
              <Share2 className="w-4 h-4 text-[#1A1A1A]" />
            </button>
          </div>
        </div>
      </header>

      <div className="relative h-[55vh] w-full overflow-hidden">
        <Image src={article.image} alt={article.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F0EEE9] via-[#F0EEE9]/10 to-transparent" />
        {article.paywall_tier === 'premium' && (
          <div className="absolute top-16 right-4">
            <span className="inline-flex items-center gap-1.5 bg-[#C9A96E] text-[#0A0A0A] text-[9px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full shadow-md">
              <Crown className="w-3 h-3" />Premium
            </span>
          </div>
        )}
      </div>

      <article className="max-w-md mx-auto px-5 -mt-8 relative z-10 pb-32">

        <div className="flex items-center gap-2 mb-4">
          <Link href={`/category/${article.category.toLowerCase()}`}
            className="text-[#C9A96E] text-[10px] tracking-[0.2em] uppercase font-semibold">
            {article.category}
          </Link>
          <span className="w-1 h-1 rounded-full bg-[#1A1A1A]/20" />
          <span className="text-[#1A1A1A]/40 text-[10px] flex items-center gap-1">
            <Clock className="w-3 h-3" />{article.readTime}
          </span>
        </div>

        <h1 className="font-serif text-[26px] leading-[1.15] text-[#1A1A1A] mb-5 tracking-[-0.01em]">
          {article.title}
        </h1>

        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[#1A1A1A]/10">
          <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#C9A96E]/30 flex-shrink-0">
            <Image src={article.authorAvatar} alt={article.author} fill className="object-cover" />
          </div>
          <div>
            <p className="text-[13px] font-medium text-[#1A1A1A]">{article.author}</p>
            <p className="text-[11px] text-[#1A1A1A]/40">{article.date}</p>
          </div>
        </div>

        <p className="text-[15px] text-[#1A1A1A]/60 leading-relaxed italic mb-8 font-serif border-l-2 border-[#C9A96E]/40 pl-4">
          {article.excerpt}
        </p>

        <div className="article-content-light">
          {isLocked ? (
            <>
              {previewContent}

              <div className="relative mt-0">
                <div className="h-24 bg-gradient-to-b from-transparent to-[#F0EEE9] -mb-1 pointer-events-none" />

                <div className="bg-white rounded-2xl border border-[#1A1A1A]/8 shadow-lg p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#C9A96E]/10 flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-5 h-5 text-[#C9A96E]" />
                  </div>
                  <h3 className="font-serif text-[18px] text-[#1A1A1A] mb-2">Premium Story</h3>
                  <p className="text-[13px] text-[#1A1A1A]/50 leading-relaxed mb-6 max-w-[260px] mx-auto">
                    This article is exclusive to Voyager Premium members. Join to read the full story.
                  </p>
                  <Link href="/premium"
                    className="inline-flex items-center gap-2 bg-[#C9A96E] text-[#0A0A0A] text-[12px] font-bold tracking-[0.1em] uppercase px-6 py-3 rounded-full hover:bg-[#B8985A] transition-colors">
                    <Crown className="w-4 h-4" />
                    Unlock — from ₦500/mo
                  </Link>
                  <p className="text-[10px] text-[#1A1A1A]/30 mt-4">Cancel anytime · Secure via Paystack</p>
                </div>
              </div>
            </>
          ) : (
            content
          )}
        </div>

        {!isLocked && (
          <div className="mt-12 pt-8 border-t border-[#1A1A1A]/10">
            <h3 className="text-[11px] tracking-[0.25em] uppercase text-[#1A1A1A]/40 font-medium mb-5">
              Continue Reading
            </h3>
            <div className="space-y-4">
              {Object.values(ARTICLES)
                .filter(a => a.id !== article.id && a.category === article.category)
                .slice(0, 2)
                .map(a => (
                  <Link key={a.id} href={`/article/${a.id}`} className="flex gap-3 group">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={a.image} alt={a.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 py-1">
                      <span className="text-[#C9A96E] text-[10px] tracking-[0.15em] uppercase">{a.category}</span>
                      <h4 className="text-[13px] font-serif leading-snug mt-1 text-[#1A1A1A] group-hover:text-[#C9A96E] transition-colors line-clamp-2">
                        {a.title}
                      </h4>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}

        <div className="mt-8">
          <Link href="/chat"
            className="flex items-center justify-between bg-[#1A1A1A] text-[#F2EDE4] rounded-2xl p-4 group hover:bg-[#2A2A2A] transition-colors">
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-[#C9A96E] mb-1">Voyager AI</p>
              <p className="text-[13px] font-medium">Ask the editor about this story</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#C9A96E] flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </div>
          </Link>
        </div>
      </article>

      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#F0EEE9]/95 backdrop-blur-md border-t border-[#1A1A1A]/8">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex flex-col items-center gap-1 text-[#1A1A1A]/30 hover:text-[#1A1A1A]/60 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span className="text-[9px] tracking-wider">Home</span>
          </Link>
          <Link href="/explore" className="flex flex-col items-center gap-1 text-[#1A1A1A]/30 hover:text-[#1A1A1A]/60 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
            </svg>
            <span className="text-[9px] tracking-wider">Explore</span>
          </Link>
          <Link href="/chat" className="flex flex-col items-center justify-center -mt-6 w-14 h-14 rounded-full bg-[#C9A96E] text-[#0A0A0A] shadow-lg shadow-[#C9A96E]/30">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
          </Link>
          <Link href="/bookmarks" className="flex flex-col items-center gap-1 text-[#1A1A1A]/30 hover:text-[#1A1A1A]/60 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
            </svg>
            <span className="text-[9px] tracking-wider">Saved</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center gap-1 text-[#1A1A1A]/30 hover:text-[#1A1A1A]/60 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span className="text-[9px] tracking-wider">Profile</span>
          </Link>
        </div>
      </nav>

      <style jsx global>{`
        .article-content-light h2 {
          font-family: Georgia, Cambria, serif;
          font-size: 1.5rem;
          font-weight: 400;
          color: #1A1A1A;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        .article-content-light h3 {
          font-family: Georgia, Cambria, serif;
          font-size: 1.2rem;
          color: #C9A96E;
          margin-top: 1.75rem;
          margin-bottom: 0.75rem;
        }
        .article-content-light p {
          font-size: 1.05rem;
          line-height: 1.85;
          color: #3A3A3A;
          margin-bottom: 1.5rem;
        }
        .article-content-light p:first-of-type::first-letter {
          font-family: Georgia, Cambria, serif;
          font-size: 3.5rem;
          float: left;
          line-height: 0.85;
          padding-right: 0.6rem;
          padding-top: 0.2rem;
          color: #C9A96E;
        }
        .article-content-light em { color: #8B7355; font-style: italic; }
        .article-content-light blockquote {
          border-left: 2px solid #C9A96E;
          padding: 1rem 1.25rem;
          margin: 2rem 0;
          background: rgba(201,169,110,0.06);
          border-radius: 0 8px 8px 0;
          font-family: Georgia, Cambria, serif;
          font-size: 1.05rem;
          font-style: italic;
          color: #5A5A5A;
          line-height: 1.7;
        }
        .article-content-light strong { color: #1A1A1A; font-weight: 600; }
        .article-content-light hr {
          border: none;
          border-top: 1px solid rgba(26,26,26,0.12);
          margin: 2.5rem 0;
        }
      `}</style>
    </main>
  );
}
