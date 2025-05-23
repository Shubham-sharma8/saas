import "server-only";
export const dynamic = "force-dynamic"; // Prevents static optimization

import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
const aiplatform = require("@google-cloud/aiplatform");
const { Storage } = require("@google-cloud/storage");

const projectID = "ai-based-437315";
const aiLocation = "us-central1"; // For AI image generation

const { PredictionServiceClient } = aiplatform.v1;
const { helpers } = aiplatform;

const clientOptions = {
  apiEndpoint: `${aiLocation}-aiplatform.googleapis.com`,
};

const predictionServiceClient = new PredictionServiceClient(clientOptions);

// Initialize Google Cloud Storage client
const storage = new Storage();

export async function POST(req: NextRequest) {
  try {
    // AI Platform endpoint
    const endpoint = `projects/${projectID}/locations/${aiLocation}/publishers/google/models/imagen-3.0-generate-001`;
    const { userId } = getAuth(req);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { prompt, aspectRatio, numberOfImages } = await req.json();
    if (!prompt) {
      return new NextResponse("Messages are required", { status: 400 });
    }
    if (!Array.isArray(prompt) || prompt.length === 0) {
      return new NextResponse("Bad Request: Messages array is required", {
        status: 400,
      });
    }
    const promptText = {
      prompt: prompt,
    };
    const instanceValue = helpers.toValue(promptText);
    const instances = [instanceValue];

    const parameter = {
      sampleCount: parseInt(numberOfImages, 10), // Convert string to number
      aspectRatio: aspectRatio,
    };
    const parameters = helpers.toValue(parameter);

    const request = {
      endpoint,
      instances,
      parameters,
    };

    const [response] = await predictionServiceClient.predict(request);
    const predictions = response.predictions;

    // Upload generated images to the GCS bucket located in Asia and return URLs

    const imageUrls = await Promise.all(
      predictions.map(async (prediction: any, index: number) => {
        const base64String =
          prediction.structValue.fields.bytesBase64Encoded.stringValue;
        const buffer = Buffer.from(base64String, "base64");
        const filename = `google/-${prompt}-${Date.now()}-${index}.png`;

        // Upload to GCS bucket
        const file = storage
          .bucket(process.env.GOOGLE_CLOUD_STORAGE_BUCKET)
          .file(filename);
        await file.save(buffer, {
          contentType: "image/png",
        });

        // Construct the public URL of the image
        return `https://storage.googleapis.com/${process.env.GOOGLE_CLOUD_STORAGE_BUCKET}/${filename}`;
      })
    );
    return NextResponse.json(imageUrls);
  } catch (error: any) {
    console.error("Error generating images:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
