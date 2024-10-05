"use client";

import * as React from "react";
import * as LR from "@uploadcare/blocks";
import { PACKAGE_VERSION } from "@uploadcare/blocks";
import { Heading } from "@/components/heading";
import { Highlight } from "@/components/ui/hero-highlight";

import dynamic from 'next/dynamic';
const ReactMarkdown = dynamic(() => import('react-markdown'), { loading: () => <p>Loading...</p> });

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

import { BotAvatar } from "@/components/bot-avatar";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { Empty } from "@/components/ui/empty";
import { useProModal } from "@/hooks/use-pro-modal";
import { formSchema } from "./constants";
import st from "./styles.module.css";
import { Eye, FileCheck2, Music2 } from "lucide-react";
import Head from "next/head";
import { useChat } from "ai/react";
import  { ChangeEvent } from 'react';



LR.registerBlocks(LR);

function Minimal() {
  const [files, setFiles] = React.useState<any[]>([]);
  const ctxProviderRef = React.useRef<any>(null);
  

  useEffect(() => {
    
    const ctxProvider = ctxProviderRef.current;
    if (!ctxProvider) return;
    const handleChangeEvent = (e: any) => {
      setFiles([...e.detail.allEntries.filter((f: any) => f.status === "success")]);
    };
    ctxProvider.addEventListener("change", handleChangeEvent);
    return () => ctxProvider.removeEventListener("change", handleChangeEvent);
  }, [setFiles]);
  
  
      const fileUrls = files.map((file) => `${file.cdnUrl}`);
      

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/pdf",
  });
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


  const proModal = useProModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      model: "gemini-1.5-flash-001",
    },
  });
  
  const isLoading = form.formState.isSubmitting;
     


  return (
    <div className={st.pageWrapper}>
      <Head>
        <title>PDF Chat - Cogify</title>
        <meta
          name="description"
          content="Chat with your pdf and Google Gemini for Free!!"
        />
      </Head>
      <Heading
        title="PDF Chat"
        description="Introducing to play with audio. get audio diarization, translation, and more."
        icon={FileCheck2}
        iconColor="text-pink-700"
        bgColor="bg-pink-10"
      />

      <hr className={st.separator} />
      <div className="text-sm md:text-xl font-bold dark:text-white text-zinc-800 flex justify-center items-center gap-2">
      <Highlight className="text-xl md:text-2xl lg:text-3xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center">
          Upload only PDF upto 10 MB.
        </Highlight>      
      </div>
      <div className="justify-center ">
        <div className={st.center}>
          <lr-config
            ctx-name="my-uploader"
            pubkey="cd4fd5fd4190239a70a6"
            source-list="local, url, camera, dropbox, gdrive, onedrive, gphotos, instagram, facebook"
            multiple={false}
            img-only="false"
          ></lr-config>
          <lr-file-uploader-inline
            ctx-name="my-uploader"
            css-src={`https://cdn.jsdelivr.net/npm/@uploadcare/blocks@${PACKAGE_VERSION}/web/lr-file-uploader-regular.min.css`}
          ></lr-file-uploader-inline>
          <lr-upload-ctx-provider
            ctx-name="my-uploader"
            ref={ctxProviderRef}
          ></lr-upload-ctx-provider>
        </div>
      </div>

      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={e => {
                handleSubmit(e, {
                  data: { pdfURL: fileUrls.toString()},
                });
              }}
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
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                  <Textarea
                      ref={textareaRef}
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent resize-none overflow-hidden"
                      value={input}
                      placeholder="Enter your message here"
                      onChange={handleChange}
                    />
                    </FormControl>
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
          {isLoading && <Loader />}
          {messages.length === 0 && !isLoading && <Empty label="No conversation started." />}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div key={index} className={cn("relative p-8 w-full flex items-start gap-x-8 rounded-lg", message.role === "user" ? "bg-white border border-black/10" : "bg-muted")}>
                <div className="flex items-start gap-x-8">
                  {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                  <div className="text-sm whitespace-pre-wrap flex-1">
                  <ReactMarkdown
                  components={{
                    pre: ({ node, ...props }) => (
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
                    </div>
                    </div>
          ))}
        </div>
                    
                    <div
          className={st.previews}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >

        </div>
        </div>
      </div>
    </div>
  
  );
}
export default Minimal;