import { z } from "zod";

export const ticketSchema = z.object({
  category: z.string(),
  priority: z.enum(["low", "medium", "high"]),
  sentiment: z.enum(["positive", "neutral", "negative"]),
  needsHuman: z.boolean(),
});