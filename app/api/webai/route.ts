import 'server-only';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from "ai";
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
const {
  FunctionDeclarationSchemaType,
  HarmBlockThreshold,
  HarmCategory,
} = require('@google-cloud/vertexai');

const vertex_ai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

const buildGoogleGenAIPrompt = (messages: Message[]) => ({
  contents: messages
    .filter(
      (message) => message.role === "user" || message.role === "assistant"
    )
    .map((message) => ({
      role: message.role === "user" ? "user" : "model",
      parts: [{ text: message.content }],
    })),
});

export async function POST(req: Request) {
  // Extract the `messages` and `model` from the body of the request
  const { messages,  } = await req.json();
  const model = "gemini-1.5-pro-002"
const { userId } = auth();
            
                if (!userId) {
                  return new NextResponse("Unauthorized", { status: 401 });
                }
                if (!messages) {
                  return new NextResponse("Messages are required", { status: 400 });
                }
                if (!model) {
                  return new NextResponse("model is required", { status: 400 });
                }
  // Dynamically get the model based on the request
  const generativeModel = vertex_ai.getGenerativeModel({
    model: model,
    generationConfig: {
    'maxOutputTokens': 5000,
    'temperature': 0.9,
    'topP': 0.95,
  },
  safetySettings: [{category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE}],
  tools: [
    {
      googleSearchRetrieval: {},
    },
  ],
});

  const geminiStream = await generativeModel.generateContentStream(
    buildGoogleGenAIPrompt(messages)
  );

  const stream = GoogleGenerativeAIStream(geminiStream);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
