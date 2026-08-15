import { openai } from "@ai-sdk/openai"
import { convertToModelMessages, stepCountIs, streamText, UIMessage } from "ai"
import { getProductDetailsTool } from "./tools/getProductDetailsTool"
import { searchProductTool } from "./tools/searchProductTool"
import { checkOrderStatusTool } from "./tools/checkOrderStatusTool"


export async function POST(req: Request) {
    try {
        const { messages }: { messages: UIMessage[] } = await req.json()

        const result = streamText({
            model: openai('gpt-4.1-nano'),
            messages: await convertToModelMessages(messages),
            tools: { getProductDetailsTool, searchProductTool, checkOrderStatusTool },
            stopWhen: stepCountIs(5)
        })
        console.log('server reslult:', result)
        return result.toUIMessageStreamResponse()
    } catch (error) {
        console.error('error', error)
        return new Response("Error while calling tool", { status: 500 })
    }
}