import React from 'react'
import { Control } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { modelOption } from './constants'

interface ModelSelectorProps {
  control: Control<any>
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="model"
      render={({ field }) => (
        <FormItem className="col-span-12 dark:text-black lg:col-span-2 mt-5">
          <Select
            disabled={false}
            onValueChange={field.onChange}
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
        </FormItem>
      )}
    />
  )
}

