'use client'

import React, { useState, useEffect, useRef, ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageList } from '@/components/convo/MessageList'
import { Heading } from '@/components/heading'
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const MODEL_OPTIONS = [
  { value: 'claude35sonnet', label: 'Claude 3.5 Sonnet' },
  { value: 'claude3haiku', label: 'Claude 3 Haiku' },
  { value: 'claude3opus', label: 'Claude 3 Opus' },
  { value: 'claudev21', label: 'Claude v2.1' },
]

export const ChatClaude: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [input])

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value)
    adjustTextareaHeight()
  }

  const formSchema = z.object({
    prompt: z.string().min(1, {
      message: "Prompt is required."
    }),
    model: z.string().min(1),
  })
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      model: 'claude35sonnet',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.prompt.trim() || isLoading) return

    setIsLoading(true)
    setError(null)

    const userMessage: Message = { role: 'user', content: values.prompt }
    setMessages(prevMessages => [...prevMessages, userMessage])
    setInput('')

    try {
      const response = await fetch('/api/claude', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          messages: [...messages, userMessage],
          model: values.model
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const assistantMessage: Message = { role: 'assistant', content: data.content }
      setMessages(prevMessages => [...prevMessages, assistantMessage])
    } catch (error) {
      setError('An error occurred while processing your request. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <Heading
        title="Claude AI Chat"
        description="Chat with different Claude models. Streaming of data is not possible."
        icon={<img src="https://www.gstatic.com/pantheon/images/aiplatform/model_garden/icons/icon-anthropic.png" alt="Claude Icon" className="w-full h-full object-contain" />}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10 dark:bg-white"
      />
      <div className="flex-grow overflow-hidden">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full flex flex-col"
          >
            <MessageList messages={messages} isLoading={isLoading} />
            <div className="p-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="
                 rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid gap-4 dark:bg-gray-900 dark:border-gray-700
                ">
                  <div className='flex flex-col md:flex-row gap-4 w-full'>
                  <FormField
                    control={form.control}
                    name="prompt"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl className="m-0 p-0">
                          <Textarea
                            {...field}
                            ref={textareaRef}
                            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent resize-none overflow-hidden min-h-[40px] dark:bg-gray-900 dark:text-gray-100"
                            placeholder={'Type your message here...'}
                            onChange={(e) => {
                              field.onChange(e)
                              handleChange(e)
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col gap-4 md:w-[280px]"> 
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem className="">
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a model" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {MODEL_OPTIONS.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                 
                  <Button
                    variant={'brutal'}
                    disabled={isLoading}
                    className="w-full"
                    type="submit"
                  >
                    {isLoading ? 'Generating...' : 'Send'}
                  </Button>
                  </div>
                  </div>
                </form>
              </Form>
              
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-2 bg-red-100 text-red-700 rounded-md"
                >
                  {error}
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

