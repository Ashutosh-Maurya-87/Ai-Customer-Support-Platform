import { tool } from 'ai'
import { z } from 'zod'
import { products } from '../db'

export const getProductAvailabilityTool = tool({
    description: "Check whether a specific product is currently available for purchase using its product ID.",
    inputSchema: z.object({
        productId: z.number().describe("This is a product id")
    }),
    execute: async ({ productId }) => {
        const product = products.find((item) => Number(item?.productId) === Number(productId))

        if (!product) {
            return { success: false, message: `No product found for ID ${productId}` }
        }

        return {
            success: true,
            productId: product.productId,
            name: product.name,
            isAvailable: product.availability,
            price: product.price,
        }
    }
})