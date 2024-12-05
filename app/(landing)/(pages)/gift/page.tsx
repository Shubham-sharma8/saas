'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { SignUpButton } from './SignUpButton'
import { ClaimButton } from './ClaimButton'
import { DisplayKey } from './DisplayKey'
import { StepIndicator } from './StepIndicator'
import Image from 'next/image'

export default function GiftPage() {
  const { isSignedIn, isLoaded } = useUser()
  const [step, setStep] = useState(1)
  const [apiKey, setApiKey] = useState('')

  const handleClaim = () => {
    // Simulate API key generation
    setApiKey('AIzaSyAjH17ysZerJi5OC4BjjzFKC6GhtpQlj5Y')
    setStep(2)
  }

  return (
    <div className="container mx-auto  p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Get Your Free Google Generative AI API Key
      </h1>
      {/* Image Section */}
      

      <div className="mb-6">
        <Image
          src="/gemini.png"
          alt="AI Tools"
          width={400}
          height={300}
          className="mx-auto rounded-lg shadow-lg"
        />
        <p className="text-center text-sm mt-2">Enhance your workflow with powerful AI tools</p>
      </div>

      

      <StepIndicator currentStep={step} totalSteps={2} />

      {step === 1 && (
        isSignedIn ? (
          <ClaimButton onClaim={handleClaim} />
        ) : (
          <SignUpButton />
        )
      )}

      {step === 2 && <DisplayKey apiKey={apiKey} />}
    </div>
  )
}
