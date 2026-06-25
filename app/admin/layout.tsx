'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { 
  LayoutDashboard, 
  Bot, 
  CheckCircle, 
  Share2,
  LogOut,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/admin/login');
        return;
      }
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();
      
      if (!profile?.is_admin) {
        await supabase.auth.signOut();
        router.push('/admin/login');
        return;
      }
      setAuthorized(true);
      setLoading(false);
    }
    checkAuth();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/admin/login');
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#C9A96E] animate-spin" />
      </div>
    );
  }

  if (!authorized) return null;

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/approvals', label: 'Approvals', icon: CheckCircle },
    { href: '/admin/social', label: 'Social Hub', icon: Share2 },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F2EDE4] flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 hidden md:flex flex-col">
        <div className="p-6">
          <h1 className="text-lg font-light tracking-[0.2em] text-[#C9A96E] uppercase font-serif">Voyager</h1>
          <p className="text-[10px] text-[#F2EDE4]/30 tracking-wider mt-1">Editorial Command</p>
        </div>
        
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  active 
                    ? 'bg-[#C9A96E]/10 text-[#C9A96E] border border-[#C9A96E]/20' 
                    : 'text-[#F2EDE4]/50 hover:text-[#F2EDE4] hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-[#F2EDE4]/30 hover:text-red-400 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            Exit to App
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-sm font-light tracking-[0.2em] text-[#C9A96E] uppercase font-serif">Voyager</h1>
          <button onClick={handleLogout} className="text-xs text-[#F2EDE4]/30">Exit</button>
        </div>
        <div className="flex gap-1 px-2 pb-2 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs whitespace-nowrap ${
                  active ? 'bg-[#C9A96E]/10 text-[#C9A96E]' : 'text-[#F2EDE4]/40'
                }`}
              >
                <Icon className="w-3 h-3" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:p-8 pt-20 md:pt-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
