// app/editor/page.tsx — AI Editor Agent Dashboard
"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Article } from "@/lib/types";
import { Send, Bot, User, Check, X, RotateCcw, Eye, Sparkles, ChevronDown, Save, FileText } from "lucide-react";
import Link from "next/link";

interface EditSuggestion {
  change_summary: string;
  updated_content: string;
  confidence: string;
  notes: string;
  article_id: string;
  article_title: string;
}

export default function EditorPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [instruction, setInstruction] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<EditSuggestion | null>(null);
  const [messages, setMessages] = useState<{role: "user" | "assistant"; content: string}[]>([]);
  const [activeTab, setActiveTab] = useState<"preview" | "diff" | "source">("preview");
  const [applying, setApplying] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadArticles() {
      const { data } = await supabase.from("articles").select("*, category:categories(*)").order("title");
      setArticles((data || []) as Article[]);
    }
    loadArticles();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, suggestion]);

  async function handleEditRequest(e: React.FormEvent) {
    e.preventDefault();
    if (!instruction.trim() || !selectedArticle || loading) return;

    const userMsg = instruction.trim();
    setInstruction("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai-editor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "edit",
          message: userMsg,
          articleId: selectedArticle.id,
          history: messages,
        }),
      });
      const data = await res.json();

      if (data.mode === "edit" && data.updated_content) {
        setSuggestion(data as EditSuggestion);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `Suggested edits for "${data.article_title}":

${data.change_summary}

Confidence: ${data.confidence}${data.notes ? "

Notes: " + data.notes : ""}` },
        ]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: data.raw_response || data.error || "No suggestions generated." }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Editor service error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  async function applyEdit(action: "approve" | "reject") {
    if (!suggestion) return;
    setApplying(true);

    try {
      const res = await fetch("/api/ai-editor/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: action === "approve" ? "apply_direct" : "reject",
          articleId: suggestion.article_id,
          content: suggestion.updated_content,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setMessages((prev) => [...prev, { role: "assistant", content: action === "approve" ? "Changes applied successfully." : "Changes discarded." }]);
        setSuggestion(null);
        // Refresh article
        const { data: refreshed } = await supabase.from("articles").select("*").eq("id", suggestion.article_id).single();
        if (refreshed) setSelectedArticle(refreshed as Article);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Failed to apply changes." }]);
    } finally {
      setApplying(false);
    }
  }

  function renderDiff() {
    if (!selectedArticle || !suggestion) return null;
    // Simple diff: show old vs new side by side on desktop, stacked on mobile
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-voyager-border bg-voyager-dark-elevated p-4">
          <p className="text-voyager-text-muted text-xs uppercase tracking-wider mb-2">Current</p>
          <div className="text-voyager-text-secondary text-sm leading-relaxed max-h-96 overflow-y-auto" dangerouslySetInnerHTML={{ __html: selectedArticle.content }} />
        </div>
        <div className="rounded-xl border border-voyager-gold/30 bg-voyager-gold/5 p-4">
          <p className="text-voyager-gold text-xs uppercase tracking-wider mb-2">Suggested</p>
          <div className="text-voyager-cream text-sm leading-relaxed max-h-96 overflow-y-auto" dangerouslySetInnerHTML={{ __html: suggestion.updated_content }} />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-voyager-dark pb-28">
      {/* Header */}
      <div className="p-4 pt-6 border-b border-voyager-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-voyager-gold/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-voyager-gold" />
          </div>
          <div>
            <h1 className="text-voyager-cream font-semibold text-lg">AI Editor</h1>
            <p className="text-voyager-text-muted text-xs">RAG-powered editorial assistant</p>
          </div>
          <Link href="/" className="ml-auto text-voyager-text-muted text-sm hover:text-voyager-cream">Exit</Link>
        </div>

        {/* Article Selector */}
        <div className="relative">
          <select
            value={selectedArticle?.id || ""}
            onChange={(e) => {
              const art = articles.find((a) => a.id === e.target.value);
              setSelectedArticle(art || null);
              setSuggestion(null);
              setMessages([]);
            }}
            className="w-full appearance-none rounded-xl bg-voyager-dark-elevated border border-voyager-border px-4 py-3 text-sm text-voyager-cream focus:outline-none focus:border-voyager-gold/50"
          >
            <option value="">Select an article to edit...</option>
            {articles.map((a) => (
              <option key={a.id} value={a.id}>{a.title} ({a.category?.name})</option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-voyager-text-muted pointer-events-none" />
        </div>
      </div>

      {selectedArticle && (
        <div className="p-4 space-y-6">
          {/* Article Info */}
          <div className="flex items-center gap-3">
            <FileText className="w-4 h-4 text-voyager-gold" />
            <span className="text-voyager-cream text-sm font-medium">{selectedArticle.title}</span>
            <span className="text-voyager-text-muted text-xs">{selectedArticle.read_time} min read</span>
          </div>

          {/* Chat History */}
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "assistant" ? "bg-voyager-gold/20" : "bg-voyager-cream/10"}`}>
                  {msg.role === "assistant" ? <Bot className="w-3.5 h-3.5 text-voyager-gold" /> : <User className="w-3.5 h-3.5 text-voyager-cream" />}
                </div>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${msg.role === "assistant" ? "bg-voyager-dark-elevated text-voyager-cream border border-voyager-border" : "bg-voyager-gold text-voyager-dark"}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-voyager-gold/20 flex items-center justify-center"><Bot className="w-3.5 h-3.5 text-voyager-gold animate-pulse" /></div>
                <div className="bg-voyager-dark-elevated border border-voyager-border rounded-2xl px-4 py-3">
                  <div className="flex gap-1"><span className="w-2 h-2 bg-voyager-gold rounded-full animate-bounce" /><span className="w-2 h-2 bg-voyager-gold rounded-full animate-bounce" style={{ animationDelay: "150ms" }} /><span className="w-2 h-2 bg-voyager-gold rounded-full animate-bounce" style={{ animationDelay: "300ms" }} /></div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestion Preview */}
          {suggestion && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <button onClick={() => setActiveTab("preview")} className={`px-3 py-1.5 rounded-full text-xs font-medium ${activeTab === "preview" ? "bg-voyager-gold text-voyager-dark" : "bg-voyager-dark-elevated text-voyager-text-muted border border-voyager-border"}`}>Preview</button>
                <button onClick={() => setActiveTab("diff")} className={`px-3 py-1.5 rounded-full text-xs font-medium ${activeTab === "diff" ? "bg-voyager-gold text-voyager-dark" : "bg-voyager-dark-elevated text-voyager-text-muted border border-voyager-border"}`}>Compare</button>
                <button onClick={() => setActiveTab("source")} className={`px-3 py-1.5 rounded-full text-xs font-medium ${activeTab === "source" ? "bg-voyager-gold text-voyager-dark" : "bg-voyager-dark-elevated text-voyager-text-muted border border-voyager-border"}`}>Source</button>
              </div>

              {activeTab === "preview" && (
                <div className="rounded-xl border border-voyager-gold/20 bg-voyager-gold/5 p-4">
                  <div className="article-content text-voyager-cream" dangerouslySetInnerHTML={{ __html: suggestion.updated_content }} />
                </div>
              )}

              {activeTab === "diff" && renderDiff()}

              {activeTab === "source" && (
                <div className="rounded-xl border border-voyager-border bg-voyager-dark-elevated p-4">
                  <pre className="text-voyager-text-secondary text-xs overflow-x-auto whitespace-pre-wrap">{suggestion.updated_content}</pre>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => applyEdit("approve")}
                  disabled={applying}
                  className="flex-1 flex items-center justify-center gap-2 rounded-full bg-voyager-gold py-3 text-sm font-semibold text-voyager-dark hover:bg-voyager-gold-light transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {applying ? "Applying..." : "Apply Changes"}
                </button>
                <button
                  onClick={() => applyEdit("reject")}
                  disabled={applying}
                  className="flex items-center justify-center gap-2 rounded-full bg-voyager-dark-elevated border border-voyager-border px-6 py-3 text-sm font-medium text-voyager-text-muted hover:text-red-400 hover:border-red-400/30 transition-colors disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                  Discard
                </button>
              </div>
            </div>
          )}

          {/* Instruction Input */}
          <form onSubmit={handleEditRequest} className="pt-4 border-t border-voyager-border">
            <p className="text-voyager-text-muted text-xs mb-2">What should the Editor change?</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                placeholder="e.g., Update the Zipp hoodie price to ₦50,000 and add a paragraph about the new summer drop..."
                className="flex-1 rounded-full bg-voyager-dark-elevated border border-voyager-border px-4 py-3 text-sm text-voyager-cream placeholder:text-voyager-text-muted focus:outline-none focus:border-voyager-gold/50"
              />
              <button
                type="submit"
                disabled={loading || !instruction.trim()}
                className="w-10 h-10 rounded-full bg-voyager-gold flex items-center justify-center text-voyager-dark disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
                                }
                                
