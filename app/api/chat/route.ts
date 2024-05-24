import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import prismadb from "@/lib/prismadb"; // Ensure this path is correct
import { checkSubscription } from "@/lib/subscription";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import { v4 as uuidv4 } from "uuid";  // Using uuid to generate unique chatIds

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { messages, model = "gpt-4" } = await req.json();

    // Check if the user is authenticated
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if the OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return new NextResponse("OpenAI API Key not configured.", { status: 500 });
    }

    // Validate incoming messages
    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    // Check for free trial or subscription status
    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Check for an existing incomplete chat session
    let chat = await prismadb.chat.findFirst({
      where: { userId, completed: false }
    });

    let chatId;

    // If there's no existing incomplete chat, create a new one
    if (!chat) {
      chatId = uuidv4();
      await prismadb.chat.create({
        data: {
          id: chatId,
          userId,
          completed: false,
        },
      });
    } else {
      // Else, continue with the existing chat
      chatId = chat.id;
    }

    const response = await openai.chat.completions.create({
      model: model,
      stream: true,
      messages,
    });

    // Increment API limit if user is not a pro subscriber
    if (!isPro) {
      await incrementApiLimit();
    }

    const userMessage = messages[messages.length - 1].content;

    // Handle streaming response from OpenAI
    const stream = OpenAIStream(response, {
      onCompletion: async (completion: string) => {
        try {
          await prismadb.message.create({
            data: {
              userId,
              chatId,
              question: userMessage,
              answer: completion,
            },
          });

          // Optional: Mark the chat as completed if the session is done, or leave it open
           await prismadb.chat.update({
            where: { id: chatId },
           data: { completed: true },
           });
        } catch (error) {
          console.log("[DATABASE_ERROR]", error);
        }
      },
    });

    return new StreamingTextResponse(stream);

  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}