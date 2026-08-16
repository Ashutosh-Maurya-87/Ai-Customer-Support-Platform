import { tool } from "ai"
import { z } from 'zod'
import { products } from "../db"

export const searchProductTool = tool({
    description: 'Search the product catalog when the user is looking for products based on a name, category, or keyword.',
    inputSchema: z.object({
        searchQuery: z.string().describe('This is the query to search the product')
    }),
    execute: async ({ searchQuery }) => {
        const cleanQuery = searchQuery.trim().toLowerCase()

        const results = products?.filter((item) => {
            const matchesId = String(item?.id ?? item?.productId ?? '').toLowerCase() === cleanQuery
            const matchesTitle = item?.title?.toLowerCase().includes(cleanQuery)
            const matchesName = item?.name?.toLowerCase().includes(cleanQuery)
            const matchesCategory = item?.category?.toLowerCase().includes(cleanQuery)

            return matchesId || matchesTitle || matchesName || matchesCategory
        }) ?? []

        return results.map((item) => ({
            id: item.id,
            productId: item.productId,
            title: item.title || item.name,
            price: item.price,
            category: item.category,
        }))
    }
})