
import {  ImageIcon,  MessageSquare,  Code2, Import, SearchIcon } from "lucide-react";


export const tools = [
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: '/conversation',
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },

  {
    label: 'Advance Search',
    icon: SearchIcon,
    href: '/advance',
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
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
    icon: Import,
    color: "text-pink-500",
    bgColor: "bg-violet-500/10",
    href: '/ocr',
  },
  {
    label: 'Image Colorizer',
    icon: ImageIcon,
    color: "text-yellow-500",
    bgColor: "bg-violet-500/10",
    href: '/colorize',
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



