import { VertexAI } from "@google-cloud/vertexai";
import { Message } from "ai";
export const dynamic = 'force-dynamic';

const vertex_ai = new VertexAI({ project: process.env.GOOGLE_PROJECT_ID, location: 'us-central1' });

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

  const { messages, model = "gemini-1.5-flash-002" } = await req.json();

  let image1 = {};
  for (const msg of messages) {
    if (typeof msg.content === "string" && msg.content.startsWith('http')) {
      const urls = msg.content.split(','); 
      image1 = {
        file_data: {
          file_uri: urls[0].trim(),  
          mime_type: 'image/jpeg',
        },
      };
      break;
    }
  }

  const generativeModel = vertex_ai.getGenerativeModel({
    model,
  });

  const prompt = buildGoogleGenAIPrompt(messages, image1);
  const streamingResult = await generativeModel.generateContent(prompt);

  const response = streamingResult.response;
  return Response.json(response.candidates?.[0]?.content);
}
