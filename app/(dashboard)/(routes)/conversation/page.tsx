
"use client";

import { useChat } from "ai/react";

import * as z from "zod";
import dynamic from 'next/dynamic';  // <- Dynamically import ReactMarkdown

import {ClaudeCard, Gpt4o} from '@/components/models'
    
import { useForm } from "react-hook-form";
const ReactMarkdown = dynamic(() => import('react-markdown'), { loading: () => <p>Loading...</p> });
import Prism from 'prismjs';
import 'prismjs/themes/prism.css'; // Import Prism's CSS for styling
import '@/app/(style)/prism-cb.css'; // Import Prism's CSS for styling

import React, { useState, useEffect, useRef, ChangeEvent } from 'react';


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



import { toast } from "react-hot-toast";
import {
  Clipboard,
  Share,
  Speaker,
  EditIcon,
  Pause,
  Download,
} from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import html2canvas from "html2canvas";

import jsPDF from "jspdf";

import { Textarea } from "@/components/ui/textarea";

import OpenAI from "openai";

import { BotAvatar } from "@/components/bot-avatar";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import {  Highlight } from "@/components/ui/hero-highlight";


import { formSchema } from "./constants";
import { questionsByPage } from "./questions";
import { modelOption} from "./constants";

const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();


  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Function to adjust the height of the textarea
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
      prompt: "",
      model: "gemini-2.0-flash-exp",
    },
  });
  
  const isLoading = form.formState.isSubmitting;

  const getRandomQuestion = () => {
    // Randomly select a page
    const pages = Object.keys(questionsByPage);
    const randomPageIndex = Math.floor(Math.random() * pages.length);
    const randomPage = pages[randomPageIndex];

    // Randomly select a question from that page
    const questionsOnSelectedPage =
      questionsByPage[randomPage as keyof typeof questionsByPage];
    const randomQuestionIndex = Math.floor(
      Math.random() * questionsOnSelectedPage.length
    );
    const randomQuestion = questionsOnSelectedPage[randomQuestionIndex];

    return randomQuestion;
  };
  const [randomQuestion] = useState(getRandomQuestion());

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Message copied to clipboard");
      },
      () => {
        toast.error("Failed to copy message");
      }
    );
  };

  // Example share functionality (this is a simple implementation and may vary depending on requirements)
  const handleShare = (message: string) => {
    if (navigator.share) {
      navigator
        .share({
          title: "Conversation Message",
          text: message,
        })
        .then(() => {
          toast.success("Message shared successfully");
        })
        .catch((error) => {
          toast.error("Message did not share.");
        });
    } else {
      // Fallback for browsers that do not support the Share API
      copyToClipboard(message);
    }
  };
  //Speaking//

  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const speak = (text: string) => {
    if (!speaking && text) {
      const utterance = new SpeechSynthesisUtterance(text);
      setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      speechSynthesis.speak(utterance);
    } else if (paused) {
      // If paused, resume speaking
      speechSynthesis.resume();
      setPaused(false);
    } else {
      // If speaking, pause
      speechSynthesis.pause();
      setPaused(true);
    }
  };

  useEffect(() => {
    const handleSpeechEnd = () => {
      setSpeaking(false);
    };

    speechSynthesis.addEventListener("end", handleSpeechEnd);

    return () => {
      speechSynthesis.removeEventListener("end", handleSpeechEnd);
    };
  }, []);
  useEffect(() => {
    // Call Prism.highlightAll() to highlight all code blocks
    Prism.highlightAll();
  }, []);

  //Edit Message//
  

  const [editedMessage, setEditedMessage] = useState<string>(""); // State to hold the edited message
  const editedMessageRef = useRef<HTMLTextAreaElement>(null);
  const handleSaveEditedMessage = () => {
    // Get the edited message from the Textarea
    const newMessage = editedMessageRef.current?.value ?? "";
    // Update the prompt input with the edited message
    form.setValue("prompt", newMessage);
    // Close the drawer
    // You can also clear the edited message state here if needed
    setEditedMessage("");
  };
  const [message, setMessage] =
    useState<OpenAI.Chat.CreateChatCompletionRequestMessage | null>(null); // Define message state

  //Download //
  const handleConvertToJPG = () => {
    if (editedMessageRef.current) {
      html2canvas(editedMessageRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg");
        const downloadLink = document.createElement("a");
        downloadLink.href = imgData;
        downloadLink.download = "message.jpg";
        downloadLink.click();
      });
    }
  };

  const handleConvertToPDF = () => {
    try {
      if (
        editedMessageRef.current &&
        message !== null &&
        message !== undefined
      ) {
        const textContent = message.content?.toString() ?? "";

        // Create a new jsPDF instance
        const pdf = new jsPDF();

        // Add text content to the PDF
        pdf.text(textContent, 10, 10);

        pdf.save("message.pdf");
      } else {
        toast.error(
          "Either editedMessageRef is not defined or message is null or undefined."
        );
      }
    } catch (error) {
      toast.error("An error occurred while generating PDF:");
    }
  };

  return (
    <div>
      <Heading
        title="Conversation"
        description="The best performing Gemini model with features for a wide range of tasks"
        icon={<img src="https://www.gstatic.com/pantheon/images/aiplatform/model_garden/icons/icon-gemini.png" alt="Gemini Icon" className="w-full h-full object-contain" />} // Use the image as the icon
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
      <div>
        <Form {...form}>
          <form
            onSubmit={handleSubmit}
            className="
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
            "
          >
            <FormField
              name="prompt"
              render={() => (
                <FormItem className="col-span-12 lg:col-span-8">
                  <FormControl className="m-0 p-0">
                  <Textarea
                      ref={textareaRef}
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent resize-none overflow-hidden"
                      value={input}
                      placeholder={randomQuestion}
                      onChange={handleChange}
                    />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem className="col-span-12 dark:text-black lg:col-span-2 mt-5">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {modelOption.map((option) => (
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
              className="rounded-md bg-zinc-800 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-blue-500 col-span-12 lg:col-span-2 w-full mt-5 "
              type="submit"
                disabled={isLoading}
                size="icon"
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          
          {messages.length === 0 && !isLoading && (
  <div>
    <div className="text-sm md:text-xl font-bold dark:text-white text-zinc-800 flex justify-center items-center">
      <Highlight className="text-xl md:text-2xl lg:text-3xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center -mb-6">
        Try other models as well.
      </Highlight>
    </div>
    <div className="lg:block xl:flex xl:justify-center xl:space-x-6 2xl:space-x-10">
      {/* Align as row for xl and more space for 2xl */}
      <ClaudeCard />
      <Gpt4o />
    </div>
  </div>
)}


          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div
                key={index} // Using index as key is not recommended for dynamic lists, consider using a unique ID
                className={cn(
                  "relative p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user"
                    ? "bg-white dark:text-black border border-black/10"
                    : "bg-muted"
                )}
              >
                <div className="flex items-start gap-x-8">
                  {message.role === "user" ? <UserAvatar /> : <BotAvatar />}

                  <div className="text-sm whitespace-pre-wrap flex-1">
                  <ReactMarkdown
                  components={{
                    pre: (props: { [key: string]: any }) => (
                      <div className="overflow-auto w-full my-2 bg-black p-2 rounded-lg">
                        <pre {...props} />
                      </div>
                    ),
                  }}
                  className="text-sm overflow-hidden leading-7"
                >
                  {message.content?.toString()}
                </ReactMarkdown>
                  </div>

                  <div className="absolute top-0 right-0 flex gap-x-2">
                    <Clipboard
                      onClick={() =>
                        copyToClipboard(message.content?.toString() ?? "")
                      }
                      size={24}
                      className="cursor-pointer text-neutral-700 hover:text-neutral-900"
                    />
                    <Share
                      onClick={() =>
                        handleShare(message.content?.toString() ?? "")
                      }
                      size={24}
                      className="cursor-pointer text-neutral-700 hover:text-neutral-900"
                    />
                    {speaking && !paused ? (
                      <Pause
                        onClick={() => speak(message.content?.toString() ?? "")}
                        size={24}
                        className="cursor-pointer text-red-500 hover:text-purple-700"
                      />
                    ) : (
                      <Speaker
                        onClick={() => speak(message.content?.toString() ?? "")}
                        size={24}
                        className={cn("cursor-pointer", {
                          "text-neutral-700 hover:text-neutral-900":
                            !speaking || paused,
                        })}
                      />
                    )}
                    <Drawer>
                      <DrawerTrigger asChild>
                        <EditIcon
                          size={24}
                          className="cursor-pointer text-neutral-700 hover:text-neutral-900"
                        />
                      </DrawerTrigger>
                      <DrawerContent>
                        <div className="mx-auto w-full max-w-sm">
                          <DrawerHeader>
                            <DrawerTitle>Edit Message</DrawerTitle>
                            <DrawerDescription>
                              Edit the message and click save.
                            </DrawerDescription>
                          </DrawerHeader>
                          <Textarea
                            defaultValue={message.content?.toString() ?? ""}
                            ref={editedMessageRef}
                          />
                          <DrawerFooter>
                            <Button
                              className="rounded-md bg-zinc-800 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-blue-500 col-span-12 lg:col-span-2 w-full"
                              onClick={handleSaveEditedMessage}
                            >
                              Save
                            </Button>
                            <DrawerClose />
                            <DrawerClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </div>
                      </DrawerContent>
                    </Drawer>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Download />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Download the following text
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            <Textarea
                              defaultValue={message.content?.toString() ?? ""}
                              ref={editedMessageRef}
                            />
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          {/* Convert to JPG action */}

                          <AlertDialogAction onClick={handleConvertToJPG}>
                            As JPG
                          </AlertDialogAction>
                          {/* Convert to PDF action */}
                          <AlertDialogAction onClick={handleConvertToPDF}>
                            As PDF
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
