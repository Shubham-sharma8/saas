import { streamText } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { NextRequest } from 'next/server';

const genAI = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

export async function POST(req: NextRequest) {
  try {
    const { messages, model = "claude-3-5-sonnet-20241022", fileUrl } = await req.json();

    let fileContent: Buffer | null = null;
    let mimeType: string | null = null;
    if (fileUrl) {
      const fileResponse = await fetch(fileUrl);
      fileContent = Buffer.from(await fileResponse.arrayBuffer());
      mimeType = fileResponse.headers.get('content-type');
    }

    const formattedMessages = messages.map((message: any) => ({
      role: message.role,
      content: message.content,
    }));

    if (fileContent && mimeType) {
      formattedMessages.push({
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Please analyze the contents of the attached file.',
          },
          {
            type: 'file',
            data: fileContent,
            mimeType: mimeType,
          },
        ],
      });
    }

    const result = await streamText({
      model: genAI(model),
      messages: formattedMessages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error in Claude API route:', error);
    return new Response(JSON.stringify({ error: "An error occurred while processing your request" }), { status: 500 });
  }
}
