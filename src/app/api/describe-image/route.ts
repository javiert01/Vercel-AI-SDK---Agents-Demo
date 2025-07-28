import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { NextResponse } from "next/server";

const model = openai("gpt-4.1");

export async function POST(req: Request) {
  const { imageUrl } = await req.json();
  const { text } = await generateText({
    model,
    system:
      "Please create an alt text for the image provided. Be concise. Use adjectives only when necessary. Use simple language. Do not pass 160 characters.",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            image: new URL(imageUrl),
          },
        ],
      },
    ],
  });

  return NextResponse.json({ text });
}
