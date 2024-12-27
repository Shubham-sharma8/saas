'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Loading() {
  const { resolvedTheme } = useTheme()
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 5) return ''
        return prev + '.'
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-20 h-20 relative animate-spin">
        <Image
          src={resolvedTheme === 'dark' ? '/logo_white.png' : '/logo.png'}
          alt="Cogify Logo"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Cogify is thinking{dots}
      </p>
    </div>
  )
}

