'use client'

import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useChat } from 'ai/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageList } from '@/components/convo/MessageList'
import { Heading } from '@/components/heading'
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { toast } from 'react-hot-toast';
import axios from 'axios';


export const ChatxAI: React.FC = () => {
  const { messages, input, handleInputChange, handleSubmit: chatHandleSubmit, isLoading, setInput } = useChat(
    {
      api: "/api/xAI",
    }
  );
  const [error, setError] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setError(null);
      
      if (!executeRecaptcha) {
        console.error('Recaptcha has not been loaded');
        toast.error('ReCAPTCHA failed to load. Please try again.');
        return;
      }
      
      const gRecaptchaToken = await executeRecaptcha('inquirySubmit');
      
      const recaptchaResponse = await axios.post("/api/recaptchaSubmit", {
        gRecaptchaToken,
      });

      if (recaptchaResponse.data.success) {
        await chatHandleSubmit();
        form.setValue('prompt', '');
        setInput('');
      } else {
        toast.error('ReCAPTCHA verification failed. Please try again.');
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred while submitting the form');
      toast.error('Failed to submit form. Please try again.');
    } finally {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };
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
  const formSchema = z.object({
    prompt: z.string().min(1, {
      message: "Prompt is required."
    }),
    model: z.string().min(1),
  });
  

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
        title="xAI Grok"
        description="xAI Grok is a powerful AI model that can help you understand the inner workings of complex AI models."
        icon={<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKJdfl9u2KJAQckmHmNaEagW8j1I6fmzusFy48wvw7myt49C0zVhKGOB2txycjZFFyxF8&usqp=CAU" alt="xAI Icon" className="w-full h-full object-contain" />}
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
                  rounded-lg 
              border 
              w-full 
              p-4 
              px-3 
              md:px-6 
              focus-within:shadow-sm
              grid
              grid-cols-10
              gap-2
            ">
                  <FormField
                    control={form.control}
                    name="prompt"
                    render={({ field }) => (
                      <FormItem className="col-span-12 lg:col-span-8">
                        <FormControl className="m-0 p-0">
                        <Textarea
                            ref={textareaRef}
                            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent resize-none overflow-hidden"
                            value={input}
                            placeholder={'Type your message here...'}
                            onChange={(e) => {
                              field.onChange(e);
                              handleChange(e);
                            }}
                          />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  
<div className="col-span-12 lg:col-span-2 mt-5">

  <Button
   variant="Sketch"
   disabled={isLoading}
   type="submit"
   className=" col-span-12 lg:col-span-2 w-full mt-5 "
   >
    {isLoading ? 'Generating...' : 'Send'}
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

