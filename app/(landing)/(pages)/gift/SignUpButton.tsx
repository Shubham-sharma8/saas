import { SignUpButton as ClerkSignUpButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"

export function SignUpButton() {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Step 1: Sign Up</h2>
      <p className="text-center text-sm mb-2">Create your account to access Google Generative AI Gemini and other tools.</p>
      <ul className="list-disc list-inside mb-4 text-sm">
        <li>Step 1: Click the button below to sign up.</li>
        <li>Step 2: Verify your email address.</li>
        <li>Step 3: Visit this page again and claim your API key.</li>
      </ul>
      <ClerkSignUpButton mode="modal">
        <Button size="lg" className="bg-blue-500 text-white hover:bg-blue-600">
          Sign Up Now
        </Button>
      </ClerkSignUpButton>
      <p className="text-xs mt-2 text-gray-500">No credit card required. Sign up in less than a minute.</p>
    </div>
  )
}