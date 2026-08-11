import { openai } from "@ai-sdk/openai";
import { generateText, Output } from "ai";
import { ticketSchema } from "@/app/components/classify/schema";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const result = await generateText({
      model: openai("gpt-4.1-nano"),
      prompt: message,
      output: Output.object({
        schema: ticketSchema,
      }),
    });

    console.log("RESULT:", result);

    return Response.json(result.output);
  } catch (error) {
    console.error("CLASSIFY ERROR:", error);

    return Response.json(
      { error: "Failed to classify ticket" },
      { status: 500 }
    );
  }
}