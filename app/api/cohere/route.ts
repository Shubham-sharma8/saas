import "server-only";
export const dynamic = "force-dynamic"; // Prevents static optimization

import { getAuth } from "@clerk/nextjs/server";

import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { smoothStream, streamText } from "ai";
import { NextRequest, NextResponse } from "next/server";

const cohere = createOpenAICompatible({
  name: "cohere",
  headers: {
    Authorization: `Bearer ${process.env.AZURE_INFERENCE_CREDENTIAL_COHERE}`,
  },
  baseURL: process.env.AZURE_INFERENCE_ENDPOINT_COHEREV,
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const { userId } = getAuth(req);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }
    if (!Array.isArray(messages) || messages.length === 0) {
      return new NextResponse("Bad Request: Messages array is required", {
        status: 400,
      });
    }
    const text = await streamText({
      model: cohere("Cohere-command-r-08-2024"),
      messages,
      experimental_transform: smoothStream(),
    });
    return text.toDataStreamResponse();
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "An error occurred while processing your request",
      })
    );
  }
}
