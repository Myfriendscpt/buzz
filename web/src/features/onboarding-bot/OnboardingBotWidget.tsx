import {
  CornerDownLeft,
  ExternalLink,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import buzzAppIcon from "@/assets/app-icon@3x.png";
import { useOnboardingBot } from "./useOnboardingBot";

export function OnboardingBotWidget() {
  const {
    isOpen,
    setIsOpen,
    messages,
    isTyping,
    sendMessage,
    resetChat,
    starterTopics,
  } = useOnboardingBot();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, messages.length]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    sendMessage(input.trim());
    setInput("");
  }

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        {!isOpen && (
          <div className="hidden animate-bounce rounded-full bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-700 shadow-sm backdrop-blur-sm sm:block dark:bg-amber-400/10 dark:text-amber-300">
            👋 Need help getting started?
          </div>
        )}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-12 items-center gap-2.5 rounded-full bg-black px-4 text-sm font-semibold text-white shadow-xl transition-all duration-200 hover:scale-105 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          aria-label={isOpen ? "Close Onboarding Bot" : "Open Onboarding Bot"}
        >
          <div className="relative flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-amber-400">
            <img
              alt="Fizz"
              src={buzzAppIcon}
              className="h-full w-full object-cover"
            />
          </div>
          <span>{isOpen ? "Close Guide" : "Onboarding Guide"}</span>
          <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-22 right-6 z-50 flex h-[580px] w-[92vw] max-w-[420px] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl transition-all dark:border-neutral-800 dark:bg-neutral-900"
          role="dialog"
          aria-modal="true"
          aria-label="Buzz Onboarding Assistant"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-950">
            <div className="flex items-center gap-3">
              <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-amber-400 shadow-xs">
                <img
                  alt="Fizz"
                  src={buzzAppIcon}
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-1 ring-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
                    Fizz
                  </h3>
                  <span className="rounded bg-amber-100 px-1.5 py-0.2 text-[10px] font-medium text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    AI Guide
                  </span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Buzz Community Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={resetChat}
                title="Restart orientation"
                className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Minimize guide"
                className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick Topics Bar */}
          <div className="flex gap-1.5 overflow-x-auto border-b border-neutral-100 bg-neutral-50/50 p-2 text-xs no-scrollbar dark:border-neutral-800/60 dark:bg-neutral-950/40">
            {starterTopics.map((topic) => (
              <button
                key={topic.id}
                type="button"
                onClick={() => sendMessage(topic.prompt)}
                className="shrink-0 rounded-lg border border-neutral-200 bg-white px-2.5 py-1 text-xs font-medium text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
              >
                {topic.label}
              </button>
            ))}
          </div>

          {/* Message List */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4 text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-2.5 leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "border border-neutral-200/80 bg-neutral-100/80 text-neutral-900 dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-100"
                  }`}
                >
                  <div className="prose prose-sm dark:prose-invert max-w-none text-xs sm:text-sm">
                    <Markdown remarkPlugins={[remarkGfm]}>{msg.text}</Markdown>
                  </div>

                  {msg.actionLink && (
                    <a
                      href={msg.actionLink.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-amber-500/15 px-3 py-1.5 text-xs font-semibold text-amber-700 hover:bg-amber-500/25 dark:bg-amber-400/20 dark:text-amber-300"
                    >
                      {msg.actionLink.label}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>

                {/* Follow-up Suggestion Chips */}
                {msg.sender === "bot" &&
                  msg.options &&
                  msg.options.length > 0 && (
                    <div className="mt-2 flex max-w-[90%] flex-wrap gap-1.5 pl-1">
                      {msg.options.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => sendMessage(opt)}
                          className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-left text-[11px] font-medium text-neutral-700 transition-colors hover:border-amber-400 hover:bg-amber-50 hover:text-amber-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-amber-500/50 dark:hover:bg-amber-950/40 dark:hover:text-amber-200"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 rounded-2xl border border-neutral-200 bg-neutral-100 px-4 py-2.5 text-xs text-neutral-500 dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-400">
                <Sparkles className="h-3.5 w-3.5 animate-spin text-amber-500" />
                <span>Fizz is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Fizz anything about Buzz..."
              disabled={isTyping}
              className="flex-1 rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 placeholder-neutral-400 transition-colors focus:border-black focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500 dark:focus:border-white"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-black text-white transition-opacity disabled:opacity-40 dark:bg-white dark:text-black"
              aria-label="Send message"
            >
              <CornerDownLeft className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
