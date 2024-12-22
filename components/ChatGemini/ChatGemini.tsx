'use client'

import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useChat } from 'ai/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { formSchema } from './constants'
import { MessageList } from '@/components/convo/MessageList'
import { ModelSelector } from './ModelSelector'
import { Heading } from '@/components/heading'
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea";
import { GroundingToggle } from '@/components/ui/grounding-toggle'


export const ChatGemini: React.FC = () => {
    const [groundingEnabled, setGroundingEnabled] = useState(false)
    const formRef = useRef<HTMLFormElement>(null);
    const [error, setError] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [selectedModel, setSelectedModel] = useState('chatgpt-4o-latest');

  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput } = useChat(
    {
      api: groundingEnabled ? "/api/webai" : "/api/gemini",
      onError: (error) => {
        setError(error.message);
      },
      body: {
        model: selectedModel,
      },
    }
    
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      model: 'gemini-2.0-flash-exp',
    },
  })

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight(); // Adjust height on component mount
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
        title="Gemini"
        description="The best and latest Gemini 2.0 model ranked 3rd best AI in the world and connected with Realtime internet"
        icon={<img src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg" alt="Gemini Icon" className="w-full h-full object-contain" />}
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
                <form 
                  ref={formRef}
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="prompt"
                    render={({field}) => (
                      <FormItem className="col-span-12">
                        <FormControl className="m-0 p-0">
                          <Textarea
                            ref={textareaRef}
                            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent resize-none overflow-hidden"
                            value={input}
                            placeholder="Type your message here..."
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
                  
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Grounding Toggle */}
                    <div className="w-full sm:w-auto">
                      <GroundingToggle 
                        enabled={groundingEnabled} 
                        onToggle={setGroundingEnabled}
                      />
                    </div>
                    {/* Model Selector and Generate Button */}
                    <div className="flex flex-1 items-center gap-4 w-full">
                      <div className="flex-1">
                        <ModelSelector 
                          control={form.control} 
                          onChange={(value) => setSelectedModel(value)}
                        />
                      </div>
                      <Button
                        variant="brutal"
                        disabled={isLoading}
                        type="submit"
                        className="w-[120px]"
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

