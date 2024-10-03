import { VertexAI } from "@google-cloud/vertexai";
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from "ai";
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

  // Extract URLs from messages that contain them
  let image1 = {};
  for (const msg of messages) {
    if (typeof msg.content === "string" && msg.content.startsWith('http')) {
      const urls = msg.content.split(','); // Split multiple URLs if provided
      image1 = {
        file_data: {
          file_uri: urls[0].trim(),  // Use the first URL from the split as file_uri
          mime_type: 'image/jpeg',    // Assuming the image is a JPG, adjust as necessary
        },
      };
      break;  // Use the first URL found in the messages
    }
  }

  const generativeModel = vertex_ai.preview.getGenerativeModel({
    model, // use the model from the request body
  });

  const geminiStream = await generativeModel.generateContentStream(
    buildGoogleGenAIPrompt(messages, image1)
  );

  const stream = GoogleGenerativeAIStream(geminiStream);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}