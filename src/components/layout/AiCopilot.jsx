"use client";

import { Bot, SendHorizontal, Sparkles, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const suggestedPrompts = [
  "Summarize critical open exposure",
  "Why did duplicate exposure increase this month?",
  "Show unpaid high-confidence findings",
  "Which vendors drive the largest exposure?",
  "Show top recovery opportunities",
];

function getResponse(question, pathname) {
  const topic = question.toLowerCase();

  if (topic.includes("duplicate")) {
    return "Duplicate exposure is concentrated in recently submitted invoices. Prioritize high-value matches with the same vendor, invoice amount, and payment reference before their next payment run.";
  }

  if (topic.includes("vendor")) {
    return "Review vendors with repeated high-value exceptions first. Compare payment terms, bank-account changes, and invoice frequency to identify the largest preventable exposure.";
  }

  if (topic.includes("recovery") || topic.includes("recover")) {
    return "Focus recovery outreach on validated cases that have not reached the payment-dispute window. Group cases by vendor so investigators can resolve related invoices in one conversation.";
  }

  if (topic.includes("unpaid") || topic.includes("finding") || topic.includes("exposure")) {
    return "The highest-priority items are unpaid, high-confidence findings with a near-term payment date. Escalate items above your materiality threshold and assign an owner before the next approval cycle.";
  }

  if (pathname.includes("/cases")) {
    return "For the active case queue, start with escalated and overdue high-priority cases. They carry the greatest risk of missing the investigation SLA.";
  }

  if (pathname.includes("/audit")) {
    return "Use the audit view to validate unusual payment patterns and document the evidence trail before you close a finding.";
  }

  return "I can help prioritize exposures, explain duplicate patterns, identify vendor risk, and prepare recovery actions. Try one of the suggested prompts for a focused view.";
}

export default function AiCopilot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  function askCopilot(rawQuestion) {
    const prompt = rawQuestion.trim();
    if (!prompt) return;

    setMessages((currentMessages) => [
      ...currentMessages,
      { role: "user", text: prompt },
      { role: "assistant", text: getResponse(prompt, pathname) },
    ]);
    setQuestion("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    askCopilot(question);
  }

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-30 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-violet-600 text-white shadow-lg transition hover:bg-violet-700"
        aria-label="Open AI Copilot"
        title="Open AI Copilot"
      >
        <Sparkles size={20} />
      </button>
    );
  }

  return (
    <aside className="flex h-full min-h-0 w-[320px] shrink-0 flex-col border-l border-slate-200 bg-white shadow-[-8px_0_24px_rgba(15,23,42,0.04)]">
      <header className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-violet-700">
          <Sparkles size={18} aria-hidden="true" />
          AI Copilot
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          aria-label="Close AI Copilot"
          title="Close AI Copilot"
        >
          <X size={18} />
        </button>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 scrollbar-thin">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
            <Bot size={17} />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900">Hello, Vigneshwaran</p>
            <p className="mt-1 text-sm text-slate-600">How can I help you today?</p>
          </div>
        </div>

        {messages.length === 0 ? (
          <section className="mt-8" aria-label="Suggested prompts">
            <p className="mb-3 text-xs font-semibold text-slate-500">SUGGESTED PROMPTS</p>
            <div className="space-y-3">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => askCopilot(prompt)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-left text-xs leading-5 text-slate-600 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-800"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </section>
        ) : (
          <div className="mt-7 space-y-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`rounded-lg px-3 py-2.5 text-xs leading-5 ${message.role === "user" ? "ml-6 bg-violet-600 text-white" : "mr-3 bg-slate-100 text-slate-700"}`}
              >
                {message.text}
              </div>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="border-t border-slate-100 p-3">
        <div className="rounded-lg border border-slate-200 bg-white p-2 focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-100">
          <input
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask anything about your data..."
            className="w-full border-0 bg-transparent px-1 py-2 text-xs text-slate-700 outline-none placeholder:text-slate-400"
            aria-label="Ask AI Copilot a question"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-violet-600 text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-300"
              disabled={!question.trim()}
              aria-label="Send question"
              title="Send question"
            >
              <SendHorizontal size={16} />
            </button>
          </div>
        </div>
        <p className="mt-3 px-1 text-[10px] leading-4 text-slate-400">AI responses may contain inaccuracies. Please verify important information.</p>
      </form>
    </aside>
  );
}