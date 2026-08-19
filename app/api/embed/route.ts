import { openai } from "@ai-sdk/openai"
import { embed } from "ai"


export async function GET() {
    try {
        // const { text } = await req.json()

        const result = await embed({
            model: openai.embedding('text-embedding-3-small'),
            value: 'I want to cancel my order.'
        })
        console.log('embedings', result.embedding)
        return Response.json({
            embedding: result.embedding
        })
    } catch (error) {
        return Response.json({
            status: 500,
            message: "EMbedding generation failed"
        })
    }
}