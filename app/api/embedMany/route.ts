import { openai } from "@ai-sdk/openai"
import { cosineSimilarity, embedMany } from "ai"

const chunks = [
    {
        id: "chunk-1",
        text: "Customers can request a refund within 30 days of purchase.",
        metadata: {
            documentName: "Refund Policy",
            category: "Refund"
        }
    },
    {
        id: "chunk-2",
        text: "Refunds are processed within 5 business days after inspection.",
        metadata: {
            documentName: "Refund Policy",
            category: "Refund"
        }
    },
    {
        id: "chunk-3",
        text: "Digital products are not eligible for refunds.",
        metadata: {
            documentName: "Refund Policy",
            category: "Refund"
        }
    }
];

export async function GET() {
    try {
        // const { text } = await req.json()
        const values = chunks.map((chunk, i) => chunk.text)

        const result = await embedMany({
            model: openai.embedding('text-embedding-3-small'),
            values
        })
        console.log('embedings', result.embeddings)
        const embeddeChunk = chunks.map((chunk, index) => ({
            ...chunk,
            embedding: result.embeddings[index]
        }))
        console.log('similarity', cosineSimilarity(result.embeddings[0], result.embeddings[1]))
        return Response.json(embeddeChunk)
    } catch (error) {
        return Response.json({
            status: 500,
            message: "EMbedding generation failed"
        })
    }
}