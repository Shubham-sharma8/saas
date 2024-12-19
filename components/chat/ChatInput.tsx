import React, { useRef, useEffect } from 'react'
import { Textarea } from '@/components/ui/textarea'

interface ChatInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  isLoading: boolean
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  handleInputChange,
  isLoading,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e)
    handleInputChange(e)
  }

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      placeholder="Type your message here..."
      className="resize-none overflow-hidden"
      rows={1}
    />
  )
}

