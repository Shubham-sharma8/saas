import 'server-only'
export const dynamic = 'force-dynamic'; // Prevents static optimization

import { auth } from "@clerk/nextjs";

import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { streamText } from 'ai';
import { NextResponse } from 'next/server';

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
      const { userId } = auth();
          
              if (!userId) {
                return new NextResponse("Unauthorized", { status: 401 });
              }
              if (!messages) {
                return new NextResponse("Messages are required", { status: 400 });
              }
              if (!Array.isArray(messages) || messages.length === 0) {
                return new NextResponse("Bad Request: Messages array is required", { status: 400 });
              }
        const text = await streamText({
        model: llama('Llama-3.3-70B-Instruct'),
        messages,
      });
      return text.toDataStreamResponse();
      
    } catch (error) {
     
      return new Response(JSON.stringify({ error: "An error occurred while processing your request" }),);
    }
  }
  