import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Clipboard, Share, Speaker, Edit, Download, MoreHorizontal, X } from 'lucide-react'
import { UserAvatar } from '@/components/user-avatar'
import { BotAvatar } from '@/components/bot-avatar'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'
import dynamic from 'next/dynamic'
import clsx from 'clsx' // For conditional class management

const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false })

interface MessageProps {
  message: any
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(message.content)
  const [menuOpen, setMenuOpen] = useState(false) // State to toggle the collapsible menu

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    toast.success('Copied to clipboard')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Shared Message',
          text: message.content,
        })
        .then(() => toast.success('Shared successfully'))
        .catch((error) => toast.error('Failed to share: ' + error.message))
    } else {
      toast.error('Sharing is not supported in this browser')
    }
  }
  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(message.content)
    speechSynthesis.speak(utterance)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSaveEdit = () => {
    setIsEditing(false)
    if (editedContent !== message.content) {
      // Assuming there's a callback to update the message in the parent component
      message.onEdit?.(editedContent)
      toast.success('Edit saved')
    } else {
      toast.error('No changes made')
    }
  }
  

  const handleDownload = () => {
    const blob = new Blob([message.content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'message.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded successfully')
  }

  return (
    <motion.div
      className={clsx(
        'p-4 rounded-lg transition-colors duration-300',
        message.role === 'user' ? 'bg-violet-100' : 'bg-gray-100',
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start space-x-4">
        {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
        <div className="flex-grow">
          {isEditing ? (
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className={clsx(
                'w-full p-2 rounded border',
              )}
            />
          ) : (
            <ReactMarkdown className="prose dark:text-black">{message.content}</ReactMarkdown>
          )}
        </div>
        <div>
          {/* Main Button to Toggle Menu */}
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setMenuOpen(true)}
            aria-label="More options"
          >
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </div>
      {isEditing && (
        <div className="mt-2 flex justify-end">
          <Button onClick={handleSaveEdit}>Save</Button>
        </div>
      )}

      {/* Overlay Menu */}
      {menuOpen && (
        <div
          className={clsx(
            'fixed inset-0 z-50 flex items-center dark:text-black justify-center bg-black bg-opacity-50'
          )}
        >
          <div
            className={clsx(
              'bg-white rounded-lg shadow-lg w-full  max-w-md p-4 overflow-y-auto max-h-[80vh]',
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
    </motion.div>
  )
}
