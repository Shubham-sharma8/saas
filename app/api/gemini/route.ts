import 'server-only'
export const dynamic = 'force-dynamic'; // Prevents static optimization

import { auth } from "@clerk/nextjs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from "ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function POST(req: NextRequest) {
  const { messages, model = "gemini-2.0-flash-exp", fileUrl, fileName, fileMimeType } = await req.json();
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

  const stream = GoogleGenerativeAIStream(geminiStream);

  return new StreamingTextResponse(stream);
}

