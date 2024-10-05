import { AnthropicVertex } from '@anthropic-ai/vertex-sdk';
import { AnthropicStream, StreamingTextResponse } from 'ai';



const projectId = 'claude-sonnet-437418';
const region = 'us-east5';
const client = new AnthropicVertex({
  projectId,
  region,
});

export async function POST(req: Request) {
  const { messages, model = "claude-3-5-sonnet@20240620", data  } = await req.json();

  const response = client.messages.stream({
    messages,
    model,
    max_tokens: 1000,
  });
  
  const stream = AnthropicStream(response);
  return new StreamingTextResponse(stream);
}