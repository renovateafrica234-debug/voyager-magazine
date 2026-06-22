// app/ai/page.tsx — RAG-powered AI Editor Chat
"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function AIPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hello, I'm the Voyager Editor. I have read every article in our archive. Ask me about African travel, culture, food, fashion — or request a story idea.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    // Call RAG API
    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, history: messages }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply || "I'm thinking..." }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble connecting to the archive. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-voyager-dark flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-voyager-border glass">
        <Link href="/" className="text-voyager-text-muted hover:text-voyager-cream">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="w-8 h-8 rounded-full bg-voyager-gold/20 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-voyager-gold" />
        </div>
        <div>
          <h1 className="text-voyager-cream text-sm font-semibold">Voyager Editor</h1>
          <p className="text-voyager-text-muted text-xs">RAG-powered archive brain</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === "assistant" ? "bg-voyager-gold/20" : "bg-voyager-cream/10"
              }`}
            >
              {msg.role === "assistant" ? (
                <Bot className="w-3.5 h-3.5 text-voyager-gold" />
              ) : (
                <User className="w-3.5 h-3.5 text-voyager-cream" />
              )}
            </div>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "assistant"
                  ? "bg-voyager-dark-elevated text-voyager-cream border border-voyager-border"
                  : "bg-voyager-gold text-voyager-dark"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-voyager-gold/20 flex items-center justify-center">
              <Bot className="w-3.5 h-3.5 text-voyager-gold animate-pulse" />
            </div>
            <div className="bg-voyager-dark-elevated border border-voyager-border rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-voyager-gold rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-voyager-gold rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-voyager-gold rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 border-t border-voyager-border glass">
        <div className="flex items-center gap-2 max-w-2xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about any article or topic..."
            className="flex-1 rounded-full bg-voyager-dark-elevated border border-voyager-border px-4 py-3 text-sm text-voyager-cream placeholder:text-voyager-text-muted focus:outline-none focus:border-voyager-gold/50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="w-10 h-10 rounded-full bg-voyager-gold flex items-center justify-center text-voyager-dark disabled:opacity-50 disabled:cursor-not-allowed hover:bg-voyager-gold-light transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </main>
  );
}
