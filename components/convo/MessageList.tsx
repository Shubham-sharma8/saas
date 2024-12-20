import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Message } from './Message'

interface MessageListProps {
  messages: any[]
  isLoading: boolean
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex-grow overflow-y-auto bg-gray-50 dark:bg-gray-900">
      <div className="w-full px-4">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Message 
              message={message} 
              isExpanded={index === messages.length - 1}
            />
          </motion.div>
        ))}
      </div>
      <div ref={messagesEndRef} />
    </div>
  )
}

