import { Button } from "@/components/ui/button"

interface ClaimButtonProps {
  onClaim: () => void
}

export function ClaimButton({ onClaim }: ClaimButtonProps) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Step 2: Claim Your API Key</h2>
      <Button onClick={onClaim} size="lg">
        Claim Now
      </Button>
    </div>
  )
}

