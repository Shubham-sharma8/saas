export const dynamic = 'force-dynamic'; // Prevents static optimization

import { TranslateBody } from '@/types/types';
import { OpenAIStream } from '@/utils';
import toast from 'react-hot-toast';

export async function POST(
  req: Request
) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { inputLanguage, outputLanguage, inputCode, model, apiKey } =
      (await req.json()) as TranslateBody;

    const stream = await OpenAIStream(
      inputLanguage,
      outputLanguage,
      inputCode,
      model,
      apiKey,
    );

    return new Response(stream);
  } catch (error) {
    toast.error(String(error));
    return new Response('Error', { status: 500 });
  }
};

