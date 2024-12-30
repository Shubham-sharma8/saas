"use client";

import Link from "next/link";
import Image from "next/image";
import { UserButton, useUser, useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Import } from "lucide-react";

import { Montserrat } from "next/font/google";
import {
  Code2,
  Eye,
  FileCheck2,
  HomeIcon,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  MessageSquareDashed,
  Music2,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const poppins = Montserrat({ weight: "600", subsets: ["latin"] });
const routes = [
  {
    label: "Home",
    icon: HomeIcon,
    href: "/",
    color: "text-blue-500",
  },
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Cogify Pro",
    icon: MessageSquareDashed,
    color: "text-blue-500",
    bgColor: "bg-pink-700/10",
    href: "https://try.cogify.social",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-green-500",
  },  
  {
    label: "OCR Document",
    icon: Import,
    href: "/ocr",
    color: "text-pink-500",
  },
  {
    label: "Image Colorizer",
    icon: ImageIcon,
    href: "/colorize",
    color: "text-yellow-500",
  },
 

  {
    label: "AI Code Translator",
    icon: Code2,
    color: "text-pink-700",
    href: "/codetranslate",
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { user } = useUser();
  const { openUserProfile } = useClerk();

  return (
    <div className="flex flex-col space-y-4 py-4 h-full bg-[#111827] text-white">
      {/* Header */}
      <div className="px-3 py-2">
        <Link href="/dashboard" className="flex items-center pl-3 mb-4">
          <div className="relative h-8 w-8 mr-4">
            <Image
              fill
              alt="Logo"
              src="/logo_white.png"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <h1 className={cn("text-2xl font-bold", poppins.className)}>
            Cogify
          </h1>
        </Link>
      </div>

      {/* Content (Routes List) */}
      <div className="flex-1 overflow-y-auto px-3">
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
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

      {/* Footer (User Profile Section) */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-4 px-3">
          <UserButton afterSignOutUrl="/" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {user?.firstName} {user?.lastName}
            </span>
            <span className="text-xs text-muted-foreground">
              {user?.emailAddresses[0].emailAddress}
            </span>
          </div>
          <Link href={"/settings"}>
            <Button variant="ghost" size="icon" className="ml-auto">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
