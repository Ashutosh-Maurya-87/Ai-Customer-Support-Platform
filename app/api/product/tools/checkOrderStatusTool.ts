import { tool } from "ai"
import { z } from 'zod'
import { products } from "../db"


export const checkOrderStatusTool = tool({
    description: "Get the current shipping/order status for a specific order ID.",
    inputSchema: z.object({
        orderId: z.number().describe('This is the order id to check the status of the product')
    }),
    execute: async ({ orderId }) => {
        if (!orderId) return null
        const data = products.find((item) => item?.orderId === Number(orderId))

        return `Your order product is: ${data?.name} delivered in the given address`
    }
})