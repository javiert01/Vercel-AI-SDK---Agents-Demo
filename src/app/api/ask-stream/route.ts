import { NextRequest } from "next/server";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

const model = openai("gpt-4.1");

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  const result = await streamText({
    model,
    prompt,
  });

  return result.toTextStreamResponse(); // ✅ This sends the stream to the browser
}
