import { CheckIcon } from 'lucide-react'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex justify-between mb-8">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} className="flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              i + 1 <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}
          >
            {i + 1 < currentStep ? (
              <CheckIcon className="w-5 h-5" />
            ) : (
              i + 1
            )}
          </div>
          <span className="text-sm mt-2">Step {i + 1}</span>
        </div>
      ))}
    </div>
  )
}

