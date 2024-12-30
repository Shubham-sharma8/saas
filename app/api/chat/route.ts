import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import fetch from 'node-fetch';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { messages, model = 'chatgpt-4o-latest', fileUrl } = await req.json();

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

    let updatedMessages = [...messages];

    if (fileUrl) {
      const response = await fetch(fileUrl);
      const fileContent = await response.buffer();
      const base64File = fileContent.toString('base64');

      updatedMessages.push({
        role: "user",
        content: [
          { type: "text", text: "I'm sending you a file as well. Please analyze its contents." },
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${base64File}`,
            },
          },
        ],
      });
    }

    const response = await openai.chat.completions.create({
      model: model,
      stream: true,
      messages: updatedMessages,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
    
  } catch (error: any) {
    return new NextResponse(error.message || "Internal Server Error", { status: 500 });
  }
}

