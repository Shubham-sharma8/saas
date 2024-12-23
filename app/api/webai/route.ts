import { VertexAI } from "@google-cloud/vertexai";
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from "ai";
const {
  FunctionDeclarationSchemaType,
  HarmBlockThreshold,
  HarmCategory,
} = require('@google-cloud/vertexai');

const vertex_ai = new VertexAI({ project: 'ai-based-437315', location: 'asia-south1' });

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
  const model = "gemini-1.5-flash-002"

  // Dynamically get the model based on the request
  const generativeModel = vertex_ai.preview.getGenerativeModel({
    model: model,
    generationConfig: {
    'maxOutputTokens': 5000,
    'temperature': 0.1,
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
