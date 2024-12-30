"use client";

import * as z from "zod";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Share2 } from 'lucide-react';
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loaderimage } from "@/components/loader";
import { Empty } from "@/components/ui/empty";




import { QuestionsByPage } from "./Placeholder";
import { Textarea } from "@/components/ui/textarea";
import Head from "next/head";


export const formSchema = z.object({
  prompt: z.string().min(1, { message: "Prompt is required" }),
  amount: z.string(),
  resolution: z.string(),
});


const getRandomQuestion = () => {
  // Randomly select a page
  const pages = Object.keys(QuestionsByPage);
  const randomPageIndex = Math.floor(Math.random() * pages.length);
  const randomPage = pages[randomPageIndex];

  // Randomly select a question from that page
  const questionsOnSelectedPage =
  QuestionsByPage[randomPage as keyof typeof QuestionsByPage];
  const randomQuestionIndex = Math.floor(
    Math.random() * questionsOnSelectedPage.length
  );
  const randomQuestion = questionsOnSelectedPage[randomQuestionIndex];

  return randomQuestion;
};

export const FluxAI: React.FC = () => {
  
  const [photos, setPhotos] = useState<Array<{ url: string; name: string; type: string }>>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "1x1",
    },
  });

  
  const isLoading = form.formState.isSubmitting;


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setPhotos([]);
      const response = await axios.post("/api/flux", { prompt: values.prompt });
      setPhotos(response.data);
    } catch (error) {
      toast.error("Failed to generate images.");
    }
  };

  
  const [randomQuestion, setRandomQuestion] = useState(getRandomQuestion());
  

  

 
  return (
    <div className="flex flex-col h-full">
      <Head>
        <title>Image Generation By Flux AI </title>
        <meta
          name="description"
          content="Experience the latest AI image generation with Flux AI, available for free."
        />
      </Head>
      <Heading
        title="Image Generation- Flux AI"
        description="Experience the latest AI image generation with Flux AI, available for free."
        icon={<img src="https://avatars.githubusercontent.com/u/74630416?s=280&v=4" alt="Image Generation Icon" className="w-full h-full object-contain" />} // Use the image as the icon
        iconColor="text-violet-500 "
        bgColor="bg-violet-500/10 dark:bg-white"
      />
      <div className="px-4 lg:px-8">
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
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Textarea
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder={'Describe the image you want to create. For example: '+randomQuestion}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <Button
              className="col-span-12 lg:col-span-2 w-full mt-5 "
              variant="brutal"

                disabled={isLoading}
                size="icon"
              >
                Generate
              </Button>
          </form>
        </Form>

        {isLoading && (
          <div className="p-20">
            <Loaderimage />
          </div>
        )}
        {photos.length === 0 && !isLoading && (
          <Empty label="No images generated." />
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 justify-items-center">
          {photos.map((photo, index) => (
            <Card key={index} className="rounded-lg overflow-hidden w-full max-w-md">
              <div className="relative aspect-square">
                <Image
                  src={photo.url}
                  onClick={() => window.open(photo.url)}
                  alt={`Generated Image ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  priority
                  className="cursor-pointer"
                />
              </div>
              <CardFooter className="p-2 flex space-x-2">
                <Button
                  onClick={async () => {
                    try {
                      const response = await fetch(photo.url);
                      const blob = await response.blob();
                      const link = document.createElement('a');
                      link.href = URL.createObjectURL(blob);
                      link.download = photo.name;
                      link.click();
                      URL.revokeObjectURL(link.href);
                    } catch (error) {
                      toast.error('Failed to download the image');
                    }
                  }}
                  variant="secondary"
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button
                  onClick={async () => {
                    try {
                      if (navigator.share) {
                        await navigator.share({
                          title: 'Check out this image!',
                          text: 'Here is an image I generated from Cogify.Social. Take a look!',
                          url: photo.url,
                        });
                        toast.success("Message shared successfully");
                      } else {
                        toast.error('Web Share API is not supported on this device.');
                      }
                    } catch (error) {
                      toast.error("Failed to share the image");
                    }
                  }}
                  variant="secondary"
                  className="w-full"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

