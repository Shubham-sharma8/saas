export interface Model {
  id: string
  name: string
  provider: string
  providerId: string
}

export const models: Model[] = [
 
  {
    id: 'gpt-4o-2024-11-20',
    name: 'GPT-4o',
    provider: 'OpenAI',
    providerId: 'openai'
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'OpenAI',
    providerId: 'openai'
  },
  {
    id: 'gpt-4o-2024-08-06',
    name: 'GPT-4o Aug-2024',
    provider: 'OpenAI',
    providerId: 'openai'
  },
  {
    id: 'gpt-4o-turbo',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    providerId: 'openai'
  },

  {
    id: 'claude-3-5-sonnet-20241022',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    providerId: 'anthropic'
  },
  {
    id: 'claude-3-5-haiku-20241022',
    name: 'Claude 3.5 Haiku',
    provider: 'Anthropic',
    providerId: 'anthropic'
  },
  {
    id: 'claude-3-opus-20240229',
    name: 'Claude 3.5 Opus',
    provider: 'Anthropic',
    providerId: 'anthropic'
  },
  {
    id: 'gemini-2.0-flash-exp',
    name: 'Gemini 2.0 Flash (Experimental)',
    provider: 'Google Generative AI',
    providerId: 'google'
  },
  {
    id: 'gemini-exp-1206',
    name: 'Gemini Experimental',
    provider: 'Google Generative AI',
    providerId: 'google'
  },
  
  {
    id: 'gemini-1.5-pro-latest',
    name: 'Gemini 1.5 Pro',
    provider: 'Google Generative AI',
    providerId: 'google'
  },
  {
    id: 'Mistral-Large-2411',
    name: 'Mistral Large',
    provider: 'mistral',
    providerId: 'mistral'
  },
  {
    id: 'Cohere-Command R+',
    name: 'Cohere-Command R+',
    provider: 'cohere',
    providerId: 'cohere'
  },
  {
    id: 'llama-3.3-70B-instruct',
    name: 'Llama 3.3 70B',
    provider: 'llama',
    providerId: 'llama'
  },
  
  // {
  //   id: process.env.NEXT_PUBLIC_OPENAI_COMPATIBLE_MODEL || 'undefined',
  //   name: process.env.NEXT_PUBLIC_OPENAI_COMPATIBLE_MODEL || 'Undefined',
  //   provider: 'OpenAI Compatible',
  //   providerId: 'openai-compatible'
  // },
  {
    id: process.env.NEXT_PUBLIC_AZURE_DEPLOYMENT_NAME || 'undefined',
    name: process.env.NEXT_PUBLIC_AZURE_DEPLOYMENT_NAME || 'Undefined',
    provider: 'Azure',
    providerId: 'azure'
  },
]
