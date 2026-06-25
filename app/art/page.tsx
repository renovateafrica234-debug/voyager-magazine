import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ShoppingBag, Heart, Share2 } from 'lucide-react';

const artPieces = [
  {
    id: 'art-001',
    title: 'The Weaver\'s Dream',
    artist: 'Amaka Okafor',
    price: 2500,
    currency: 'USD',
    category: 'Contemporary',
    medium: 'Oil on Canvas',
    dimensions: '120 x 90 cm',
    image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=800&auto=format&fit=crop',
    status: 'Available',
  },
  {
    id: 'art-002',
    title: 'Lagos Noir',
    artist: 'Emeka Nwosu',
    price: 4800,
    currency: 'USD',
    category: 'Photography',
    medium: 'Archival Print',
    dimensions: '150 x 100 cm',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop',
    status: 'Available',
  },
  {
    id: 'art-003',
    title: 'Sahara Gold',
    artist: 'Fatima Bello',
    price: 3200,
    currency: 'USD',
    category: 'Mixed Media',
    medium: 'Gold Leaf & Acrylic',
    dimensions: '100 x 100 cm',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800&auto=format&fit=crop',
    status: 'Reserved',
  },
  {
    id: 'art-004',
    title: 'Market Day in Kano',
    artist: 'Ibrahim Suleiman',
    price: 1800,
    currency: 'USD',
    category: 'Watercolor',
    medium: 'Watercolor on Paper',
    dimensions: '80 x 60 cm',
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=800&auto=format&fit=crop',
    status: 'Available',
  },
  {
    id: 'art-005',
    title: 'Abuja Twilight',
    artist: 'Chidi Obi',
    price: 5500,
    currency: 'USD',
    category: 'Contemporary',
    medium: 'Oil & Resin',
    dimensions: '180 x 120 cm',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=800&auto=format&fit=crop',
    status: 'Available',
  },
  {
    id: 'art-006',
    title: 'The Drummer\'s Soul',
    artist: 'Ngozi Adeyemi',
    price: 2100,
    currency: 'USD',
    category: 'Sculpture',
    medium: 'Bronze',
    dimensions: '45 x 30 x 30 cm',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=800&auto=format&fit=crop',
    status: 'Sold',
  },
];

export default function ArtSalesPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F2EDE4] pb-24">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-[#C9A96E]/50 transition-colors">
            <ArrowLeft className="w-4 h-4 text-[#F2EDE4]" />
          </Link>
          <div className="text-center">
            <h1 className="text-lg font-light tracking-[0.2em] text-[#C9A96E] uppercase font-serif">The Collection</h1>
            <p className="text-[10px] text-[#F2EDE4]/40 tracking-wider">Curated African Art</p>
          </div>
          <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-[#C9A96E]/50 transition-colors">
            <ShoppingBag className="w-4 h-4 text-[#F2EDE4]" />
          </button>
        </div>
      </header>

      {/* Category Filter */}
      <div className="px-4 pt-4 max-w-md mx-auto">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['All', 'Contemporary', 'Photography', 'Mixed Media', 'Watercolor', 'Sculpture'].map((cat, i) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase shrink-0 transition-all ${
                i === 0
                  ? 'bg-[#C9A96E] text-[#0A0A0A]'
                  : 'bg-white/5 border border-white/10 text-[#F2EDE4]/60 hover:border-[#C9A96E]/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Art Grid */}
      <section className="px-4 pt-6 max-w-md mx-auto">
        <div className="grid grid-cols-2 gap-3">
          {artPieces.map((art) => (
            <div key={art.id} className="group relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/5 hover:border-[#C9A96E]/30 transition-all">
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />
                
                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-full text-[9px] font-medium tracking-wider uppercase ${
                    art.status === 'Available' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    art.status === 'Reserved' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                    'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {art.status}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-[#C9A96E] transition-colors">
                    <Heart className="w-3 h-3 text-white" />
                  </button>
                  <button className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-[#C9A96E] transition-colors">
                    <Share2 className="w-3 h-3 text-white" />
                  </button>
                </div>

                {/* Price Overlay */}
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-lg font-semibold text-[#C9A96E]">${art.price.toLocaleString()}</p>
                  <p className="text-[10px] text-[#F2EDE4]/50">{art.currency}</p>
                </div>
              </div>

              {/* Info */}
              <div className="p-3">
                <h3 className="text-sm font-medium text-[#F2EDE4] leading-snug mb-1 group-hover:text-[#C9A96E] transition-colors">
                  {art.title}
                </h3>
                <p className="text-[11px] text-[#F2EDE4]/50 mb-2">{art.artist}</p>
                <div className="flex items-center justify-between text-[10px] text-[#F2EDE4]/30">
                  <span>{art.medium}</span>
                  <span>{art.dimensions}</span>
                </div>
                
                {/* CTA */}
                <button className={`w-full mt-3 py-2.5 rounded-xl text-xs font-medium tracking-wider uppercase transition-all ${
                  art.status === 'Available'
                    ? 'bg-[#C9A96E] text-[#0A0A0A] hover:bg-[#b8985e]'
                    : 'bg-white/5 text-[#F2EDE4]/30 cursor-not-allowed'
                }`}>
                  {art.status === 'Available' ? 'Inquire to Purchase' : art.status === 'Reserved' ? 'On Hold' : 'Sold'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Private Viewing */}
      <section className="px-4 mt-10 max-w-md mx-auto">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#C9A96E]/10 to-transparent border border-[#C9A96E]/20 text-center">
          <h3 className="text-sm font-medium text-[#C9A96E] mb-2">Private Viewing</h3>
          <p className="text-xs text-[#F2EDE4]/50 mb-4">Interested in a piece? Schedule a private viewing at our Abuja gallery or arrange international shipping.</p>
          <button className="w-full py-3 rounded-xl bg-[#C9A96E] text-[#0A0A0A] text-xs font-medium tracking-wider uppercase">
            Contact Curator
          </button>
        </div>
      </section>

    </div>
  );
              }
              
