import React from 'react'
import { motion } from 'framer-motion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const chatModels = [
  { value: 'openai', label: 'OpenAI' },
  { value: 'gemini', label: 'Gemini' },
  { value: 'gpt4o', label: 'GPT-4o' },
  { value: 'mistral', label: 'Mistral-Large-2411' },
  { value: 'cohere', label: 'Cohere-Command R+' },
  { value: 'claude', label: 'Claude 3.5 Sonnet' },
]

const imageModels = [
  { value: 'dalle31', label: 'Dall-E-3 Advance' },
  { value: 'imagen3', label: 'Imagen 3' },
  { value: 'dalle3', label: 'Dall-E-3' },
]

interface ModelSelectorProps {
  type: 'chat' | 'image'
  currentModel: string
  onModelChange: (model: string) => void
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ type, currentModel, onModelChange }) => {
  const models = type === 'chat' ? chatModels : imageModels
  const typeLabel = type === 'chat' ? 'Chat' : 'Image'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="mb-2">
        <span className="dark:text-white font-semibold">Current {typeLabel} Model: </span>
        <span className="text-violet-600">
          {models.find(model => model.value === currentModel)?.label}
        </span>
      </div>
      <Select value={currentModel} onValueChange={onModelChange}>
        <SelectTrigger className="dark:text-black bg-white border dark:border-black/10 rounded-md p-3 w-full">
          <SelectValue placeholder={`Select ${typeLabel} AI Model`} />
        </SelectTrigger>
        <SelectContent>
          {models.map(model => (
            <SelectItem key={model.value} value={model.value}>
              {model.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  )
}
