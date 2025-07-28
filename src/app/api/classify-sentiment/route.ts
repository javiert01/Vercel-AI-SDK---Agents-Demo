import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { NextRequest, NextResponse } from "next/server";

const model = openai("gpt-4.1");

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  const { object } = await generateObject({
    model,
    output: "enum",
    enum: ["positive", "negative", "neutral"],
    prompt,
    system:
      "You are a sentiment analysis model. Classify the sentiment of the input text as either positive, negative, or neutral.",
  });

  return NextResponse.json({ result: object });
}
