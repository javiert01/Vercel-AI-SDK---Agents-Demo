"use server";

import { generateText, streamText } from "ai";
import { openai } from "@ai-sdk/openai";

const model = openai("gpt-4.1");

export const answerMyQuestion = async (prompt: string) => {
  const { text } = await generateText({
    model,
    prompt,
  });
  return text;
};

export const answerMyQuestionStream = async (prompt: string) => {
  const textStream = await streamText({
    model,
    prompt,
  });
  return textStream;
};
