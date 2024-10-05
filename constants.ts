
import {  Eye, FileCheck2, ImageIcon,  MessageCircle, MessageSquare, MessageSquarePlus, Music2 } from "lucide-react";

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
    label: 'Image Generation',
    icon: ImageIcon,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    href: '/image',
  },
 

  {
    label: 'WebAI',
    icon: MessageSquarePlus,
    href: '/webai',
    color: "text-pink-700",
    bgColor: "bg-pink-500/10",
  },
  {
    label: 'PDF Chat',
    icon: FileCheck2,
    href: '/pdf',
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },

  {
    label: 'vision',
    icon: Eye,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    href: '/vision',
  },

  {
    label: 'Audio',
    icon: Music2,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: '/audio',
  },
  {
    label: 'AdvanceGPT',
    icon: MessageCircle,
    color: "text-blue-500",
    bgColor: "bg-blue-700/10",
    href: '/advance',
  },

  
  // {
  //   label: 'Text to speech',
  //   icon: Megaphone,
  //   href: '/text-to-speech',
  //   color: "text-emerald-500",
  //   bgColor: "bg-emerald-500/10",
  // },
  // {
  //   label: 'AI Code Translator',
  //   icon: Code2,
  //   href: '/ai-code',
  //   color: "text-pink-700",
  //   bgColor: "bg-pink-700/10",
  // },

  // {
  //   label: 'Code Generation',
  //   icon: Code,
  //   color: "text-green-700",
  //   bgColor: "bg-green-700/10",
  //   href: '/code',
  // },
  
];



