import "server-only";
export const dynamic = "force-dynamic"; // Prevents static optimization

import { streamText } from "ai";
import { createXai } from "@ai-sdk/xai";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

const xAI = createXai({
  apiKey: process.env.xAI_API_KEY || "",
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const { userId } = getAuth(req);

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (!messages) {
      return new Response("Messages are required", { status: 400 });
    }
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response("Bad Request: Messages array is required", {
        status: 400,
      });
    }

    const model = xAI("grok-beta");
    const text = await streamText({
      model: model,
      messages,
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
