export interface BotMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: number;
  options?: string[];
  actionLink?: {
    label: string;
    url: string;
  };
}

export interface OnboardingTopic {
  id: string;
  label: string;
  icon: string;
  prompt: string;
}
