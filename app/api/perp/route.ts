import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { streamText } from 'ai';

const perplexity = createOpenAICompatible({
    name: 'perplexity',
    headers: {
      Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
    },
    baseURL: 'https://api.perplexity.ai/',
  });

  export async function POST(req: Request) {
    try {
      const { messages } = await req.json();
        const text = await streamText({
        model: perplexity('llama-3.1-sonar-huge-128k-online'),
        messages,
      });
      return text.toDataStreamResponse();
      
    } catch (error) {
     
      return new Response(JSON.stringify({ error: "An error occurred while processing your request" }),);
    }
  }
  