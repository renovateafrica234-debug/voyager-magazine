'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ShoppingBag } from 'lucide-react'

const pieces = [
  { id: '1', title: 'The Weavers Dream', artist: 'Amaka Okafor', price: 2500, status: 'Available', img: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=400' },
  { id: '2', title: 'Lagos Noir', artist: 'Emeka Nwosu', price: 4800, status: 'Available', img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=400' },
  { id: '3', title: 'Sahara Gold', artist: 'Fatima Bello', price: 3200, status: 'Reserved', img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=400' },
  { id: '4', title: 'Market Day in Kano', artist: 'Ibrahim Suleiman', price: 1800, status: 'Available', img: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=400' },
  { id: '5', title: 'Abuja Twilight', artist: 'Chidi Obi', price: 5500, status: 'Available', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=400' },
  { id: '6', title: 'The Drummers Soul', artist: 'Ngozi Adeyemi', price: 2100, status: 'Sold', img: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=400' },
]

export default function ArtPage() {
  return (
    <div className='min-h-screen bg-[#0A0A0A] text-[#F2EDE4] pb-24'>
      <header className='sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur border-b border-white/5'>
        <div className='max-w-md mx-auto px-4 py-4 flex justify-between items-center'>
          <Link href='/' className='w-8 h-8 rounded-full border border-white/10 flex items-center justify-center'><ArrowLeft className='w-4 h-4' /></Link>
          <div className='text-center'>
            <h1 className='text-lg font-light tracking-[0.2em] text-[#C9A96E] uppercase'>The Collection</h1>
            <p className='text-[10px] text-[#F2EDE4]/40'>Curated African Art</p>
          </div>
          <button className='w-8 h-8 rounded-full border border-white/10 flex items-center justify-center'><ShoppingBag className='w-4 h-4' /></button>
        </div>
      </header>
      <div className='px-4 pt-6 max-w-md mx-auto grid grid-cols-2 gap-4'>
        {pieces.map((art) => (
          <div key={art.id} className='rounded-2xl overflow-hidden bg-white/5 border border-white/5'>
            <div className='relative aspect-[3/4] overflow-hidden'>
              <Image src={art.img} alt={art.title} fill className='object-cover' unoptimized />
              <div className='absolute top-3 left-3'>
                <span className={`px-2 py-1 rounded-full text-[10px] font-medium uppercase ${art.status === 'Available' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : art.status === 'Reserved' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>{art.status}</span>
              </div>
              <div className='absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#0A0A0A] to-transparent'>
                <p className='text-[#C9A96E] font-semibold text-sm'>${art.price.toLocaleString()}</p>
              </div>
            </div>
            <div className='p-3'>
              <h3 className='text-sm font-medium mb-1'>{art.title}</h3>
              <p className='text-xs text-[#F2EDE4]/50 mb-2'>{art.artist}</p>
              <button className={`w-full py-2.5 rounded-full text-xs font-medium uppercase tracking-wider ${art.status === 'Sold' ? 'bg-white/5 text-[#F2EDE4]/20' : 'bg-[#C9A96E] text-[#0A0A0A]'}`}>{art.status === 'Sold' ? 'Sold' : 'Inquire to Purchase'}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
  }
                  
