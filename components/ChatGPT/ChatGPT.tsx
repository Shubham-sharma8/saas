'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useChat } from 'ai/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { formSchema, modelOption } from './constants'
import { MessageList } from '@/components/convo/MessageList'
import { ModelSelector } from './ModelSelector'
import { Heading } from '@/components/heading'
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'

export const ChatGPT: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedModel, setSelectedModel] = useState('chatgpt-4o-latest');

  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput } = useChat({
    api: '/api/chat',
    onError: (error) => {
      setError(error.message);
    },
    body: {
      model: selectedModel,
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      model: 'chatgpt-4o-latest',
    },
  });

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setError(null);
      setSelectedModel(values.model); // Update selected model before submission
      await handleSubmit(new Event('submit') as any);
      
      // Only reset the prompt, keep the model
      form.setValue('prompt', '');
      setInput('');
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Heading
        title="ChatGPT"
        description="Our most advanced conversation model with improved UI and functionality"
        icon={<img src="https://cdn.prod.website-files.com/5f6bc60e665f54db361e52a9/65fde68748ee62e29dcf7a4e_logo-openai.svg" alt="OpenAI Icon" className="w-full h-full object-contain" />}
        iconColor="text-violet-500 "
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
            <div className="flex-1 overflow-y-auto px-4 py-2">
              <MessageList messages={messages} isLoading={isLoading} />
            </div>
            <div className="p-4 border-t">
              <Form {...form}>
                <form
                  ref={formRef}
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid gap-4 dark:bg-gray-900 dark:border-gray-700"
                >
                  <div className="flex flex-col md:flex-row gap-4 w-full">
                    <FormField
                      control={form.control}
                      name="prompt"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl className="m-0 p-0">
                            <Textarea
                              ref={textareaRef}
                              className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent resize-none overflow-hidden min-h-[40px] dark:bg-gray-900 dark:text-gray-100"
                              placeholder="Type your message here..."
                              value={input}
                              onChange={(e) => {
                                handleInputChange(e);
                                field.onChange(e);
                                adjustTextareaHeight();
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-col gap-4 md:w-[280px]">
                      <ModelSelector 
                        control={form.control} 
                        onChange={(value) => setSelectedModel(value)}
                      />
                      <Button
                        variant="brutal"
                        disabled={isLoading}
                        type="submit"
                        className="w-full"
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
                  className="mt-4"
                >
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

