export interface Book {
  id: number
  status: "publish" | "unpublish" | "draft"
  title: string
  author: string
  publishAt: Date
  publisher: string
  price: number
  pages: number
  category: string
}

export interface Category {
  id: number
  name: string
  description: string
  slug: string
}