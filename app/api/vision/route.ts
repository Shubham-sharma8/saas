import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return new NextResponse("OpenAI API Key not configured.", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }




    const visionMessages = [];

    // Iterate over each message
    for (const msg of messages) {
      if (msg.role === "user") {
        if (typeof msg.content === "string" && msg.content.startsWith('http')) {
          // If the content is a URL, create a separate message for each image URL
          const urls = msg.content.split(','); // Split multiple URLs if provided
          for (const url of urls) {
            visionMessages.push({
              role: "user",
              content: [{ type: "image_url", image_url: { url: url.trim() } }]
            });
          }
        } else {
          // Otherwise, add other types of messages directly
          visionMessages.push(msg);
        }
      }
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // Use the Vision model
      messages: visionMessages // Pass the modified messages array directly
    });



    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log('[CONVERSATION_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
