import { useCallback, useEffect, useState } from "react";
import { getBotAnswer, STARTER_TOPICS } from "./onboardingKnowledge";
import type { BotMessage } from "./types";

const INITIAL_MESSAGE: BotMessage = {
  id: "msg-welcome",
  sender: "bot",
  text:
    "👋 **Welcome to Buzz!** I'm **Fizz**, your community onboarding guide.\n\n" +
    "Whether you're looking to run the project locally, explore our repositories, or see how humans and AI agents build together in the same room, I'm here to help.",
  timestamp: Date.now(),
  options: [
    "How do I run Buzz locally on my computer?",
    "What repositories are in this community?",
    "How do agents collaborate in Buzz?",
    "How do I submit code changes and patches?",
  ],
};

const STORAGE_KEY = "buzz-onboarding-bot-msgs";

export function useOnboardingBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<BotMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [INITIAL_MESSAGE];
  });
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  const sendMessage = useCallback((userText: string) => {
    if (!userText.trim()) return;

    const userMsg: BotMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const answer = getBotAnswer(userText);
      const botMsg: BotMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: answer.text,
        timestamp: Date.now(),
        options: answer.options,
        actionLink: answer.actionLink,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  }, []);

  const resetChat = useCallback(() => {
    setMessages([INITIAL_MESSAGE]);
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    isOpen,
    setIsOpen,
    messages,
    isTyping,
    sendMessage,
    resetChat,
    starterTopics: STARTER_TOPICS,
  };
}
