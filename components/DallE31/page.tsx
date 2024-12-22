"use client";

import * as z from "zod";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Share2 } from 'lucide-react';
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loaderimage } from "@/components/loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProModal } from "@/hooks/use-pro-modal";

import {
  amountOptions,
  modelforImage,
  formSchema,
  resolutionOptions,
  styleOption,
  colorOption,
} from "./constants";

import { audioquestionsByPage } from "./audioquestion";
import { Textarea } from "@/components/ui/textarea";
import Head from "next/head";
import {ImageModal} from "../ui/image-modal";


const getRandomQuestion = () => {
  // Randomly select a page
  const pages = Object.keys(audioquestionsByPage);
  const randomPageIndex = Math.floor(Math.random() * pages.length);
  const randomPage = pages[randomPageIndex];

  // Randomly select a question from that page
  const questionsOnSelectedPage =
    audioquestionsByPage[randomPage as keyof typeof audioquestionsByPage];
  const randomQuestionIndex = Math.floor(
    Math.random() * questionsOnSelectedPage.length
  );
  const randomQuestion = questionsOnSelectedPage[randomQuestionIndex];

  return randomQuestion;
};

export const DallE31: React.FC = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [photos, setPhotos] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "1024x1792", // Default resolution for DALL-E 2
      modelImage: "dall-e-3",
      styleOption: "", // Empty string is acceptable for optional fields
      colorOption: "", // Empty string is acceptable for optional fields
    },
  });
  
  const clearSelections = () => {
    form.setValue("styleOption", "");
    form.setValue("colorOption", "");
    // Force a re-render of the select components
    form.trigger(["styleOption", "colorOption"]);
  };

  const filteredResolutionOptions = (modelImage: string) => {
    if (modelImage === "dall-e-3") {
      // If DALL-E 3 is selected, exclude certain resolutions
      return resolutionOptions.filter(
        (option) => !["256x256", "512x512"].includes(option.value)
      );
    } else if (modelImage === "dall-e-2") {
      // If DALL-E 2 is selected, exclude certain resolutions
      return resolutionOptions.filter(
        (option) => !["1024x1792", "1792x1024"].includes(option.value)
      );
    }
    // Default case: return all resolution options
    return resolutionOptions;
  };

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setPhotos([]);
  
      let prompt = values.prompt;
  
      const selectedStyleOption = values.styleOption;
      const selectedStyleLabel =
        styleOption.find((option) => option.value === selectedStyleOption)
          ?.label || "";
  
      const selectedColorOption = values.colorOption;
      const selectedColorLabel =
        colorOption.find((option) => option.value === selectedColorOption)
          ?.label || "";
  
      prompt += selectedStyleLabel + selectedColorLabel;
  
      const response = await axios.post("/api/image", { ...values, prompt });
      const urls = response.data.map((image: { url: string }) => image.url);
      setPhotos(urls);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      router.refresh();
    }
  };
  

  function chunkArray<T>(array: T[], size: number): T[][] {
    const chunkedArray: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  }


  const [randomQuestion, setRandomQuestion] = useState(getRandomQuestion());
  const modelImage = form.getValues("modelImage"); // Extracted variable
  const [showSecondMessage, setShowSecondMessage] = useState(false);

  

  useEffect(() => {
    if (modelImage === "dall-e-3") {
      form.setValue("amount", "1");
      form.setValue("resolution", "1024x1024"); // Set default resolution to 1024x1024
    } else {
      // Reset default values for other models
      form.setValue("amount", "1");
      form.setValue("resolution", "512x512"); // Set default resolution to 512x512 for DALL-E 2
    }
  }, [modelImage, form]);

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
        title="Image Generation"
        description="Get AI based Image with Dall-E3: The best AI image generation model."
        icon={<img src="https://cdn.prod.website-files.com/5f6bc60e665f54db361e52a9/65fde68748ee62e29dcf7a4e_logo-openai.svg" alt="Image Generation Icon" className="w-full h-full object-contain" />} // Use the image as the icon
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
                <FormItem className="col-span-12 lg:col-span-4">
                  <FormControl className="m-0 p-0">
                    <Textarea
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder={randomQuestion}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {["dall-e-3"].includes(form.getValues("modelImage")) && (
              <FormField
                control={form.control}
                name="resolution"
                render={({ field, fieldState: { error } }) => (
                  <FormItem className="col-span-12 dark:text-white lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={(value) => {
                        field.onChange(value);
                        // This is to clear errors if the users pick an option after an error was shown
                        form.clearErrors("resolution");
                      }}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={`border-2 ${
                            error ? "border-red-500" : "border-gray-300"
                          } rounded-md shadow-sm`}
                        >
                          <SelectValue>
                            {field.value
                              ? resolutionOptions.find(
                                  (option) => option.value === field.value
                                )?.label
                              : "Resolution"}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {filteredResolutionOptions(
                          form.getValues("modelImage")
                        ).map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {error && (
                      <span className="text-red-500 text-sm mt-1">
                        {"Kindly select the resolution"}
                      </span>
                    )}
                  </FormItem>
                )}
              />
            )}

            {["dall-e-3"].includes(form.getValues("modelImage")) && (
              <FormField
                control={form.control}
                name="styleOption"
                render={({ field }) => (
                  <FormItem className="col-span-12 dark:text-white lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue>
                          {field.value || "Select Style"}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[500px] overflow-y-auto">
                        <div className="grid grid-cols-2 gap-2 dark:text-white p-2 overflow-y-auto max-h-[500px]">
                          {styleOption.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="flex flex-col items-center p-2 cursor-pointer hover:bg-accent rounded-md"
                            >
                              <img
                                src={option.image}
                                alt={option.label}
                                className="w-16 h-12 object-cover rounded-md mb-1"
                              />
                              <span className="text-xs">{option.label}</span>
                            </SelectItem>
                          ))}
                        </div>
                      </SelectContent>
                    </Select>
                    
                  </FormItem>
                )}
              />
            )}

            {form.getValues("modelImage") === "dall-e-3" && (
              <FormField
                control={form.control}
                name="colorOption"
                render={({ field }) => (
                  <FormItem className="col-span-12 dark:text-white lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue>
                          {field.value || "Select Color"}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {colorOption.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className="flex items-center gap-2"
                          >
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{
                                background:
                                  option.value === "Warm Tone"
                                    ? "linear-gradient(45deg, #ff8a00, #ff2e00)"
                                    : option.value === "Cool Tone"
                                    ? "linear-gradient(45deg, #00c6ff, #0072ff)"
                                    : option.value === "Muted Color"
                                    ? "#98a4ae"
                                    : option.value === "Vibrant Color"
                                    ? "linear-gradient(45deg, #ff0080, #7928ca)"
                                    : option.value === "Black and White"
                                    ? "linear-gradient(45deg, #000000, #ffffff)"
                                    : "linear-gradient(45deg, #ffafbd, #ffc3a0)",
                              }}
                            />
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="col-span-12 dark:text-white lg:col-span-2">
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
                      {amountOptions.map((option) => (
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
              type="button"
              variant="outline"
              onClick={clearSelections}
              className="col-span-12 lg:col-span-2 lg:col-start-11 h-8 text-sm"
            >
              Clear
            </Button>

            <Button
              className=" col-span-12 lg:col-span-12 w-full mt-5 "
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
              link.download = "generated-image.png";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          />
        )}
      </div>
    </div>
  );
};

