import { NextResponse } from "next/server";
const aiplatform = require('@google-cloud/aiplatform');
const { Storage } = require('@google-cloud/storage');
const util = require('util');

const projectID = process.env.GOOGLE_PROJECT_ID;
const aiLocation = 'asia-south1'; // For AI image generation

const { PredictionServiceClient } = aiplatform.v1;
const { helpers } = aiplatform;
const clientOptions = {
  apiEndpoint: `${aiLocation}-aiplatform.googleapis.com`,
};

const predictionServiceClient = new PredictionServiceClient(clientOptions);

// Initialize Google Cloud Storage client
const storage = new Storage();

export async function POST(req: Request) {
  try {
    // AI Platform endpoint
    const endpoint = `projects/${projectID}/locations/${aiLocation}/publishers/google/models/imagen-3.0-generate-001`;

    
    const { prompt } = await req.json();

    const promptText = {
      prompt: prompt,
    };
    const instanceValue = helpers.toValue(promptText);
    const instances = [instanceValue];

    const parameter = {
      sampleCount: 1,
      aspectRatio: '1:1',
      safetyFilterLevel: 'block_some',
      personGeneration: 'allow_adult',
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
        const base64String = prediction.structValue.fields.bytesBase64Encoded.stringValue;
        const buffer = Buffer.from(base64String, 'base64');
        const filename = `google/output-${Date.now()}-${index}.png`;

        // Upload to GCS bucket
        const file = storage.bucket(process.env.GOOGLE_CLOUD_STORAGE_BUCKET).file(filename);
        await file.save(buffer, {
          contentType: 'image/png',
        });

        // Construct the public URL of the image
        return `https://storage.googleapis.com/${process.env.GOOGLE_CLOUD_STORAGE_BUCKET}/${filename}`;
      })
    );

    return NextResponse.json(imageUrls);

  } catch (error) {
    console.log('[IMAGE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}