import { experimental_createProviderRegistry as createProviderRegistry } from 'ai'
import { openai, createOpenAI } from '@ai-sdk/openai'
import { anthropic } from '@ai-sdk/anthropic'
import { google } from '@ai-sdk/google'
import { createAzure } from '@ai-sdk/azure'
import { createMistral } from '@ai-sdk/mistral';
import { createCohere } from '@ai-sdk/cohere';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';


export const registry = createProviderRegistry({
  openai,
  anthropic,
  google,
  mistral: createMistral({
    baseURL: process.env.AZURE_INFERENCE_ENDPOINT_MISTRAL || "",
    apiKey: process.env.AZURE_INFERENCE_CREDENTIAL_MISTRAL || ""
  }),
  cohere: createCohere({
    baseURL: process.env.AZURE_INFERENCE_ENDPOINT_COHERE || "",
    apiKey: process.env.AZURE_INFERENCE_CREDENTIAL_COHERE || "",
  }),

  groq: createOpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: 'https://api.groq.com/openai/v1'
  }),
  
  azure: createAzure({
    apiKey: process.env.AZURE_API_KEY,
    resourceName: process.env.AZURE_RESOURCE_NAME
  }),
  'openai-compatible': createOpenAI({
    apiKey: process.env.OPENAI_COMPATIBLE_API_KEY,
    baseURL: process.env.OPENAI_COMPATIBLE_API_BASE_URL
  }),
  'llama': createOpenAICompatible({
    name: 'llama',
    headers: {
      Authorization: `Bearer ${process.env.AZURE_INFERENCE_CREDENTIAL_LLAMA}`,
    },
    baseURL: process.env.AZURE_INFERENCE_ENDPOINT_LLAMA,
  }),

})

export function getModel(model: string) {
  return registry.languageModel(model)
}

export function isProviderEnabled(providerId: string): boolean {
  switch (providerId) {
    case 'openai':
      return !!process.env.OPENAI_API_KEY
    case 'anthropic':
      return !!process.env.ANTHROPIC_API_KEY
    case 'google':
      return !!process.env.GOOGLE_GENERATIVE_AI_API_KEY
    case 'groq':
      return !!process.env.GROQ_API_KEY
    case 'ollama':
      return !!process.env.OLLAMA_BASE_URL
    case 'azure':
      return !!process.env.AZURE_API_KEY && !!process.env.AZURE_RESOURCE_NAME
    case 'mistral':
      return !!process.env.AZURE_INFERENCE_ENDPOINT_MISTRAL && !!process.env.AZURE_INFERENCE_CREDENTIAL_MISTRAL
    case 'cohere':
      return !!process.env.AZURE_INFERENCE_ENDPOINT_COHERE && !!process.env.AZURE_INFERENCE_CREDENTIAL_COHERE
    case 'llama':
      return (
        !!process.env.AZURE_INFERENCE_CREDENTIAL_LLAMA &&
        !!process.env.AZURE_INFERENCE_ENDPOINT_LLAMA &&
        !!process.env.NEXT_PUBLIC_OPENAI_COMPATIBLE_MODEL_LLAMA
      )
      case 'openai-compatible':
      return (
        !!process.env.OPENAI_COMPATIBLE_API_KEY &&
        !!process.env.OPENAI_COMPATIBLE_API_BASE_URL &&
        !!process.env.NEXT_PUBLIC_OPENAI_COMPATIBLE_MODEL
      )
    default:
      return false
  }
}
