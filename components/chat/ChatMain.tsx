'use client'

import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useChat } from 'ai/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { formSchema, modelOption } from './constants'
import { MessageList } from './MessageList'
import { ModelSelector } from './ModelSelector'
import { Heading } from '@/components/heading'
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea";


export const Chat: React.FC = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const [error, setError] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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


  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(event);
    adjustTextareaHeight(); // Adjust height on content change
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      model: 'chatgpt-4o-latest',
    },
  })


  return (
    <div className="flex flex-col h-full">
      <Heading
        title="Enhanced Conversation"
        description="Our most advanced conversation model with improved UI and functionality"
        icon={<img src="https://www.gstatic.com/pantheon/images/aiplatform/model_garden/icons/icon-gemini.png" alt="Gemini Icon" className="w-8 h-8 object-contain" />}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
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
                <form onSubmit={handleSubmit} className="
                  rounded-lg 
              border 
              w-full 
              p-4 
              px-3 
              md:px-6 
              focus-within:shadow-sm
              grid
              grid-cols-12
              gap-2
            ">
                  <FormField
                    control={form.control}
                    name="prompt"
                    render={() => (
                      <FormItem className="col-span-12 lg:col-span-8">
                        <FormControl className="m-0 p-0">
                        <Textarea
                            ref={textareaRef}
                            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent resize-none overflow-hidden"
                            value={input}
                            placeholder={'Type your message here...'}
                            onChange={handleChange}
                          />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  <div className="col-span-12 dark:text-black lg:col-span-2 mt-5">
  <ModelSelector control={form.control} />
  </div>
<div className="col-span-12 lg:col-span-2 mt-5">

  <Button
    type="submit"
    disabled={isLoading}
    className="rounded-md bg-zinc-800 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-blue-500 col-span-12 lg:col-span-2 w-full mt-5 "
  >
    {isLoading ? 'Generating...' : 'Generate'}
  </Button>
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

