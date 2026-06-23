'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Send, ArrowLeft, Bot, User, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Welcome to Voyager. Ask me about luxury travel, culture, or any article in our archive.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, history: messages })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || 'I could not process that. Try again.' }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F2EDE4] flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#C9A96E]/20 px-4 py-3 flex items-center gap-3">
        <button onClick={() => router.push('/')} className="p-2 hover:bg-white/5 rounded-full">
          <ArrowLeft className="w-5 h-5 text-[#C9A96E]" />
        </button>
        <Bot className="w-5 h-5 text-[#C9A96E]" />
        <div>
          <h1 className="text-sm font-semibold text-[#F2EDE4]">Voyager AI</h1>
          <p className="text-xs text-[#F2EDE4]/50">Powered by DeepSeek</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-[#C9A96E]/20 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-[#C9A96E]" />
              </div>
            )}
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              m.role === 'user' 
                ? 'bg-[#C9A96E] text-[#0A0A0A] rounded-br-md' 
                : 'bg-white/5 text-[#F2EDE4] rounded-bl-md border border-white/10'
            }`}>
              {m.content}
            </div>
            {m.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-[#F2EDE4]" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C9A96E]/20 flex items-center justify-center">
              <Loader2 className="w-4 h-4 text-[#C9A96E] animate-spin" />
            </div>
            <div className="bg-white/5 rounded-2xl rounded-bl-md px-4 py-3 border border-white/10">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-[#C9A96E]/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-[#C9A96E]/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-[#C9A96E]/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-[#0A0A0A]/90 backdrop-blur-md border-t border-[#C9A96E]/20 px-4 py-3">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Ask Voyager AI..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F2EDE4] placeholder:text-[#F2EDE4]/30 focus:outline-none focus:border-[#C9A96E]/50"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="bg-[#C9A96E] text-[#0A0A0A] rounded-xl px-4 py-3 disabled:opacity-30"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
                                                                                              }
        
