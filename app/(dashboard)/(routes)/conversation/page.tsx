"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSettings } from "@/hooks/useSettings";
import { ChatGPT } from "@/components/ChatGPT/ChatGPT";
import { ChatGemini } from "@/components/ChatGemini/ChatGemini";
import { ChatClaude } from "@/components/ChatClaude/ChatClaude";
import { Gpt4o } from "@/components/ChatGpt4o/Gpt4o";
import { ChatMistral } from "@/components/ChatMistral/page";
import { ChatCohere } from "@/components/ChatCohere/page";
import { ChatLlm } from "@/components/ChatLlm/page";
import { ChatxAI } from "@/components/ChatxAI/page";
import { ChatPerp } from "@/components/ChatPerp/page";
import { ChatDeep } from "@/components/ChatDeep/ChatDeep";

const Chat: React.FC = () => {
  const { settings } = useSettings();

  const renderChat = () => {
    switch (settings.defaultModel) {
      case "openai":
        return <ChatGPT />;
      case "gemini":
        return <ChatGemini />;
      case "gpt4o":
        return <Gpt4o />;
      case "mistral":
        return <ChatMistral />;
      case "cohere":
        return <ChatCohere />;
      case "llama":
        return <ChatLlm />;
      case "deepseek":
        return <ChatDeep />;
      case "xai":
        return <ChatxAI />;
      case "claude":
        return <ChatClaude />;
      case "perp":
        return <ChatPerp />;
      default:
        return <ChatGPT />; // Fallback to OpenAI
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={settings.defaultModel}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className=" space-y-4"
      >
        {renderChat()}
      </motion.div>
    </AnimatePresence>
  );
};

export default Chat;
