import { Button } from "@/components/ui/button";
import TableBook from "@/components/table/book/table"
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function Page() {
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
            <TableBook/>
        </div>
    );
}