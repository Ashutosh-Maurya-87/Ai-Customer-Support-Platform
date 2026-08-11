import { openai } from "@ai-sdk/openai"
import { convertToModelMessages, streamText, UIMessage } from "ai"

export async function POST(req: Request) {
    try {
        const { messages }: { messages: UIMessage[] } = await req.json()
        console.log('messages', messages)
        const result = streamText({
            model: openai('gpt-4.1-nano'),
            // prompt: 'Explain the Js'
            // if we want to pass message
            messages: await convertToModelMessages(messages)
        })

        // return result.toTextStreamResponse()
        return result.toUIMessageStreamResponse()
    } catch (error) {
        return new Response('Error while generating text', { status: 500 })
    }
}