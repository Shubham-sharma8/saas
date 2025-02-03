import "server-only";
export const dynamic = "force-dynamic"; // Prevents static optimization

import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { getAuth } from "@clerk/nextjs/server";
import { smoothStream, streamText } from "ai";
import { NextRequest, NextResponse } from "next/server";

const perplexity = createOpenAICompatible({
  name: "perplexity",
  headers: {
    Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
  },
  baseURL: "https://api.perplexity.ai/",
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
      model: perplexity("llama-3.1-sonar-huge-128k-online"),
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
