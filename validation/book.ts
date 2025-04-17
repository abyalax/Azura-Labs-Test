import { z, ZodType } from "zod";

export const bookSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(4, {
        message: "Title must be at least 4 characters.",
    }),
    category: z.string().min(4, {
        message: "Category must be at least 4 characters.",
    }),
    author: z.string().min(4, {
        message: "Author must be at least 4 characters.",
    }),
    status: z.enum(["publish", "unpublish", "draft"]),
    publishAt: z.date().optional(),
    publisher: z.string().max(40).optional(),
    price: z.preprocess(
        (val) => (val === "" ? undefined : Number(val)),
        z.number().min(1, {
            message: "Price must be at least IDR 1",
        })
    ) as ZodType<number>,
    pages: z.preprocess(
        (val) => (val === "" ? undefined : Number(val)),
        z.number().min(2, {
            message: "Pages must be at least 2 pages.",
        })
    ) as ZodType<number>,
})