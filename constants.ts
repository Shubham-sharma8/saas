
import { Code, Eye, FileCheck2, Film, ImageIcon, Megaphone, MessageCircle, MessageSquare, MessageSquarePlus } from "lucide-react";

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
    label: 'AdvanceGPT',
    icon: MessageCircle,
    color: "text-blue-500",
    bgColor: "bg-blue-700/10",
    href: '/advance',
  },

  {
    label: 'WebGPT',
    icon: MessageSquarePlus,
    href: '/webgpt',
    color: "text-black-500",
    bgColor: "bg-black-500/10",
  },

  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: '/image',
  },

  {
    label: 'PDF Chat',
    icon: FileCheck2,
    href: 'https://pdf.cogify.social/',
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },

  {
    label: 'Image-Insight',
    icon: Eye,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    href: '/image-insight',
  },
  {
    label: 'Text to speech',
    icon: Megaphone,
    href: '/text-to-speech',
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  
  {
    label: 'Entertainment Suggestions',
    icon: Film,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: '/entertainment',
  },
  
  {
    label: 'Code Generation',
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: '/code',
  },
  
];



