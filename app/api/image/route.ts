import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { AzureOpenAI } from "openai";




const endpoint = process.env.AZURE_OPENAI_ENDPOINT ;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const apiVersion = "2024-02-01";
const deploymentName = "dall-e-3";
const numberOfImagesToGenerate = 1;

function getClient(): AzureOpenAI {
  return new AzureOpenAI({
    endpoint,
    apiKey,
    apiVersion,
    deployment: deploymentName,
  });
}

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const { prompt} = await req.json();
    

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const client = getClient();
    const results = await client.images.generate({
      prompt,
      size: "1024x1024",
      n: numberOfImagesToGenerate,
      model: "",
    });

   

       
    const imageUrls = results.data.map((image: any) => image.url || image.someOtherProperty);

    return NextResponse.json(imageUrls);

  } catch (error) {
    console.log('[IMAGE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}