'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseClient } from '@/lib/supabase-client';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
      setLoading(false);
    });
    const { data: listener } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (mode === 'login') {
      const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    } else {
      const { error } = await supabaseClient.auth.signUp({ email, password });
      if (error) setError(error.message);
    }
  }

  async function logout() {
    await supabaseClient.auth.signOut();
    setUser(null);
  }

  if (loading) {
    return <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-[#F2EDE4]">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-[#F2EDE4] flex items-center justify-center px-5">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-serif text-[#C9A96E] text-center mb-2">VOYAGER</h1>
          <p className="text-center text-xs tracking-[0.3em] uppercase text-[#F2EDE4]/50 mb-8">{mode === 'login' ? 'Sign In' : 'Create Account'}</p>
          
          <form onSubmit={handleAuth} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E]"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E]"
            />
            {error && <p className="text-red-400 text-xs">{error}</p>}
            <button type="submit" className="w-full bg-[#C9A96E] text-[#0A0A0A] font-bold py-3 rounded-lg text-sm tracking-wider uppercase">
              {mode === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <p className="text-center text-xs text-[#F2EDE4]/40 mt-4">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-[#C9A96E]">
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F2EDE4] p-5 max-w-md mx-auto">
      <h1 className="text-2xl font-serif text-[#C9A96E] mb-4">Profile</h1>
      <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-6 mb-6">
        <p className="text-sm text-[#F2EDE4]/60 mb-1">Signed in as</p>
        <p className="text-white font-medium">{user.email}</p>
      </div>
      <button
        onClick={logout}
        className="w-full bg-[#C9A96E] text-[#0A0A0A] font-bold py-3 rounded-lg text-sm tracking-wider uppercase"
      >
        Sign Out
      </button>
    </div>
  );
      }
          
