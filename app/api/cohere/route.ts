
import { streamText } from 'ai';
import { createCohere } from '@ai-sdk/cohere';

const azure = createCohere({
  baseURL: process.env.AZURE_INFERENCE_ENDPOINT_COHERE || "",
  apiKey: process.env.AZURE_INFERENCE_CREDENTIAL_COHERE || "",
});


export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
      const text = await streamText({
      model: azure('command-r-plus-08-2024'),
      messages,
    });
   
    return text.toDataStreamResponse();
    
  } catch (error) {
   
    return new Response(JSON.stringify({ error: "An error occurred while processing your request" }),);
  }
}

