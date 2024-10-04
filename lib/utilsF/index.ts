import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { OpenAI } from '@ai-sdk/openai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { createAnthropic } from '@ai-sdk/anthropic'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getModel() {
  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    const google = createGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY, // Google API key
    })
    return google('models/gemini-1.5-pro-latest') // Replace with the actual Google model identifier
  }

  // if (process.env.ANTHROPIC_API_KEY) {
  //   const anthropic = createAnthropic()
  //   return anthropic('claude-3-haiku-20240307')
  // }
  const openai = new OpenAI({
    baseUrl: process.env.OPENAI_API_BASE, // Optional base URL for proxies etc.
    apiKey: process.env.OPENAI_API_KEY, // Optional API key
    organization: '' // Optional organization
  });

  return openai.chat(process.env.OPENAI_API_MODEL || 'gpt-4o'); // Ensure this returns a valid model


  
}
