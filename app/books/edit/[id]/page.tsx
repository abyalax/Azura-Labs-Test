import { FormBook } from "@/components/form/form-book"
import { getBookByID } from "@/services/books"
import { Book } from "@/types"

export default async function Page({ params }: { params: { id: number } }) {
    const book = await getBookByID(( await params).id) as Book
    console.log(book);
    
    if (book) {
        return (
            <main>
                <div className="bg-white w-fit min-w-[40vw] mx-auto rounded-2xl p-4">
                    <FormBook type="edit" defaultValues={book} />
                </div>
            </main>
        )
    } else {
        return (
            <main>
                <div className="bg-white w-fit min-w-[40vw] mx-auto rounded-2xl p-4">
                    <p>Book not found</p>
                </div>
            </main>
        )
    }

}