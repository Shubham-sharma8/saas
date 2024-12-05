import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckIcon, CopyIcon } from 'lucide-react'

interface DisplayKeyProps {
  apiKey: string
}

export function DisplayKey({ apiKey }: DisplayKeyProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Your API Key</h2>
      <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
        <Input type="text" value={apiKey} readOnly />
        <Button onClick={handleCopy}>
          {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Keep this key safe and don&apos;t share it with others.
      </p>
    </div>
  )
}

