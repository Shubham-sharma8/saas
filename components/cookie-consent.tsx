'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown, ChevronUp, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CookieIcon } from './cookie-icon'

type CookieCategory = {
  name: string
  description: string
  required: boolean
}

const cookieCategories: CookieCategory[] = [
  {
    name: 'Necessary',
    description: 'These cookies are essential for the website to function properly.',
    required: true
  },
  {
    name: 'Functional',
    description: 'These cookies enable personalized features and remember your preferences.',
    required: false
  },
  {
    name: 'Analytics',
    description: 'These cookies help us understand how visitors interact with the website.',
    required: false
  },
  {
    name: 'Marketing',
    description: 'These cookies are used to deliver relevant ads and track their performance.',
    required: false
  }
]

export default function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false)
  const [showQuickConsent, setShowQuickConsent] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [preferences, setPreferences] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const storedPreferences = localStorage.getItem('cookiePreferences')
    if (storedPreferences) {
      setPreferences(JSON.parse(storedPreferences))
    } else {
      setShowQuickConsent(true)
    }
  }, [])

  const handleAcceptAll = () => {
    const allAccepted = cookieCategories.reduce((acc, category) => {
      acc[category.name] = true
      return acc
    }, {} as Record<string, boolean>)
    setPreferences(allAccepted)
    localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted))
    setShowQuickConsent(false)
    setIsOpen(false)
  }

  const handleDeclineAll = () => {
    const allDeclined = cookieCategories.reduce((acc, category) => {
      acc[category.name] = category.required
      return acc
    }, {} as Record<string, boolean>)
    setPreferences(allDeclined)
    localStorage.setItem('cookiePreferences', JSON.stringify(allDeclined))
    setShowQuickConsent(false)
    setIsOpen(false)
  }

  const handleToggle = (category: string) => {
    setPreferences(prev => {
      const updated = { ...prev, [category]: !prev[category] }
      return updated
    })
  }

  const handleSave = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences))
    setIsOpen(false)
  }

  return (
    <>
      <AnimatePresence>
        {showQuickConsent && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed inset-x-0 bottom-0 z-50 bg-background border-t p-4 "
          >
            <div className="container mx-auto flex items-center justify-between ">
              <p className="text-sm text-muted-foreground">
                We use cookies to enhance your experience.
              </p>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={handleDeclineAll}>
                  Decline
                </Button>
                <Button size="sm" onClick={handleAcceptAll}>
                  Accept
                </Button>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Settings className="mr-2 h-4 w-4" />
                      Customize
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Cookie Settings</DialogTitle>
                      <DialogDescription>
                        Customize your cookie preferences here. You can enable or disable different types of cookies below.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      {cookieCategories.map((category) => (
                        <div key={category.name} className="flex items-center justify-between py-2">
                          <div>
                            <h3 className="font-semibold">{category.name}</h3>
                            <p className="text-sm text-muted-foreground">{category.description}</p>
                          </div>
                          <Switch
                            checked={preferences[category.name] || category.required}
                            onCheckedChange={() => !category.required && handleToggle(category.name)}
                            disabled={category.required}
                          />
                        </div>
                      ))}
                    </div>
                    <DialogFooter>
                      <Button onClick={handleSave}>Save preferences</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showQuickConsent && (
        <CookieIcon onClick={() => setIsOpen(true)} />
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Cookie Preferences</DialogTitle>
            <DialogDescription>
              Cogify.social uses cookies to enhance your experience and analyze our traffic. Please choose your preferences below.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {cookieCategories.map((category) => (
              <div key={category.name} className="flex items-center justify-between py-2">
                <div>
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
                <Switch
                  checked={preferences[category.name] || category.required}
                  onCheckedChange={() => !category.required && handleToggle(category.name)}
                  disabled={category.required}
                />
              </div>
            ))}
          </div>
          
          <DialogFooter className="flex justify-between ">
            <div className=" justify-item items-center">
              <Button variant="outline" onClick={handleDeclineAll} className="mr-2">
                Decline All
              </Button>
              <Button variant="outline" onClick={handleAcceptAll}>
                Accept All
              </Button>
            </div>
            <Button onClick={handleSave}>Save Preferences</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
