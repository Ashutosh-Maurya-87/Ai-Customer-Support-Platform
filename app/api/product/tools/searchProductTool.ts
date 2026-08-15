import { tool } from "ai"
import { z } from 'zod'
import { products } from "../db"

export const searchProductTool = tool({
    description: 'Search the product catalog when the user is looking for products based on a name, category, or keyword.',
    inputSchema: z.object({
        searchQuery: z.string().describe('This is the query to search the product')
    }),
    execute: async ({ searchQuery }) => {
        if (!searchQuery) return products ?? [];

        const query = String(searchQuery).trim().toLowerCase();

        return (
            products?.filter((item) => {
                const matchesId = String(item?.id ?? "").toLowerCase() === query;

                const matchesTitle = item?.title?.toLowerCase().includes(query);
                const matchesName = item?.name?.toLowerCase().includes(query);

                const matchesCategory = item?.category?.toLowerCase().includes(query);

                return matchesId || matchesTitle || matchesName || matchesCategory;
            }) ?? []
        );
    }
})