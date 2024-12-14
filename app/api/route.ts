import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { expansionSchema } from "./schema";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const context = await req.json();
  console.log(context);
  const result = streamObject({
    model: openai("gpt-4o-mini"),
    prompt: `Generate 5 unique acronym expansions for a messages app in this context: ${context}. Make sure each letter in the context is represented by a individual word.`,
    schema: expansionSchema,
  });

  return result.toTextStreamResponse();
}
