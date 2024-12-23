
import { streamText } from 'ai';
import { createXai } from '@ai-sdk/xai';

const xAI = createXai({
  apiKey: process.env.xAI_API_KEY || "",
});


export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const model = xAI('grok-beta');
      const text = await streamText({
      model: model,
      messages,
    });
   
    return text.toDataStreamResponse();
    
  } catch (error) {
   
    return new Response(JSON.stringify({ error: "An error occurred while processing your request" }),);
  }
}

