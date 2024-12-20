
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
     label: 'Image 2.0',
     icon: GalleryHorizontalEnd,
     href: '/image2.0',
     color: "text-green-500",
     bgColor: "bg-violet-500/10",
   },
   {
     label: 'Imagen3',
     icon: ImagePlus,
     href: '/imagen3',
     color: "text-red-500",
     bgColor: "bg-violet-500/10",
   },

  
  {
    label: 'vision',
    icon: Eye,
    color: "text-blue-500",
    bgColor: "bg-violet-500/10",
    href: '/vision',
  },

  {
      label: 'Vision 2.0',
      icon: ImageMinus,
      href: '/vision2.0',
      color: "text-pink-500",
      bgColor: "bg-violet-500/10",
    },

  {
    label: 'PDF Chat',
    icon: FileCheck2,
    href: '/pdf',
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },

  
  {
    label: 'Audio',
    icon: Music2,
    color: "text-pink-700",
    bgColor: "bg-violet-500/10",
    href: '/audio',
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



