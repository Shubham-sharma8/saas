import "server-only"
export const dynamic = "force-dynamic" // Prevents static optimization

import { getAuth } from "@clerk/nextjs/server"
import { smoothStream, streamText } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { type NextRequest, NextResponse } from "next/server"

const genAI = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || "",
})

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req)
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { messages, model = "gemini-2.0-flash-exp", fileUrl, useSearchGrounding } = await req.json()
    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 })
    }
    if (!Array.isArray(messages) || messages.length === 0) {
      return new NextResponse("Bad Request: Messages array is required", { status: 400 })
    }

    let fileContent: Buffer | null = null
    let mimeType: string | null = null
    if (fileUrl) {
      const fileResponse = await fetch(fileUrl)
      fileContent = Buffer.from(await fileResponse.arrayBuffer())
      mimeType = fileResponse.headers.get("content-type")
    }

    const formattedMessages = messages.map((message: any) => ({
      role: message.role,
      content: message.content,
    }))

    if (fileContent && mimeType) {
      formattedMessages.push({
        role: "user",
        content: [
          {
            type: "text",
            text: "Please analyze the contents of the attached file.",
          },
          {
            type: "file",
            data: fileContent,
            mimeType: mimeType,
          },
        ],
      })
    }

    const result = await streamText({
      model: genAI(model, {
        useSearchGrounding: useSearchGrounding,
      }),
      messages: formattedMessages,
      experimental_transform: smoothStream(),
    })

    return result.toDataStreamResponse()
  } catch (error) {
    return new Response(JSON.stringify({ error: "An error occurred while processing your request" }), { status: 500 })
  }
}

