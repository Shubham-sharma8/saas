"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Info,
  MoreHorizontal,
  X,
} from "lucide-react";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import dynamic from "next/dynamic";
import { CodeBlock } from "./code-block";
import { cn } from "@/lib/utilsAdvace";
import React from "react";
import { Clipboard, Share, Speaker, Edit, Download } from "lucide-react";
import { toast } from "react-hot-toast";

import clsx from "clsx"; // For conditional class management

const ReactMarkdown = dynamic(() => import("react-markdown"), { ssr: false });

interface GroundingSource {
  url: string;
  title: string;
}

interface MessageProps {
  message: any;
  isExpanded?: boolean;
  groundingSources?: GroundingSource[];
}

export const Message: React.FC<MessageProps> = ({
  message,
  isExpanded = true,
  groundingSources,
}) => {
  const [expanded, setExpanded] = useState(isExpanded);
  const [menuOpen, setMenuOpen] = useState(false);
  const isCodeBlock = message.content.includes("```");
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.content);

  const processContent = (content: string) => {
    return content.replace(/\[(\d+)\]/g, (match, num) => {
      return `[${num}](${groundingSources?.[parseInt(num) - 1]?.url || "#"})`;
    });
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    toast.success("Copied to clipboard");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Shared Message",
          text: message.content,
        })
        .then(() => toast.success("Shared successfully"))
        .catch((error) => toast.error(error.message));
    } else {
      toast.error("Sharing is not supported in this browser");
    }
  };
  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(message.content);
    speechSynthesis.speak(utterance);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    if (editedContent !== message.content) {
      // Assuming there's a callback to update the message in the parent component
      message.onEdit?.(editedContent);
      toast.success("Edit saved");
    } else {
      toast.error("No changes made");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([message.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "message.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Downloaded successfully");
  };

  // Extract code blocks from message content
  const parseCodeBlocks = (content: string) => {
    const blocks = content.split("```");
    return blocks.map((block, index) => {
      if (index % 2 === 1) {
        const [language, ...code] = block.split("\n");
        return {
          type: "code",
          language: language.trim(),
          content: code.join("\n").trim(),
        };
      }
      return {
        type: "text",
        content: block,
      };
    });
  };

  const blocks = isCodeBlock ? parseCodeBlocks(message.content) : [];

  return (
    <div className="w-full max-w-10xl mx-auto mb-4">
      <div
        className={cn(
          "flex items-start gap-4 p-4 rounded-lg transition-colors",
          message.role === "user"
            ? "bg-blue-50 dark:bg-blue-900/20"
            : "bg-purple-50 dark:bg-purple-900/20",
          "hover:bg-gray-50 dark:hover:bg-gray-900"
        )}
      >
        {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
        <div className="flex-1">
          <div className="flex items-center gap-4 justify-between">
            <Button
              variant="ghost"
              className="px-0 hover:bg-transparent"
              onClick={() => setExpanded(!expanded)}
            >
              <span className="font-medium text-left dark:text-white">
                {message.role === "user" ? "You" : "Cogify"}
              </span>
              {expanded ? (
                <ChevronUp className="h-4 w-4 ml-2" />
              ) : (
                <ChevronDown className="h-4 w-4 ml-2" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen(true)}
              className="dark:text-white"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-2"
            >
              {isCodeBlock ? (
                <div className="space-y-4">
                  {blocks.map((block, index) => (
                    <div key={index}>
                      {block.type === "code" ? (
                        <CodeBlock
                          language={block.language || ""}
                          code={block.content}
                        />
                      ) : (
                        <div className="dark:text-gray-200">
                          <ReactMarkdown className="prose dark:prose-invert max-w-none">
                            {block.content}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="dark:text-gray-200">
                  <ReactMarkdown className="prose dark:prose-invert max-w-none">
                    {message.content}
                  </ReactMarkdown>
                </div>
              )}
              {groundingSources && groundingSources.length > 0 && (
                <Card className="p-4 mt-4 bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4" />
                    <h3 className="font-medium">Grounding Sources</h3>
                  </div>
                  <ul className="space-y-2">
                    {groundingSources.map((source, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          [{index + 1}]
                        </span>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                        >
                          {source.title}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Overlay Menu */}
      {/* Overlay Menu */}
      {menuOpen && (
        <div
          className={clsx(
            "fixed inset-0 z-50 flex items-center dark:text-black justify-center bg-black bg-opacity-50"
          )}
        >
          <div
            className={clsx(
              "bg-white rounded-lg shadow-lg w-full  max-w-md p-4 overflow-y-auto max-h-[80vh]"
            )}
          >
            {/* Close Button */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Actions</h2>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col space-y-2">
              <Button
                size="sm"
                variant="ghost"
                className="justify-start"
                onClick={handleCopy}
              >
                <Clipboard className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="justify-start"
                onClick={handleShare}
              >
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="justify-start"
                onClick={handleSpeak}
              >
                <Speaker className="w-4 h-4 mr-2" />
                Speak
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="justify-start"
                onClick={handleEdit}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="justify-start"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
