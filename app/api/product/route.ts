import { openai } from "@ai-sdk/openai"
import { convertToModelMessages, streamText, UIMessage } from "ai"
import { getProductDetailsTool } from "./tools/getProductDetailsTool"


export async function POST(req: Request) {
    try {
        const { messages }: { messages: UIMessage[] } = await req.json()

        const result = streamText({
            model: openai('gpt-4.1-nano'),
            messages: await convertToModelMessages(messages),
            tools: { getProductDetailsTool }
        })
        return result.toUIMessageStreamResponse()
    } catch (error) {
        return new Response("Error while calling tool", { status: 500 })
    }
}