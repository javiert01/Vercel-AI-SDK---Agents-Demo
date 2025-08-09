import { NextRequest, NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

const model = openai("gpt-4.1");

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const { text } = await generateText({
    model,
    messages: [
      {
        role: "system",
        content:
          `You are a text summarizer. ` +
          `Summarize the text you receive. ` +
          `Be concise. ` +
          `Return only the summary. ` +
          `Do not use the phrase "here is a summary". ` +
          `Highlight relevant phrases in bold. ` +
          `The summary should be two sentences long. `,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return NextResponse.json({ text });
}
