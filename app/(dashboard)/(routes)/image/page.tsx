'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSettings } from '@/hooks/useSettings'
import { Imagen3 } from '@/components/imagen3/page'
import { DallE3 } from '@/components/DallE3/page'
import { DallE31 } from '@/components/DallE31/page'
import { FluxAI } from '@/components/flux/page'
import { StableAI } from '@/components/Stable/page'

const ImageGeneration: React.FC = () => {
  const { settings } = useSettings()

  const renderImageGen = () => {
    switch (settings.defaultImageModel) {
      case 'imagen3':
        return <Imagen3 />
        case 'flux':
        return <FluxAI />
        case 'stable':
        return <StableAI />
      case 'dalle3':
        return <DallE3 />
      case 'dalle31':
        return <DallE31 />
      default:
        return <DallE31 /> // Fallback to DALL-E 3
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={settings.defaultImageModel}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        {renderImageGen()}
      </motion.div>
    </AnimatePresence>
  )
}

export default ImageGeneration

