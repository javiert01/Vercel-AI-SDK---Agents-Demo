import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const model = openai("gpt-4.1");

export const userSchema = z.object({
  name: z.string().describe("The name of the user"),
  age: z.number().describe("The age of the user"),
  email: z.string().email().describe("The email address of the user"),
});

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  const { object } = await generateObject({
    model,
    system: `You are generating fake user data.`,
    schemaName: "User",
    schema: userSchema,
    prompt,
    output: "array",
  });

  return NextResponse.json({ result: object });
}
