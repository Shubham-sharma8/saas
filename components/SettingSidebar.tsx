import React from 'react'
import { motion } from 'framer-motion'
import { Sliders, User, HelpCircle } from 'lucide-react'

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const buttons = [
    { id: 'model', icon: Sliders, label: 'Model Settings' },
    { id: 'profile', icon: User, label: 'Profile Settings' },
    { id: 'help', icon: HelpCircle, label: 'Help' },
  ]

  return (
    <div className="w-20 bg-white-800 flex flex-col items-center py-8">
      {buttons.map((button) => (
        <motion.button
          key={button.id}
          className={`w-16 h-16 mb-4 rounded-lg flex items-center justify-center ${
            activeSection === button.id ? 'bg-violet-600' : 'bg-gray-700'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveSection(button.id)}
        >
          <button.icon className="text-white" size={24} />
        </motion.button>
      ))}
      <div className="absolute top-0 right-0 w-px h-full bg-gray-600" />
    </div>
  )
}

