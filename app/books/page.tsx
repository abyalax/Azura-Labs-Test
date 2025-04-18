import bookColumns from "@/components/table/book/columns";
import TableBook from "@/components/table/book/Table";
import { TableOptionCustom } from "@/components/table/book/Table";
import { Button } from "@/components/ui/button";
import { getBooks, getCategoryNames } from "@/services/books";
import { Book } from "@/types";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function Page() {
    const books = await getBooks() as Book[]
    const lists = await getCategoryNames() ?? ['']

    const options: TableOptionCustom[] = [
        {
            label: "Filter By Category",
            lists,
            columnId: "category"
        },
    ]
    return (
        <div className="bg-white w-fit mx-auto rounded-2xl p-4">
            <div className="flex justify-between">
                <h2>Book Managements</h2>
                <Button variant={"outline"}>
                    <Plus size={20}/>
                    <Link href={"/books/create"}>
                        Add New
                    </Link>
                </Button>
            </div>
            <TableBook columns={bookColumns} data={books} options={options}/>
        </div>
    );
}