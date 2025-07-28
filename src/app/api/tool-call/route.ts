import { openai } from "@ai-sdk/openai";
import { generateText, tool } from "ai";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

const model = openai("gpt-4.1");

const basicCalculatorTool = tool({
  description:
    "A basic calculator that can perform addition, subtraction, multiplication, and division.",
  parameters: z.object({
    operation: z.enum(["add", "subtract", "multiply", "divide"]),
    a: z.number(),
    b: z.number(),
  }),
  execute: async ({ operation, a, b }) => {
    switch (operation) {
      case "add":
        console.log(`Adding ${a} and ${b}`, a + b);
        return a + b;
      case "subtract":
        console.log(`Subtracting ${b} from ${a}`, a - b);
        return a - b;
      case "multiply":
        console.log(`Multiplying ${a} and ${b}`, a * b);
        return a * b;
      case "divide":
        if (b === 0) throw new Error("Cannot divide by zero");
        console.log(`Dividing ${a} by ${b}`, a / b);
        return a / b;
      default:
        throw new Error("Invalid operation");
    }
  },
});

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const { text, steps } = await generateText({
    model,
    prompt,
    system:
      "You are a helpful assistant that can perform basic arithmetic operations.",
    tools: {
      basicCalculator: basicCalculatorTool,
    },
    maxSteps: 10, // Limit the number of steps to 2
  });
  return NextResponse.json({ text, steps });
}
