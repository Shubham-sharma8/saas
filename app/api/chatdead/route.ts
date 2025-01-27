import "server-only"
export const dynamic = "force-dynamic" // Prevents static optimization

import { getAuth } from "@clerk/nextjs/server"
import { type NextRequest, NextResponse } from "next/server"
import { smoothStream, streamText } from 'ai';
import { openai } from "@ai-sdk/openai"

export async function POST(req: NextRequest) {
  try {
    const { messages, model = "gpt-4", fileUrl } = await req.json()

    const { userId } = getAuth(req)

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return new NextResponse("Bad Request: Messages array is required", { status: 400 })
    }
    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 })
    }
    if (!process.env.OPENAI_API_KEY) {
      return new NextResponse("OpenAI API Key not configured.", { status: 500 })
    }

    const updatedMessages = [...messages]

    if (fileUrl) {
      const response = await fetch(fileUrl)
      const fileContent = await response.arrayBuffer()
      const base64File = Buffer.from(fileContent).toString("base64")

      updatedMessages.push({
        role: "user",
        content: [
          { type: "text", text: "I'm sending you a file as well. Please analyze its contents." },
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${base64File}`,
            },
          },
        ],
      })
    }

    const stream = await streamText({
      model: openai(model),
      messages: updatedMessages,
      experimental_transform: smoothStream(),

    })

    return stream.toDataStreamResponse()
  } catch (error: any) {
    return new NextResponse(error.message || "Internal Server Error", { status: 500 })
  }
}

