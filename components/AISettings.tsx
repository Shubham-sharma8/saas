import React from 'react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

interface AISettingsProps {
  settings: {
    defaultModel: string
    temperature: number
    streamResponse: boolean
  }
  updateSettings: (newSettings: Partial<AISettingsProps['settings']>) => void
}

export const AISettings: React.FC<AISettingsProps> = ({ settings, updateSettings }) => {
  return (
    <div className=" space-y-6">
      <div className="space-y-2">
        <Label htmlFor="temperature">Temperature: {settings.temperature.toFixed(1)}</Label>
        <Slider
          id="temperature"
          min={0}
          max={1}
          step={0.1}
          value={[settings.temperature]}
          onValueChange={(value) => updateSettings({ temperature: value[0] })}
        />
      </div>
    </div>
  )
}

