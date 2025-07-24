import { NextRequest, NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

const model = openai("gpt-4.1");

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  const { text } = await generateText({
    model,
    prompt,
  });

  return NextResponse.json({ text });
}
