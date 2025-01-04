'use client'

import { Share2, Copy } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface ShareActionsProps {
  className?: string
}

export function ShareActions({ className }: ShareActionsProps) {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: window.location.href
        })
      } else {
        // Fallback to copying the URL if Web Share API is not available
        handleCopy()
      }
    } catch (error) {
      console.error('Error sharing:', error)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success('URL copied to clipboard')
    } catch (error) {
      console.error('Error copying:', error)
      toast.error('Failed to copy URL')
    }
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleShare}
        aria-label="Share"
      >
        <Share2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopy}
        aria-label="Copy URL"
      >
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  )
}

