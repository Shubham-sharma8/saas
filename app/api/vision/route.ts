import { VertexAI } from "@google-cloud/vertexai";
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from "ai";

export const dynamic = 'force-dynamic';

const vertex_ai = new VertexAI({ project: 'ai-based-437315', location: 'us-central1' });

export async function POST(req: Request) {
  const { messages, model = "gemini-2.0-flash-exp", data } = await req.json();

  // Build the image object directly
  const image1 = {
    file_data: {
      file_uri: new URL(data.imageUrl),
      mime_type: 'image/jpeg',
    },
  };

  // Pre-build the prompt based on incoming messages
  const contents = messages
    .filter((message:any) => message.role === "user" || message.role === "assistant")
    .map((message:any) => ({
      role: message.role === "user" ? "user" : "model",
      parts: [image1, { text: message.content }],
    }));

  // Create the generative model instance
  const generativeModel = vertex_ai.preview.getGenerativeModel({
    model,
    generationConfig: {
      maxOutputTokens: 5000,
      temperature: 0,
      topP: 0.95,
    },
  });

  // Stream the content directly with built prompt
  const geminiStream = await generativeModel.generateContentStream({ contents });
  const stream = GoogleGenerativeAIStream(geminiStream);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
