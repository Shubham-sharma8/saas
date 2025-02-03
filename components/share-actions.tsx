"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { History, Share2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

interface ShareActionsProps {
  className?: string;
  chats: ChatUrl[];
}

type ChatUrl = {
  id: string;
  title: string;
  createdAt: Date;
  path: string;
};

export function ShareActions({ className, chats }: ShareActionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator
          .share({
            title: document.title,
            url: window.location.href,
          })
          .then(() => toast.success("Shared successfully"))
          .catch((error) => toast.error(error.message));
      } else {
        handleCopy();
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("URL copied to clipboard");
    } catch (error) {
      console.error("Error copying:", error);
      toast.error("Failed to copy URL");
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="w-10 h-10 p-2">
            <History className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>Chat History</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-5rem)] mt-4">
            <ul className="space-y-2">
              {chats.map((chat) => (
                <li key={chat.id}>
                  <Link
                    href={chat.path}
                    className="block hover:bg-accent hover:text-accent-foreground p-2 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="font-medium">{chat.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(chat.createdAt), {
                        addSuffix: true,
                      })}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </SheetContent>
      </Sheet>
      <Button
        variant="outline"
        size="icon"
        onClick={handleShare}
        className="w-10 h-10 p-2"
      >
        <Share2 className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handleCopy}
        className="w-10 h-10 p-2"
      >
        <Copy className="h-5 w-5" />
      </Button>
    </div>
  );
}
