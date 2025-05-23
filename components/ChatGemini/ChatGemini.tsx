"use client";

import React, { useState, useEffect, useRef } from "react";
import { useChat } from "ai/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { formSchema } from "./constants";
import { MessageList } from "@/components/convo/MessageList";
import { ModelSelector } from "./ModelSelector";
import { Heading } from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, X } from "lucide-react";
import { Widget } from "@uploadcare/react-widget";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Switch } from "@/components/ui/switch";

export const ChatGemini: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedModel, setSelectedModel] = useState("chatgpt-4o-latest");
  const [uploadedFile, setUploadedFile] = useState<{
    cdnUrl: string;
    name: string;
    isImage: boolean;
    mimeType: string;
  } | null>(null);
  const [useSearchGrounding, setUseSearchGrounding] = useState(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput,
  } = useChat({
    api: "/api/gemini",
    onError: (error) => {
      setError(error.message);
    },
    body: {
      model: selectedModel,
      fileUrl: uploadedFile?.cdnUrl,
      fileName: uploadedFile?.name,
      fileMimeType: uploadedFile?.mimeType,
      useSearchGrounding,
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      model: "gemini-2.0-flash-exp",
    },
  });

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setError(null);
      setSelectedModel(values.model);

      if (uploadedFile) {
        setInput(
          (prev) =>
            `${prev}\n[Attached file: ${uploadedFile.name}] (${uploadedFile.mimeType})`
        );
      }

      await handleSubmit(new Event("submit") as any);
      form.setValue("prompt", "");
      setInput("");
    } catch (error: any) {
      setError(error.message || "An error occurred while submitting the form");
      toast.error("Failed to submit form. Please try again.");
    } finally {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleFileUpload = (info: any) => {
    const isImage = info.isImage;
    const mimeType =
      info.mimeType || (isImage ? "image/jpeg" : "application/octet-stream");
    setUploadedFile({
      cdnUrl: info.cdnUrl,
      name: info.name,
      isImage: isImage,
      mimeType: mimeType,
    });
  };

  const removeUploadedFile = () => {
    setUploadedFile(null);
  };

  return (
    <div className="flex flex-col h-full">
      <Heading
        title="Gemini"
        description="The latest Gemini 2.0 model supports Images, PDF, Audio, Video, and more as input. Also support google search to latest output"
        icon={
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg"
            alt="Gemini Icon"
            className="w-full h-full object-contain"
          />
        }
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
                      <div className="flex items-center gap-2">
                        <Switch
                          id="search-grounding"
                          checked={useSearchGrounding}
                          onCheckedChange={setUseSearchGrounding}
                        />
                        <label
                          htmlFor="search-grounding"
                          className="text-sm font-medium"
                        >
                          Enable Google Search
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        {uploadedFile ? (
                          <div className="relative inline-block">
                            {uploadedFile.isImage ? (
                              <img
                                src={uploadedFile.cdnUrl || "/placeholder.svg"}
                                alt="Uploaded file"
                                className="w-12 h-12 object-cover rounded"
                              />
                            ) : (
                              <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs">
                                {uploadedFile.name
                                  .split(".")
                                  .pop()
                                  ?.toUpperCase()}
                              </div>
                            )}
                            <Button
                              onClick={removeUploadedFile}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                            >
                              <X size={12} />
                            </Button>
                          </div>
                        ) : (
                          <Widget
                            publicKey={
                              process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY!
                            }
                            onChange={handleFileUpload}
                            tabs="file camera url facebook gdrive gphotos dropbox onedrive"
                            previewStep
                            clearable
                          />
                        )}
                        <Button
                          variant="Sketch"
                          disabled={isLoading}
                          type="submit"
                          className="w-full"
                        >
                          {isLoading ? "Generating..." : "Send"}
                        </Button>
                      </div>
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
  );
};
