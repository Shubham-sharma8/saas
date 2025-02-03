"use client";

import * as z from "zod";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Share2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loaderimage } from "@/components/loader";
import { Empty } from "@/components/ui/empty";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { formSchema } from "./constants";

import { QuestionsByPage } from "./Placeholder";
import { Textarea } from "@/components/ui/textarea";
import Head from "next/head";

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

export const Imagen3: React.FC = () => {
  const [photos, setPhotos] = useState<string[]>([]);

  const formSchema = z.object({
    prompt: z.string().min(1, { message: "Image prompt is required" }),
    aspectRatio: z.string(),
    numberOfImages: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      aspectRatio: "1:1",
      numberOfImages: "1",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/image3", values);
      setPhotos(response.data);
    } catch (error) {
      toast.error("Failed to generate images.");
    }
  };

  const [randomQuestion, setRandomQuestion] = useState(getRandomQuestion());

  return (
    <div className="flex flex-col h-full">
      <Head>
        <title>Image Generation By Imagen 3</title>
        <meta
          name="description"
          content="Experience the latest AI image generation with Google Imagen 3, available for free."
        />
      </Head>
      <Heading
        title="Image Generation-Imagen 3"
        description="Experience the latest AI image generation with Google Imagen 3, available for free."
        icon={
          <img
            src="https://i.ibb.co/71jJqMR/icon-image-generation.png"
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
            className=" rounded-lg 
      border 
      w-full 
      p-4 
      px-3 
      md:px-6 
      focus-within:shadow-sm
      grid
      grid-cols-12
      gap-2"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-6">
                  <FormControl className="m-0 p-0">
                    <Textarea
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent min-h-[40px] flex-1 resize-none"
                      disabled={isLoading}
                      placeholder={
                        "Describe the image you want to create. For example: " +
                        randomQuestion
                      }
                      rows={1}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="aspectRatio"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="h-[40px]">
                      <SelectValue placeholder="Aspect Ratio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1:1">1:1 (1024x1024)</SelectItem>
                      <SelectItem value="3:4">3:4 (896x1280)</SelectItem>
                      <SelectItem value="4:3">4:3 (1280x896)</SelectItem>
                      <SelectItem value="9:16">9:16 (768x1408)</SelectItem>
                      <SelectItem value="16:9">16:9 (1408x768)</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              name="numberOfImages"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="h-[40px]">
                      <SelectValue placeholder="Number of Images" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button
              className="col-span-12 lg:col-span-2 w-full h-[40px]"
              type="submit"
              disabled={isLoading}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          {Array.isArray(photos) && photos.length > 0
            ? photos.map((src, index) => {
                return (
                  <Card
                    key={`${src}-${index}`}
                    className="rounded-lg overflow-hidden"
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={src}
                        onClick={() => window.open(src)}
                        alt="Generated Image"
                        layout="responsive"
                        width={500}
                        height={500}
                        objectFit="cover"
                        priority
                        className="cursor-pointer"
                      />
                    </div>
                    <CardFooter className="p-2 flex space-x-2">
                        <Button
                        onClick={async () => {
                          try {
                          const response = await fetch(src, { mode: "cors" }); // Fetch the image
                          const blob = await response.blob(); // Convert to blob
                          const link = document.createElement("a");
                          link.href = URL.createObjectURL(blob); // Create a download link
                          link.download = "image"; // Specify the download file name
                          link.target = "_blank"; // Open in new tab
                          link.click(); // Trigger the download
                          URL.revokeObjectURL(link.href); // Clean up URL object
                          } catch (error) {
                          toast.error("Failed to download the image");
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
                                title: "Check out this image!",
                                text: "Here is an image I generated from Cogify.Social. Take a look!",
                                url: src,
                              });
                              toast.success("Message shared successfully");
                            } else {
                              toast.error(
                                "Web Share API is not supported on this device."
                              );
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
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};
