import { tool } from "ai"
import { z } from 'zod'
import { products } from "../db"

export const searchProductTool = tool({
    description: 'Search the product catalog when the user is looking for products based on a name, category, or keyword.',
    inputSchema: z.object({
        searchQuery: z.string().describe('This is the query to search the product')
    }),
    execute: async ({ searchQuery }: { searchQuery: string }) => {
        if (!searchQuery) return [];

        const cleanQuery = searchQuery.trim().toLowerCase();

        const underMatch = cleanQuery.match(/(?:under|below|<)\s*(\d+)/);
        const overMatch = cleanQuery.match(/(?:over|above|>)\s*(\d+)/);

        const maxPrice = underMatch ? Number(underMatch[1]) : null;
        const minPrice = overMatch ? Number(overMatch[1]) : null;

        const textQuery = cleanQuery
            .replace(/(?:under|below|over|above|<|>)\s*\d+/, "")
            .trim();
        const tokens = textQuery.split(/\s+/).filter(Boolean);

        const results =
            products?.filter((item) => {
                if (maxPrice !== null && item.price > maxPrice) return false;
                if (minPrice !== null && item.price < minPrice) return false;

                if (tokens.length === 0) return true;

                return tokens.every((token) => {
                    const matchesId =
                        String(item?.id ?? item?.productId ?? "").toLowerCase() === token;
                    const matchesOrderId =
                        String(item?.orderId ?? "").toLowerCase() === token;
                    const matchesTitle = item?.title?.toLowerCase().includes(token);
                    const matchesName = item?.name?.toLowerCase().includes(token);
                    const matchesCategory = item?.category?.toLowerCase().includes(token);
                    // String conversion prevents runtime crashes on numeric prices
                    const matchesPrice = String(item?.price ?? "").includes(token);

                    return (
                        matchesId ||
                        matchesOrderId ||
                        matchesTitle ||
                        matchesName ||
                        matchesCategory ||
                        matchesPrice
                    );
                });
            }) ?? [];

        return results.map((item) => ({
            id: item.id,
            orderId: item?.orderId,
            productId: item.productId ?? item.id,
            title: item.title || item.name,
            price: item.price,
            category: item.category,
        }));
    }
})