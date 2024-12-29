
import { GalleryHorizontalEnd, Eye, ImagePlus, FileCheck2, ImageIcon,  MessageCircle, MessageSquare, MessageSquarePlus, Music2, MessagesSquare, Code2, MessageSquareDashed, ImageMinus } from "lucide-react";

export const MAX_FREE_COUNTS = 500;

export const tools = [
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: '/conversation',
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
 
  
  
  {
    label: 'Cogify Pro',
    icon: MessageSquareDashed,
    color: "text-blue-500",
    bgColor: "bg-violet-500/10",
    href: 'https://try.cogify.social',
  },
  
  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: "text-green-500",
    bgColor: "bg-violet-500/10",
    href: '/image',
  },
  
  {
    label: 'OCR Document',
    icon: ImageMinus,
    color: "text-pink-500",
    bgColor: "bg-violet-500/10",
    href: '/ocr',
  },
   

  
  {
    label: 'vision',
    icon: Eye,
    color: "text-blue-500",
    bgColor: "bg-violet-500/10",
    href: '/vision',
  },

  

  


 
  {
    label: 'AI Code Translator',
    icon: Code2,
    href: '/codetranslate',
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
  },

  
  // {
  //   label: 'Text to speech',
  //   icon: Megaphone,
  //   href: '/text-to-speech',
  //   color: "text-emerald-500",
  //   bgColor: "bg-emerald-500/10",
  // },
  

  // {
  //   label: 'Code Generation',
  //   icon: Code,
  //   color: "text-green-700",
  //   bgColor: "bg-green-700/10",
  //   href: '/code',
  // },
  
];



