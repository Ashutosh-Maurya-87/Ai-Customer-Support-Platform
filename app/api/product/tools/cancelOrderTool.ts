import { tool } from "ai"
import { z } from "zod"
import { products } from "../db"

export const cancelOrderTool = tool({
    description: 'Cancle the order for the user of given order id',
    inputSchema: z.object({
        orderId: z.number().describe('This is the order id')
    }),
    needsApproval: true,
    execute: async ({ orderId }) => {
        const order = products.find((item) => item?.orderId === Number(orderId))

        if (!order) {
            return {
                success: false,
                message: `Order ${orderId} was not found`,
            };
        }
        if (order?.status === "Delivered") {
            return {
                status: "Cancelled",
                message: `Delivered Order can not be cancelled`
            }
        }

        order.status = 'Cancelled'

        return {
            id: order?.id,
            orderId: order?.orderId,
            productId: order?.productId,
            name: order?.name,
            price: order?.price,
            title: order?.title,
            status: "Cancelled",
            success: true
        }
    }
})