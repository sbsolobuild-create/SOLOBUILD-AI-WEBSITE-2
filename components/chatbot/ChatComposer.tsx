"use client";

import { FormEvent, useState } from "react";
import { SendIcon } from "./Icon";

export default function ChatComposer({
  onSubmit,
  onTypingChange,
  compact = false,
  light = false,
}: {
  onSubmit: (message: string) => void;
  onTypingChange?: (isTyping: boolean) => void;
  compact?: boolean;
  light?: boolean;
}) {
  const [value, setValue] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = value.trim();
    if (!message) return;
    onSubmit(message);
    setValue("");
    onTypingChange?.(false);
  }

  if (light) {
    // Reference style: rounded pill input + blue mic + blue send
    return (
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm focus-within:border-[#0066FF]/40 focus-within:ring-2 focus-within:ring-[#0066FF]/10 transition-all"
      >
        {/* Attach — not available in demo */}
        <button
          type="button"
          aria-label="Attach a file (not available in this demo)"
          title="File attachments are not available in the interactive demo"
          disabled
          className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 opacity-40 cursor-not-allowed sm:flex"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m20.5 11.5-7.75 7.75a5 5 0 0 1-7.07-7.07l8.13-8.13a3.5 3.5 0 1 1 4.95 4.95l-8.13 8.13a2 2 0 0 1-2.83-2.83l7.42-7.42" />
          </svg>
        </button>

        {/* Input */}
        <input
          value={value}
          placeholder="Ask Rollo AI anything..."
          aria-label="Ask Rollo AI anything"
          onChange={(event) => {
            setValue(event.target.value);
            onTypingChange?.(Boolean(event.target.value.trim()));
          }}
          onBlur={() => onTypingChange?.(false)}
          className="min-w-0 flex-1 bg-transparent text-[13px] text-slate-800 outline-none placeholder:text-slate-400"
        />

        {/* Sparkle / AI hint */}
        <button
          type="button"
          aria-label="AI suggestions"
          className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#0066FF] sm:flex"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
        </button>

        {/* Microphone — not available in demo */}
        <button
          type="button"
          aria-label="Voice input (not available in this demo)"
          title="Voice input is not available in the interactive demo"
          disabled
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0066FF] opacity-40 cursor-not-allowed"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
            <rect x="9" y="2" width="6" height="11" rx="3" strokeLinecap="round" strokeLinejoin="round" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10a7 7 0 0 0 14 0M12 19v3m-3 0h6" />
          </svg>
        </button>

        {/* Send — solid blue square, matches reference */}
        <button
          type="submit"
          aria-label="Send message"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0066FF] text-white transition-colors hover:bg-[#0052cc]"
        >
          <SendIcon />
        </button>
      </form>
    );
  }

  // Dark / original style
  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] p-2 transition-colors focus-within:border-[#0066FF]/60 ${compact ? "" : "shadow-[0_-10px_30px_rgba(0,0,0,0.15)]"}`}
    >
      <button type="button" aria-label="Attach a file (not available in this demo)" title="File attachments are not available in the interactive demo" disabled className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 opacity-40 cursor-not-allowed sm:flex">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m20.5 11.5-7.75 7.75a5 5 0 0 1-7.07-7.07l8.13-8.13a3.5 3.5 0 1 1 4.95 4.95l-8.13 8.13a2 2 0 0 1-2.83-2.83l7.42-7.42" />
        </svg>
      </button>
      <input
        value={value}
        placeholder="Ask Rollo AI anything..."
        aria-label="Ask Rollo AI anything"
        onChange={(event) => {
          setValue(event.target.value);
          onTypingChange?.(Boolean(event.target.value.trim()));
        }}
        onBlur={() => onTypingChange?.(false)}
        className="min-w-0 flex-1 bg-transparent px-2 text-[13px] text-white outline-none placeholder:text-slate-600"
      />
      <button type="button" aria-label="Add a tool" className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-white/5 hover:text-white sm:flex">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Voice input (not available in this demo)"
        title="Voice input is not available in the interactive demo"
        disabled
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 opacity-40 cursor-not-allowed"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
          <rect x="9" y="2" width="6" height="11" rx="3" strokeLinecap="round" strokeLinejoin="round" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 10a7 7 0 0 0 14 0M12 19v3m-3 0h6" />
        </svg>
      </button>
      <button type="button" aria-label="Expand chat" className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-white/5 hover:text-white md:flex">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 4H4v4M16 4h4v4M8 20H4v-4M20 16v4h-4" />
        </svg>
      </button>
      <button type="submit" aria-label="Send message" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0066FF] text-white transition-colors hover:bg-[#0052cc]">
        <SendIcon />
      </button>
    </form>
  );
}
