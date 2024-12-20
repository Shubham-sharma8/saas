'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSettings } from '@/hooks/useSettings'
import {ChatGPT} from '@/components/ChatGPT/ChatGPT'
import {ChatGemini} from '@/components/ChatGemini/ChatGemini'
import {ChatClaude} from '@/components/ChatClaude/ChatClaude'
import {Gpt4o} from '@/components/Gpt4o/Gpt4o'



const Chat: React.FC = () => {
  const { settings } = useSettings()

  const renderChat = () => {
    switch (settings.defaultModel) {
      case 'openai':
        return <ChatGPT />
      case 'gemini':
        return <ChatGemini />
        case 'gpt4o':
        return <Gpt4o />
      case 'claude':
        return <ChatClaude />
      default:
        return <ChatGPT /> // Fallback to OpenAI
    }
  }

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
  )
}

export default Chat

