"use client";

import * as z from "zod";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, ImageIcon, SearchX, Share2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loaderimage } from "@/components/loader";

import { QuestionsByPage } from "./audioquestion";
import { Textarea } from "@/components/ui/textarea";
import Head from "next/head";
import { ImageModal } from "../ui/image-modal";

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

export const DallE3: React.FC = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const formSchema = z.object({
    prompt: z.string().min(1, {
      message: "Prompt is required.",
    }),
    model: z.string().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/image2.0", values);
      setPhotos(response.data);
    } catch (error) {
      toast.error("Failed to generate images.");
    }
  };

  const [randomQuestion, setRandomQuestion] = useState(getRandomQuestion());

  return (
    <div className="flex flex-col h-full">
      <Head>
        <title>Image Generation - Cogify</title>
        <meta
          name="description"
          content="Get AI based Image with DAll-e3 for free "
        />
      </Head>
      <Heading
        title="Image Generation By DALL-E-3. "
        description="Get AI based Image with DAll-e3: The best AI image generation model."
        icon={
          <img
            src="https://thinglabs.io/wp-content/uploads/dall-e-logo1.png"
            alt="Image Generation Icon"
            className="w-full h-full object-contain"
          />
        } // Use the image as the icon
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
                      placeholder={
                        "Describe the image you want to create. For example: " +
                        randomQuestion
                      }
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              className="col-span-12 lg:col-span-2 w-full mt-5 "
              variant="Sketch"
              disabled={isLoading}
              size="icon"
            >
              Generate
            </Button>
          </form>
        </Form>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-20">
              <Loaderimage />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {photos.map((src) => (
              <Card key={src} className="rounded-lg overflow-hidden">
                <div
                  className="relative aspect-square cursor-pointer"
                  onClick={() => setSelectedImage(src)}
                >
                  <Image
                    src={src}
                    alt="Generated Image"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <CardFooter className="p-2">
                  <Button
                    onClick={() => {
                      const link = document.createElement("a");
                      link.target = "_blank"; // Open in new tab
                      link.href = src;
                      link.download = "generated-image.png";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    variant="secondary"
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {selectedImage && (
            <ImageModal
              src={selectedImage}
              onClose={() => setSelectedImage(null)}
              onDownload={() => {
                const link = document.createElement("a");
                link.href = selectedImage;
                link.target = "_blank"; // Open in new tab

                link.download = "generated-image.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
