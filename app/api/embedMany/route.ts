import { openai } from "@ai-sdk/openai"
import { cosineSimilarity, embed, embedMany, generateText } from "ai"

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
        const threshold = 0.7
        // example --
        const query = "How long does it take to get a refund?";
        const res = await embed({
            model: openai.embedding('text-embedding-3-small'),
            value: query
        })

        const values = chunks.map((chunk, i) => chunk.text)

        const result = await embedMany({
            model: openai.embedding('text-embedding-3-small'),
            values
        })
        // console.log('embedings', result.embeddings)
        // console.log('embeding', res.embedding)
        const embeddeChunk = chunks.map((chunk, index) => ({
            ...chunk,
            // embedding: result.embeddings[index]
            score: cosineSimilarity(res?.embedding, result?.embeddings[index])
        }))
        // Using threshold so that it give the relevant enough data
        // top-K give the top most data with quantity control
        const topK = embeddeChunk?.filter((chunk) => chunk?.score >= threshold)
            .sort((a, b) => b.score - a.score).slice(0, 2)

        // now after applying thresold if top-K not exist then don't need to send that chunk to LLM
        // Model so we are returnign from here and it will reduce the cost and it also would be cost effective
        if (topK.length === 0) {
            return Response.json({
                answer: "I could not find this information in the knowledge base."
            });
        }
        const context = topK.map((chunk, i) => chunk?.text).join("\n\n")

        const LLMAns = await generateText({
            model: openai('gpt-4.1-nano'),
            prompt: `You are a helpful support assistant.
                     Answer the user's question ONLY using the provided context.
                     If the answer is not available in the context, say:
                     "I could not find this information in the knowledge base."
            CONTEXT:${context}
            USER QUESTION:${query}`
        })
        console.log('asnwer', LLMAns.text)
        return Response.json({
            answer: LLMAns.text,
            sources: topK
        });
    } catch (error) {
        return Response.json({
            status: 500,
            message: "EMbedding generation failed"
        })
    }
}