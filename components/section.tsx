'use client'

import { cn } from '@/lib/utils'
import {
  Book,
  Film,
  Image,
  MessageCircle,
  Newspaper,
  Repeat2,
  Search
} from 'lucide-react'
import React from 'react'
import { Separator } from './ui/separator'

type SectionProps = {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
  title?: string
  separator?: boolean
}

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  size = 'md',
  title,
  separator = false
}) => {
  let icon: React.ReactNode
  switch (title) {
    case 'Images':
      
      icon = <Image size={18} className="mr-2" />
      break
    case 'Videos':
      icon = <Film size={18} className="mr-2" />
      break
    case 'Sources':
      icon = <Newspaper size={18} className="mr-2" />
      break
    case 'Answer':
      icon = <Book size={18} className="mr-2" />
      break
    case 'Related':
      icon = <Repeat2 size={18} className="mr-2" />
      break
    case 'Follow-up':
      icon = <MessageCircle size={18} className="mr-2" />
      break
    default:
      icon = <Search size={18} className="mr-2" />
  }

  return (
    <>
      {separator && <Separator className="my-2 bg-primary/10" />}
      <section
        className={cn(
          ` ${size === 'sm' ? 'py-1' : size === 'lg' ? 'py-4' : 'py-2'}`,
          className
        )}
      >
        {title && (
          <h2 className="flex items-center text-lg leading-none py-2">
            {icon}
            {title}
          </h2>
        )}
        {children}
      </section>
    </>
  )
}
