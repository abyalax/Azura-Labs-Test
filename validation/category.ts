import { z } from "zod";

export const categorySchema = z.object({
    id: z.number().optional(),
    name: z.string().min(4).max(18),
    description: z.string().min(10).max(40),
    slug: z.string().min(4).optional(),
})