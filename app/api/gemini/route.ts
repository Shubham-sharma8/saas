import {
  VertexAI,
  GenerateContentRequest,
  Content,
  Part,
} from "@google-cloud/vertexai";
import {
  GoogleGenerativeAIStream,
  Message,
  StreamingTextResponse,
} from "ai";
import fetch from "node-fetch";
import { fileTypeFromBuffer } from "file-type";

// Initialize VertexAI with explicit credentials
const vertex_ai = new VertexAI({
  project: "ai-based-437315",
  location: "us-central1",
  // Removed keyFile; specify your credentials externally
});

export async function POST(req: Request) {
  const buildGoogleGenAIPrompt = (
    messages: Message[],
    fileUrl: string | null
  ): GenerateContentRequest => {
    const contents: Content[] = messages
      .filter(
        (message) =>
          message.role === "user" || message.role === "assistant"
      )
      .map((message) => ({
        role: message.role === "user" ? "user" : "model",
        parts: [{ text: message.content }],
      }));

    if (fileUrl) {
      contents.push({
        role: "user",
        parts: [{ text: `[Attached file: ${fileUrl}]` }],
      });
    }

    return { contents };
  };

  // Extract the `messages` and `model` from the body of the request
  const {
    messages,
    model = "gemini-2.0-flash-exp",
    fileUrl,
  } = await req.json();

  let fileContent: Buffer | null = null;
  let fileType: string | null = null;

  if (fileUrl) {
    const response = await fetch(fileUrl);
    fileContent = await response.buffer();
    const fileTypeResult = await fileTypeFromBuffer(
      new Uint8Array(fileContent)
    );
    fileType = fileTypeResult ? fileTypeResult.mime : null;
  }

  const generativeModel = vertex_ai.preview.getGenerativeModel({
    model: model,
    generationConfig: {
      maxOutputTokens: 8192,
      temperature: 0.1,
      topP: 0.95,
    },
  });

  const prompt = buildGoogleGenAIPrompt(messages, fileUrl);

  if (fileContent && fileType) {
    prompt.contents.push({
      role: "user",
      parts: [
        { text: "Here's the content of the attached file:" },
        {
          inlineData: {
            mimeType: fileType,
            data: fileContent.toString("base64"),
          },
        },
      ],
    });
  }

  const geminiStream = await generativeModel.generateContentStream(prompt);

  const stream = GoogleGenerativeAIStream(geminiStream);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
