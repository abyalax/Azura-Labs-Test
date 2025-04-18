import TableBook from "@/components/table/book/table";
import { getBooksByCategory } from "@/services/books";
import { Book } from "@/types";

export const revalidate = 30

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {

    const { slug } = await params
    const books = await getBooksByCategory(slug) as Book[]

    return (
        <main>
            <div className="bg-white mx-auto rounded-2xl p-4">
                <TableBook data={books} />
            </div>
        </main>
    )
}