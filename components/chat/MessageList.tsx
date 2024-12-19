import React from 'react'
import { motion } from 'framer-motion'
import { Message } from './Message'

interface MessageListProps {
  messages: any[]
  isLoading: boolean
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  return (
    <div className="flex-grow overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Message message={message} />
        </motion.div>
      ))}
      
    </div>
  )
}

