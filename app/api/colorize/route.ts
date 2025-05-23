import "server-only";
export const dynamic = "force-dynamic"; // Prevents static optimization

import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const imageUrl = body.imageUrl;
    const { userId } = getAuth(req);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400 }
      );
    }

    // Make the request to SwiftAsk AI API
    const response = await fetch(
      "https://graphql.swiftask.ai/api/ai/magiccolor",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SWIFTASK_API_KEY}`,
        },
        body: JSON.stringify({
          input: "Color",
          files: [{ url: imageUrl }],
          documentAnalysisMode: "SIMPLE",
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Response:", errorText);
      throw new Error(
        `SwiftAsk AI API responded with status: ${response.status}`
      );
    }

    const data = await response.json();

    if (data.files && data.files.length > 0) {
      const colorizedUrls = data.files.map((file: any) => file.url);
      return NextResponse.json({ colorizedUrls });
    } else if (data.error) {
      throw new Error(data.error.message || "Unknown error from API");
    } else {
      throw new Error("Invalid response format from API");
    }
  } catch (error) {
    console.error("[COLORIZE_ERROR]", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to colorize image";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
