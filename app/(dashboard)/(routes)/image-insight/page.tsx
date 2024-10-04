"use client";

import * as React from "react";
import * as LR from "@uploadcare/blocks";
import { PACKAGE_VERSION } from "@uploadcare/blocks";
import { Heading } from "@/components/heading";
import dynamic from 'next/dynamic';
const ReactMarkdown = dynamic(() => import('react-markdown'), { loading: () => <p>Loading...</p> });

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import OpenAI from "openai";
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
import { Eye, Image, ImageOff, MessageSquare } from "lucide-react";
import Head from "next/head";

LR.registerBlocks(LR);

function Minimal() {
  const proModal = useProModal();
  const [messages, setMessages] = useState<OpenAI.Chat.CreateChatCompletionRequestMessage[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      model: "gemini-1.5-flash-002",
    },
  });
  const formatSize = (bytes: number) => {
    if (!bytes) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
  };
  const isLoading = form.formState.isSubmitting;
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
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: OpenAI.Chat.CreateChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };
      let newMessages = [...messages, userMessage];

      const fileUrls = files.map((file) => `${file.cdnUrl}-/format/jpeg/`);
      if (fileUrls.length > 0) {
        newMessages = newMessages.concat(fileUrls.map((url) => ({ role: "user", content: url })));
      }

      

      const output = await axios.post("/api/vision", { messages: newMessages });
      

      //  Crucial change:  Handle potential non-Markdown responses
      const botResponse =  typeof output.data === 'string' ? output.data : JSON.stringify(output.data, null, 2); // Convert JSON to pretty-printed string if needed


      setMessages([...messages, userMessage, { role: "assistant", content: botResponse }]);

    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        console.error("Error:", error);
        toast.error("Something went wrong");
      }
    }
    finally {
      router.refresh();
    }
  };
  const cleanContent = (content: string) => {
    // Remove lines starting with '0:'
    return content
    .replace(/^0:\s?/gm, '') // Remove '0:'
    .replace(/\{\s*"role":\s*"model",\s*"parts":\s*\[\s*\{\s*"text":\s*"/g, '') // Remove the JSON-like pattern
    .replace(/}\s*]\s*}/g, '');  // Remove the closing brackets
  };

  return (
    <div className={st.pageWrapper}>
      <Head>
        <title>Image Insight - Cogify</title>
        <meta
          name="description"
          content="Know everything about your image for free. "
        />
      </Head>
      <Heading
        title="Image Insight"
        description="Introducing our cutting-edge image interpretation and question-answering marvel"
        icon={Eye}
        iconColor="text-blue-500"
        bgColor="bg-blue-500/10"
      />

      <hr className={st.separator} />
      <div className="text-sm md:text-xl font-bold dark:text-white text-zinc-800 flex justify-center items-center gap-2">
        Kindly upload the image and then enter your message to get started.
      </div>

      <div className="justify-center ">
        <div className={st.center}>
          <lr-config
            ctx-name="my-uploader"
            pubkey="cd4fd5fd4190239a70a6"
            source-list="local, url, camera, dropbox, gdrive, onedrive, gphotos, instagram, facebook"
            multiple={true}
            img-only="true"
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
              onSubmit={form.handleSubmit(onSubmit)}
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
                render={({ field }) => (
                  <FormItem className="col-span-12 dark:text-black lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      {/* Replace Input with Textarea */}
                      <Textarea
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        placeholder="Enter your message here"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                className="rounded-md bg-zinc-800 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-blue-500 col-span-12 lg:col-span-2 w-full mt-5"
                type="submit"
                disabled={isLoading || files.length === 0} // Disable if loading or no files uploaded
                size="icon"
              >
                Generate
              </Button>
            </form>
            </Form>
            
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
                        a: ({ node, ...props }) => (
                          <a {...props} style={{ color: 'blue', fontWeight: 'bold', textDecoration: 'underline' }} />
                        ),
                      }}
                      className="text-sm overflow-hidden leading-7"
                    >
                      {cleanContent(message.content?.toString() || '')}
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

          {files.length > 0 && ( // Check if files array is not empty
            <div className="text-sm md:text-xl font-bold text-zinc-800 flex justify-center items-center margin-auto">
              Uploaded Images
            </div>
          )}
        </div>

<div className={st.previews}>
          {/* Map through uploaded files */}
          {files.map((file) => (
            <div key={file.uuid} className={st.previewWrapper}>
              <img
                className={st.previewImage}
                key={file.uuid}
                src={`${file.cdnUrl}-/format/jpeg/`}
                width="200"
                height="200"
                alt={file.fileInfo.originalFilename || ""}
                title={file.fileInfo.originalFilename || ""}
              />

              <p className={st.previewData}>
                Name:
                {file.fileInfo.originalFilename}
              </p>
              <p className={st.previewData}>
                Size:
                {formatSize(file.fileInfo.size)}
              </p>
              {/* Add the URL display here */}
              <p className={st.previewData}>
                Image URL:
                <Button
                  variant="link"
                  onClick={() =>
                    window.open(`${file.cdnUrl}-/format/jpeg/`, "_blank")
                  }
                  rel="noopener noreferrer"
                >
                  View Image
                </Button>
              </p>
            
                  </div>
                
               
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>

  );
}
export default Minimal;