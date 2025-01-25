export const dynamic = 'force-dynamic'; // Prevents static optimization

import { getAuth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from "next/server";
import { streamText } from 'ai';
import { createAzure } from '@ai-sdk/azure';


const client =  createAzure({
  resourceName: 'shubh-m48r4cia-eastus',
  apiKey: process.env.AZURE_OPENAI_API_KEY!,
}
);


export async function POST(req: NextRequest) {
  try {
    const { userId } =  getAuth(req)
    const { messages} = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }
    

    const  text  = await streamText({
      model: client('gpt-4o'),
      prompt: messages,
    });
    //tsignore
    
    return text.toDataStreamResponse();

  } catch (error) {
   
    return new NextResponse("Internal Error", { status: 500 });
  }
}