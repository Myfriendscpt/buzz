import type { OnboardingTopic } from "./types";

export const STARTER_TOPICS: OnboardingTopic[] = [
  {
    id: "quickstart",
    label: "🚀 Quickstart: Run Locally",
    icon: "terminal",
    prompt: "How do I run Buzz locally on my computer?",
  },
  {
    id: "repos",
    label: "📂 Community Repositories",
    icon: "book",
    prompt: "What repositories are in this community?",
  },
  {
    id: "agents",
    label: "🤖 How AI Agents Work",
    icon: "bot",
    prompt: "How do agents collaborate in Buzz?",
  },
  {
    id: "patches",
    label: "🌿 Contributing Patches",
    icon: "git",
    prompt: "How do I submit code changes and patches?",
  },
];

export function getBotAnswer(query: string): {
  text: string;
  options?: string[];
  actionLink?: { label: string; url: string };
} {
  const q = query.toLowerCase();

  if (
    q.includes("run") ||
    q.includes("start") ||
    q.includes("install") ||
    q.includes("local") ||
    q.includes("quickstart")
  ) {
    return {
      text:
        "### 🚀 Local Development Quickstart\n\n" +
        "You can run the Buzz web client on Windows in two ways:\n\n" +
        "**Method 1 (One-click launcher):**\n" +
        "```powershell\n" +
        ".\\run-web.bat\n" +
        "```\n\n" +
        "**Method 2 (Using pnpm directly):**\n" +
        "```powershell\n" +
        "pnpm.cmd --filter buzz-web dev\n" +
        "```\n\n" +
        "This serves the client at **`http://localhost:5173`** with live hot reload.",
      options: [
        "What repositories are in this community?",
        "How do agents collaborate in Buzz?",
      ],
      actionLink: {
        label: "Open Local Dev Server",
        url: "http://localhost:5173",
      },
    };
  }

  if (
    q.includes("repo") ||
    q.includes("project") ||
    q.includes("code") ||
    q.includes("directory")
  ) {
    return {
      text:
        "### 📂 Community Repositories\n\n" +
        "Our community hosts 4 core repositories:\n\n" +
        "1. **`buzz-desktop`** — The desktop & web client built with React, Vite, and Tauri.\n" +
        "2. **`agent-harness`** — Shared tooling for orchestrating autonomous coding agents.\n" +
        "3. **`relay-infrastructure`** — Self-hostable Nostr relay backend and database configs.\n" +
        "4. **`design-system`** — UI foundations, Tailwind tokens, and component primitives.\n\n" +
        "Click any repository in the list behind this dialog to view its files, commit history, and README!",
      options: [
        "How do I submit code changes and patches?",
        "How do agents collaborate in Buzz?",
      ],
    };
  }

  if (
    q.includes("agent") ||
    q.includes("fizz") ||
    q.includes("honey") ||
    q.includes("pollen") ||
    q.includes("bot") ||
    q.includes("ai")
  ) {
    return {
      text:
        "### 🤖 AI Agents in Buzz\n\n" +
        "In Buzz, agents aren't external webhooks or bots — **they are first-class team members**:\n\n" +
        "- **Own Identity**: Each agent has its own Nostr keypair and audit trail.\n" +
        "- **Shared Rooms**: Agents join channels alongside humans and can be `@mentioned`.\n" +
        "- **Real Capabilities**: Agents open branches, submit NIP-34 patches, review PRs, and update canvases.\n" +
        "- **Starter Team**: Meet **Fizz** (onboarding guide), **Honey** (code helper), and **Pollen** (researcher).",
      options: [
        "How do I run Buzz locally on my computer?",
        "How do I submit code changes and patches?",
      ],
    };
  }

  if (
    q.includes("patch") ||
    q.includes("contribut") ||
    q.includes("pr") ||
    q.includes("pull request") ||
    q.includes("git")
  ) {
    return {
      text:
        "### 🌿 Submitting Code Changes\n\n" +
        "Buzz uses the **NIP-34 Nostr Git protocol** for patches:\n\n" +
        "1. Clone the repository you want to modify.\n" +
        "2. Create your feature branch and commit your changes.\n" +
        "3. Push your patch using the `buzz-cli` or desktop app.\n" +
        "4. A dedicated room automatically appears for the patch where human reviewers and AI agents run checks, comment, and sign off.",
      options: [
        "What repositories are in this community?",
        "How do I run Buzz locally on my computer?",
      ],
    };
  }

  return {
    text: "I'm here to help you get started with Buzz! You can ask me how to run the project locally, explore repositories, understand how agents work, or submit your first patch.",
    options: [
      "How do I run Buzz locally on my computer?",
      "What repositories are in this community?",
      "How do agents collaborate in Buzz?",
    ],
  };
}
