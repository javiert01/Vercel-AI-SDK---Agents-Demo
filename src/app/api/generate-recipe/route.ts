import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";


const model = openai("gpt-4.1");

export const schemaRecipe = z.object({
    recipe: z.object({
      name: z
        .string()
        .describe("The title of the recipe"),
      ingredients: z
        .array(
          z.object({
            name: z.string(),
            amount: z.string(),
          }),
        )
        .describe(
          "The ingredients needed for the recipe",
        ),
      steps: z
        .array(z.string())
        .describe("The steps to make the recipe"),
    }),
  });
  
  
export async function POST(req: NextRequest) {
    const { prompt } = await req.json();
  
    const { object } = await generateObject({
        model,
        system:
          `You are helping a user create a recipe. ` +
          `Use words that are easy to understand and follow. ` +
          `Use measurements that are common in cooking, ` +
          `like cups, tablespoons, and teaspoons. `,
        schemaName: "Recipe",
        schema: schemaRecipe,
        prompt,
      });
  
    return NextResponse.json({ result: object });
  }
  