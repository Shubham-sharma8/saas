"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from 'next/font/google'
import {   HomeIcon,  ImagePlus,  LayoutDashboard, MessageCircle, MessageSquare,  Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { FreeCounter } from "@/components/free-counter";
import { UserButton, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import { GalleryHorizontal } from "lucide-react";
import { Frame } from "lucide-react";

const poppins = Montserrat ({ weight: '600', subsets: ['latin'] });

const routes = [
  
    {
      label: 'Home',
      icon: HomeIcon, // Assuming you have a Home icon imported from somewhere
      href: '/', // Link to the homepage
      color: "text-blue-500" // Adjust the color according to your design
    },
  
  
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: "text-sky-500"
  },
  {
    label: 'Claude-3.5 Sonnet',
    icon: MessageSquare,
    href: '/claude-3.5',
    color: "text-violet-500",
  },
  {
    label: 'GPT-4o',
    icon: MessageSquare,
    href: '/chatgpt',
    color: "text-pink-500",
  },
  {
    label: 'Imagen3',
    icon: ImagePlus,
    href: '/imagen3',
    color: "text-red-500",
  },
  // {
  //   label: 'Image Generation',
  //   icon: ImageIcon,
  //   href: '/image',
  //   color: "text-green-500",
  // },
 
  // {
  //   label: 'WebAI',
  //   icon: MessageSquarePlus,
  //   href: '/webai',
  //   color: "text-pink-700",
  //   bgColor: "bg-black-500/10",
  // },
  // {
  //   label: 'Vision',
  //   icon: Eye,
  //   color: "text-Blue-500",
  //   href: '/vision',
  // },
  // {
  //   label: 'PDF Chat',
  //   icon: FileCheck2,
  //   href: '/pdf',
  //   color: "text-violet-500",
  //   bgColor: "bg-violet-500/10",
  // },
 
  // {
  //   label: 'Audio',
  //   icon: Music2,
  //   color: "text-pink-700",
  //   href: '/audio',
  // },
  {
    label: 'AdvanceGPT',
    icon: MessageCircle,
    color: "text-blue-500",
    bgColor: "bg-pink-700/10",
    href: 'https://try.cogify.social',
  },
 
 
  // {
  //   label: 'Text to speech Generation',
  //   icon: Megaphone,
  //   color: "text-emerald-500",
  //   href: '/text-to-speech',
  // },
  // {
  //   label: 'AI Code Translator',
  //   icon: Code2,
  //   color: "text-pink-700",
  //   href: '/ai-code',
  // },

  // {
  //   label: 'Code Generation',
  //   icon: Code,
  //   color: "text-green-700",
  //   href: '/code',
  // },
  
  
];

export const Sidebar = ({
  
}) => {
  const pathname = usePathname();
  const { user } = useUser()
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative h-8 w-8 mr-4">
            <Image fill alt="Logo" src="/logo_white.png" 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
          </div>
          <h1 className={cn("text-2xl font-bold", poppins.className)}>
            Cogify
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href} 
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter 
        
      />
      {/* User Profile Section */}
      <div className="mt-auto p-4 border-t">
        <div className="flex items-center gap-4 px-3">
          <UserButton afterSignOutUrl="/" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user?.firstName} {user?.lastName}</span>
            <span className="text-xs text-muted-foreground">{user?.emailAddresses[0].emailAddress}</span>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
