import { VertexAI } from "@google-cloud/vertexai";
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from "ai";

const vertex_ai = new VertexAI({ project: process.env.GOOGLE_PROJECT_ID, location: 'asia-south1' });




export async function POST(req: Request) {
  const buildGoogleGenAIPrompt = (messages: Message[]) => ({
    contents: messages
      .filter(
        (message) => message.role === "user" || message.role === "assistant"
      )
      .map((message) => ({
        role: message.role === "user" ? "user" : "model",
        
        parts: [  { text: message.content }  ],
      })),
  });
  
  

  
  // Extract the `messages` and `model` from the body of the request
  const { messages, model = "gemini-1.5-flash-002" } = await req.json();

  // Dynamically get the model based on the request
  const generativeModel = vertex_ai.preview.getGenerativeModel({
    model, // use the model from the request body
    generationConfig: {
      'maxOutputTokens': 5000,
      'temperature': 0,
      'topP': 0.95,
    },
  });

  const geminiStream = await generativeModel.generateContentStream(
    buildGoogleGenAIPrompt(messages)
  );

  const stream = GoogleGenerativeAIStream(geminiStream);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
