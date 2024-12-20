import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'

const models = [
  { value: 'openai', label: 'OpenAI' },
  { value: 'gemini', label: 'Gemini' },
  { value: 'gpt4o', label: 'GPT-4o' },
  { value: 'claude', label: 'Claude 3.5 Sonnet' },
]
interface ModelSelectorProps {
  currentModel: string
  onModelChange: (model: string) => void
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ currentModel, onModelChange }) => {
  const [selectedModel, setSelectedModel] = useState(currentModel)

  useEffect(() => {
    setSelectedModel(currentModel)
  }, [currentModel])

  const handleSave = () => {
    onModelChange(selectedModel)
    const modelLabel = models.find(model => model.value === selectedModel)?.label
    toast.success(`Model changed to ${modelLabel}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="mb-2">
        <span className="dark:text-black  font-semibold">Current Model: </span>
        <span className="text-violet-600">{models.find(model => model.value === currentModel)?.label}</span>
      </div>
      <Select value={selectedModel} onValueChange={setSelectedModel}>
        <SelectTrigger className="dark:text-black  w-[200px]">
          <SelectValue placeholder="dark:text-white  Select AI Model" />
        </SelectTrigger>
        <SelectContent>
          {models.map((model) => (
            <SelectItem key={model.value} value={model.value}>
              {model.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button className="dark:text-white" onClick={handleSave}>Save Model Selection</Button>
    </motion.div>
  )
}
