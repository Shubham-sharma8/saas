import React from 'react'
import { Control } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { modelOption } from './constants'

interface ModelSelectorProps {
  control: Control<any>
  onChange?: (value: string) => void
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ control, onChange }) => {
  return (
    <FormField
      control={control}
      name="model"
      render={({ field }) => (
        <FormItem className="w-full">
          <Select
            disabled={false}
            onValueChange={(value) => {
              field.onChange(value);
              onChange?.(value);
            }}
            value={field.value}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue defaultValue={field.value} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {modelOption.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

