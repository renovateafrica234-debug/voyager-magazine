'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  PenTool, 
  CheckCircle, 
  Share2, 
  LogOut,
  ChevronRight
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/editor', label: 'AI Editor', icon: PenTool },
  { href: '/admin/approvals', label: 'Approvals', icon: CheckCircle },
  { href: '/admin/social', label: 'Social Hub', icon: Share2 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F2EDE4] flex flex-col md:flex-row">
      
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <h1 className="text-sm font-light tracking-[0.2em] text-[#C9A96E] uppercase">Voyager Admin</h1>
      </div>

      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-white/5 bg-[#0A0A0A]">
        <div className="p-6 border-b border-white/5">
          <h1 className="text-lg font-light tracking-[0.2em] text-[#C9A96E] uppercase font-serif">Voyager</h1>
          <p className="text-[10px] text-[#F2EDE4]/30 mt-1 tracking-wider">Editorial Command</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                  isActive 
                    ? 'bg-[#C9A96E]/10 text-[#C9A96E] border border-[#C9A96E]/20' 
                    : 'text-[#F2EDE4]/50 hover:bg-white/5 hover:text-[#F2EDE4]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
                {isActive && <ChevronRight className="w-3 h-3 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[#F2EDE4]/50 hover:bg-white/5 transition-all">
            <LogOut className="w-4 h-4" />
            Exit to App
          </Link>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-white/5">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg ${isActive ? 'text-[#C9A96E]' : 'text-[#F2EDE4]/40'}`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[9px]">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 md:pb-0">
        {children}
      </main>

    </div>
  );
}

