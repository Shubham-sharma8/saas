'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser } from '@clerk/nextjs'
import { UserProfile } from '@clerk/nextjs'
import { ModelSelector } from '@/components/ModelSelector'
import { AISettings } from '@/components/AISettings'
import { useSettings } from '@/hooks/useSettings'
import { Sidebar } from '@/components/SettingSidebar'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Toaster } from 'react-hot-toast'

const SettingsPage = () => {
  const { user } = useUser()
  const { settings, updateSettings } = useSettings()
  const [activeSection, setActiveSection] = useState('model')
  const router = useRouter()

  useEffect(() => {
    // This effect ensures that the component re-renders when settings change
  }, [settings])

  if (!user) return null

  const renderContent = () => {
    switch (activeSection) {
      case 'model':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold dark:text-black mb-4">AI Model Settings</h2>
            <ModelSelector
              currentModel={settings.defaultModel}
              onModelChange={(model) => updateSettings({ defaultModel: model })}
            />
            <AISettings settings={settings} updateSettings={updateSettings} />
          </motion.div>
        )
      case 'profile':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl dark:text-black font-semibold mb-4">Profile Settings</h2>
            <UserProfile />
          </motion.div>
        )
      case 'help':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl dark:text-black  font-semibold mb-4">Help Center</h2>
            <p className="mb-4 dark:text-black  ">Need assistance? Visit our help center for more information.</p>
            <Button className=" dark:text-white  " onClick={() => router.push('/help')}>Get Help</Button>
          </motion.div>
        )
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Settings</h1>
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  )
}

export default SettingsPage

