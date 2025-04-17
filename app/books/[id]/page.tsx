import { getBookByID } from "@/services/books";
import { Book } from "@/types";

export default async function Page({ params }: {params: {id: number}}) {

    const { id } = params
    const book = await getBookByID(id) as unknown as Book

    return (
        <main>
            <div className="bg-white mx-auto rounded-2xl p-4">
                <pre>
                    {JSON.stringify(book, null, 2)}
                </pre>
            </div>
        </main>
    )
}