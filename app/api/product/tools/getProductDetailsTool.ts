import { tool } from "ai";
import { z } from 'zod'
import { products } from "../db";

export const getProductDetailsTool = tool({
    description: 'Get detailed information about a specific product using an order ID',
    inputSchema: z.object({
        orderId: z.number().describe('Order id for the product')
    }),
    execute: async ({ orderId }) => {
        const product = products.find(
            product => product.orderId === orderId
        );

        if (!product) {
            return {
                success: false,
                message: `No product found for order ${orderId}`,
            };
        }

        return {
            success: true,
            product,
        };
        // return `The product for order id ${productId} is the shoes`
    }
})