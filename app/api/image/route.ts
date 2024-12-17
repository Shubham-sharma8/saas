import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { AzureOpenAI } from "openai";
import { Storage } from "@google-cloud/storage";

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const apiVersion = "2024-02-01";
const deploymentName = "dall-e-3";
const numberOfImagesToGenerate = 1;

// Initialize Google Cloud Storage client
const storage = new Storage();

const getClient = (): AzureOpenAI => {
  return new AzureOpenAI({
    endpoint,
    apiKey,
    apiVersion,
    deployment: deploymentName,
  });
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { prompt } = await req.json();

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

    const imageUrls = await Promise.all(
      results.data.map(async (image: any, index: number) => {
        const imageUrl = image.url || image.someOtherProperty;

        // Fetch the image from the Azure OpenAI response
        const response = await fetch(imageUrl);
        const buffer = await response.arrayBuffer();
        const filename = `openai/-${prompt}-${Date.now()}-${index}.png`;

        // Upload to GCS bucket
        const bucketName = process.env.GOOGLE_CLOUD_STORAGE_BUCKET;
        if (!bucketName) {
          throw new Error("Google Cloud Storage bucket name is not defined");
        }
        const file = storage.bucket(bucketName).file(filename);
        await file.save(Buffer.from(buffer), {
          contentType: 'image/png',
        });

        // Construct the public URL of the image
        return `https://storage.googleapis.com/${process.env.GOOGLE_CLOUD_STORAGE_BUCKET}/${filename}`;
      })
    );

    return NextResponse.json(imageUrls);

  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
