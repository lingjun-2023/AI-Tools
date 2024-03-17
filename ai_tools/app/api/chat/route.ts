import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { headers } from 'next/headers';

// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = 'edge';

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();
  const headersList = headers()

  const token = headersList.get('apiToken') as string
  const model = headersList.get('model') as string
   const openai = new OpenAI({
    apiKey: token || process.env.OPENAI_API_KEY!,
  });
  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: model || 'gapt-3.5-turbo',
    stream: true,
    messages: messages,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}