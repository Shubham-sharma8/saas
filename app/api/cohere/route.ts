import 'server-only'
export const dynamic = 'force-dynamic'; // Prevents static optimization

import { auth } from "@clerk/nextjs";
import { streamText } from 'ai';
import { createCohere } from '@ai-sdk/cohere';
import { NextResponse } from 'next/server';

const azure = createCohere({
  baseURL: process.env.AZURE_INFERENCE_ENDPOINT_COHERE || "",
  apiKey: process.env.AZURE_INFERENCE_CREDENTIAL_COHERE || "",
});


export async function POST(req: Request) {
  try {

    const { messages } = await req.json();
    const { userId } = auth();
    
        if (!userId) {
          return new NextResponse("Unauthorized", { status: 401 });
        }
    
        if (!Array.isArray(messages) || messages.length === 0) {
          return new NextResponse("Bad Request: Messages array is required", { status: 400 });
        }
        if (!messages) {
          return new NextResponse("Messages are required", { status: 400 });
        }
      const text = await streamText({
      model: azure('command-r-plus-08-2024'),
      messages,
    });
   
    return text.toDataStreamResponse();
    
  } catch (error) {
   
    return new Response(JSON.stringify({ error: "An error occurred while processing your request" }),);
  }
}

