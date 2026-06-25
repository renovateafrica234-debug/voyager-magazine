'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Sparkles } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !data.user) {
      setError('Invalid credentials. Please try again.');
      setLoading(false);
      return;
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', data.user.id)
      .single();

    if (!profile?.is_admin) {
      setError('Access denied. Admin only.');
      await supabase.auth.signOut();
      setLoading(false);
      return;
    }

    router.push('/admin');
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F2EDE4] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-[#C9A96E]/20 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-[#C9A96E]" />
          </div>
          <h1 className="text-2xl font-serif tracking-wider text-[#C9A96E] mb-1">VOYAGER</h1>
          <p className="text-sm text-[#F2EDE4]/40">Editorial Command Login</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@renovate.africa"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F2EDE4] placeholder:text-[#F2EDE4]/20 focus:outline-none focus:border-[#C9A96E]/50"
            />
          </div>
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F2EDE4] placeholder:text-[#F2EDE4]/20 focus:outline-none focus:border-[#C9A96E]/50"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F2EDE4]/30"
            >
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <p className="text-xs text-red-400 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#C9A96E] text-[#0A0A0A] font-medium text-sm hover:bg-[#C9A96E]/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Enter Command Center'}
          </button>
        </form>

        <p className="text-center text-xs text-[#F2EDE4]/20 mt-6">
          Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  );
}
