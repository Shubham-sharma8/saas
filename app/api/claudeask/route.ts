import "server-only";
export const dynamic = "force-dynamic"; // Prevents static optimization

import { getAuth } from "@clerk/nextjs/server";

import { NextRequest, NextResponse } from "next/server";

type SwiftAskResponse = {
  text: string;
  botId: number;
  sessionId: number;
  totalBotUsage: number;
  usageDetail: {
    totalInputTokens: number;
    totalOutputTokens: number;
  };
  botSlug: string;
};

const MODEL_URLS = {
  claude35sonnet: "https://graphql.swiftask.ai/api/ai/claude35sonnet",
  claude3haiku: "https://graphql.swiftask.ai/api/ai/claude3haiku",
  claude3opus: "https://graphql.swiftask.ai/api/ai/claude3opus",
  claudev21: "https://graphql.swiftask.ai/api/ai/claudev21",
};

export async function POST(req: NextRequest) {
  try {
    const { messages, model } = await req.json();
    const { userId } = getAuth(req);
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!Array.isArray(messages) || messages.length === 0) {
      return new NextResponse("Bad Request: Messages array is required", {
        status: 400,
      });
    }

    const latestMessage = messages[messages.length - 1];

    const requestBody = {
      input: latestMessage.content,
      documentAnalysisMode: "SIMPLE",
      messageHistory: messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
    };

    const modelUrl =
      MODEL_URLS[model as keyof typeof MODEL_URLS] || MODEL_URLS.claude35sonnet;

    const response = await fetch(modelUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SWIFTASK_API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`SwiftAsk API error: ${response.status}`);
    }

    const data: SwiftAskResponse = await response.json();

    // Return the full response as JSON
    return NextResponse.json({ content: data.text });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
