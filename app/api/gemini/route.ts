import 'server-only'
export const dynamic = 'force-dynamic'; // Prevents static optimization

import { getAuth } from '@clerk/nextjs/server'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { streamText, Message } from "ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");

export async function POST(req: NextRequest) {
  const { messages, model = "gemini-2.0-flash-exp", fileUrl, fileName, fileMimeType } = await req.json();
 const { userId } =  getAuth(req)
    
        if (!userId) {
          return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!messages) {
          return new NextResponse("Messages are required", { status: 400 });
        }
        if (!Array.isArray(messages) || messages.length === 0) {
          return new NextResponse("Bad Request: Messages array is required", { status: 400 });
        }
  let parts: any[] = [];

  // Handle file upload
  if (fileUrl && fileName && fileMimeType) {
    const response = await fetch(fileUrl);
    const fileBuffer = await response.arrayBuffer();

    parts.push({
      inlineData: {
        data: Buffer.from(fileBuffer).toString('base64'),
        mimeType: fileMimeType
      }
    });
  }

  // Add the text message
  parts.push({ text: messages[messages.length - 1].content });

  const geminiStream = await genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" }).generateContentStream({
    contents: [
      ...messages.slice(0, -1).map((message: Message) => ({
        role: message.role === "user" ? "user" : "model",
        parts: [{ text: message.content }],
      })),
      {
        role: "user",
        parts: parts,
      },
    ],
  });


  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of geminiStream.stream) {
          const text = chunk.text();
          controller.enqueue(text);
        }
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });

  return new Response(stream);
}

