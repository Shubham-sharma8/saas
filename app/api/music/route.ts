import 'server-only'
import OpenAI from "openai";
export const dynamic = 'force-dynamic'; // Prevents static optimization


import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, model = "alloy"  } = body;
    
        
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }
    if (!model) {
      return new NextResponse("model is required", { status: 400 });
    }

    

    

    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: model,
      input: prompt,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    const audioBase64 = buffer.toString("base64");

   

    return new NextResponse(JSON.stringify({ audio: `data:audio/mp3;base64,${audioBase64}` }), { headers: { "Content-Type": "application/json" } });  } catch (error) {
   
    return new NextResponse("Internal Error", { status: 500 });
  }
};
