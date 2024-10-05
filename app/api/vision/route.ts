import { VertexAI } from "@google-cloud/vertexai";
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

const vertex_ai = new VertexAI({ project: process.env.GOOGLE_PROJECT_ID, location: 'asia-south1' });

export async function POST(req: Request) {
  const buildGoogleGenAIPrompt = (messages: Message[], image1: any) => ({
    contents: messages
      .filter(
        (message) => message.role === "user" || message.role === "assistant"
      )
      .map((message) => ({
        role: message.role === "user" ? "user" : "model",
        parts: [image1, { text: message.content }],
      })),
  });
  const { messages, model = "gemini-1.5-flash-002", data } = await req.json();

  const image1 = {
    file_data: {
      file_uri: new URL(data.imageUrl),
      mime_type: 'image/jpeg',
    },
  };

  const generativeModel = vertex_ai.preview.getGenerativeModel({
    model,
    generationConfig: {
      'maxOutputTokens': 5000,
      'temperature': 0,
      'topP': 0.95,
    },
    
  });

  const geminiStream = await generativeModel.generateContentStream(
    buildGoogleGenAIPrompt(messages, image1)
  );

  const stream = GoogleGenerativeAIStream(geminiStream);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
