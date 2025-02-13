import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star } from "lucide-react";

type Model = {
  value: string;
  label: string;
  rating: number;
  imageUrl: string;
  url?: string;
};

const chatModels: Model[] = [
  {
    value: "openai",
    label: "OpenAI",
    rating: 4.9,
    imageUrl:
      "https://cdn.prod.website-files.com/5f6bc60e665f54db361e52a9/65fde68748ee62e29dcf7a4e_logo-openai.svg",
  },
  {
    value: "gemini",
    label: "Gemini",
    rating: 4.8,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg",
  },
  {
    value: "claude",
    label: "Anthropic Claude",
    rating: 4.6,
    imageUrl:
      "https://www.gstatic.com/pantheon/images/aiplatform/model_garden/icons/icon-anthropic.png",
  },
  {
    value: "deepseek",
    label: "DeepSeek R1",
    rating: 4.9,
    imageUrl: "https://custom.typingmind.com/assets/models/deepseek.png",
  },
  {
    value: "gpt4o",
    label: "GPT-4o Latest",
    rating: 4.7,
    imageUrl:
      "https://cdn.prod.website-files.com/5f6bc60e665f54db361e52a9/65fde68748ee62e29dcf7a4e_logo-openai.svg",
  },
  {
    value: "llama",
    label: "Llama 3.3 70B",
    rating: 4.4,
    imageUrl: "https://1000logos.net/wp-content/uploads/2021/10/logo-Meta.png",
  },
  {
    value: "mistral",
    label: "Mistral-Large-2411",
    rating: 4.2,
    imageUrl: "https://azure.microsoft.com/en-us/blog/wp-content/uploads/2024/02/MSFT_Azure_FEB12_319938_Blog_BlogHeader_240226_600x600_V1.jpg",
  },
  {
    value: "perp",
    label: "Perpexility",
    rating: 4.1,
    imageUrl:
      "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/perplexity-ai-icon.png",
  },
  {
    value: "cohere",
    label: "Cohere-Command R+",
    rating: 4.1,
    imageUrl:
      "https://pbs.twimg.com/profile_images/1650250832909152260/760DZ0cv_400x400.png",
  },
  {
    value: "xai",
    label: "xAI Grok",
    rating: 3.0,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKJdfl9u2KJAQckmHmNaEagW8j1I6fmzusFy48wvw7myt49C0zVhKGOB2txycjZFFyxF8&usqp=CAU",
  },
];

const imageModels: Model[] = [
  {
    value: "dalle31",
    label: "Dall-E-3 Advance",
    rating: 4.6,
    imageUrl: "https://thinglabs.io/wp-content/uploads/dall-e-logo1.png",
  },
  {
    value: "imagen3",
    label: "Imagen 3",
    rating: 4.5,
    imageUrl: "https://i.ibb.co/71jJqMR/icon-image-generation.png",
  },
  {
    value: "flux",
    label: "Flux Pro",
    rating: 4.2,
    imageUrl: "https://avatars.githubusercontent.com/u/74630416?s=280&v=4",
  },
  {
    value: "stable",
    label: "Stable Diffusion",
    rating: 4.1,
    imageUrl:
      "https://cdn.futurepedia.io/ee1c503ee8e96ba578b0b357c233eca97d07336f-400x400.jpg",
  },
  {
    value: "dalle3",
    label: "Dall-E-3",
    rating: 4.0,
    imageUrl: "https://thinglabs.io/wp-content/uploads/dall-e-logo1.png",
  },
];

interface ModelSelectorProps {
  type: "chat" | "image";
  currentModel: string;
  onModelChange: (model: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  type,
  currentModel,
  onModelChange,
  searchTerm,
  setSearchTerm,
}) => {
  const models = type === "chat" ? chatModels : imageModels;
  const typeLabel = type === "chat" ? "Chat" : "Image";

  const handleKeywordClick = (keyword: string) => {
    setSearchTerm(keyword);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="mb-2 overflow-auto">
        <span className="dark:text-white font-semibold">
          Current {typeLabel} Model:{" "}
        </span>
        <span className="text-violet-600">
          {models.find((model) => model.value === currentModel)?.label}
        </span>
      </div>

      <Select value={currentModel} onValueChange={onModelChange}>
        <SelectTrigger className="overflow-auto dark:text-black bg-white border dark:border-black/10 rounded-md p-3 w-full">
          <SelectValue placeholder={`Select ${typeLabel} AI Model`} />
        </SelectTrigger>
        <SelectContent>
          {models.map((model) => (
            <SelectItem key={model.value} value={model.value} className="p-2">
              <div className="flex items-center space-x-2">
                <Image
                  src={model.imageUrl}
                  alt={model.label}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span>{model.label}</span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm">
                    {model.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  );
};
