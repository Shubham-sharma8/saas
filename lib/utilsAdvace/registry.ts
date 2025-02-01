import { anthropic } from '@ai-sdk/anthropic'
import { createAzure } from '@ai-sdk/azure'
import { createDeepSeek } from '@ai-sdk/deepseek'
import { createFireworks, fireworks } from '@ai-sdk/fireworks'
import { google } from '@ai-sdk/google'
import { groq } from '@ai-sdk/groq'
import { createOpenAI, openai } from '@ai-sdk/openai'
import { createMistral } from '@ai-sdk/mistral';
import { createCohere } from '@ai-sdk/cohere';
import {
  experimental_createProviderRegistry as createProviderRegistry,
  extractReasoningMiddleware,
  wrapLanguageModel
} from 'ai'
import { createOllama } from 'ollama-ai-provider'

export const registry = createProviderRegistry({
  openai,
  anthropic,
  google,
  groq,
  mistral: createMistral({
    baseURL: process.env.AZURE_INFERENCE_ENDPOINT_MISTRAL || "",
    apiKey: process.env.AZURE_INFERENCE_CREDENTIAL_MISTRAL || ""
  }),
  cohere: createCohere({
    baseURL: process.env.AZURE_INFERENCE_ENDPOINT_COHERE || "",
    apiKey: process.env.AZURE_INFERENCE_CREDENTIAL_COHERE || "",
  }),
  ollama: createOllama({
    baseURL: `${process.env.OLLAMA_BASE_URL}/api`
  }),
  azure: createAzure({
    apiKey: process.env.AZURE_API_KEY,
    resourceName: process.env.AZURE_RESOURCE_NAME
  }),
deepseek: createDeepSeek({
    apiKey: process.env.AZURE_INFERENCE_CREDENTIAL_DEEPSEEK,
    baseURL: process.env.AZURE_INFERENCE_ENDPOINT_DEEPSEEK
  }),
  // deepseek: createOpenAI({
  //   apiKey: process.env.AZURE_INFERENCE_CREDENTIAL_DEEPSEEK,
  //   baseURL: process.env.AZURE_INFERENCE_ENDPOINT_DEEPSEEK
  // }),
  'azure-llama': createOpenAI({
    apiKey: process.env.AZURE_INFERENCE_CREDENTIAL_LLAMA,
    baseURL: process.env.AZURE_INFERENCE_ENDPOINT_LLAMA
  }),
  'openai-compatible': createOpenAI({
    apiKey: process.env.OPENAI_COMPATIBLE_API_KEY,
    baseURL: process.env.OPENAI_COMPATIBLE_API_BASE_URL
  })
})

export function getModel(model: string) {
  const modelName = model.split(':')[1]
  if (model.includes('ollama')) {
    const ollama = createOllama({
      baseURL: `${process.env.OLLAMA_BASE_URL}/api`
    })

    // if model is deepseek-r1, add reasoning middleware
    if (model.includes('deepseek-r1')) {
      return wrapLanguageModel({
        model: ollama(modelName),
        middleware: extractReasoningMiddleware({
          tagName: 'think'
        })
      })
    }

    // if ollama provider, set simulateStreaming to true
    return ollama(modelName, {
      simulateStreaming: true
    })
  }

  // if model is groq and includes deepseek-r1, add reasoning middleware
  if (model.includes('groq') && model.includes('deepseek-r1')) {
    return wrapLanguageModel({
      model: groq(modelName),
      middleware: extractReasoningMiddleware({
        tagName: 'think'
      })
    })
  }

  // if model is fireworks and includes deepseek-r1, add reasoning middleware
  if (model.includes('fireworks') && model.includes('deepseek-r1')) {
    return wrapLanguageModel({
      model: fireworks(modelName),
      middleware: extractReasoningMiddleware({
        tagName: 'think'
      })
    })
  }

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
      case 'mistral':
        return !!process.env.AZURE_INFERENCE_ENDPOINT_MISTRAL && !!process.env.AZURE_INFERENCE_CREDENTIAL_MISTRAL
      case 'cohere':
        return !!process.env.AZURE_INFERENCE_ENDPOINT_COHERE && !!process.env.AZURE_INFERENCE_CREDENTIAL_COHERE
    case 'groq':
      return !!process.env.GROQ_API_KEY
    case 'ollama':
      return !!process.env.OLLAMA_BASE_URL
      case 'deepseek':
        return !!process.env.AZURE_INFERENCE_ENDPOINT_DEEPSEEK && !!process.env.AZURE_INFERENCE_CREDENTIAL_DEEPSEEK
    case 'azure':
      return !!process.env.AZURE_API_KEY && !!process.env.AZURE_RESOURCE_NAME
      // case 'deepseek':
      //   return (
      //     !!process.env.AZURE_INFERENCE_CREDENTIAL_DEEPSEEK &&
      //     !!process.env.AZURE_INFERENCE_ENDPOINT_DEEPSEEK &&
      //     !!process.env.NEXT_PUBLIC_DEEP_COMPATIBLE_MODEL
      //   )
    case 'fireworks':
      return !!process.env.FIREWORKS_API_KEY
    case 'openai-compatible':
      return (
        !!process.env.OPENAI_COMPATIBLE_API_KEY &&
        !!process.env.OPENAI_COMPATIBLE_API_BASE_URL &&
        !!process.env.NEXT_PUBLIC_OPENAI_COMPATIBLE_MODEL
      )
      case 'azure-llama':
      return (
        !!process.env.AZURE_INFERENCE_CREDENTIAL_LLAMA &&
        !!process.env.AZURE_INFERENCE_ENDPOINT_LLAMA &&
        !!process.env.NEXT_PUBLIC_LLAMA_COMPATIBLE_MODEL
      )
    default:
      return false
  }
}

export function getToolCallModel(model?: string) {
  const provider = model?.split(':')[0]
  switch (provider) {
    case 'deepseek':
      return getModel('deepseek:deepseek-chat')
    case 'fireworks':
      return getModel(
        'fireworks:accounts/fireworks/models/llama-v3p1-8b-instruct'
      )
    case 'groq':
      return getModel('groq:llama-3.1-8b-instant')
    case 'ollama':
      return getModel('ollama:phi4')
    default:
      return getModel('openai:gpt-4o-mini')
  }
}

export function isToolCallSupported(model?: string) {
  const modelName = model?.split(':')[1]

  // Deepseek R1 is not supported
  // Deepseek v3's tool call is unstable, so we include it in the list
  return !modelName?.includes('deepseek')
}

export function isReasoningModel(model: string): boolean {
  if (typeof model !== 'string') {
    return false
  }
  return (
    model.includes('deepseek-r1') ||
    model.includes('deepseek-reasoner') ||
    model.includes('o3-mini')
  )
}
