import { createMistral } from '@ai-sdk/mistral';
import { streamText } from 'ai';

const mistral = createMistral({
  baseURL: process.env.AZURE_INFERENCE_ENDPOINT_MISTRAL || "",
  apiKey: process.env.AZURE_INFERENCE_CREDENTIAL_MISTRAL || "",
 
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const model = mistral('azureai');
    const text = await streamText({
      model: model,
      messages,
    });
   
    return text.toDataStreamResponse();
    
  } catch (error) {
    
    return new Response(JSON.stringify({ error: "An error occurred while processing your request" }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

