import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { messages, model='chatgpt-4o-latest' } = await req.json();

    // Check if the user is authenticated
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if the OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return new NextResponse("OpenAI API Key not configured.", { status: 500 });
    }

    // Validate incoming messages
    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    
   
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });


    const response = await openai.chat.completions.create({
      model: model,
      stream: true,
      messages,
    });

    

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);

  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
