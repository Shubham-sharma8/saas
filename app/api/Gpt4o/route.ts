import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { OpenAIStream, StreamingTextResponse,streamText } from 'ai';
import { OpenAIClient, AzureKeyCredential, } from '@azure/openai';
import { ChatCompletionChunk } from "openai/resources";

const client = new OpenAIClient(
  'https://shubh-m48r4cia-eastus.openai.azure.com/',
  new AzureKeyCredential(process.env.AZURE_OPENAI_API_KEY!),
);

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const { messages} = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }
    if (!Array.isArray(messages) || messages.length === 0) {
      return new NextResponse("Bad Request: Messages array is required", { status: 400 });
    }

    const response = await client.streamChatCompletions(
      'gpt-4o',
      messages,
    );
    //tsignore
    
    const stream = OpenAIStream(response as unknown as AsyncIterable<ChatCompletionChunk>);
    return new StreamingTextResponse(stream);

  } catch (error) {
   
    return new NextResponse("Internal Error", { status: 500 });
  }
}