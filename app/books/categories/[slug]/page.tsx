import columnsBook from "@/components/table/columns/book";
import Table from "@/components/table/Table";
import { getBooksByCategory } from "@/services/books";
import { Book } from "@/types";

export default async function Page({ params }: { params: { slug: string } }) {

    const { slug } = await params
    const books = await getBooksByCategory(slug) as Book[]

    return (
        <main>
            <div className="bg-white mx-auto rounded-2xl p-4">
                <Table columns={columnsBook} data={books}/>
            </div>
        </main>
    )
}