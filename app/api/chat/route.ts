import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { messages, model = 'chatgpt-4o-latest' } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return new NextResponse("Bad Request: Messages array is required", { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return new NextResponse("OpenAI API key not configured", { status: 500 });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    let response;
      response = await openai.chat.completions.create({
        model: model,
        stream: true,
        messages,
      });
      const stream = OpenAIStream(response);
      return new StreamingTextResponse(stream);
    
  } catch (error: any) {
    console.error("[CONVERSATION_ERROR]", error);
    return new NextResponse(error.message || "Internal Server Error", { status: 500 });
  }
}