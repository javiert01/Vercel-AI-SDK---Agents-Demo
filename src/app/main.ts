"use server";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

console.log("api key", process.env.OPENAI_API_KEY);

const model = openai("chatgpt-4o-latest");

export const answerMyQuestion = async (prompt: string) => {
  const { text } = await generateText({
    model,
    prompt,
  });
  return text;
};

const text = answerMyQuestion("What is the capital of France?");

console.log(text); // Should log "The capital of France is Paris."
