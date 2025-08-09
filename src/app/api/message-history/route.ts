import { NextRequest, NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { generateText, type CoreMessage } from "ai";

const model = openai("gpt-4.1");

export async function POST(req: NextRequest) {
  const messages: CoreMessage[] = await req.json();
  const { response } = await generateText({
    model,
    messages,
  });
  return NextResponse.json({ messages: response.messages });
}
