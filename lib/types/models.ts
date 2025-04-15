export interface Model {
  id: string;
  name: string;
  provider: string;
  providerId: string;
}

export const models: Model[] = [
  {
    id: "gpt-4.1",
    name: "GPT-4.1",
    provider: "OpenAI",
    providerId: "openai",
  },
  {
    id: "o1-pro",
    name: "o1-Pro",
    provider: "OpenAI",
    providerId: "openai",
  },
  
  {
    id: "o1",
    name: "o1",
    provider: "OpenAI",
    providerId: "openai",
  },
  {
    id: "o1-preview",
    name: "o1-preview",
    provider: "OpenAI",
    providerId: "openai",
  },
  {
    id: "o3-mini",
    name: "o3-mini",
    provider: "OpenAI",
    providerId: "openai",
  },
  {
    id: "gpt-4.5-preview",
    name: "GPT-4.5",
    provider: "OpenAI",
    providerId: "openai",
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    providerId: "openai",
  },
  {
    id: "chatgpt-4o-latest",
    name: "ChatGPT-4o",
    provider: "OpenAI",
    providerId: "openai",
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o mini",
    provider: "OpenAI",
    providerId: "openai",
  },
  {
    id: "claude-3-5-sonnet-20241022",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    providerId: "anthropic",
  },
  {
    id: "claude-3-5-haiku-20241022",
    name: "Claude 3.5 Haiku",
    provider: "Anthropic",
    providerId: "anthropic",
  },
  {
    id: "claude-3-opus-20240229",
    name: "Claude 3.5 Opus",
    provider: "Anthropic",
    providerId: "anthropic",
  },
  // {
  //   id: process.env.NEXT_PUBLIC_AZURE_DEPLOYMENT_NAME || 'undefined',
  //   name: process.env.NEXT_PUBLIC_AZURE_DEPLOYMENT_NAME || 'Undefined',
  //   provider: 'Azure',
  //   providerId: 'azure'
  // },

  {
    id: "deepseek-reasoner",
    name: "DeepSeek R1",
    provider: "DeepSeek",
    providerId: "deepseek",
  },
  {
    id: "deepseek-chat",
    name: "DeepSeek V3",
    provider: "DeepSeek",
    providerId: "deepseek",
  },
  {
    id: "gemini-2.0-flash-exp",
    name: "Gemini 2.0 Flash (Experimental)",
    provider: "Google Generative AI",
    providerId: "google",
  },
  {
    id: "gemini-exp-1206",
    name: "Gemini Experimental",
    provider: "Google Generative AI",
    providerId: "google",
  },

  {
    id: "gemini-1.5-pro-latest",
    name: "Gemini 1.5 Pro",
    provider: "Google Generative AI",
    providerId: "google",
  },
  {
    id: "Mistral-Large-2411",
    name: "Mistral Large",
    provider: "Mistral",
    providerId: "mistral",
  },
  {
    id: "Cohere-Command R+",
    name: "Cohere-Command R+",
    provider: "Cohere",
    providerId: "cohere",
  },
  {
    id: "Llama-3.3-70B-Instruct",
    name: "Llama-3.3-70B",
    provider: "Llama",
    providerId: "azure-llama",
  },
  // {
  //   id: 'llama-3.3-70B-instruct',
  //   name: 'Llama 3.3 70B',
  //   provider: 'LLama',
  //   providerId: 'llama'
  // },
  // {
  //   id: 'deepseek-r1-distill-llama-70b',
  //   name: 'DeepSeek R1 Distill Llama 70B',
  //   provider: 'Groq',
  //   providerId: 'groq'
  // },
  // {
  //   id: 'deepseek-r1',
  //   name: 'DeepSeek R1',
  //   provider: 'Ollama',
  //   providerId: 'ollama'
  // },

  // {
  //   id: process.env.NEXT_PUBLIC_OPENAI_COMPATIBLE_MODEL || 'undefined',
  //   name: process.env.NEXT_PUBLIC_OPENAI_COMPATIBLE_MODEL || 'Undefined',
  //   provider: 'OpenAI Compatible',
  //   providerId: 'openai-compatible'
  // },
];
