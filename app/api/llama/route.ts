import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { streamText } from 'ai';

const llama = createOpenAICompatible({
    name: 'llama',
    headers: {
      Authorization: `Bearer ${process.env.AZURE_INFERENCE_CREDENTIAL_LLAMA}`,
    },
    baseURL: process.env.AZURE_INFERENCE_ENDPOINT_LLAMA,
  });

  export async function POST(req: Request) {
    try {
      const { messages } = await req.json();
        const text = await streamText({
        model: llama('Llama-3.3-70B-Instruct'),
        messages,
      });
      return text.toDataStreamResponse();
      
    } catch (error) {
     
      return new Response(JSON.stringify({ error: "An error occurred while processing your request" }),);
    }
  }
  