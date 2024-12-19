import { VertexAI } from "@google-cloud/vertexai";
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from "ai";

const vertex_ai = new VertexAI({ project: 'ai-based-437315', location: 'us-central1' });




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
  const { messages, model = "gemini-2.0-flash-exp" } = await req.json();

  // Dynamically get the model based on the request
  const generativeModel = vertex_ai.preview.getGenerativeModel({
    model, // use the model from the request body
    generationConfig: {
      'maxOutputTokens': 8192,
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
